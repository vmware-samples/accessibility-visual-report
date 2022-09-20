# Copyright 2022 VMware, Inc.
# SPDX-License-Identifier: MIT

import threading
import json
from datetime import datetime as dt
import uuid as uuid4
import requests

from .a11y_tp import *
from .a11y_tl import *
from accessibility.settings import *
import copy

import urllib.parse
# set heander and url
a11y_api_headers = {'Content-type': 'application/json'}
a11y_api_post_url=VTAAS_SERVER_BE+'/result/post_to_accessibility/'
a11y_api_report_url=VTAAS_SERVER_BE+'/result/get_accessibility_result/'

class A11ySubTaskThread(threading.Thread):
    def __init__(self,task_id, a11y_task_url, a11y_task_type, a11y_task_payload, func):
        threading.Thread.__init__(self)
        self.task_id=task_id
        self.a11y_task_url=a11y_task_url
        self.a11y_task_type=a11y_task_type
        self.a11y_task_payload=a11y_task_payload
        self.name=self.task_id
        self.func=func
    def run(self):
        self.func(self.task_id, self.a11y_task_url, self.a11y_task_type, self.a11y_task_payload)
def a11y_sub_task_thread(task_id, a11y_task_url, a11y_task_type, a11y_task_payload, a11y_sub_task_func):
    A11ySubTaskThread(task_id, a11y_task_url, a11y_task_type, a11y_task_payload, a11y_sub_task_func).start()

# this function only return task_id, task_info and a11y_task_payload but does not perform POST
# once done, it means task crated
def parse_a11y_task_args(request, a11y_task_urls, a11y_task_types):
    # get default parameters from data
    now = dt.now()
    test_id = now.strftime("%Y%m%d")
    run_id = now.strftime("%H%M%S%U")
    # * Task Level Parameters
    user=request.data.get('user',RESULT_UTILITY_TYPE)
    result_utility_type=request.data.get('result_utility_type',RESULT_UTILITY_TYPE)
    result_api_type=request.data.get('result_api_type','wave')
    result_type=request.data.get('result_type','accessibility_static')
    create_time=request.data.get('create_time', str(now) )
    result_test_id=int(str(request.data.get('result_test_id',test_id)))
    result_test_run_id=int(str(request.data.get('result_test_run_id',run_id)))
    result_script_id=int(str(request.data.get('result_script_id','0')))
    result_script_run_id=int(str(request.data.get('result_script_run_id','0')))
    result_script_run_env_build_no=request.data.get('result_script_run_env_build_no','')
    result_script_run_env_locales=request.data.get('result_script_run_env_locales','').replace('-','_')
    result_script_run_env_script_type=request.data.get('result_script_run_env_script_type','')
    result_script_run_env_testbed=request.data.get('result_script_run_env_testbed','')
    result_script_run_env_browser=request.data.get('result_script_run_env_browser','')
    result_script_run_env_resolution=request.data.get('result_script_run_env_resolution','')
    result_screenshot_id=int(str(request.data.get('result_screenshot_id',0)))
    result_format=request.data.get('result_format','json')
    result_viewportwidth=request.data.get('result_viewportwidth','1200')
    result_evaldelay=request.data.get('result_evaldelay','250')
    result_reporttype=request.data.get('result_reporttype','4')
    prescript_to_accessibility=request.data.get('prescript_to_accessibility','')
    postscript_to_accessibility=request.data.get('postscript_to_accessibility','')
    result_username=request.data.get('result_username','')
    result_password=request.data.get('result_password','')

    # * Per URL Parameters
    uuid=request.data.get('uuid',str(uuid4.uuid4()))
    url_to_accessibility=request.data.get('url_to_accessibility','')
    original_url=request.data.get('original_url',url_to_accessibility)

    # single url post body
    a11y_task_payload = {
        "user":user,
        "create_time":create_time,
        "result_utility_type":result_utility_type,
        "result_type":result_type,
        "result_api_type":result_api_type,
        "result_format":result_format,
        "result_viewportwidth":result_viewportwidth,
        "result_evaldelay":result_evaldelay,
        "result_reporttype":result_reporttype,
        "result_test_id":result_test_id,
        "result_test_run_id":result_test_run_id,
        "result_script_id":result_script_id,
        "result_script_run_id":result_script_run_id,
        "result_script_run_env_build_no":result_script_run_env_build_no,
        "result_script_run_env_locales":result_script_run_env_locales,
        "result_script_run_env_script_type":result_script_run_env_script_type,
        "result_script_run_env_testbed":result_script_run_env_testbed,
        "result_script_run_env_browser":result_script_run_env_browser,
        "result_script_run_env_resolution":result_script_run_env_resolution,
        "result_screenshot_id":result_screenshot_id,
        "prescript_to_accessibility":prescript_to_accessibility,
        "postscript_to_accessibility":postscript_to_accessibility,
        "result_username":result_username,
        "result_password":result_password,
        "uuid":uuid,
        "original_url":original_url,
        "url_to_accessibility":url_to_accessibility
    }

    # task_id aka. result_screenshot_uid
    task_id = '%d.%d.0.0.0.0' % (result_test_id, result_test_run_id)

    # task_info body
    task_info = copy.deepcopy(accessibility_task_default)

    # update task_info genera
    task_info['uuid'] = str(uuid4.uuid4())
    task_info['create_time'] = create_time
    task_info['last_update'] = create_time

    # update task_info['task_detail'] per a11y_task_types
    task_info['task_detail']['result_api_types'] = a11y_task_types
    task_info['task_detail']['result_screenshot_uid'] = task_id
    task_info['task_detail']['report'] = ''
    task_info['task_detail']['lastUrlAt'] = create_time

    # update task_info['task_test']
    task_info['task_test']['suite_uuid'] = str(uuid4.uuid4())
    task_info['task_test']['result_test_id'] = result_test_id
    task_info['task_test']['result_test_run_id'] = result_test_run_id
    task_info['task_test']['test_type'] = result_type
    task_info['task_test']['VTAAS_SERVER'] = VTAAS_SERVER

    # update task_info['task_urls'] per a11y_task_urls and a11y_task_types
    task_urls = []
    for a11y_task_url in a11y_task_urls:
        # get default task_url and update url/original_url/uuid/timestamp
        task_url = copy.deepcopy(accessibility_task_url_default)
        task_url['url'] = a11y_task_url
        task_url['original_url'] = a11y_task_url
        task_url['uuid'] = str(uuid4.uuid4())
        task_url['timestamp'] = create_time
        task_url['last_update'] = create_time
        # get default result_json per a11y_task_types
        task_url_json = copy.deepcopy(accessibility_task_url_json_default)
        task_url_json['timestamp'] = create_time
        task_url_json['last_update'] = create_time
        for a11y_task_type in a11y_task_types:
            task_url['result_json'][a11y_task_type] = task_url_json
        task_urls.append(task_url)
    task_info['task_urls'] = task_urls

    # save task_info to file
    task_info_json_str=json.dumps(task_info)
    task_info_json_name=getAccessibilityTaskInfoJsonFile(task_id)
    write_file(task_info_json_name,task_info_json_str,'w')

    return task_id, task_info, a11y_task_payload

def a11y_task_processoring(task_id, a11y_task_url, a11y_task_type, a11y_task_payload):
    payload = copy.deepcopy(a11y_task_payload)
    # update uuid/original_url/url_to_accessibility
    payload["uuid"] = a11y_task_url['uuid']
    payload["url_to_accessibility"] = a11y_task_url['url']
    payload["original_url"] = a11y_task_url['original_url']
    # update api type
    payload["result_api_type"] = a11y_task_type
    # set default result before post
    # "result": "success",
    # "done": true,
    # "timestamp": "2021-07-10T05:37:20.320Z"
    result_json_old = a11y_task_url['result_json'][a11y_task_type]
    result_json_new = copy.deepcopy(result_json_old)
    result_json_new['done'] = True
    result_json_new['result'] = "error"
    result_json_new['last_update'] = str(dt.now())
    # post to a11y and update result per response
    try:
        response = requests.post(a11y_api_post_url, data=json.dumps(payload), headers=a11y_api_headers, timeout=180)
        if response.status_code == requests.codes.ok:
            a11y_api_result = response.json()
            result_json_new = {**result_json_new, **a11y_api_result}
            if a11y_api_result["message"]=="success":
                result_json_new["result"]="success"
    except:
        pass

    # save url post result to file
    result_json_str=json.dumps(result_json_new)
    result_json_name=getAccessibilityTaskInfoJsonFile(task_id,payload["uuid"],a11y_task_type)
    write_file(result_json_name,result_json_str,'w')


# a11y_task_processor will parse the urls and types to create sub-tasks. All sub tasks with same result_screenshot_uid(task_id)
# And the information will save to save to task_id/task.json. It also trigger sub-tasks, all sub-tasks will update task_id/type/uuid.json later
# Return: task_id(result_screenshot_uid) or exception
def a11y_task_processor(request, a11y_task_urls, a11y_task_types):
    message = 'success'
    error_code = 0
    error_message = ''
    task_id = None
    task_status = 'task_ongoing'
    task_report_url = ''
    task_info = None
    # init task
    task_id, task_info, a11y_task_payload = parse_a11y_task_args(request, a11y_task_urls, a11y_task_types)
    task_status = task_info['task_status']
    # for each urls, for each types, post to accessibility, save results to url result_json
    for a11y_task_url in task_info['task_urls']:
        # get default result_json per a11y_task_types
        for a11y_task_type in a11y_task_types:
            # start thread to post
            a11y_sub_task_thread(task_id, a11y_task_url, a11y_task_type, a11y_task_payload, a11y_task_processoring)

    return message, error_code, error_message, task_id, task_status, task_report_url, task_info


def get_task_info(task_id, uuid=None, api_type="wave"):
    task_info_json_file = getAccessibilityTaskInfoJsonFile(task_id, uuid, api_type)
    task_info_json = read_json_file(task_info_json_file)
    if not task_info_json:
        return None
    else:
        return task_info_json

# function to request api to generate final report
def get_task_report(task_id, task_info):
    message = 'success'
    error_code = 0
    error_message = ''
    task_status = 'task_done'
    task_report_url = ''

    task_user = task_info['user']
    console_uuid = str(task_info['task_test']['console_id']) + "@" + task_info['task_test']['suite_uuid']
    task_date = task_info['task_test']['result_test_id']
    result_type = task_info['task_test']['test_type']
    result_api_types = task_info['task_detail']['result_api_types']
    result_screenshot_uid = task_info['task_detail']['result_screenshot_uid']

    payload = {
            "console_uuid": console_uuid,
            "console_create_day": task_date,
            "user": task_user,
            "result_type": "accessibility",
            "result_api_types": result_api_types,
            "result_utility_name": "storage",
            "result_locale": "en_US",
            "result_test_event_type": "28",
            "result_screenshot_uid": result_screenshot_uid,
            "result_type" :  result_type,
            "result_utility_type" : RESULT_UTILITY_TYPE
    }

    # post to a11y and update result per response
    print("a11y_api_report_url", a11y_api_report_url)
    print("payload", payload)
    try:
        response = requests.post(a11y_api_report_url, data=json.dumps(payload), headers=a11y_api_headers)
        if response.status_code == requests.codes.ok:
            a11y_api_result = response.json()
            print("a11y_api_result", a11y_api_result)
            message = a11y_api_result['message']
            error_code = a11y_api_result['error_code']
            error_message = a11y_api_result['error_message']
            result_report_url = a11y_api_result['result_report_url']
            if len(task_info['task_urls'])>0:
                first_url = task_info['task_urls'][0]
                first_url_to_wave = first_url['url']
                task_report_url_server = VTAAS_SSL_SERVER
                report_url = result_report_url + "/report.json"
                task_report_url = "%s/visual-report/?url=%s&report=%s" % (task_report_url_server, urllib.parse.quote(first_url_to_wave), urllib.parse.quote(report_url))
            else:
                message = 'fail'
                error_code = -1
                error_message = 'unable to get target page url to generate report!'
        print("a11y_api_result", response.status_code)
    except:
        message = 'fail'
        error_code = -1
        error_message = 'failed to contact API to generate report!'
    print("error_code", error_code)
    print("error_message", error_message)

    return message, error_code, error_message, task_id, task_status, task_report_url, task_info

# a11y_task_status will query all sub-tasks task_id/type/uuid.json and update to task_id/task.json
def a11y_task_status(task_id, task_report):
    message = 'success'
    error_code = 0
    error_message = ''
    task_status = 'task_ongoing'
    task_report_url = ''
    task_info = None
    # get existing task_info
    task_info = get_task_info(task_id)
    if not task_info:
        message = 'fail'
        error_code = -1
        error_message = 'task not found!'
    else:
        if not "task_status" in task_info:
            message = 'fail'
            error_code = -1
            error_message = 'task info error!'
        elif task_report=="details":
            message, error_code, error_message, task_id, task_status, task_report_url, task_info = a11y_task_detail(task_id, task_info)
        else:
            task_status = task_info['task_status']
            # for each urls, for each types, update per sub-tasks task_id/type/uuid.json
            task_urls = []
            is_task_done = True
            is_task_error = False
            for a11y_task_url in task_info['task_urls']:
                # get default result_json per a11y_task_types
                is_url_done = True
                is_url_error = False
                for a11y_task_type in a11y_task_url["result_json"]:
                    result_json = get_task_info(task_id,a11y_task_url["uuid"],a11y_task_type)
                    if result_json:
                        if not result_json["done"]:
                            is_url_done = False
                        if result_json["result"]=="error":
                            is_url_error = True
                            is_task_error = True
                        # update to existing result_json
                        a11y_task_url["result_json"][a11y_task_type]=result_json
                        a11y_task_url['last_update'] = str(dt.now())
                    else:
                        is_url_done = False
                # update to new task_urls
                a11y_task_url["done"] = is_url_done
                if is_url_done:
                    if not is_url_error:
                        a11y_task_url["result"] = "success"
                    else:
                        a11y_task_url["result"] = "error"
                else:
                    is_task_done = False
                task_urls.append(a11y_task_url)

            # update to task_info
            task_info['task_urls'] = task_urls
            if is_task_done:
                task_info['task_status'] = "task_done"
                task_info['task_detail']['done'] = is_task_done
                if not is_task_error:
                    task_info['task_detail']['result'] = "succeeded"
                else:
                   task_info['task_detail']['result'] = "error"
            # save task_info to file
            task_info_json_str=json.dumps(task_info)
            task_info_json_name=getAccessibilityTaskInfoJsonFile(task_id)
            write_file(task_info_json_name,task_info_json_str,'w')

            # if to get report via api /task_id/report
            if task_report=="report":
                if not task_status=="task_done":
                    message = 'fail'
                    error_code = -1
                    error_message = 'task is still ongoing, please wait!'
                else:
                    message, error_code, error_message, task_id, task_status, task_report_url, task_info = get_task_report(task_id, task_info)

    return message, error_code, error_message, task_id, task_status, task_report_url, task_info

# a11y_task_detail
def a11y_task_detail(task_id, task_info=None):
    message = 'success'
    error_code = 0
    error_message = ''
    task_status = 'task_done'
    task_report_url = ''
    if not task_info:
        # get existing task_info
        task_info = get_task_info(task_id)
    if not task_info:
        message = 'fail'
        error_code = -1
        error_message = 'task not found!'
    elif not "task_status" in task_info:
            message = 'fail'
            error_code = -1
            error_message = 'task info error!'
    else:
        task_status = task_info['task_status']
        task_urls_per_request = []
        task_url_per_request = copy.deepcopy(accessibility_task_url_details_default)
        task_url_per_request["user"] = task_info["user"]
        task_url_per_request["result_type"] = task_info["task_test"]["test_type"]
        task_url_per_request["screenshot_uid"] = task_id
        # update per task_url
        for a11y_task_url in task_info['task_urls']:
            result = str(task_info["task_test"]["result_test_id"])+'/'+task_id+'/'+a11y_task_url["uuid"]
            task_url_per_request["result"] = result
            task_url_per_request["uuid"] = a11y_task_url["uuid"]
            task_url_per_request["create_time"] = a11y_task_url["timestamp"]
            task_url_per_request["last_update"] = a11y_task_url["last_update"]
            task_url_per_request["url"]["url_to_accessibility"] = a11y_task_url["url"]
            task_url_per_request["url"]["original_url"] = a11y_task_url["original_url"]
            task_url_to_append=copy.deepcopy(task_url_per_request)
            task_url_to_append["url"]=json.dumps(task_url_per_request["url"])
            # update to new task_urls
            task_urls_per_request.append(task_url_to_append)

    return message, error_code, error_message, task_id, task_status, task_report_url, task_urls_per_request

# fetch web page content
def get_web_page(myurl=''):
    # handle MissingSchema behind a nginx proxy :/ -> :// & :/// -> ://
    myurl = myurl.replace(':/','://').replace(':///','://')
    r = requests.get(myurl, verify=False)
    return r
# Copyright 2022 VMware, Inc.
# SPDX-License-Identifier: MIT

import os
import json
import errno
import urllib
import datetime

from accessibility.settings import *

from .a11y_tp import *

ENCODING='utf-8'

DATE_TIME_TIMESTAMP_FORMAT='%Y-%m-%d %H:%M:%S'
DATE_TIME_FULL_TIMESTAMP_FORMAT='%Y-%m-%d %H:%M:%S.%f'
DATE_TIME_INT_FORMAT='%Y%m%d%H%M%S'
DATE_TIME_FULL_INT_FORMAT='%Y%m%d%H%M%S%f'

def write_file(filename,txt,write_mode='w'):
    desc_dir_path=os.path.dirname(filename)
    if(not os.path.exists(desc_dir_path)):
        mkdir_batch(desc_dir_path)
    with open(filename,write_mode,encoding=ENCODING) as f:
        f.write(txt)
        f.close()
    if(not os.path.exists(filename)):
        print(filename,' doesn\'t exist.write_file is failed')

def mkdir_batch(path):
    try:
        os.makedirs(path)
    except OSError as exc:
        if((exc.errno==errno.EEXIST) and (os.path.isdir(path))):
            pass
        else:
            raise

def copy_folder(src_path,desc_path):
    if(not os.path.exists(desc_path)):
        mkdir_batch(desc_path)
    os.system('cp -rf %s %s' % (src_path, desc_path))
    if(not os.path.exists(desc_path)):
        print(desc_path,' doesn\'t exist.copy is failed')
    else:
        print('copy is done')

def read_file(filename):
    status=False
    lines=''
    if(os.path.exists(filename)):
        with open(filename,'r+',encoding=ENCODING) as f:
            lines=f.read()
            status=True
            f.close()
    return status,lines

def read_json_file(filename):
    json_file=''
    if(os.path.exists(filename)):
        try:
            with open(filename,'r',encoding=ENCODING) as f:
                json_file=json.load(f)
                f.close()
        except Exception as e:
            print('invalid json file:',filename,e)
    return json_file

def replace_json_double_quote(json_str):
    double_quote_patterns={
        'JSON_REPLACE_BRACE_LEFT':'{"',
        'JSON_REPLACE_BRACE_RIGHT':'"}',
        'JSON_REPLACE_BRACEKET_LEFT':'["',
        'JSON_REPLACE_BRACEKET_RIGHT':'"]',
        'JSON_REPLACE_SEMICOLON_MIDDLE':'":"',
        'JSON_REPLACE_SEMICOLON_RIGHT':'":',
        'JSON_REPLACE_COMMA_MIDDLE':'","',
        'JSON_REPLACE_COMMA_LEFT':',"'
    }
    for double_quote_pattern_key,double_quote_pattern_value in double_quote_patterns.items():
        json_str=json_str.replace(double_quote_pattern_value,double_quote_pattern_key)
    json_str=json_str.replace('"','\'')
    for double_quote_pattern_key,double_quote_pattern_value in double_quote_patterns.items():
        json_str=json_str.replace(double_quote_pattern_key,double_quote_pattern_value)
    return json_str

def join_folders(folder_list):
    path=''
    for folder in folder_list:
        path=os.path.join(path,folder)
    # in case windows path
    path = path.replace("\\","/")
    return path

def concat_screenshot_uid(test_id,test_run_id,script_id,script_run_id,script_run_env_id,screenshot_id):
    return str(test_id)+'.'+str(test_run_id)+'.'+str(script_id)+'.'+str(script_run_id)+'.'+str(script_run_env_id)+'.'+str(screenshot_id)

def split_screenshot_uid(screenshot_uid):
    ids=screenshot_uid.split('.')
    return int(ids[0]),int(ids[1]),int(ids[2]),int(ids[3]),int(ids[4]),int(ids[5])

def check_screenshot_uid(screenshot_uid):
    is_valid_screenshot_uid=True
    ids=screenshot_uid.split('.')
    if(len(ids)==6):
        for id in ids:
            try:
                id=int(id)
            except Exception as e:
                is_valid_screenshot_uid=False
                break
    else:
        is_valid_screenshot_uid=False
    return is_valid_screenshot_uid

def checkResultAPIType(result_api_type):
    error_code=-1
    if(result_api_type.lower() in accessibility_result_api_types):
        error_code=0
    return error_code

def checkResultUtilityType(result_utility_type):
    error_code=-1
    if(result_utility_type.lower() in accessibility_result_utility_types):
        error_code=0
    return error_code

def getResultFileName(create_time,screenshot_uid,uuid,result_api_type):
    result_date=datetime.datetime.strptime(create_time,DATE_TIME_FULL_TIMESTAMP_FORMAT).strftime("%Y%m%d")
    result_file_name=join_folders([result_date,screenshot_uid,uuid+'_'+result_api_type+'.json'])
    result_full_file_name=join_folders([ACCESSIBILITY_STORAGE_ROOT,result_file_name])
    return result_file_name,result_full_file_name

def getResultFileNameByAPIType(result_file_name,result_api_type):
    return result_file_name+'_'+result_api_type+'.json'

def getResultReportPath(console_create_day,console_uuid):
    result_report_path=join_folders([console_create_day,console_uuid])
    return result_report_path

def getResultReportURL(result_utility_type,console_create_day,console_uuid):
    result_report_url=getResultReportPath(console_create_day,console_uuid)
    result_report_url=join_folders([VTAAS_SSL_SERVER,'reports',result_report_url])
    if(result_utility_type=='internal'):
        result_report_url+='/accessibilityreports'
    return result_report_url

def getAccessibilityReportFullPath(result_utility_type,accessibility_report_path):
    accessibility_report_full_path=join_folders([REPORT_STORAGE_ROOT,accessibility_report_path])
    if(result_utility_type=='internal'):
        accessibility_report_full_path=join_folders([accessibility_report_full_path,'accessibilityreports'])
    return accessibility_report_full_path

def getAccessibilityReportJsonFile(accessibility_report_full_path):
    accessibility_report_json_file=join_folders([accessibility_report_full_path,'report.json'])
    return accessibility_report_json_file

def getAccessibilityResultFromFile(result_screenshot_uid,error_message):
    error_code=0
    from .a11y_tsk import a11y_task_detail
    test_start_time=0
    test_end_time=0
    test_url_count=0
    message,error_code,error_message,task_id,task_status,task_report_url,result_info=a11y_task_detail(result_screenshot_uid)
    return error_code,error_message,test_start_time,test_end_time,test_url_count,result_info

def getAccessibilityTaskInfoFullPath(task_id):
    accessibility_task_info_full_path=join_folders([TASK_STORAGE_ROOT,task_id])
    return accessibility_task_info_full_path

# if uuid specified, return single url result by uuid.json, else return whole task.json
def getAccessibilityTaskInfoJsonFile(task_id,uuid=None,api_type=None):
    accessibility_task_info_full_path=getAccessibilityTaskInfoFullPath(task_id)
    if not uuid:
        return join_folders([accessibility_task_info_full_path,'task.json'])
    else:
        accessibility_task_info_uuid_full_path=join_folders([accessibility_task_info_full_path,uuid])
        if not api_type:
            return accessibility_task_info_uuid_full_path
        else:
            return join_folders([accessibility_task_info_uuid_full_path,api_type+'.json'])

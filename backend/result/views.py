# Copyright 2022 VMware, Inc.
# SPDX-License-Identifier: MIT

import base64
import json
import os

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.shortcuts import render
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt

from accessibility.settings import *

from .a11y_tl import *
from .a11y_pst import *
from .a11y_tsk import *

@csrf_exempt
@api_view(['POST'])
def post_to_accessibility(request):
    if(request.method=='POST'):
        error_code=-1
        status_code=500
        result_screenshot_uid=''
        result_utility_type=request.data.get('result_utility_type','internal')
        error_code=checkResultUtilityType(result_utility_type)
        if(error_code==0):
            result_api_type=request.data.get('result_api_type','wave')
            error_code=checkResultAPIType(result_api_type)
            if(error_code==0):
                uuid=request.data.get('uuid','')
                if(len(uuid)>0):
                    user=request.data.get('user','')
                    if(len(user)>0):
                        url_to_accessibility=request.data.get('url_to_accessibility','')
                        if(len(url_to_accessibility)>0):
                            create_time=request.data.get('create_time','')
                            if(len(create_time)>0):
                                result_test_id=int(str(request.data.get('result_test_id','0')))
                                if(result_test_id>0):
                                    result_test_run_id=int(str(request.data.get('result_test_run_id','0')))
                                    if(result_test_run_id>0):
                                        result_script_id=int(str(request.data.get('result_script_id','0')))
                                        result_script_run_id=int(str(request.data.get('result_script_run_id','0')))
                                        result_script_run_env_build_no=request.data.get('result_script_run_env_build_no','')
                                        result_script_run_env_locales=request.data.get('result_script_run_env_locales','').replace('-','_')
                                        result_script_run_env_script_type=request.data.get('result_script_run_env_script_type','')
                                        result_script_run_env_testbed=request.data.get('result_script_run_env_testbed','')
                                        result_script_run_env_browser=request.data.get('result_script_run_env_browser','')
                                        result_script_run_env_resolution=request.data.get('result_script_run_env_resolution','')
                                        result_script_run_env_id=0
                                        if(result_utility_type.lower()=='internal'):
                                            from .result_db import getScriptRunEnvId
                                            result_script_run_env_id=getScriptRunEnvId(result_test_id,result_script_run_id,user,result_script_run_env_build_no,result_script_run_env_locales,result_script_run_env_script_type,result_script_run_env_testbed,result_script_run_env_browser,result_script_run_env_resolution)
                                        result_screenshot_id=int(str(request.data.get('result_screenshot_id',0)))
                                        result_screenshot_uid=concat_screenshot_uid(result_test_id,result_test_run_id,result_script_id,result_script_run_id,result_script_run_env_id,result_screenshot_id)
                                        original_url=request.data.get('original_url',url_to_accessibility)
                                        prescript_to_accessibility=request.data.get('prescript_to_accessibility','')
                                        postscript_to_accessibility=request.data.get('postscript_to_accessibility','')
                                        result_format=request.data.get('result_format','json')
                                        result_viewportwidth=request.data.get('result_viewportwidth','1200')
                                        result_evaldelay=request.data.get('result_evaldelay','250')
                                        result_reporttype=request.data.get('result_reporttype','4')
                                        result_username=request.data.get('result_username','')
                                        result_password=request.data.get('result_password','')
                                        result_type=request.data.get('result_type','accessibility_dynamic')
                                        status_code,error_code,error_message=postToAccessibility(result_utility_type,uuid,user,result_type,original_url,url_to_accessibility,prescript_to_accessibility,postscript_to_accessibility,result_format,result_viewportwidth,result_evaldelay,result_reporttype,result_username,result_password,create_time,result_screenshot_uid,result_api_type)
                                    else:
                                        error_message='result_test_run_id: '+str(result_test_run_id)
                                else:
                                    error_message='result_test_id: '+str(result_test_id)
                            else:
                                error_message='create_time: '+create_time
                        else:
                            error_message='url_to_accessibility: '+url_to_accessibility
                    else:
                        error_message='user: '+user
                else:
                    error_message='uuid: '+uuid
            else:
                error_message='result_api_type: '+result_api_type
        else:
            error_message='result_utility_type: '+result_utility_type
        if(error_code==0):
            message='success'
        else:
            message='fail'
            if(isinstance(error_message,str)):
                error_message='invalid '+error_message
        return Response({'message':message,'status_code':status_code,'error_code':error_code,'error_message':error_message,'result_screenshot_uid':result_screenshot_uid})

@csrf_exempt
@api_view(['POST'])
def get_accessibility_result(request):
    if(request.method=='POST'):
        error_code=-1
        result_report_url=''
        result_screenshot_uid=request.data.get('result_screenshot_uid','')
        if(check_screenshot_uid(result_screenshot_uid)):
            console_uuid=request.data.get('console_uuid','')
            if(len(console_uuid)>0):
                console_create_day=str(request.data.get('console_create_day',''))
                if(len(console_create_day)>0):
                    user=request.data.get('user','')
                    if(len(user)):
                        result_type=request.data.get('result_type','accessibility')
                        result_api_types=request.data.get('result_api_types',['wave'])
                        result_test_event_type=int(str(request.data.get('result_test_event_type',28)))
                        result_test_url_count=int(str(request.data.get('result_test_url_count',0)))
                        result_element_list=request.data.get('result_element_list',[])
                        result_iframe_list=request.data.get('result_iframe_list',[])
                        result_utility_type=request.data.get('result_utility_type','internal')
                        error_code,error_message,result_report_url=getAccessibilityResult(result_utility_type,result_type,result_api_types,user,result_test_event_type,result_test_url_count,console_uuid,console_create_day,result_screenshot_uid,result_element_list,result_iframe_list)
                    else:
                        error_message='user: '+user
                else:
                    error_message='console_create_day: '+console_create_day
            else:
                error_message='console_uuid: '+console_uuid
        else:
            error_message='result_screenshot_uid: '+result_screenshot_uid
        if(error_code==0):
            message='success'
        else:
            message='fail'
            if(isinstance(error_message,str)):
                error_message='invalid '+error_message
        return Response({'message':message,'error_code':error_code,'error_message':error_message,"result_screenshot_uid":result_screenshot_uid,'result_report_url':result_report_url})

@csrf_exempt
@api_view(['GET','POST'])
def get_page(request, page_url=None):
    xFrameOptions = 'SAMEORIGIN '
    if request.method == 'GET':
        if not page_url:
            response = HttpResponse(
                    content='',
                    content_type='text/html',
                    status=404
                )
            response['X-Frame-Options']=xFrameOptions
            return response
        else:
            r =  get_web_page(page_url)
            response = HttpResponse(
                    content=r.content,
                    content_type=r.headers.get('Content-Type'),
                    status=r.status_code
                )
            response['X-Frame-Options']=xFrameOptions
            return response
    elif request.method == 'POST':
        page_url=request.data.get('page_url','')
        if not page_url:
            response =  HttpResponse(
                    content='',
                    content_type='text/html',
                    status=404
                )
            response['X-Frame-Options']=xFrameOptions
            return response
        else:
            r =  get_web_page(page_url)
            response =  HttpResponse(
                    content=r.content,
                    content_type=r.headers.get('Content-Type'),
                    status=r.status_code
                )
            response['X-Frame-Options']=xFrameOptions
            return response

@csrf_exempt
@api_view(['GET', 'POST'])
def a11y_task(request, task_id=None, task_report=None):
    message = 'success'
    error_code = 0
    error_message = ''
    task_status = ''
    task_report_url = ''
    task_info = None
    if request.method == 'GET':
        if not task_id:
            message = 'fail'
            error_code = -1
            error_message = 'task_id must be specified to get task status!'
        else:
            message, error_code, error_message, task_id, task_status, task_report_url, task_info =  a11y_task_status(task_id, task_report)
        return Response({'message':message,'error_code':error_code,'error_message':error_message,"task_id":task_id,"task_status":task_status,'task_report_url':task_report_url,'task_info':task_info})

    elif request.method == 'POST':
        # Post http://www.accessibility-visual-report.com:9006/result/a11y_task/
        # { "urls": ["www.baidu.com","www.vmware.com"] }
        # { "types":["wave","crest"], "urls": ["www.baidu.com","www.vmware.com"] }
        # {  "task_id": null, "task_for": "status" }
        # {  "task_id": null, "task_for": "report" }
        # {  "task_id": null, "task_for": "details" }
        a11y_task_task=request.data.get('task_for','new')
        task_id=request.data.get('task_id',task_id)
        if a11y_task_task == 'status':
            if not task_id:
                message = 'fail'
                error_code = -1
                error_message = 'task_id must be specified to get task status!'
            else:
                message, error_code, error_message, task_id, task_status, task_report_url, task_info =  a11y_task_status(task_id, task_report)
        elif a11y_task_task == 'report':
            task_report = 'report'
            if not task_id:
                message = 'fail'
                error_code = -1
                error_message = 'task_id must be specified to get task report!'
            else:
                message, error_code, error_message, task_id, task_status, task_report_url, task_info =  a11y_task_status(task_id, task_report)
        elif a11y_task_task == 'details':
            task_report = 'details'
            if not task_id:
                message = 'fail'
                error_code = -1
                error_message = 'task_id must be specified to get task details!'
            else:
                message, error_code, error_message, task_id, task_status, task_report_url, task_info =  a11y_task_status(task_id, task_report)
        elif a11y_task_task == 'new':
            a11y_task_types_ready = [v for v in A11Y_SERVERS.keys() if A11Y_SERVERS[v]]
            a11y_task_types=request.data.get('types',a11y_task_types_ready)
            print('a11y_task_types_ready',a11y_task_types_ready)
            a11y_task_urls=request.data.get('urls',None)
            if len(a11y_task_types)==0:
                message = 'fail'
                error_code = -1
                error_message = 'No Accessibility Evaluation API ready, please contact Administrator to check settings/config.py'
            else:
                if not a11y_task_urls:
                    message = 'fail'
                    error_code = -1
                    error_message = 'urls must be specified!'
                else:
                    message, error_code, error_message, task_id, task_status, task_report_url, task_info =  a11y_task_processor(request, a11y_task_urls, a11y_task_types)

        return Response({'message':message,'error_code':error_code,'error_message':error_message,"task_id":task_id,"task_status":task_status,'task_report_url':task_report_url,'task_info':task_info})

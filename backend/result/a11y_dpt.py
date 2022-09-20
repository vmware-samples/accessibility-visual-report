# Copyright 2022 VMware, Inc.
# SPDX-License-Identifier: MIT

import json
import datetime

from .a11y_tl import *
from .a11y_rpt import *

def saveAccessibilityResult(result_utility_type,uuid,user,result_type,screenshot_uid,original_url,url_to_accessibility,accessibility_result,create_time,result_api_type):
    url={"original_url":original_url,"url_to_accessibility":url_to_accessibility}
    url=json.dumps(url)
    print('create_time',create_time,'last_update',datetime.datetime.now())
    status_code=200
    error_message=''
    try:
        result_file_name,result_full_file_name=getResultFileName(create_time,screenshot_uid,uuid,result_api_type)
        result_file_name=result_file_name.replace('_'+result_api_type+'.json','')
        if(result_utility_type=='internal'):
            from .result_db import saveAccessibilityResultToDB
            status_code,error_message=saveAccessibilityResultToDB(uuid,user,result_type,screenshot_uid,url,accessibility_result,create_time,result_file_name)
        write_file(result_full_file_name,accessibility_result,'w')
    except Exception as e:
        print(e,'\n')
        error_message=str(e)
        status_code=702
    return status_code,error_message

def getAccessibilityResult(result_utility_type,result_type,result_api_types,user,result_test_event_type,result_test_url_count,console_uuid,console_create_day,result_screenshot_uid,result_element_list,result_iframe_list):
    error_code=0
    error_message=[]
    result_test_id,result_test_run_id,result_script_id,result_script_run_id,result_script_run_env_id,result_screenshot_id=split_screenshot_uid(result_screenshot_uid)
    product_info={}
    test_info={}
    replay_info={}
    result_info={}
    test_url_count=0
    test_is_replay=0
    result_report_url=''
    if(result_utility_type=='internal'):
        from .result_db import getAccessibilityProductTestInfo,getAccessibilityResultFromDB
        error_code,error_message,product_info,test_info,replay_info=getAccessibilityProductTestInfo(console_uuid,result_test_id,error_message)
        if(error_code==0):
            print('Aggregating accessibility result from db ...')
            if((result_script_id>0)and(result_script_run_id>0)):
                test_is_replay=1
            error_code,error_message,test_start_time,test_end_time,test_url_count,result_info=getAccessibilityResultFromDB(result_type,user,result_test_event_type,result_test_url_count,result_test_id,result_test_run_id,result_screenshot_uid,error_message)
            if(error_code!=0):
                return error_code,error_message,result_report_url
        else:
            return error_code,error_message,result_report_url
    elif(result_utility_type=='opensource'):
        print('Aggregating accessibility result from files...')
        error_code,error_message,test_start_time,test_end_time,test_url_count,result_info=getAccessibilityResultFromFile(result_screenshot_uid,error_message)
    if(len(result_info)>0):
        error_code,error_message=generateAccessibilityReport(result_utility_type,result_api_types,test_start_time,test_end_time,test_url_count,test_is_replay,product_info,test_info,replay_info,result_info,console_uuid,console_create_day,result_element_list,result_iframe_list)
        result_report_url=getResultReportURL(result_utility_type,console_create_day,console_uuid)
    else:
        error_message.append('no result found')
        error_code=-1
    return error_code,error_message,result_report_url
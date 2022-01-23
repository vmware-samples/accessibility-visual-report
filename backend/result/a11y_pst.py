# Copyright 2022 VMware, Inc.
# SPDX-License-Identifier: MIT

import os
import json
import datetime
import requests

from .a11y_tl import *
from .a11y_msg import *
from .a11y_dpt import *
from .a11y_rpt import *

def restapi_request(method,url,data):
    if(method=='get'):
        response=requests.get(url,data)
    elif(method=='post'):
        response=requests.post(url,data,headers={'Content-Type':'application/json','charset':'UTF-8'},verify=False,timeout=600)
    elif(method=='put'):
        response=requests.put(url,data)
    return response

def postToAccessibility(result_utility_type,uuid,user,result_type,original_url,url_to_accessibility,prescript_to_accessibility,postscript_to_accessibility,result_format,result_viewportwidth,result_evaldelay,result_reporttype,result_username,result_password,create_time,result_screenshot_uid,result_api_type):
    error_code=-1
    error_message=''
    accessibility_result={}
    result_file_name,result_full_file_name=getResultFileName(create_time,result_screenshot_uid,uuid,result_api_type)
    if(os.path.exists(result_full_file_name)):
        return 701,-1,'the result json '+result_file_name+' existed'
    if(result_api_type=='wave'):
         status_code,error_type,error_message,accessibility_result=postToWave(url_to_accessibility,prescript_to_accessibility,postscript_to_accessibility,result_format,result_viewportwidth,result_evaldelay,result_reporttype,result_username,result_password,result_api_type)
    elif(result_api_type=='crest'):
        status_code,error_type,error_message,accessibility_result=postToCrest(url_to_accessibility,result_reporttype,result_api_type)
    if(len(accessibility_result)>0):
        if(error_type==0):
            status_code,error_message=saveAccessibilityResult(result_utility_type,uuid,user,result_type,result_screenshot_uid,original_url,url_to_accessibility,accessibility_result,create_time,result_api_type)
        if((status_code==200) and len(error_message)==0):
            error_code=0
    else:
        error_message='an empty json result received from '+result_api_type
    return status_code,error_code,error_message

def postToWave(url_to_wave,prescript_to_wave,postscript_to_wave,result_format,result_viewportwidth,result_evaldelay,result_reporttype,result_username,result_password,result_api_type):
    error_message=''
    wave_api_url=WAVE_SERVER+'/request.php?key='+WAVE_API_KEY+'&url='+url_to_wave+'&format='+result_format+'&viewportwidth='+str(result_viewportwidth)+'&evaldelay='+str(result_evaldelay)+'&reporttype='+str(result_reporttype)
    if(len(result_username)>0):
        wave_api_url+='&username='+result_username
    if(len(result_password)>0):
        wave_api_url+='&password='+result_password
    if(len(prescript_to_wave)>0):
        wave_api_url+='&prescript='+prescript_to_wave
    if(len(postscript_to_wave)>0):
        wave_api_url+='&postscript='+postscript_to_wave
    wave_response=restapi_request('put',wave_api_url,None)
    status_code=wave_response.status_code
    print('wave_api_url:'+wave_api_url+'\nstatus_code:'+str(status_code))
    wave_result=wave_response.text.replace('true','"True"').replace('false','"False"')
    url_to_wave=url_to_wave
    if(wave_result.find(accessibility_expected_success)>=0):
        error_type,wave_result=handlePassedResult(wave_result)
    else:
        error_type,error_message=getAccessibilityError(result_api_type,wave_result)
    return status_code,error_type,error_message,wave_result

def postToCrest(url_to_crest,result_reporttype,result_api_type):
    error_message=''
    crest_api_url=join_folders([CREST_SERVER,CREST_APIS['all']])
    crest_data=json.dumps({"url":url_to_crest,"reporttype":int(result_reporttype)})
    start_time=datetime.datetime.now()
    crest_response=restapi_request('post',crest_api_url,crest_data)
    status_code=crest_response.status_code
    crest_result=crest_response.text.replace('true','"True"').replace('false','"False"')
    print('crest_api_url:',crest_api_url+'\ncrest_data:',str(crest_data)+'\nstatus_code:',str(crest_response.status_code),'\nduration:',(datetime.datetime.now()-start_time).seconds,'seconds','\ncrest_result:',crest_result)
    error_type,error_message=getAccessibilityError(result_api_type,crest_result)
    return status_code,error_type,error_message,crest_result
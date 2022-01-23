# Copyright 2022 VMware, Inc.
# SPDX-License-Identifier: MIT

import json

from .a11y_msg import *
from .a11y_nfo import *
from .a11y_tl import *

def generateAccessibilityReport(result_utility_type,result_api_types,test_start_time,test_end_time,test_url_count,test_is_replay,product_info,test_info,replay_info,result_info,console_uuid,console_create_day,result_element_list,result_iframe_list):
    error_code=0
    test_duration=str((test_end_time-test_start_time)).split('.')[0]
    for result_api_type in result_api_types:
        error_code=checkResultAPIType(result_api_type)
        if(error_code!=0):
            error_message='result_api_type: '+result_api_type
            return error_code,error_message
    result_info,error_message=updateAccessibilityResultInfo(result_api_types,result_iframe_list,result_info)
    result_info=loadsAccessibilityResultInfo(result_info,result_element_list)
    result_json={
        "summary":{
            "wave_server":WAVE_SERVER,
            "report_issue_server":REPORT_ISSUE_SERVER,
            "test_start_time":str(test_start_time),
            "test_end_time":str(test_end_time),
            "test_duration":test_duration,
            "test_url_count":test_url_count,
            "test_is_replay":test_is_replay,
            "product_info":product_info,
            "test_info":test_info,
            "replay_info":replay_info,
            },
        "result_info":list(result_info)
    }
    report_json_str=json.dumps(result_json)
    error_message=populateResult(result_utility_type,console_uuid,console_create_day,report_json_str,error_message)
    return error_code,error_message

def updateAccessibilityResultInfo(result_api_types,result_iframe_list,result_info):
    error_messages=[]
    accessibility_iframe_results={}
    for result in result_info:
        accessibility_results,error_messages=loadAccessibilityJsonFile(result_api_types,result)
        accessibility_result=mergeAccessibilityResult(accessibility_results)
        result['result']=accessibility_result
        result['create_time']=str(result['create_time'])
        result['last_update']=str(result['last_update'])
        accessibility_iframe_results[result['uuid']]=result
    for result_iframe in result_iframe_list:
        result_iframe_results={}
        result_iframe_parent_uuid=result_iframe['parent_uuid']
        if(result_iframe_parent_uuid in accessibility_iframe_results.keys()):
            for result_iframe_children in result_iframe['iframe_list']:
                result_iframe_results[result_iframe_parent_uuid]=accessibility_iframe_results[result_iframe_parent_uuid]['result']
                result_iframe_children_uuid=result_iframe_children['uuid']
                if(result_iframe_children_uuid in accessibility_iframe_results.keys()):
                    result_iframe_results[result_iframe_children_uuid]=accessibility_iframe_results[result_iframe_children_uuid]['result']
                    result_iframe_locator=result_iframe_children['iframe_locator']
                    accessibility_iframe_results[result_iframe_parent_uuid]['result']=mergeAccessibilityResult(result_iframe_results,result_iframe_locator)
                    del accessibility_iframe_results[result_iframe_children_uuid]
                    del result_iframe_results[result_iframe_children_uuid]
    return list(accessibility_iframe_results.values()),error_messages

def loadAccessibilityJsonFile(result_api_types,result):
    accessibility_results={}
    error_messages=[]
    for result_api_type in result_api_types:
        result_api_type=result_api_type.lower()
        accessibility_result_file=join_folders([ACCESSIBILITY_STORAGE_ROOT,getResultFileNameByAPIType(result['result'],result_api_type)])
        read_status,accessibility_result_json=read_file(accessibility_result_file)
        if(len(accessibility_result_json)>0):
            accessibility_result,accessibility_error_message=handleAccessibilityFailedResult(result_api_type,"".join(accessibility_result_json))
            if((len(accessibility_error_message)>0) and (not (accessibility_error_message in error_messages))):
                error_messages.append(accessibility_error_message)
            if(len(accessibility_error_message)==0):
                accessibility_results[result_api_type]=json.loads(accessibility_result)
    return accessibility_results,error_messages

def mergeAccessibilityResult(accessibility_results,result_iframe_locator=''):
    merged_accessibility_results={}
    main_key=''
    if('wave' in accessibility_results.keys()):
        main_key='wave'
    elif(len(accessibility_results.keys())>0):
        main_key=list(accessibility_results.keys())[0]
    if(len(main_key)>0):
        merged_accessibility_results=accessibility_results[main_key]
        del accessibility_results[main_key]
    for result_api_type,accessibility_result in accessibility_results.items():
        merged_accessibility_results=mergeAccessibilityResultStatistics('statistics',merged_accessibility_results,accessibility_result)
        merged_accessibility_results=mergeAccessibilityResultCategories('categories',merged_accessibility_results,accessibility_result,result_iframe_locator)
    return merged_accessibility_results

def mergeAccessibilityResultStatistics(accessibility_result_statistics_name,based_accessibility_result,new_accessibility_result):
    merged_accessibility_result=based_accessibility_result
    if((accessibility_result_statistics_name in based_accessibility_result) and (accessibility_result_statistics_name in new_accessibility_result)):
        merged_accessibility_result_category=merged_accessibility_result[accessibility_result_statistics_name]
        new_accessibility_result_category=new_accessibility_result[accessibility_result_statistics_name]
        for category_key,category_value in new_accessibility_result_category.items():
            new_category_value=category_value
            if(category_key in merged_accessibility_result_category.keys()):
                if((isinstance(new_category_value,str)) or (isinstance(merged_accessibility_result_category[category_key],str))):
                    continue
                old_category_value=merged_accessibility_result_category[category_key]
                new_category_value=old_category_value+category_value
                if(isinstance(new_category_value,float)):
                    new_category_value=round(new_category_value,2)
            merged_accessibility_result_category[category_key]=new_category_value
    return merged_accessibility_result

def mergeAccessibilityResultCategories(accessibility_result_categories_name,based_accessibility_result,new_accessibility_result,result_iframe_locator):
    merged_accessibility_result=based_accessibility_result
    if((accessibility_result_categories_name in based_accessibility_result) and (accessibility_result_categories_name in new_accessibility_result)):
        merged_accessibility_result_categories=merged_accessibility_result[accessibility_result_categories_name]
        new_accessibility_result_categories=new_accessibility_result[accessibility_result_categories_name]
        for new_accessibility_result_category_name,new_accessibility_result_category_value in new_accessibility_result_categories.items():
            if(new_accessibility_result_category_name in merged_accessibility_result_categories):
                merged_accessibility_result_category_value=merged_accessibility_result_categories[new_accessibility_result_category_name]
                new_accessibility_result_category_value=updateAccessibilityResultCategoryItemProperties(new_accessibility_result_category_value)
                merged_accessibility_result_category_value=mergeAccessibilityResultCategoryValue('count',merged_accessibility_result_category_value,new_accessibility_result_category_value)
                merged_accessibility_result_category_value=mergeAccessibilityResultCategoryValue('items',merged_accessibility_result_category_value,new_accessibility_result_category_value,result_iframe_locator)
    return merged_accessibility_result

def updateAccessibilityResultCategoryItemProperties(accessibility_result_category_value):
    new_accessibility_result_category_value=accessibility_result_category_value
    if('items' in new_accessibility_result_category_value):
        new_accessibility_result_category_items=new_accessibility_result_category_value['items']
        if(isinstance(new_accessibility_result_category_items,dict)):
            for new_accessibility_result_category_item_key,new_accessibility_result_category_item_value in new_accessibility_result_category_items.items():
                if(not ('id' in new_accessibility_result_category_item_value.keys())):
                    new_accessibility_result_category_item_value['id']=new_accessibility_result_category_item_key
                if('xpath' in new_accessibility_result_category_item_value.keys()):
                    new_accessibility_result_category_item_value['xpaths']=new_accessibility_result_category_item_value['xpath']
                    del new_accessibility_result_category_item_value['xpath']
                if('selector' in new_accessibility_result_category_item_value.keys()):
                    new_accessibility_result_category_item_value['selectors']=new_accessibility_result_category_item_value['selector']
                    del new_accessibility_result_category_item_value['selector']
                if('wcag' in new_accessibility_result_category_item_value.keys()):
                    del new_accessibility_result_category_item_value['wcag']
    return new_accessibility_result_category_value

def mergeAccessibilityResultCategoryValue(accessibility_result_category_value_name,based_accessibility_result_category_value,new_accessibility_result_category_value,result_iframe_locator=''):
    merged_accessibility_result_category_value=based_accessibility_result_category_value
    if(accessibility_result_category_value_name=='count'):
        old_category_value=0
        new_category_value=0
    elif(accessibility_result_category_value_name=='items'):
        old_category_value={}
        new_category_value={}
    if(accessibility_result_category_value_name in merged_accessibility_result_category_value.keys()):
        old_category_value=merged_accessibility_result_category_value[accessibility_result_category_value_name]
    if(accessibility_result_category_value_name in new_accessibility_result_category_value.keys()):
        new_category_value=new_accessibility_result_category_value[accessibility_result_category_value_name]
    if(accessibility_result_category_value_name=='count'):
        merged_accessibility_result_category_value[accessibility_result_category_value_name]=old_category_value+new_category_value
    elif(accessibility_result_category_value_name=='items'):
        old_category_value=dict(old_category_value)
        if(isinstance(new_category_value,dict)):
            for new_category_value_issue_name,new_category_value_issue_value in new_category_value.items():
                if(new_category_value_issue_name in old_category_value.keys()):
                    old_category_value[new_category_value_issue_name]=mergeAccessibilityResultCategoryIssueValue(old_category_value[new_category_value_issue_name],new_category_value_issue_value,result_iframe_locator)
                else:
                    old_category_value=dict(old_category_value,**new_category_value)
            merged_accessibility_result_category_value[accessibility_result_category_value_name]=old_category_value
    return merged_accessibility_result_category_value

def mergeAccessibilityResultCategoryIssueValue(old_category_value_issue_value,new_category_value_issue_value,result_iframe_locator):
    merged_accessibility_result_category_issue_value={}
    old_category_value_issue_locator,old_category_value_issue_location=getAccessibilityResultCategoryIssueLocationList(old_category_value_issue_value)
    new_category_value_issue_locator,new_category_value_issue_location=getAccessibilityResultCategoryIssueLocationList(new_category_value_issue_value,result_iframe_locator)
    if(len(new_category_value_issue_locator)>0):
        if(len(old_category_value_issue_locator)>0):
            old_category_value_issue_value[old_category_value_issue_locator]+=new_category_value_issue_location
        else:
            old_category_value_issue_value[new_category_value_issue_locator]=new_category_value_issue_location
        old_category_value_issue_value['count']=len(old_category_value_issue_value[new_category_value_issue_locator])
    merged_accessibility_result_category_issue_value=old_category_value_issue_value
    return merged_accessibility_result_category_issue_value

def getAccessibilityResultCategoryIssueLocationList(category_value_issue_value,result_iframe_locator=''):
    category_value_issue_locator='selectors'
    category_value_issue_location_list=[]
    if(not(category_value_issue_locator in category_value_issue_value.keys())):
        category_value_issue_locator='xpaths'
        if(not (category_value_issue_locator in category_value_issue_value.keys())):
            category_value_issue_locator=''
            return category_value_issue_locator,category_value_issue_location_list
    category_value_issue_location_list=category_value_issue_value[category_value_issue_locator]
    if(len(result_iframe_locator)>0):
        for i in range(len(category_value_issue_location_list)):
            category_value_issue_location_list[i]=result_iframe_locator+','+category_value_issue_location_list[i]
    return category_value_issue_locator,category_value_issue_location_list

def updateAccessibilityResultCategory(accessibility_result_categories):
    updated_accessibility_result_categories=accessibility_result_categories
    for old_category_name,category_value in accessibility_category_update_mapping.items():
        if(old_category_name in updated_accessibility_result_categories.keys()):
            accessibility_result_category=updated_accessibility_result_categories[old_category_name]
            for issue_id,new_category_name in category_value.items():
                if('items' in accessibility_result_category.keys()):
                    accessibility_result_category_items=accessibility_result_category['items']
                    if(issue_id in accessibility_result_category_items.keys()):
                        accessibility_result_category_issue=accessibility_result_category_items[issue_id]
                        if(not(new_category_name in updated_accessibility_result_categories.keys())):
                            updated_accessibility_result_categories[new_category_name]={"description":new_category_name,"count":0,"items":{}}
                        updated_accessibility_result_categories[new_category_name]['count']+=accessibility_result_category_issue['count']
                        if(len(updated_accessibility_result_categories[new_category_name]['items'])==0):
                            updated_accessibility_result_categories[new_category_name]['items']={}
                        updated_accessibility_result_categories[new_category_name]['items'][issue_id]=accessibility_result_category_issue
                        accessibility_result_category['count']-=accessibility_result_category_issue['count']
                        del accessibility_result_category_items[issue_id]
                        if(updated_accessibility_result_categories[old_category_name]['count']==0):
                            del updated_accessibility_result_categories[old_category_name]
    return updated_accessibility_result_categories

def loadsAccessibilityResultInfo(results,result_element_list):
    for i in range(len(results)):
        results[i]['url']=json.loads(results[i]['url'])
        results[i]['bug_info']={"bug_no":"","bug_href":""}
        result_json=results[i]['result']
        result_element_entry={}
        for result_element in result_element_list:
            result_url_uuid=result_element['uuid']
            if(result_url_uuid==results[i]['uuid']):
                result_element_entry=result_element
        if('categories' in result_json.keys()):
            result_json['categories']=updateAccessibilityResultCategory(result_json['categories'])
        result_json=updateAccessibilityResultJson(result_json,result_element_entry)
        results[i]['result']=result_json
    return results

def updateAccessibilityResultJson(result_json,result_element_entry):
    key='statistics'
    if((key in result_json.keys()) and (len(result_element_entry)>0) and (len(result_element_entry['page_name'])>0)):
        result_json[key]['pagetitle']=result_element_entry['page_name']
    key='categories'
    if(key in result_json.keys()):
        result_categories=result_json[key]
        to_remove_categories=[]
        for accessibility_category_key,accessibility_category_value in result_categories.items():
            if(accessibility_category_key in accessibility_categories.keys()):
                if((len(result_element_entry)>0) and (len(result_element_entry['accessibility_categories'])>0) and (not (accessibility_category_key.lower() in result_element_entry['accessibility_categories']))):
                    to_remove_categories.append(accessibility_category_key)
                    continue
                accessibility_category=accessibility_categories[accessibility_category_key]
                key='items'
                if(key in accessibility_category_value.keys()):
                    result_category_value_items=accessibility_category_value[key]
                    if(len(result_category_value_items)>0):
                        result_category_value_item_count=0
                        to_remove_items=[]
                        for result_category_value_item_key,result_category_value_item_value in result_category_value_items.items():
                            key='id'
                            if(key in result_category_value_item_value.keys()):
                                result_category_value_item_id=result_category_value_item_value[key]
                                element_locator='selectors'
                                if('xpaths' in result_category_value_item_value.keys()):
                                    element_locator='xpaths'
                                    result_category_value_item_value[element_locator]=getXpathIndexible(result_category_value_item_value[element_locator],'HTML')
                                if(len(result_element_entry)>0):
                                    element_locator=result_element_entry['element_locator'].lower()
                                to_remove_elements=[]
                                if((len(result_element_entry)>0) and (len(result_element_entry['elements'])>0)):
                                    if(element_locator in result_category_value_item_value.keys()):
                                        for element in result_category_value_item_value[element_locator]:
                                            if(not checkFilteredElement(element,result_element_entry['elements'])):
                                                to_remove_elements.append(element)
                                    else:
                                        print('invalid element_locator in filter:',element_locator)
                                temp_accessibility_category=[]
                                if(result_category_value_item_id in accessibility_category.keys()):
                                    temp_accessibility_category=accessibility_category
                                else:
                                    for accessibility_category_update_new_category_key,accessibility_category_update_category in accessibility_category_update_mapping.items():
                                        if(result_category_value_item_id in accessibility_category_update_category.keys()):
                                            accessibility_category_update_old_category_key=accessibility_category_update_category[result_category_value_item_id]
                                            if(accessibility_category_update_old_category_key==accessibility_category_key):
                                                temp_accessibility_category=accessibility_categories[accessibility_category_update_new_category_key]
                                if(len(temp_accessibility_category)>0):
                                    result_category_value_item_value['description']=temp_accessibility_category[result_category_value_item_id]['issue_description']
                                    result_category_value_item_value['api_type']=temp_accessibility_category[result_category_value_item_id]['api_type']
                                    result_category_value_item_value['guideline']=temp_accessibility_category[result_category_value_item_id]['guideline']
                                    result_category_value_item_value['conformance_level']=temp_accessibility_category[result_category_value_item_id]['conformance_level']
                                    result_category_value_item_value['guideline_reference_url']=join_folders([VTAAS_SERVER+':9003','document/accessibility/guideline',result_category_value_item_id+'.html'])
                                else:
                                    undefined_str='undefined'
                                    result_category_value_item_value['api_type']=undefined_str
                                    result_category_value_item_value['guideline']=undefined_str
                                    result_category_value_item_value['conformance_level']=undefined_str
                                    result_category_value_item_value['guideline_reference_url']=undefined_str
                            if(element_locator in result_category_value_item_value.keys()):
                                result_category_value_item_value[element_locator]=getIteratablesRemoved(result_category_value_item_value[element_locator],to_remove_elements)
                                result_category_value_item_value['count']=len(result_category_value_item_value[element_locator])
                            else:
                                result_category_value_item_value[element_locator]=[]
                            result_category_value_item_count+=result_category_value_item_value['count']
                            if(result_category_value_item_value['count']==0):
                                to_remove_items.append(result_category_value_item_key)
                        result_category_value_items=getIteratablesRemoved(result_category_value_items,to_remove_items)
                        accessibility_category_value['count']=result_category_value_item_count
                    if(accessibility_category_value['count']==0):
                        to_remove_categories.append(accessibility_category_key)
        result_categories=getIteratablesRemoved(result_categories,to_remove_categories)
    return result_json

def getXpathIndexible(element_list,indexible_element):
    element_uppercase='/'+indexible_element.upper()
    element_lowercase='/'+indexible_element.lower()
    new_element_list=[]
    for element in element_list:
        new_element_list.append(element.replace(element_uppercase+'/',element_uppercase+'[1]/').replace(element_lowercase+'/',element_lowercase+'[1]/'))
    return new_element_list

def checkFilteredElement(element,result_elements):
    filtered_element_flag=False
    for elmt in result_elements:
        filtered_element_flag=element.strip().lower().startswith(elmt.strip().lower())
        if(filtered_element_flag):
            break
    return filtered_element_flag

def getIteratablesRemoved(raw_iteratables,to_remove_iteratables):
    if(type(raw_iteratables)==list):
        for to_remove_iteratable_value in to_remove_iteratables:
            if(to_remove_iteratable_value in raw_iteratables):
                raw_iteratables.remove(to_remove_iteratable_value)
    elif(type(raw_iteratables)==dict):
        for to_remove_iteratable_key in to_remove_iteratables:
            if(to_remove_iteratable_key in raw_iteratables.keys()):
                raw_iteratables.pop(to_remove_iteratable_key)
    return raw_iteratables

def handleAccessibilityFailedResult(result_api_type,accessibility_result):
    error_message=''
    if(result_api_type=='wave'):
        if(len(accessibility_result)>0):
            try:
                accessibility_result=replace_json_double_quote(accessibility_result)
                accessibility_result_json=json.loads(accessibility_result)
            except json.decoder.JSONDecodeError as e:
                accessibility_error_type,accessibility_error_message=getAccessibilityError(accessibility_result)
                if(accessibility_error_type==0):
                    error_message='an invlid json from '+result_api_type+': \''+str(e).replace('\',\'','')+'\''
                    print(error_message)
                elif(accessibility_error_type==1):
                    failed_result_list=eval(result.replace('}{','},{'))
                    for failed_result in failed_result_list:
                        if('error' in failed_result.keys()):
                            error_message+=failed_result['error']
                    error_message=error_message.replace('\n','').replace('\r','')
                else:
                    error_message=accessibility_error_message
                accessibility_result=json.dumps({"success":"False","error":error_message})
    elif(result_api_type=='crest'):
        try:
            accessibility_result_json=json.loads(accessibility_result)
        except json.decoder.JSONDecodeError as e:
            error_message='an invlid json from '+result_api_type+': \''+str(e).replace('\',\'','')+'\''
            print(error_message)
    return accessibility_result,error_message

def getAccessibilityError(accessibility_result):
    error_type=0
    error_message=''
    for accessibility_error_type,accessibility_error_message in accessibility_error_mapping.items():
        if(accessibility_result.find(accessibility_error_message)>=0):
            error_type=accessibility_error_type
            error_message={'accessibility_error_pattern':{accessibility_error_type:accessibility_error_message},"accessibility_error_message":json.dumps(accessibility_result)}
            break
    return error_type,error_message

def handleAccessibilityFailedResult(result_api_type,accessibility_result):
    error_message=''
    if(result_api_type=='wave'):
        if(len(accessibility_result)>0):
            try:
                accessibility_result=replace_json_double_quote(accessibility_result)
                accessibility_result_json=json.loads(accessibility_result)
            except json.decoder.JSONDecodeError as e:
                accessibility_error_type,accessibility_error_message=getAccessibilityError(accessibility_result)
                if(accessibility_error_type==0):
                    error_message='an invlid json from '+result_api_type+': \''+str(e).replace('\',\'','')+'\''
                    print(error_message)
                elif(accessibility_error_type==1):
                    failed_result_list=eval(result.replace('}{','},{'))
                    for failed_result in failed_result_list:
                        if('error' in failed_result.keys()):
                            error_message+=failed_result['error']
                    error_message=error_message.replace('\n','').replace('\r','')
                else:
                    error_message=accessibility_error_message
                accessibility_result=json.dumps({"success":"False","error":error_message})
    elif(result_api_type=='crest'):
        try:
            accessibility_result_json=json.loads(accessibility_result)
        except json.decoder.JSONDecodeError as e:
            error_message='an invlid json from '+result_api_type+': \''+str(e).replace('\',\'','')+'\''
            print(error_message)
    return accessibility_result,error_message

def getAccessibilityError(result_api_type,accessibility_result):
    error_type=0
    error_message=''
    for accessibility_error_type,accessibility_error_message in accessibility_error_mapping.items():
        if(accessibility_result.find(accessibility_error_message)>=0):
            error_type=accessibility_error_type
            error_message={'accessibility_api_type':result_api_type,'accessibility_error_pattern':{accessibility_error_type:accessibility_error_message},"accessibility_error_message":json.dumps(accessibility_result)}
            break
    return error_type,error_message

def handlePassedResult(result):
    error_type=1
    if(len(result)>0):
        try:
            result_json=json.loads(result)
        except json.decoder.JSONDecodeError as e:
            passed_result_list=result.replace('}{','},,,,{').split(',,,,')
            for passed_result in passed_result_list:
                if(passed_result.find(accessibility_expected_success)>=0):
                    result=passed_result
                    error_type=0
                    break
                else:
                    continue
    return error_type,result

def populateResult(result_utility_type,console_uuid,console_create_day,report_json_str,error_message):
    accessibility_report_full_path=getAccessibilityReportFullPath(result_utility_type,join_folders([console_create_day,console_uuid]))
    print('Populating accessibility test report ...')
    if(result_utility_type=='internal'):
        copy_folder('./result/accessibilityreports',accessibility_report_full_path.replace('accessibilityreports',''))
        accessibility_report_index_html_name=join_folders([accessibility_report_full_path,'index.html'])
        while(not os.path.exists(accessibility_report_index_html_name)):
            print('waiting for',accessibility_report_index_html_name)
            time.sleep(1)
    accessibility_report_json_name=getAccessibilityReportJsonFile(accessibility_report_full_path)
    print('Writing',accessibility_report_json_name)
    write_file(accessibility_report_json_name,report_json_str,'w')
    return error_message
# Copyright 2022 VMware, Inc.
# SPDX-License-Identifier: MIT

accessibility_result_api_types=['wave','crest']
accessibility_result_utility_types=['internal','opensource']

# a11y_task_default
accessibility_task_url_details_default = {
            "uuid": None,
            "user": None,
            "result_type": None,
            "screenshot_uid": None,
            "url": {
                "original_url": None,
                "url_to_accessibility": None
            },
            "result": None,
            "create_time": None,
            "last_update": None
        }
accessibility_task_test_default = {
            "test_name": "a11y-visual-report",
            "product": "a11y-visual-report",
            "console_id": 0,
            "suite_uuid": None,
            "result_test_id": 0,
            "result_test_run_id": 0,
            "result_script_id": 0,
            "result_script_run_id": 0,
            "test_type": "e2e_library",
            "test_email": False,
            "VTAAS_SERVER": "http://www.accessibility-visual-report.com",
            "suite_name": "Crest"
        }
accessibility_task_url_json_default = {
            "result": "",
            "done": False,
            "message": "fail",
            "error_code": -1,
            "error_message": "",
            "timestamp": None,
            "last_update": None
        }
accessibility_task_url_element_list_default={
            "wave_categories": ["error"], 
            "element_locator": "selectors", 
            "elements": [],
            "issue_items_filter_type": "include", 
            "issue_items": []
        }

accessibility_task_url_default = {
            "url": None,
            "original_url": None,
            "result": "",
            "result_json": {},
            "element_list": accessibility_task_url_element_list_default,
            "uuid": None,
            "done": False,
            "timestamp": None,
            "last_update": None,
            "page_name": "",
            "parent_uuid": "NA",
            "iframe_list": []
        }
accessibility_task_detail_default = {
            "done": False,
            "result": "",
            "notified": False,
            "report": None,
            "result_api_types": [
                "crest",
                "wave"
            ],
            "result_screenshot_uid": None,
            "lastUrlAt": None,
            "retry": 0,
            "batch_done": 0,
            "urls_done": 0,
            "urls_len": 0,
            "console_createtime": None,
            "result_json": None,
            "result_json_done": False
        }
accessibility_task_default = {
            "id": 0,
            "uuid": None,
            "user": "a11y-visual-report",
            "create_time": None,
            "last_update": None,
            "softdeleted": False,
            "task_test": accessibility_task_test_default,
            "task_urls": [],
            "task_prescript": "",
            "task_detail": accessibility_task_detail_default,
            "task_status": "task_new"
        }

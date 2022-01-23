# Copyright 2022 VMware, Inc.
# SPDX-License-Identifier: MIT

import os

A11Y_SERVERS = {
    "wave": False,
    "crest": False
}
# Sample: www.accessibility-visual-report.com
# if below server is OK, update "wave" to be True
WAVE_SERVER='http://www.accessibility-visual-report.com:8080'
WAVE_API_KEY='ToBeSpecified'
# if below server is OK, update "crest" to be True
CREST_SERVER='http://www.accessibility-visual-report.com:8082'

CREST_APIS={"all":"crest/api/all","audio_video":"crest/api/perceivable/cc-transcript","heading_analysis":"crest/api/operable/heading-analysis","keyboard_focus":"crest/api/perceivable/keyboard-focus-indicator","test_me":"crest/testMePage"}

VTAAS_ROOT='../frontend/src/assets'
ACCESSIBILITY_ROOT=os.path.join(VTAAS_ROOT,'accessibility')
ACCESSIBILITY_STORAGE_ROOT=os.path.join(ACCESSIBILITY_ROOT,'raw')
TASK_STORAGE_ROOT=os.path.join(ACCESSIBILITY_ROOT,'task')
REPORT_STORAGE_ROOT=os.path.join(ACCESSIBILITY_ROOT,'report')

RESULT_UTILITY_TYPE='opensource'
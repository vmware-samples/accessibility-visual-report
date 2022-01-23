# Copyright 2022 VMware, Inc.
# SPDX-License-Identifier: MIT

import os

settings_module=os.environ.get("DJANGO_SETTINGS_MODULE","")
if(settings_module.find('opensource')>0):
    from .opensource import *
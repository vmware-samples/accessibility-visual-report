# Copyright 2022 VMware, Inc.
# SPDX-License-Identifier: MIT

#!/usr/bin/env python
import os
import sys

if __name__=="__main__":
    os.environ.setdefault("DJANGO_SETTINGS_MODULE","accessibility.settings.opensource")
    from django.core.management import execute_from_command_line
    execute_from_command_line(sys.argv)
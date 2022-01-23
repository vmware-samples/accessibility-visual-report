# Copyright 2022 VMware, Inc.
# SPDX-License-Identifier: MIT

import os
from django.core.wsgi import get_wsgi_application

os.environ.setdefault("DJANGO_SETTINGS_MODULE","accessibility.settings")
application=get_wsgi_application()
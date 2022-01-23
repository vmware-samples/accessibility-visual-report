# Copyright 2022 VMware, Inc.
# SPDX-License-Identifier: MIT

# from django.conf.urls import include,url
from django.urls import include, re_path
from django.views.generic.base import RedirectView

from . import settings

from result.urls import result_patterns

urlpatterns=[
    re_path(r'^result/',include(result_patterns)),
    re_path(r'^api-auth/',include('rest_framework.urls',namespace='rest_framework'))
]
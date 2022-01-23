# Copyright 2022 VMware, Inc.
# SPDX-License-Identifier: MIT

# from django.conf.urls import url
from django.urls import include, re_path
from rest_framework.urlpatterns import format_suffix_patterns

from . import views

result_patterns=[
    re_path(r'^get_page/$',views.get_page),
    re_path(r'^get_page/(?P<page_url>[\w\.:/%]+)$',views.get_page),
    re_path(r'^a11y_task/$',views.a11y_task),
    re_path(r'^a11y_task/(?P<task_id>[\w\.]+)/(?P<task_report>[\w\.]+|)$',views.a11y_task),
    re_path(r'^post_to_accessibility/$',views.post_to_accessibility),
    re_path(r'^get_accessibility_result/$',views.get_accessibility_result)
]
result_patterns=format_suffix_patterns(result_patterns)
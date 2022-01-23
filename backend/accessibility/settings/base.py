# Copyright 2022 VMware, Inc.
# SPDX-License-Identifier: MIT

import os

from .config import *

SECRET_KEY='rp7%@_u*)l#*tqz2k++b1pmb7_&xq-u*h(g*&o8)dw$n%4bv1%'
ROOT_URLCONF='accessibility.urls'
WSGI_APPLICATION='accessibility.wsgi.application'
CORS_ORIGIN_ALLOW_ALL=True
CORS_ALLOW_CREDENTIALS=False
ALLOWED_HOSTS=['*']
LANGUAGE_CODE='en-us'
TIME_ZONE='UTC'
DEBUG=True
USE_I18N=True
USE_L10N=True
STATIC_URL='/static/'
BASE_DIR=os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BASE_DIR=os.path.dirname(BASE_DIR)

INSTALLED_APPS=[
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'corsheaders',
    'result'
]
TEMPLATES=[
    {
        'BACKEND':'django.template.backends.django.DjangoTemplates',
        'DIRS':[os.path.join(BASE_DIR,'templates')],
        'APP_DIRS':True,
        'OPTIONS':{
            'context_processors':[
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages'
            ],
        },
    }
]
MIDDLEWARE=[
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'corsheaders.middleware.CorsMiddleware'
]
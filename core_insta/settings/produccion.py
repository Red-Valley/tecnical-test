from .base import *

SECRET_KEY = '4cst-854412f0jq(#+o-$rtq_8w9kgrij0j42s@1poikl1$vnq'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = ['*']

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'd1dlmccrg8mh8i',
        'USER': 'oqgmqerzkhsupy',
        'PASSWORD': '3c1693a6f21b97a2786905039f23dec24ed43d4c68bd4de83ddd220335709519',
        'HOST': 'ec2-34-225-66-116.compute-1.amazonaws.com',
        'PORT': 5432,
    }
}

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/3.1/howto/static-files/

STATIC_URL = '/static/'
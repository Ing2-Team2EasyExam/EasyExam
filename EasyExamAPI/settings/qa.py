from .base import *
import dj_database_url
import django_heroku

DEBUG = False
DATABASES = {"default": dj_database_url.config()}
# rest framework stuff
REST_FRAMEWORK["DEFAULT_RENDERER_CLASSES"] = ("rest_framework.renderers.JSONRenderer",)
"""
EMAIL_BACKEND = "django.core.mail.backends.smtp.EmailBackend"
EMAIL_HOST = ""  # TODO: Complete with the host
EMAIL_PORT = 587
EMAIL_HOST_USER = get_env_variable("EMAIL_HOST_USER")
EMAIL_HOST_PASSWORD = get_env_variable("EMAIL_HOST_PASSWORD")
EMAIL_USE_TLS = True
"""

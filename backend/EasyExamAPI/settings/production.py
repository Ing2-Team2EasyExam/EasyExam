from .base import *

DEBUG = False
DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql_psycopg2",
        "NAME": get_env_variable("DATABASE_NAME"),
        "USER": get_env_variable("DATABASE_USER"),
        "PASSWORD": get_env_variable("DATABASE_PASSWORD"),
        "HOST": "",
        "PORT": "",  # TODO: Complete with the data on production
    }
}

EMAIL_BACKEND = "django.core.mail.backends.smtp.EmailBackend"
EMAIL_HOST = ""  # TODO: Complete with the host
EMAIL_PORT = 587
EMAIL_HOST_USER = get_env_variable("EMAIL_HOST_USER")
EMAIL_HOST_PASSWORD = get_env_variable("EMAIL_HOST_PASSWORD")
EMAIL_USE_TLS = True

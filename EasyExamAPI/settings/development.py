from .base import *

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql",
        "NAME": get_env_variable("POSTGRES_DB", "postgres"),
        "USER": get_env_variable("POSTGRES_USER", "postgres"),
        "PASSWORD": get_env_variable("POSTGRES_PASSWORD", "postgres"),
        "HOST": get_env_variable("POSTGRES_HOST", "db"),
        "PORT": 5432,
    }
}

EMAIL_BACKEND = (
    "django.core.mail.backends.console.EmailBackend"
)  # Not sending emails on local development :)

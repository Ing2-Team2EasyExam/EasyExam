from .base import *
import dj_database_url
import django_heroku

ALLOWED_HOSTS = ["localhost", "127.0.0.1", "easyexam-qa.herokuapp.com"]
DEBUG = True
DATABASE_URL = os.environ.get("DATABASE_URL")
db_from_env = dj_database_url.config(
    default=DATABASE_URL, conn_max_age=500, ssl_require=True
)
DATABASES["default"].update(db_from_env)
# rest framework stuff
REST_FRAMEWORK["DEFAULT_RENDERER_CLASSES"] = ("rest_framework.renderers.JSONRenderer",)

EMAIL_BACKEND = "django.core.mail.backends.smtp.EmailBackend"
EMAIL_HOST = "smtp.gmail.com"
EMAIL_PORT = 587
EMAIL_HOST_USER = "examensencillo@gmail.com"
EMAIL_HOST_PASSWORD = "EasyExamMail"
EMAIL_USE_TLS = True


STATIC_ROOT = os.path.join(BASE_DIR, "staticfiles")
STATICFILES_STORAGE = "whitenoise.storage.CompressedManifestStaticFilesStorage"

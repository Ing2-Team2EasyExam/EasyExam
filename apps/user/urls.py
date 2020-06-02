from django.urls import path
from rest_framework_jwt.views import (
    obtain_jwt_token,
    refresh_jwt_token,
    verify_jwt_token,
)

from apps.user import views

urlpatterns = [path("login/", views.LoginView.as_view(), name="login")]

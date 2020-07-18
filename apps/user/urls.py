from django.urls import path
from rest_framework_jwt.views import (
    obtain_jwt_token,
    refresh_jwt_token,
    verify_jwt_token,
)

from apps.user import views

urlpatterns = [
    path("login/", views.LoginView.as_view(), name="login"),
    path("logout/", views.LogoutView.as_view(), name="logout"),
    path("account/", views.UserAccountView.as_view(), name="account"),
    path(
        "account/change-password/",
        views.ChangePasswordView.as_view(),
        name="change-password",
    ),
    path(
        "reset-password/",
        views.SendResetPasswordEmailView.as_view(),
        name="reset-password",
    ),
]

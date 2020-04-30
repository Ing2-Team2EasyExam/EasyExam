from django.urls import path
from rest_framework_jwt.views import (
    obtain_jwt_token,
    refresh_jwt_token,
    verify_jwt_token,
)

from user.views import UserDetail, UserCreate, ChangePassword, TransactionList

urlpatterns = [
    path("users/", UserCreate.as_view(), name="user-create"),
    path("users/me/", UserDetail.as_view(), name="user-detail"),
    path("users/me/change-password/", ChangePassword.as_view(), name="change-password"),
    path("jwt-token-auth/", obtain_jwt_token, name="jwt-token-auth"),
    path("jwt-token-refresh/", refresh_jwt_token, name="jwt-token-refresh"),
    path("jwt-token-verify", verify_jwt_token, name="jwt-token-verify"),
    path("users/me/transactions/", TransactionList.as_view(), name="user-list"),
]

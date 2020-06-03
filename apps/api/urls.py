from django.urls import path, include

urlpatterns = [
    path("users/", include("apps.user.urls")),
    path("", include("apps.exam.urls")),
]

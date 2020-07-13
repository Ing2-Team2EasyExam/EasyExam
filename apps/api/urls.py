from django.urls import path, include
from .views import HealthCheckView

urlpatterns = [
    path("users/", include("apps.user.urls")),
    path("", include("apps.exam.urls")),
    path("health/", HealthCheckView.as_view(), name="health-check"),
]

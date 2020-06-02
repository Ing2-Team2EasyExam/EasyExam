from django.urls import path
from . import views

urlpatterns = [path("", views.FrontendIndexView.as_view(), name="frontend-index")]

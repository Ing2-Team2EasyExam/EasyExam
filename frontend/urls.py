from django.urls import path
from . import views

urlpatterns = [
    path("", views.FrontendIndexView.as_view(), name="frontend-index"),
    path("logged_in/", views.FrontendIndexView.as_view(), name="fronted-logged-in"),
]

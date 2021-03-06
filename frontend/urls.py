from django.urls import path
from . import views

urlpatterns = [
    path("", views.FrontEndRendererView.as_view(), name="frontend-index"),
    path("logged_in/", views.FrontEndRendererView.as_view(), name="frontend-logged-in"),
    path("home/", views.FrontEndRendererView.as_view(), name="frontend-home"),
    path(
        "problems/", views.FrontEndRendererView.as_view(), name="frontend-problem-list"
    ),
    path(
        "exam/create", views.FrontEndRendererView.as_view(), name="frontend-exam-create"
    ),
    path(
        "problems/create",
        views.FrontEndRendererView.as_view(),
        name="frontend-exam-create",
    ),
    path(
        "exam/edit/<uuid:uuid>/",
        views.FrontEndRendererView.as_view(),
        name="frontend-exam-edit",
    ),
    path(
        "problems/edit/<uuid:uuid>/",
        views.FrontEndRendererView.as_view(),
        name="frontend-problems-edit",
    ),
    path("profile/", views.FrontEndRendererView.as_view(), name="profile"),
    path(
        "profile/change-password",
        views.FrontEndRendererView.as_view(),
        name="change-password",
    ),
    path(
        "reset_password/",
        views.FrontEndRendererView.as_view(),
        name="frontend-reset-password",
    ),
]

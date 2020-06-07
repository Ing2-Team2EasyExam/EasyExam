from django.urls import path
from . import views

urlpatterns = [
    path("", views.FrontEndRendererView.as_view(), name="frontend-index"),
<<<<<<< HEAD
    path("logged_in/", views.FrontEndRendererView.as_view(), name="frontend-logged-in"),
    path("home/", views.FrontEndRendererView.as_view(), name="frontend-home"),
=======
    path("logged_in/", views.FrontEndRendererView.as_view(), name="fronted-logged-in"),
    path("problems/", views.FrontEndRendererView.as_view(), name="frontend-problem-list"),
>>>>>>> feat(frontend): Create Problema Component
]

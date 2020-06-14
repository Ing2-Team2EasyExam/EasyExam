from django.urls import path
from . import views

urlpatterns = [
    path("", views.FrontEndRendererView.as_view(), name="frontend-index"),
    path("logged_in/", views.FrontEndRendererView.as_view(), name="frontend-logged-in"),
<<<<<<< HEAD
    path("home/", views.FrontEndRendererView.as_view(), name="frontend-home"),
    path(
        "problems/", views.FrontEndRendererView.as_view(), name="frontend-problem-list"
    ),
    path(
        "exam/create", views.FrontEndRendererView.as_view(), name="frontend-exam-create"
    ),
=======
    path("preguntas/", views.FrontEndRendererView.as_view(), name="frontend-questions"),
>>>>>>> Cambio en urls
]

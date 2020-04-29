from django.urls import path, include

urlpatterns = [
    path('', include('user.urls')),
    path('', include('exam.urls')),
    path('', include('challenge.urls')),
]

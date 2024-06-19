from . import views
from django.urls import path

urlpatterns = [
    path("comments_ollama_analysis", views.comments_ollama_analysis),
]

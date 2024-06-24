from . import views
from django.urls import path

urlpatterns = [
    path("comments_detail_sentiment_ollama", views.comments_detail_sentiment_ollama),
    path("comments_count_sentiment_ollama", views.comments_count_sentiment_ollama),
]

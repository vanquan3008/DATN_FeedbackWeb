from . import views
from django.urls import path

urlpatterns = [
    path("craw_data",views.craw_data),
    path("comments_detail_sentiment_ollama", views.comments_detail_sentiment_ollama,name="page"),
    path("comments_count_sentiment_ollama", views.comments_count_sentiment_ollama),
]

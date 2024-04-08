from . import views
from django.urls import path

urlpatterns = [
    path("text_sentiment", views.sentiment_analysis),
]

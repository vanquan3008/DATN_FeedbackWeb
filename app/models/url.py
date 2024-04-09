from . import views
from django.urls import path

urlpatterns = [
    path("text_sentiment", views.sentiment_analysis),
    path("json_file_sentiment", views.sentiment_file_json_analysis),
    path("csv_file_sentiment", views.sentiment_file_csv_analysis),
]

from . import views
from django.urls import path

urlpatterns = [
    path("response_attitude", views.test_model_attitude),
    path("response_emotion", views.test_model_emotion),
    path("response_score_sentiment", views.test_score_sentiment),
]

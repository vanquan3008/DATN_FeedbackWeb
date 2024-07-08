from . import views
from django.urls import path

urlpatterns = [
    path("response_attitude", views.test_model_attitude),
    path("response_emotion", views.test_model_emotion),
    path("response_score_sentiment", views.test_score_sentiment),
    path("response_baseaspects", views.test_sentiment_basedaspect_level),
    ################################################################
    path("implicit_sentiment", views.test_implicit_sentiment_model),
    path("hate_detection", views.test_hate_detect_model),
    path("offensive_detection", views.test_offensive_detection_model),
    path("irony_detection", views.test_detect_irony_model),
    path("emotion_recognition", views.test_emotion_recognition_model),
    path("analyze_summary_to_report", views.test_analyze_summary_to_report),
]

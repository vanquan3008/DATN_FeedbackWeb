from . import views
from django.urls import path

urlpatterns = [
    path("response_attitude", views.test_model_attitude),
    path("response_emotion", views.test_model_emotion),
    path("response_baseaspects", views.sentiment_text_details),
]

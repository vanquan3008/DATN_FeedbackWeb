from . import views
from django.urls import path

urlpatterns = [
    path("get_list_history_sentiment/", views.get_list_history_sentiment, name="page"),
]


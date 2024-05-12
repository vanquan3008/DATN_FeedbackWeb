from . import views
from django.urls import path

urlpatterns = [
    path("get_list_history_sentiment/", views.get_list_history_sentiment, name="page"),
    path("delete_text_history/<int:text_id>", views.delete_text_history, name="text_id"),
]


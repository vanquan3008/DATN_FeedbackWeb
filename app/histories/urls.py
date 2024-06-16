from . import views
from django.urls import path

urlpatterns = [
    path("get_list_history_sentiment/", views.get_list_history_sentiment, name="page"),
    path(
        "get_list_file_history_sentiment/",
        views.get_list_file_history_sentiment,
        name="page",
    ),
    path(
        "delete_text_history/<int:text_id>", views.delete_text_history, name="text_id"
    ),
    path(
        "delete_file_history/<int:file_id>",
        views.delete_file_history,
        name="delete_file_history",
    ),
]

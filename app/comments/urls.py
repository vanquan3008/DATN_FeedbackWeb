from . import views
from django.urls import path

urlpatterns = [
    path("create_comment_post", views.create_comment_post),
    path("get_sentiment_comments_on_post", views.static_all_comments_on_post),
    path("get_all_comments_on_post", views.get_all_comments_on_post),
]

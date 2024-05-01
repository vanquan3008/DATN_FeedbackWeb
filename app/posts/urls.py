from . import views
from django.urls import path

urlpatterns = [
    path("create_port", views.create_post),
    path("json_analysis", views.analyze_json_file),
    path("csv_analysis", views.analyze_csv_file),
    path("text_analysis", views.analyze_text),
    path("txt_analysis", views.analyze_txt_file),
    path("create_post", views.create_post),
    # path("post_comment_to_status", views.post_comment_to_status),
    path("get_all_post_by_userid", views.get_all_post_by_userid),
    path("get_all_post", views.get_all_post),
    path("delete_post", views.delete_post),
    # Comment
    # path("get_all_comments_on_post", views.get_all_comments_on_post),
    path("get_sentiment_comments_on_post", views.static_all_comments_on_post),
    path("get_list_history_sentiment/", views.get_list_history_sentiment , name='page'),
    # Based-aspect level
    path("text_detail_analysis", views.analyze_detail_text),
]

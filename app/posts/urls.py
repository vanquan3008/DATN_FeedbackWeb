from . import views
from django.urls import path

urlpatterns = [
    path("create_port", views.create_post),
    path("json_analysis", views.analyze_json_file),
    path("json_detail_analysis", views.analyze_json_detail_sentiment_file ,name="page"),
    path("csv_analysis", views.analyze_csv_file),
    path("csv_detail_analysis", views.analyze_csv_detail_sentiment_file , name="page"),
    path("text_analysis", views.analyze_text),
    path("txt_analysis", views.analyze_txt_file),
    path("txt_detail_analysis", views.analyze_txt_detail_sentiment_file ,name="page"),
    path("create_post", views.create_post),
    path("get_all_post_by_userid", views.get_all_post_by_userid),
    path("get_all_post", views.get_all_post),
    path("delete_post", views.delete_post),
    # Comment
    path("get_sentiment_comments_on_post", views.static_all_comments_on_post),
    # Based-aspect level
    path("text_detail_analysis", views.analyze_detail_text),
]

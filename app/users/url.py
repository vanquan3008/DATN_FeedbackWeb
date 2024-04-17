from . import views
from django.urls import path

urlpatterns = [
    path("signup", views.signup),
    path("signin", views.signin),
    path("logout", views.logout),
    path("json_analysis", views.analyze_json_file),
    path("csv_analysis", views.analyze_csv_file),
    path("text_analysis", views.analyze_text),
    path("txt_analysis", views.analyze_txt_file),
    path("post_status", views.post_status),
    path("post_comment_to_status", views.post_comment_to_status),
    path("get_all_post", views.get_all_post),
    path("get_all_comments_on_post", views.get_all_comments_on_post),
]

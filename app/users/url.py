from . import views
from django.urls import path

urlpatterns = [
    path("signup", views.signup),
    path("signin", views.signin),
    path("logout", views.logout),
    path("get_all_user", views.get_all_user),
    path("json_analysis", views.analyze_json_file),
    path("csv_analysis", views.analyze_csv_file),
    path("text_analysis", views.analyze_text),
    # Post
    path("create_post", views.create_post),
    path("post_comment_to_status", views.post_comment_to_status),
    path("get_all_post_by_userid", views.get_all_post_by_userid),
    path("get_all_post", views.get_all_post),
    #Comment
    path("get_all_comments_on_post", views.get_all_comments_on_post),
]

from . import views
from django.urls import path

urlpatterns = [
    path("comments_shopee_analysis", views.comments_shopee_analysis),
    path("comments_lazada_analysis", views.comments_lazada_analysis),
    path("comments_tiki_analysis", views.comments_tiki_analysis),
]

# Create your views here.
from django.contrib import admin
from django.urls import path, include
from . import views

urlpatterns = [
    path("page1", views.get_page1),
    path("page2", views.get_page1),
    path("page3", views.get_page1),
    path("page4", views.get_page1),
    path("page5", views.get_page1),
]

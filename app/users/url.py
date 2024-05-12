from . import views
from django.urls import path

urlpatterns = [
    path("signup", views.signup),
    path("signin", views.signin),
    path("logout", views.logout),
    path("get_all_user", views.get_all_user),
    path("refreshtoken", views.refresh_token),
]

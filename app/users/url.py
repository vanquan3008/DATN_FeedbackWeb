from . import views
from django.urls import path

urlpatterns = [
    path("signup", views.signup),
    path("signin", views.signin),
    path("logout", views.logout),
    path("json_analysis", views.analyze_json_file),
    path("csv_analysis", views.analyze_csv_file),
]

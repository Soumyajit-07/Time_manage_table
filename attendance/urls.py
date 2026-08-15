from django.urls import path
from . import views

urlpatterns = [
    path("dashboard/", views.dashboard, name="dashboard"),
    path("check-in/", views.check_in, name="check_in"),
    path("lunch-out/", views.lunch_out, name="lunch_out"),
    path("lunch-in/", views.lunch_in, name="lunch_in"),
    path("check-out/", views.check_out, name="check_out"),
]
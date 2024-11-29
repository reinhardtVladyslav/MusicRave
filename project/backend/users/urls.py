from django.urls import path

from .views import *

app_name = "users"
urlpatterns = [
    path("register/", register, name="register"),
    path("login/", log_in, name="login"),
    path("logout/", log_out, name="logout"),
    path("update/", update_user, name="update"),
    path("<int:user_id>/tracks/", UserTracksListView.as_view(), name="user_tracks"),
    path("<int:user_id>/albums/", UserAlbumsListView.as_view(), name="user_albums"),
]

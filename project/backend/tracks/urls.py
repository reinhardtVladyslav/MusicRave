from django.urls import path

from .views import *

app_name = "tracks"
urlpatterns = [
    path("", TrackListView.as_view(), name="show_tracks"),
    path("add/", add_track, name="add_track"),
]

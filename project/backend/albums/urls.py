from django.urls import path
from .views import *

app_name = "albums"
urlpatterns = [
    path("", AlbumListView.as_view(), name="show_albums"),
    path("create/", create_album, name="create_album"),
]

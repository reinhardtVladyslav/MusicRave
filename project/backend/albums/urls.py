from django.urls import path
from .views import *

app_name = "albums"
urlpatterns = [
    path("", AlbumListAPIView.as_view(), name="show_albums"),
    path("create/", CreateAlbumAPIView.as_view(), name="create_album"),
]

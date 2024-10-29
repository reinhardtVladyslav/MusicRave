from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import *


router = DefaultRouter()
router.register(r"tracks", TrackViewSet)

urlpatterns = [
    path("api/", include(router.urls)),
    path("api/albums/", AlbumList.as_view()),
    path("api/create_track/", create_track),
]

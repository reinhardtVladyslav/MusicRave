from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path("user/", include("user.urls")),
    path("", include("home.urls")),
    path("tracks/", include("track.urls")),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

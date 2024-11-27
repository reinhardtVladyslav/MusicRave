from .models import Album
from django.db.models import Count
from .serializers import AlbumSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import JsonResponse


class AlbumListAPIView(APIView):
    def get(self, request):
        albums = Album.objects.annotate(track_count=Count("tracks"))
        serializer = AlbumSerializer(albums, many=True)
        return Response({"albums": serializer.data})


def create_album(request):
    if not request.user.is_authenticated:
        return JsonResponse({"error": "User not authenticated"}, status=401)

    title = request.POST.get("title")
    description = request.POST.get("description")
    if not title or not description or "cover_image" not in request.FILES:
        return JsonResponse(
            {"error": "Title, description, and cover image are required"}, status=400
        )
    cover_image = request.FILES["cover_image"]

    try:
        album = Album.objects.create(
            name=title,
            description=description,
            cover_image=cover_image,
            user=request.user,
        )

        return JsonResponse(
            {
                "success": True,
                "album": {
                    "id": album.id,
                    "name": album.name,
                    "description": album.description,
                    "cover_image": album.cover_image.url,
                    "user": album.user.id,
                },
            }
        )
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)

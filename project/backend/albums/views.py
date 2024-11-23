from .models import Album
from django.db.models import Count
from .serializers import AlbumSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.status import HTTP_400_BAD_REQUEST, HTTP_201_CREATED
from rest_framework.permissions import IsAuthenticated


class AlbumListAPIView(APIView):
    def get(self, request):
        albums = Album.objects.annotate(track_count=Count("tracks"))
        serializer = AlbumSerializer(albums, many=True)
        return Response({"albums": serializer.data})


class CreateAlbumAPIView(APIView):
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request):
        title = request.data.get("title")
        description = request.data.get("description")
        cover_image = request.FILES.get("cover_image")

        if not title or not description or not cover_image:
            return Response(
                {"error": "Title, description, and cover image are required"},
                status=HTTP_400_BAD_REQUEST,
            )

        try:
            album = Album.objects.create(
                name=title,
                description=description,
                cover_image=cover_image,
                user=request.user,
            )
            serializer = AlbumSerializer(album)
            return Response(
                {"success": True, "album": serializer.data}, status=HTTP_201_CREATED
            )
        except Exception as e:
            return Response({"error": str(e)}, status=500)

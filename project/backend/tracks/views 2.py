from django.http import JsonResponse
from .models import Track
from albums.models import Album
from users.models import Users
from mutagen import File
from datetime import timedelta
from rest_framework.response import Response
from .serializers import TrackSerializer
from rest_framework.views import APIView


class TrackListView(APIView):
    def get(self, request):
        tracks = Track.objects.all()
        serializer = TrackSerializer(tracks, many=True, context={"request": request})
        return Response({"tracks": serializer.data})


def add_track(request):
    if not request.user.is_authenticated:
        return JsonResponse({"error": "User not authenticated"}, status=401)

    title = request.POST.get("title")
    authors = request.POST.get("authors")
    album_id = request.POST.get("album")
    audio = request.FILES.get("audio")
    cover_image = request.FILES.get("cover_image")

    if not title:
        return JsonResponse({"error": "Title is required"}, status=400)
    if not audio:
        return JsonResponse({"error": "Audio file is required"}, status=400)
    if not album_id:
        return JsonResponse({"error": "Album is required"}, status=400)
    if not cover_image:
        return JsonResponse({"error": "Cover image is required"}, status=400)

    try:
        audio_file = File(audio)
        duration_seconds = int(audio_file.info.length)
        duration = timedelta(seconds=duration_seconds)

        album = Album.objects.get(id=album_id)

        track = Track.objects.create(
            name=title,
            duration=duration,
            album=album,
            audio=audio,
            cover_image=cover_image,
            user=request.user,
        )

        if authors:
            authors_list = [username.strip() for username in authors.split(",")]
            authors = Users.objects.filter(username__in=authors_list)
            track.authors.set(authors)

        return JsonResponse(
            {
                "success": True,
                "track": {
                    "id": track.id,
                    "name": track.name,
                    "duration": str(track.duration),
                    "album": track.album.name,
                    "audio": track.audio.url,
                    "cover_image": track.cover_image.url,
                },
            }
        )
    except Album.DoesNotExist:
        return JsonResponse({"error": "Album not found"}, status=404)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)

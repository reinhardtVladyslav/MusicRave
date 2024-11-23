from django.http import JsonResponse
from .models import Track
from albums.models import Album
from users.models import Users
from mutagen import File
from datetime import timedelta
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import TrackSerializer


@api_view(["GET"])
def show_tracks(request):
    tracks = Track.objects.all()
    serializer = TrackSerializer(tracks, many=True)
    return Response({"tracks": serializer.data})


def add_track(request):
    if not request.user.is_authenticated:
        return JsonResponse({"error": "User not authenticated"}, status=401)

    title = request.POST.get("title")
    authors_ids = request.POST.getlist("authors")
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

        if authors_ids:
            authors = Users.objects.filter(id__in=authors_ids)
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

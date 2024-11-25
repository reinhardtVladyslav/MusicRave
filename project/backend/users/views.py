from django.contrib.auth import authenticate, login, logout
from .models import Users
from django.core.exceptions import ValidationError
from django.core.validators import validate_email
from django.http import JsonResponse
from tracks.serializers import TrackSerializer
from albums.serializers import AlbumSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from django.db.models import Count


def validate_input(email, password, username):
    if not email or not password or not username:
        raise ValueError("All fields are required.")
    try:
        validate_email(email)
    except ValidationError:
        raise ValueError("Invalid email format.")
    if len(password) < 8:
        raise ValueError("Password must be at least 8 characters long.")


def register(request):
    try:
        email = request.POST.get("email")
        password = request.POST.get("password")
        username = request.POST.get("username")

        validate_input(email, password, username)

        Users.create(email, password, username)
        return JsonResponse({"message": "User registered successfully."}, status=201)

    except ValueError as e:
        return JsonResponse({"error": str(e)}, status=400)
    except Exception as e:
        return JsonResponse({"error": "Something went wrong."}, status=500)


def log_in(request):
    try:
        email = request.POST.get("email")
        password = request.POST.get("password")
        if not email or not password:
            return JsonResponse(
                {"error": "Email and password are required."}, status=400
            )

        user = authenticate(request, email=email, password=password)
        if user is not None:
            login(request, user)
            return JsonResponse({"message": "Login successful."}, status=200)
        else:
            return JsonResponse({"error": "Invalid email or password."}, status=401)
    except Exception as e:
        return JsonResponse({"error": "An error occurred during login."}, status=500)


def log_out(request):
    if not request.user.is_authenticated:
        return JsonResponse({"error": "User not authenticated"}, status=401)
    logout(request)
    return JsonResponse({"message": "User successfully logged out"}, status=200)


class UserTracksListView(APIView):
    def get(self, request, user_id):
        user = Users.get_by_id(user_id)
        tracks = user.tracks.all()
        serializer = TrackSerializer(tracks, many=True, context={"request": request})
        return Response({"tracks": serializer.data})


class UserAlbumsListView(APIView):
    def get(self, request, user_id):
        user = Users.get_by_id(user_id)
        albums = user.albums.annotate(track_count=Count("tracks"))
        serializer = AlbumSerializer(albums, many=True, context={"request": request})
        return Response({"albums": serializer.data})

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
from django.views.decorators.csrf import csrf_exempt
from django.forms.models import model_to_dict


def validate_input(email, password):
    if not email or not password:
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
        validate_input(email, password)
        Users.create(email, password)
        return JsonResponse({"message": "User registered successfully."}, status=201)
    except ValueError as e:
        return JsonResponse({"error": str(e)}, status=400)
    except Exception as e:
        return JsonResponse({"error": "Something went wrong."}, status=500)


@csrf_exempt
def update_user(request):
    if not request.user.is_authenticated:
        return JsonResponse({"error": "User not authenticated"}, status=401)
    user = request.user
    try:
        username = request.POST.get("username")
        if not username:
            username = None
        email = request.POST.get("email")
        if not email:
            email = None
        else:
            try:
                validate_email(email)
            except ValidationError:
                raise ValueError("Invalid email format.")
        password = request.POST.get("password")
        if not password:
            password = None
        else:
            if len(password) < 8:
                raise ValueError("Password must be at least 8 characters long.")
        bio = request.POST.get("bio")
        if not bio:
            bio = None
        user.update(
            username=username,
            email=email,
            password=password,
            bio=bio,
        )
        return JsonResponse(
            {
                "message": "User info updated successfully",
                "user": {
                    "id": user.id,
                    "username": user.username,
                    "email": user.email,
                    "bio": user.bio,
                },
            },
            status=200,
        )
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
            user_data = model_to_dict(user, exclude=["password"])
            return JsonResponse(
                {"message": "Login successful.", "user": user_data}, status=200
            )
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

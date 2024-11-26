from django.contrib.auth import authenticate, login, logout
from .models import Users
from django.core.exceptions import ValidationError
from django.core.validators import validate_email
from django.http import JsonResponse


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


# def log_out(request):
#     if not request.user.is_authenticated:
#         return redirect(reverse("users:login"))
#     logout(request)
#     return redirect(reverse("home:home"))

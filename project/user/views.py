from django.shortcuts import render, redirect
from django.urls import reverse
from django.contrib.auth import authenticate, login, logout
from .models import User


def register(request):
    if request.method == "POST":
        email = request.POST.get("email")
        password = request.POST.get("password")
        first_name = request.POST.get("first_name")
        last_name = request.POST.get("last_name")
        User.create(email, password, first_name, last_name)
        return redirect(reverse("user:login"))
    return render(request, "user/register.html")


def log_in(request):
    if request.method == "POST":
        email = request.POST.get("email")
        password = request.POST.get("password")
        user = authenticate(request, email=email, password=password)
        if user is not None:
            login(request, user)
            return redirect(reverse("home:home"))
    return render(request, "user/log_in.html")


def log_out(request):
    if not request.user.is_authenticated:
        return redirect(reverse("user:login"))
    logout(request)
    return redirect(reverse("home:home"))

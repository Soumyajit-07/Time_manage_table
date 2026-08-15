from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login
from django.contrib import messages
from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required
import re

def signup(request):
    if request.method == "POST":
        username = request.POST.get("username").strip()
        email = request.POST.get("email").strip().lower()
        password = request.POST.get("password")
        confirm_password = request.POST.get("confirm_password")

        # Username validation
        if len(username) < 3:
            messages.error(request, "Username must be at least 3 characters.")
            return render(request, "accounts/signup.html")

        # Email already exists
        if User.objects.filter(email=email).exists():
            messages.error(request, "Email already exists.")
            return render(request, "accounts/signup.html")

        # Username already exists
        if User.objects.filter(username=username).exists():
            messages.error(request, "Username already exists.")
            return render(request, "accounts/signup.html")

        # Confirm password
        if password != confirm_password:
            messages.error(request, "Passwords do not match.")
            return render(request, "accounts/signup.html")

        # Password validation
        password_pattern = r'^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$])[A-Za-z\d@#$]{8,}$'

        if not re.match(password_pattern, password):
            messages.error(
                request,
                "Password must be at least 8 characters and include 1 uppercase, 1 lowercase, 1 number, and 1 special character (@, #, or $)."
            )
            return render(request, "accounts/signup.html")

        # Create user
        User.objects.create_user(
            username=username,
            email=email,
            password=password
        )

        messages.success(request, "Account created successfully. Please sign in.")
        return redirect("signin")

    return render(request, "accounts/signup.html")

def signin(request):
    if request.method == "POST":
        email = request.POST.get("email").strip().lower()
        password = request.POST.get("password")

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            messages.error(request, "Invalid email or password.")
            return render(request, "accounts/signin.html")

        user = authenticate(request, username=user.username, password=password)

        if user is not None:
            login(request, user)
            return redirect("dashboard")   # We'll create this page next
        else:
            messages.error(request, "Invalid email or password.")

    return render(request, "accounts/signin.html")


@login_required(login_url="signin")
def dashboard(request):
    return render(request, "accounts/dashboard.html")


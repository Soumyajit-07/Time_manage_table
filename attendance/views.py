from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.utils import timezone
from .models import Attendance


@login_required(login_url="signin")
def dashboard(request):
    attendance = Attendance.objects.filter(
        user=request.user,
        date=timezone.localdate()
    ).first()

    context = {
        "attendance": attendance,
    }

    return render(
        request,
        "attendance/dashboard.html",
        context
    )

@login_required
def check_in(request):
    if request.method == "POST":

        attendance, created = Attendance.objects.get_or_create(
            user=request.user,
            date=timezone.localdate()
        )

        if attendance.entry:
            return JsonResponse({
                "success": False,
                "message": "Already checked in."
            })

        attendance.entry = timezone.now()
        attendance.save()

        return JsonResponse({
            "success": True,
            "time": attendance.entry.strftime("%I:%M:%S %p")
        })

    return JsonResponse({"success": False})


# 👇 Add this new function
@login_required
def lunch_out(request):

    if request.method == "POST":

        try:
            attendance = Attendance.objects.get(
                user=request.user,
                date=timezone.localdate()
            )

        except Attendance.DoesNotExist:
            return JsonResponse({
                "success": False,
                "message": "Please check in first."
            })

        if attendance.lunch_out:
            return JsonResponse({
                "success": False,
                "message": "Lunch Out already recorded."
            })

        attendance.lunch_out = timezone.now()
        attendance.save()

        return JsonResponse({
            "success": True,
            "time": attendance.lunch_out.strftime("%I:%M:%S %p")
        })

    return JsonResponse({"success": False})

@login_required(login_url="signin")
def lunch_in(request):

    if request.method == "POST":

        try:
            attendance = Attendance.objects.get(
                user=request.user,
                date=timezone.localdate()
            )

        except Attendance.DoesNotExist:
            return JsonResponse({
                "success": False,
                "message": "Please check in first."
            })

        if not attendance.lunch_out:
            return JsonResponse({
                "success": False,
                "message": "Please click Lunch Out first."
            })

        if attendance.lunch_in:
            return JsonResponse({
                "success": False,
                "message": "Lunch In already recorded."
            })

        attendance.lunch_in = timezone.now()
        attendance.save()

        return JsonResponse({
            "success": True,
            "time": attendance.lunch_in.strftime("%I:%M:%S %p")
        })

    return JsonResponse({"success": False})

@login_required(login_url="signin")
def check_out(request):

    if request.method == "POST":

        try:
            attendance = Attendance.objects.get(
                user=request.user,
                date=timezone.localdate()
            )

        except Attendance.DoesNotExist:
            return JsonResponse({
                "success": False,
                "message": "Please check in first."
            })

        if not attendance.entry:
            return JsonResponse({
                "success": False,
                "message": "Please check in first."
            })

        if not attendance.lunch_out:
            return JsonResponse({
                "success": False,
                "message": "Please complete Lunch Out first."
            })

        if not attendance.lunch_in:
            return JsonResponse({
                "success": False,
                "message": "Please complete Lunch In first."
            })

        if attendance.exit:
            return JsonResponse({
                "success": False,
                "message": "Exit already recorded."
            })

        attendance.exit = timezone.now()
        attendance.save()

        return JsonResponse({
            "success": True,
            "time": attendance.exit.strftime("%I:%M:%S %p")
        })

    return JsonResponse({"success": False})
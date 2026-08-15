from django.db import models
from django.contrib.auth.models import User


class Attendance(models.Model):

    user = models.ForeignKey(User, on_delete=models.CASCADE)

    date = models.DateField(auto_now_add=True)

    entry = models.DateTimeField(null=True, blank=True)

    lunch_out = models.DateTimeField(null=True, blank=True)

    lunch_in = models.DateTimeField(null=True, blank=True)

    exit = models.DateTimeField(null=True, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} - {self.date}"
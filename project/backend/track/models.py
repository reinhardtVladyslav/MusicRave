from django.db import models
from user.models import User


class Track(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255, default=None)
    author = models.CharField(max_length=255, default=None)
    duration = models.DurationField(null=True, blank=True)
    audio = models.FileField(upload_to="tracks/", default=None)
    cover_image = models.ImageField(upload_to="covers/", blank=True, null=True)
    album = models.CharField(max_length=255, default=None)
    uploaded_at = models.DateTimeField(auto_now_add=True)
    user_id = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="track", default=2
    )

    def __str__(self):
        return self.name


class Album(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    # description = models.TextField(max_length=500, blank=True, null=True)
    # cover_image = models.ImageField(upload_to="album_covers/", blank=True, null=True)
    # # tracks = models.ManyToManyField(Track, related_name="albums")

    def __str__(self):
        return self.name

from django.db import models
from users.models import Users
from albums.models import Album


class Track(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    authors = models.ManyToManyField(Users, blank=True)
    duration = models.DurationField(null=True, blank=True)
    audio = models.FileField(upload_to="tracks/audio/")
    # cover_image = models.ImageField(upload_to="tracks/covers/", null=True)
    album = models.ForeignKey(
        Album, on_delete=models.CASCADE, related_name="tracks", null=True
    )
    uploaded_at = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(
        Users, on_delete=models.CASCADE, related_name="tracks", null=True
    )

    def __str__(self):
        return self.name

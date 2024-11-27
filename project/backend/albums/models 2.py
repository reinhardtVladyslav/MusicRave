from django.db import models
from users.models import Users


class Album(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    description = models.TextField(max_length=500, blank=True, null=True)
    cover_image = models.ImageField(upload_to="albums/covers/", null=True)
    user = models.ForeignKey(
        Users, on_delete=models.CASCADE, related_name="albums", null=True
    )

    def __str__(self):
        return self.name

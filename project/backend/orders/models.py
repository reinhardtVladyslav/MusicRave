from django.db import models

from users.models import Users
from tracks.models import Track


class Order(models.Model):
    id = models.AutoField(primary_key=True)
    track = models.ForeignKey(Track, on_delete=models.CASCADE, default=None)
    user = models.ForeignKey(
        Users, on_delete=models.CASCADE, default=None, related_name="orders"
    )
    created_at = models.DateTimeField(auto_now_add=True)

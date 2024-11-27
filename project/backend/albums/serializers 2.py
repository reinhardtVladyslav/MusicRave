from rest_framework import serializers
from .models import Album


class AlbumSerializer(serializers.ModelSerializer):
    track_count = serializers.IntegerField(read_only=True)

    class Meta:
        model = Album
        fields = ["id", "name", "description", "cover_image", "user", "track_count"]

from rest_framework import serializers
from .models import Track, Users


class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = ["id", "username"]


class TrackSerializer(serializers.ModelSerializer):
    authors = AuthorSerializer(many=True)
    image = serializers.ImageField(source="cover_image")
    album = serializers.CharField(source="album.name")

    class Meta:
        model = Track
        fields = ["id", "name", "authors", "album", "duration", "audio", "image"]

from rest_framework import serializers
from .models import Track, Users


class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = ["id", "first_name", "last_name"]


class TrackSerializer(serializers.ModelSerializer):
    authors = AuthorSerializer(many=True)

    class Meta:
        model = Track
        fields = [
            "id",
            "name",
            "genre",
            "duration",
            "audio_file",
            "uploaded_at",
            "authors",
        ]

from rest_framework import serializers
from .models import Track, Users


class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = ["id", "username"]


class TrackSerializer(serializers.ModelSerializer):
    authors = AuthorSerializer(many=True)

    class Meta:
        model = Track
        fields = "__all__"

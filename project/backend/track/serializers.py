from rest_framework import serializers
from .models import *
from mutagen import File
from datetime import timedelta


class TrackSerializer(serializers.ModelSerializer):
    class Meta:
        model = Track
        fields = "__all__"

    def get_duration(self, obj):
        # Convert timedelta to "MM:SS" format
        total_seconds = int(obj.duration.total_seconds())
        minutes, seconds = divmod(total_seconds, 60)
        return f"{minutes:02}:{seconds:02}"

    def create(self, validated_data):
        track = super().create(validated_data)

        if track.audio:
            audio_path = track.audio.path
            try:
                audio_file = File(audio_path)
                duration_seconds = int(audio_file.info.length)

                # Set the duration as timedelta (required by DurationField)
                track.duration = timedelta(seconds=duration_seconds)
                track.save()

            except Exception as e:
                print(f"Error calculating duration: {e}")

        return track


class AlbumSerializer(serializers.ModelSerializer):
    class Meta:
        model = Album
        fields = "__all__"

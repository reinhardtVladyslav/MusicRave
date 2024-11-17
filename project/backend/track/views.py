from rest_framework import status
from rest_framework import viewsets, generics
from .models import Track
from .serializers import *
from rest_framework.decorators import api_view
from rest_framework.response import Response


class TrackViewSet(viewsets.ModelViewSet):
    queryset = Track.objects.all()
    serializer_class = TrackSerializer


class AlbumList(generics.ListAPIView):
    queryset = Album.objects.all()
    serializer_class = AlbumSerializer


@api_view(["POST"])
def create_track(request):
    if request.method == "POST":
        serializer = TrackSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
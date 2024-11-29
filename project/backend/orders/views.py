from django.http import JsonResponse
from tracks.models import Track
from .models import Order
from .serializers import OrderSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAuthenticated


class UserOrdersListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        orders = user.orders.all()
        serializer = OrderSerializer(orders, many=True, context={"request": request})
        return Response({"orders": serializer.data})


def create_order(request):
    if not request.user.is_authenticated:
        return JsonResponse({"error": "User not authenticated"}, status=401)

    track_name = request.POST.get("title")
    if not track_name:
        return JsonResponse({"error": "Track title not provided"}, status=400)

    track = get_object_or_404(Track, name=track_name)

    order = Order.objects.create(
        track=track,
        user=request.user,
    )

    return JsonResponse(
        {
            "success": True,
            "message": "Order created successfully",
            "order_id": order.id,
            "track": {
                "id": track.id,
                "name": track.name,
            },
        },
        status=201,
    )

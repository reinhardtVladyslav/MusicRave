from django.urls import path

from .views import *

app_name = "orders"
urlpatterns = [
    path("", UserOrdersListView.as_view(), name="show_orders"),
    path("create/", create_order, name="create_order"),
]

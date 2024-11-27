from django.contrib import admin
from .models import Transaction, PaymentMethod, Subscription

@admin.register(Transaction)
class TransactionAdmin(admin.ModelAdmin):
    list_display = ('user', 'transaction_type', 'amount', 'date')
    search_fields = ('user__username', 'transaction_type')

@admin.register(PaymentMethod)
class PaymentMethodAdmin(admin.ModelAdmin):
    list_display = ('user', 'card_number', 'expiration_date', 'cardholder_name')
    search_fields = ('card_number', 'user__username')

@admin.register(Subscription)
class SubscriptionAdmin(admin.ModelAdmin):
    list_display = ('user', 'start_date', 'end_date', 'is_active')
    list_filter = ('is_active',)

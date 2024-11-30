from django.db import models

class Transaction(models.Model):
    """Фінансові транзакції."""
    TRANSACTION_TYPE_CHOICES = [
        ('credit', 'Credit'),
        ('debit', 'Debit'),
    ]

    user = models.ForeignKey('users.Users', on_delete=models.CASCADE, related_name="transactions")
    transaction_type = models.CharField(max_length=10, choices=TRANSACTION_TYPE_CHOICES)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    date = models.DateTimeField(auto_now_add=True)
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.user.username} - {self.transaction_type} - {self.amount}"


class PaymentMethod(models.Model):
    """Методи оплати."""
    user = models.ForeignKey('users.Users', on_delete=models.CASCADE, related_name="payment_methods")
    card_number = models.CharField(max_length=16)
    expiration_date = models.DateField()
    cardholder_name = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.cardholder_name} - {self.card_number[-4:]}"


class Subscription(models.Model):
    """Підписки користувачів."""
    user = models.ForeignKey('users.Users', on_delete=models.CASCADE, related_name="subscriptions")
    start_date = models.DateField(auto_now_add=True)
    end_date = models.DateField()
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.user.username} - Active: {self.is_active}"

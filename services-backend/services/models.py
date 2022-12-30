from django.db import models
from django.utils.translation import gettext_lazy as _
from users.models import User

class Services(models.Model):
    name = models.CharField(max_length=20)
    description = models.CharField(max_length=200)
    logo = models.URLField(max_length=1000)

    def __str__(self) -> str:
        return self.name

class Payment_User(models.Model): 
    amount = models.FloatField(default=0.0)
    payment_date = models.DateField(auto_now=True)
    expiration_date = models.DateField(null=True)
    user = models.ForeignKey(User, on_delete =models.CASCADE, related_name='user_payments')
    service = models.ForeignKey(Services, on_delete=models.CASCADE, related_name='service_payments')

    def __str__(self) -> str:
        return f'{self.user.first_name} - {self.service.name}'

class Expired_payments(models.Model):
    penalty_fee_amount = models.FloatField(default=0.0)
    payment_user = models.ForeignKey(Payment_User, on_delete=models.CASCADE, related_name='payment_user')
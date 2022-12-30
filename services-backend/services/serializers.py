from rest_framework import serializers
from .models import *
from users.models import *
from users.serializers import *

class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Services
        fields = '__all__'

class PaymentUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment_User
        fields = '__all__'

class ExpiredPaymentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Expired_payments
        fields = '__all__'

class UserPaymentSerializer(serializers.ModelSerializer):
    service_payments = PaymentUserSerializer(many=True, read_only = True)
    class Meta:
        model = Services
        fields = ['id','name','logo','service_payments']


'''class PaymentsSerializer(serializers.ModelSerializer):
    users = User(many=True, read_only = True)
    class Meta:
        model = Payment_User
        fields = ['user','amount','payment_date','services']

    def create(self, validated_data):
        services = validated_data.pop('services')
        payments_instance = Payment_User.objects.create(**validated_data)
        for service in services:
            Services.objects.create(service=payments_instance,**service)
        return payments_instance'''
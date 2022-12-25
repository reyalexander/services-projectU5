from rest_framework import serializers
from .models import Payment_User

class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment_User
        fields = '__all__'
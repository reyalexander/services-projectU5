from .models import *
from .serializers import *
from rest_framework.response import Response
from rest_framework import status, viewsets,filters
from rest_framework.permissions import IsAuthenticated,AllowAny
from .pagination import *


class PaymentUserServicesViewSet(viewsets.ModelViewSet):
    queryset = Payment_User.objects.get_queryset().order_by('id')
    serializer_class = PaymentUserSerializer
    pagination_class = SmallResultsSetPagination
    filter_backends = [filters.SearchFilter]
    permission_classes = [AllowAny]
    #search_fields = ['user','amount','service','payment_date']

    def get_throttles(self):
        if self.action == 'create':
            self.throttle_scope = 'create_servicio'
        return super().get_throttles()

    def create(self, request):
        if isinstance(request.data, list):
            serializer = PaymentUserSerializer(data=request.data, many = True)
        else:
            serializer = PaymentUserSerializer(data=request.data)
        
        if serializer.is_valid():
            data=request.data
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ServicesViewSet(viewsets.ModelViewSet):
    queryset = Services.objects.get_queryset().order_by('id')
    serializer_class = ServiceSerializer
    pagination_class = SmallResultsSetPagination
    filter_backends = [filters.SearchFilter]
    permission_classes = [AllowAny]

    def create(self, request):
        if isinstance(request.data, list):
            serializer = ServiceSerializer(data=request.data, many = True)
        else:
            serializer = ServiceSerializer(data=request.data)
        
        if serializer.is_valid():
            data=request.data
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class PaymentsViewSets(viewsets.ModelViewSet):
    queryset = Services.objects.all()
    serializer_class = UserPaymentSerializer
    pagination_class = SmallResultsSetPagination

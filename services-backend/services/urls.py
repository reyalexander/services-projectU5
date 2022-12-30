from django.contrib import admin
from django.urls import path
from rest_framework import routers
from django.views import View
from .views import *
from .api import *

router = routers.DefaultRouter()

router.register(r'add_payment',PaymentUserServicesViewSet, 'paymentCustom')
router.register(r'add_service',ServicesViewSet, 'serviciosCustom')

router.register(r'list_payment',PaymentsViewSets, 'listPaymentsCustom')
'''
urlpatterns = [
    path('payments/', payment ,name='payments'),
]
'''
urlpatterns = router.urls
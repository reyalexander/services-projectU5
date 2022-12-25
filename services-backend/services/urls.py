from django.contrib import admin
from django.urls import path
from rest_framework import routers
from . import views
from .api import ServicesViewSet

router = routers.DefaultRouter()

router.register(r'add_service',ServicesViewSet, 'serviciosCustom')

'''urlpatterns = [
    #path('task/complete/<id>', views.complete_task),
    #path('moneda/', views.TodoViewSet.as_view({'get': 'list'})),
]'''

urlpatterns = router.urls
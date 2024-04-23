from django.contrib.auth import get_user_model

from rest_framework import mixins, viewsets, status
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from services.models import Service
from .serializers import ServiceSerializer, PackageSerializer, ReportsSerializer

User = get_user_model()
        
class ServiceViewSet(viewsets.ViewSet):
    serializer_class = ServiceSerializer
    queryset = User.objects.all()
    @action(detail=False, methods=['post'], permission_classes=[AllowAny])
    def service(self, request):
        serializer = ServiceSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class PackageViewSet(viewsets.ViewSet):
    serializer_class = PackageSerializer
    @action(detail=False, methods=['post'], permission_classes=[AllowAny])
    def package(self, request):
        serializer = PackageSerializer(data=request.data)
        if serializer.is_valid():
            package = serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

# class ReportsViewSet(viewsets.ModelViewSet):
#     serializer_class = ReportsSerializer
#     queryset = Reports.objects.all()
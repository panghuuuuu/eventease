from django.contrib.auth import get_user_model

from rest_framework import mixins, viewsets, status
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from eventboard.models import Event, Service
from .serializers import EventSerializer, ServiceSerializer, PackageSerializer

User = get_user_model()

class EventViewSet(viewsets.ViewSet):
    serializer_class = EventSerializer
    @action(detail=False, methods=['post'], permission_classes=[AllowAny])
    def create_event(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            event = serializer.save()
            serialized_event = self.serializer_class(event)
            return Response(serialized_event.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['put'], permission_classes=[AllowAny])
    def edit_event(self, request, pk=None):
        event = Event.objects.get(pk=pk)
        serializer = self.serializer_class(instance=event, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['delete'], permission_classes=[AllowAny])
    def delete_event(self, request, pk=None):
        event = Event.objects.get(pk=pk)
        event.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
        
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
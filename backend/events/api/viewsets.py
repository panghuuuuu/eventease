from django.contrib.auth import get_user_model

from rest_framework import mixins, viewsets, status
from rest_framework.decorators import action, api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from events.models import Event
from .serializers import EventSerializer
from rest_framework.permissions import IsAuthenticated

User = get_user_model()

class EventViewSet(mixins.RetrieveModelMixin,
                   mixins.UpdateModelMixin,
                   mixins.DestroyModelMixin,
                   viewsets.GenericViewSet):
    serializer_class = EventSerializer
    queryset = Event.objects.all()    
    @action(detail=False, methods=['post'], permission_classes=[IsAuthenticated])
    def create_event(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            user = request.user 
            event = serializer.save()
            user.events.add(event)
            serialized_event = self.serializer_class(event)
            return Response(serialized_event.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['put'], permission_classes=[IsAuthenticated])
    def edit_event(self, request, pk=None):
        event = Event.objects.get(pk=pk)
        serializer = self.serializer_class(instance=event, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
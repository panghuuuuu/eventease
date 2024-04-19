from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from events.models import Event, ChosenService
from .serializers import EventSerializer, EventGETSerializer
from rest_framework.authentication import TokenAuthentication, SessionAuthentication
from rest_framework.permissions import IsAuthenticated
from services.models import Service, Package

from django.shortcuts import render


@api_view(['GET'])
@authentication_classes([TokenAuthentication, SessionAuthentication]) 
@permission_classes([IsAuthenticated])
def get_events(request):
    user = request.user
    events = Event.objects.filter(participants=user)
    serializer = EventGETSerializer(events, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@authentication_classes([SessionAuthentication, TokenAuthentication]) 
@permission_classes([IsAuthenticated])
def get_event_details(request, pk):
    try:
        event = Event.objects.get(pk=pk)
    except Event.DoesNotExist:
        return Response({"error": "Event not found"}, status=status.HTTP_404_NOT_FOUND)

    if request.user not in event.participants.all():
        return Response({"error": "You are not authorized to access this event"}, status=status.HTTP_403_FORBIDDEN)

    serializer = EventGETSerializer(event)
    return Response(serializer.data)

@api_view(['POST'])
@authentication_classes([SessionAuthentication, TokenAuthentication]) 
@permission_classes([IsAuthenticated])
def add_event(request):
    request.data['user'] = request.user.id
    serializer = EventSerializer(data=request.data)
    if serializer.is_valid():
        event = serializer.save()
        request.user.events.add(event)  
        return Response({"message": "Event added successfully", "data": serializer.data}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
def edit_event(request, pk):
    try:
        event = Event.objects.get(pk=pk)
    except Event.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    serializer = EventSerializer(event, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
@authentication_classes([SessionAuthentication, TokenAuthentication]) 
@permission_classes([IsAuthenticated])
def delete_event(request, pk):
    try:
        event = Event.objects.get(pk=pk)
    except Event.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if event in request.user.events.all():
        event.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    else:
        return Response({"error": "You are not authorized to delete this event"}, status=status.HTTP_403_FORBIDDEN)

@api_view(['POST'])
@authentication_classes([SessionAuthentication, TokenAuthentication]) 
@permission_classes([IsAuthenticated])
def add_service(request, event_id):
    try:
        event = Event.objects.get(pk=event_id)
    except Event.DoesNotExist:
        return Response({"error": "Event not found"}, status=status.HTTP_404_NOT_FOUND)

    package_number = request.data.get('package_number')
    service_number = request.data.get('service_number')

    try:
        package = Package.objects.get(pk=package_number)
        service = Service.objects.get(pk=service_number)
    except (Package.DoesNotExist, Service.DoesNotExist):
        return Response({"error": "Package or service not found"}, status=status.HTTP_404_NOT_FOUND)

    chosen_service = ChosenService.objects.create(event=event, package=package, service=service)
    event.services.add(chosen_service)

    return Response({"message": "Service added successfully", "data": {
        "event_id": event.id,
        "chosen_service_id": chosen_service.id,
        "service_name": chosen_service.service.service_name,
        "package_name": chosen_service.package.package_name
    }}, status=status.HTTP_201_CREATED)
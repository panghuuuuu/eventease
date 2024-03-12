from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from eventboard.models import Event, Service, Package
from .serializers import EventSerializer, EventGETSerializer, ServiceSerializer, PackageSerializer

################ Event Views ################

@api_view(['GET'])  
def getEventData(request):
    events = Event.objects.all()
    serializer = EventGETSerializer(events, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def add_event(request):
    serializer = EventSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
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
def delete_event(request, pk):
    try:
        event = Event.objects.get(pk=pk)    
    except Event.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    event.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)

################ Service Views ################

@api_view(['GET'])  
def getServiceData(request):
    services = Service.objects.all()
    serializer = ServiceSerializer(services, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def add_service(request):
    serializer = ServiceSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({"message": "Service added successfully", "data": serializer.data}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
def edit_service(request, pk):
    try:
        service = Service.objects.get(pk=pk)
    except Service.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    serializer = ServiceSerializer(service, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
def delete_service(request, pk):
    try:
        service = Service.objects.get(pk=pk)    
    except Service.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    service.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)

################ Package Views ################

@api_view(['GET'])  
def getPackagesData(request):
    packages = Package.objects.all()
    serializer = PackageSerializer(packages, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def add_package(request):
    serializer = PackageSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

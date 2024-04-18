from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view
from services.models import Service, Package, Review
from .serializers import ServiceSerializer, PackageSerializer, ReviewSerializer

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

@api_view(['GET'])
def get_all_services(request):    
    service_type = request.GET.get('service_type')    
    if service_type:
        services = Service.objects.filter(service_type=service_type)
    else:
        services = Service.objects.all()

    serializer = ServiceSerializer(services, many=True)
    data = serializer.data
    for i, service in enumerate(services):
        data[i]['id'] = service.pk

    return Response(data)

@api_view(['GET'])
def get_service_details(request, pk):
    try:
        service = Service.objects.get(pk=pk)
    except Service.DoesNotExist:
        return Response({"error": "Service not found"}, status=status.HTTP_404_NOT_FOUND)

    serializer = ServiceSerializer(service)
    return Response(serializer.data)

@api_view(['POST'])
def add_review(request, pk):
    try:
        service = Service.objects.get(pk=pk)
    except Service.DoesNotExist:
        return Response({"error": "Service not found"}, status=status.HTTP_404_NOT_FOUND)

    mutable_data = request.data.copy()
    mutable_data['review_service'] = service.id

    # TO-DO! Associate a user to the review

    serializer = ReviewSerializer(data=mutable_data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def get_service_reviews(request, pk):
    try:
        service = Service.objects.get(pk=pk)
    except Service.DoesNotExist:
        return Response({"error": "Service not found"}, status=status.HTTP_404_NOT_FOUND)

    reviews = Review.objects.filter(review_service=service.id)

    serializer = ReviewSerializer(reviews, many=True)
    return Response(serializer.data)
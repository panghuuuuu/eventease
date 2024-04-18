from rest_framework.response import Response
from rest_framework import status
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

#############################################################################################

# FOR Reviews
@api_view(['POST'])
def add_review(request, service_id):
    try:
        service = Service.objects.get(pk=service_id)
    except Service.DoesNotExist:
        return Response({"error": "Service not found"}, status=status.HTTP_404_NOT_FOUND)

    serializer = ReviewSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(review_service=service)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
def edit_review(request, service_id, review_id):
    try:
        service = Service.objects.get(pk=service_id)
        review = Review.objects.get(pk=review_id, review_service=service)
    except (Service.DoesNotExist, Review.DoesNotExist):
        return Response({"error": "Service or Review not found"}, status=status.HTTP_404_NOT_FOUND)

    serializer = ReviewSerializer(review, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
def delete_review(request, service_id, review_id):
    try:
        service = Service.objects.get(pk=service_id)
        review = Review.objects.get(pk=review_id, review_service=service)
    except (Service.DoesNotExist, Review.DoesNotExist):
        return Response(status=status.HTTP_404_NOT_FOUND)

    review.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)


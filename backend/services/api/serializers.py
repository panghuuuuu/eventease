from rest_framework import serializers
from services.models import Package, Service

class PackageSerializer(serializers.ModelSerializer):    
    class Meta:
        model = Package
        fields = '__all__'

class ServicesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = '__all__'

class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = ('service_name', 'service_rating', 'service_type', 'service_address', 'service_image', 'service_packages')

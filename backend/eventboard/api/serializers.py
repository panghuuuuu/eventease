from rest_framework import serializers
from eventboard.models import Package, Service, Event

class PackageSerializer(serializers.ModelSerializer):    
    class Meta:
        model = Package
        fields = '__all__'

class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = ('service_provider', 'service_type', 'service_address', 'service_package')

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ('id', 'event_name', 'event_type', 'event_date', 'budget', 'pax', 'created', 'services')

class EventGETSerializer(EventSerializer):
    services = ServiceSerializer(many=True)

    class Meta(EventSerializer.Meta):
        fields = EventSerializer.Meta.fields + ('services', )
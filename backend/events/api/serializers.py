from rest_framework import serializers
from events.models import Event, ChosenService
from services.api.serializers import ServiceSerializer, PackageSerializer
from services.models import Service

class ChosenServiceSerializer(serializers.ModelSerializer):
    service = ServiceSerializer(read_only=True)
    package = PackageSerializer(read_only=True)

    class Meta:
        model = ChosenService
        fields = ('service', 'package',)

class EventSerializer(serializers.ModelSerializer):
    services = ChosenServiceSerializer(many=True, required=False)

    class Meta:
        model = Event
        fields = ['id','event_name', 'event_type','event_start_date', 'event_end_date', 'budget', 'pax','services']

    def create(self, validated_data):
        services_data = validated_data.pop('services', [])
        event = Event.objects.create(**validated_data)
        for service_data in services_data:
            service = Service.objects.create(**service_data)
            event.services.add(service)
        return event
    
    def update(self, current, validated_data):
        current.event_name = validated_data.get('event_name', current.event_name)
        current.event_type = validated_data.get('event_type', current.event_type)
        current.event_start_date = validated_data.get('event_start_date', current.event_start_date)
        current.event_end_date = validated_data.get('event_end_date', current.event_end_date)
        current.budget = validated_data.get('budget', current.budget)
        current.pax = validated_data.get('pax', current.pax)
        current.save()
        return current

class EventGETSerializer(EventSerializer):
    services = ChosenServiceSerializer(many=True,)

    class Meta(EventSerializer.Meta):
        fields = EventSerializer.Meta.fields 

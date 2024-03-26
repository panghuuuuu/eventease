from rest_framework import serializers
from events.models import Event
from services.api.serializers import ServiceSerializer

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ('id', 'event_name', 'event_type', 'event_start_date', 'event_end_date', 'budget', 'pax', 'created', 'services')

class EventGETSerializer(EventSerializer):
    services = ServiceSerializer(many=True)

    class Meta(EventSerializer.Meta):
        fields = EventSerializer.Meta.fields + ('services', )

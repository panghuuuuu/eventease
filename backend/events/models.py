from django.db import models
from services.models import Service

class Event(models.Model):
    EVENT_TYPE = (
        ('WEDDING','Wedding'),
        ('BIRTHDAY', 'Birthday'),
        ('PROM', 'Prom'),
        ('CORPORATE MEEING', 'Corporate Meeting'),
        ('SEMINAR', 'Seminar'),
        ('PARTY', 'Party')
    )

    event_name = models.CharField(max_length=200, default='Default Event Name')
    event_type = models.CharField(max_length=20, choices=EVENT_TYPE, default='Party')
    event_start_date = models.DateField(auto_now_add=False, auto_now=False, blank=True)
    event_end_date = models.DateField(auto_now_add=False, auto_now=False, blank=True)
    budget = models.FloatField()
    pax = models.IntegerField()
    created = models.DateTimeField(auto_now_add=True)
    services = models.ManyToManyField(Service, related_name='service')

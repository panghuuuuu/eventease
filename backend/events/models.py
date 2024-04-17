from django.db import models
from services.models import Service, Package

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
    services = models.ManyToManyField("ChosenService", related_name='event_services', blank=True, null=True)
    id = models.AutoField(primary_key=True)
    def __str__(self):
        return self.event_name

class ChosenService(models.Model):
    event = models.ForeignKey(Event, on_delete=models.CASCADE)
    service = models.ForeignKey(Service, on_delete=models.CASCADE)
    package = models.ForeignKey(Package, on_delete=models.CASCADE, default=0)

    def __str__(self):
        return f"{self.event.event_name} - {self.service.service_name}"    
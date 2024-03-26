from django.db import models

class Package(models.Model):
    package_name = models.CharField(max_length=200)
    package_price = models.FloatField(max_length=500000)

    def __str__(self):
        return self.package_name

class Service(models.Model):
    LOOKING_FOR = (
        ('VENUES', 'Venues'),
        ('CATERER', 'Caterer'),
        ('PARTY SUPPLIES', 'Party Supplies'),
        ('HOSTS', 'Hosts'),
        ('ENTERTAINERS', 'Entertainers'),
        ('PHOTOGRAPHERS', 'Photographers'),
        ('FORMAL ATTIRE', 'Formal Attire'),
        ('COSTUMES', 'Costumes'),
        ('MAKEUP ARTISTS', 'Makeup Artists')
    )
    
    service_provider = models.CharField(max_length=200)
    service_type = models.CharField(max_length=20, choices=LOOKING_FOR)
    service_address = models.CharField(max_length=200)
    service_package = models.ForeignKey('Package', on_delete=models.CASCADE, related_name='services', default='For Members')

    def __str__(self):
        return self.service_provider

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

from django.db import models

# Create your models here.
class Package(models.Model):
    package_name = models.CharField(max_length=200)
    package_price = models.FloatField(max_length=500000)
    package_id = models.AutoField(primary_key=True)
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
    
    service_name = models.CharField(max_length=200)
    service_rating = models.DecimalField(max_digits=3, decimal_places=2, default=0)
    service_type = models.CharField(max_length=20, choices=LOOKING_FOR)
    service_address = models.CharField(max_length=200)
    service_image = models.ImageField(upload_to='service_images/', null=True, blank=True) 
    service_packages = models.ManyToManyField(Package, related_name='services', default=0)


    def __str__(self): 
        return self.service_name
    
class Review(models.Model):
    review_id = models.AutoField(primary_key=True)
    review_user = models.ForeignKey('accounts.User', on_delete=models.CASCADE, default=0)
    review_service = models.ForeignKey(Service, on_delete=models.CASCADE)
    review_datetime = models.DateTimeField(auto_now_add=True)
    review_rating = models.DecimalField(max_digits=3, decimal_places=2, default=0)        
    review_body = models.TextField(max_length=10000)
    
    def __str__(self):
        return self.review_id    
    
class Reports(models.Model):
    report_id = models.AutoField(primary_key=True)
    reporting_user = models.ForeignKey('accounts.User', on_delete=models.CASCADE, default=0)
    reported_service = models.ForeignKey(Service, on_delete=models.CASCADE)
    report_datetime = models.DateTimeField(auto_now_add=True)
    report_title = models.TextField(max_length=50)
    report_body = models.TextField(max_length=2000)

    def __str__(self):
        return self.report_id
    

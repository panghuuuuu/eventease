from django.contrib import admin
from .models import Package, Service, Review
# Register your models here.
@admin.register(Package)
class PackageAdmin(admin.ModelAdmin):
    list_display = ('package_name', 'package_price')
    search_fields = ('package_name',)

@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ('service_name', 'service_rating', 'service_type', 'service_address')
    list_filter = ('service_type',)
    search_fields = ('service_name', 'service_address')

@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ('review_id', 'review_datetime', 'review_service', 'review_rating', 'review_body',)
    list_filter = ('review_service', 'review_rating',)
    search_fields = ('review_id',)

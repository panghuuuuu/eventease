from django.contrib import admin
from .models import Package, Service
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
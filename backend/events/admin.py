from django.contrib import admin
from .models import Event

# Register your models here.
class UserInline(admin.TabularInline):
    model = Event.participants.through
    extra = 0

class EventAdmin(admin.ModelAdmin):
    list_display = ('event_name', 'event_type', 'event_start_date', 'event_end_date')
    inlines = [UserInline]

admin.site.register(Event, EventAdmin)




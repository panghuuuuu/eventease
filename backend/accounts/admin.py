from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User, Event

class EventInline(admin.TabularInline):
    model = User.events.through
    extra = 0

class CustomUserAdmin(UserAdmin):
    list_display = (
        "first_name",
        "last_name",
        "username",
        "email",
        "is_staff",
        "is_active",
    )

    list_filter = ("is_staff", "is_superuser", "is_active")

    fieldsets = (
        (None, {"fields": ("username", "password")}),
        (
            "Personal info",
            {
                "fields": (
                    "first_name",
                    "last_name",
                    "email",
                    "birthday",
                )
            },
        ),
        (
            "Permissions",
            {
                "fields": (
                    "is_active",
                    "is_staff",
                    "is_superuser",
                    "user_permissions",
                )
            },
        ),
        ("Important dates", {"fields": ("last_login", "date_joined")}),
    )

    add_fieldsets = (
        (
            None,
            {
                "classes": ("wide",),
                "fields": (
                    "first_name",
                    "last_name",
                    "username",
                    "email",
                    "password1",
                    "password2",
                    "birthday",
                    "is_active",
                    "is_staff",
                    "is_superuser",
                    "user_permissions",
                ),
            },
        ),
    )
    inlines = [EventInline]

admin.site.register(User, CustomUserAdmin)

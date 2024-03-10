from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .models import User    

# Register your models here.
class CustomUserAdmin(UserAdmin):
    list_display = (
        "first_name",
        "last_name",
        "username",
        "email",
        "birthday",
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


admin.site.register(User, CustomUserAdmin)

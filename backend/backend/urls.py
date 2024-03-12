"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.contrib import admin
from django.urls import path, include, include
from rest_framework import routers
from django.conf import settings

from eventboard.api import views, viewsets
from dj_rest_auth.registration.views import VerifyEmailView
from accounts.api.viewsets import RegisterViewSet 
from eventboard.api.viewsets import EventViewSet, ServiceViewSet, PackageViewSet

router = routers.DefaultRouter()



urlpatterns = [
    path("admin/", admin.site.urls),
    # path("api/me", GetMe.as_view(), name="current-user"),
    path(
        "auth/verify-email/",
        VerifyEmailView.as_view(),
        name="account_email_verification_sent",
    ),
    path('api/register/', RegisterViewSet.as_view({'post': 'register'}), name='register'),


    path('event', views.getEventData),
    path('event/add-event', EventViewSet.as_view({'post': 'create_event'}), name='create_event'),
    path('event/edit-event/<int:pk>/', EventViewSet.as_view({'put': 'edit_event'}), name='edit_event'),
    path('event/delete-event/<int:pk>/', EventViewSet.as_view({'delete': 'delete_event'}), name='delete_event'),

    path('service', views.getServiceData),
    path('service/add-service', ServiceViewSet.as_view({'post': 'service'}), name='service'),
    path('service/edit-service/<int:pk>/', views.edit_service),
    path('service/delete-service/<int:pk>/', views.delete_service),
    
    path('package', views.getPackagesData),
    path('package/add-package', PackageViewSet.as_view({'post': 'package'}), name='package'),
]

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
from django.urls import path, include
from rest_framework import routers
from django.conf import settings

from dj_rest_auth.registration.views import VerifyEmailView

from accounts.api.viewsets import RegisterViewSet
# from accounts.api.views import GetMe

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

]

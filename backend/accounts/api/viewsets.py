from django.contrib.auth import get_user_model

from rest_framework import mixins, viewsets, status
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.viewsets import GenericViewSet
from rest_framework.response import Response

from .serializers import RegistrationSerializer
from .permissions import IsSelf
from django.db.models.functions import Concat
from django.db.models import Value
from django.db.models import Q

User = get_user_model()


# class UserViewSet(
#     mixins.ListModelMixin,
#     mixins.RetrieveModelMixin, 
#     mixins.UpdateModelMixin, 
#     GenericViewSet):
#     serializer_class = UserDetailSerializer
#     queryset = User.objects.all()
#     permission_classes = [IsAuthenticated, IsSelf]

#     def get_queryset(self):
#         queryset = User.objects.all().annotate(full_name=Concat('first_name', Value(' '), 'last_name'))

class RegisterViewSet(viewsets.ViewSet):
    serializer_class = RegistrationSerializer  
    @action(detail=False, methods=['post'], permission_classes=[AllowAny])
    def register(self, request):
        serializer = RegistrationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)  
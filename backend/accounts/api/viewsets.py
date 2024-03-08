from django.contrib.auth import get_user_model

from rest_framework import mixins
from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import GenericViewSet

from .serializers import UserSerializer, UserDetailSerializer
from .permissions import IsSelf
from django.db.models.functions import Concat
from django.db.models import Value
from django.db.models import Q

User = get_user_model()


class UserViewSet(
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin, 
    mixins.UpdateModelMixin, 
    GenericViewSet):
    serializer_class = UserDetailSerializer
    queryset = User.objects.all()
    permission_classes = [IsAuthenticated, IsSelf]

    def get_queryset(self):
        queryset = User.objects.all().annotate(full_name=Concat('first_name', Value(' '), 'last_name'))

        # Pagination
        page = self.request.query_params.get('page')
        limit = self.request.query_params.get('limit')
        has_writeup = self.request.query_params.get('hasWriteup')
        sort_by = self.request.query_params.get('sortBy')
        search_input = self.request.query_params.get('searchInput')
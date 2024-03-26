from django.contrib.auth import get_user_model, authenticate, login
from rest_framework.authtoken.models import Token

from rest_framework import mixins, viewsets, status
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.viewsets import GenericViewSet
from rest_framework.response import Response
from rest_framework.status import HTTP_401_UNAUTHORIZED

from .serializers import RegistrationSerializer, LoginSerializer, UserDetailSerializer
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
    
class LoginViewSet(viewsets.ViewSet):
    permission_classes = (AllowAny,)

    @action(detail=False, methods=['post'], permission_classes=[AllowAny])
    def login(self, request):
        serializer = LoginSerializer(data=request.data, context={'request': request})  # Pass request to serializer context
        serializer.is_valid(raise_exception=True)
        username = serializer.validated_data['username']
        password = serializer.validated_data['password']
        
        # Authenticate the user
        user = authenticate(request=request, username=username, password=password)  # Pass request to authenticate
        user_serializer = UserDetailSerializer(user)
        if user:
            # Log in the user
            login(request, user)  # Pass request to login
            token, _ = Token.objects.get_or_create(user=user)
            return Response({'message': 'Login successful', 'token': token.key, 'user': user_serializer.data}, status=status.HTTP_200_OK)
        else:   
            return Response({'error': 'Invalid username or password'}, status=status.HTTP_401_UNAUTHORIZED)

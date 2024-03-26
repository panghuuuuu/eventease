from rest_framework import authentication, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import UserDetailSerializer
from rest_framework.authtoken.serializers import AuthTokenSerializer
from rest_framework.authtoken.models import Token
class GetMe(APIView):
    serializer_class = UserDetailSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

    def get(self, request):
        if self.request.user.is_authenticated:
            serializer = UserDetailSerializer(self.request.user)
            token, created = Token.objects.get_or_create(user=self.request.user)
            return Response({
                "is_logged_in": True,
                "user": serializer.data,
                "token": token.key  # Manually include the token key
            })
        else:
            return Response({"is_logged_in": False, "user": None})

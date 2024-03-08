from rest_framework import authentication, permissions
from rest_framework.views import APIView
from rest_framework.response import Response

from .serializers import UserDetailSerializer

class GetMe(APIView):
    serializer_class = UserDetailSerializer
    permissions_classes = (permissions.IsAuthenticatedOrReadOnly,)

    def get(self, request):
        if self.request.user.is_authenticated:
            serializer = UserDetailSerializer(self.request.user)
            return Response({"is_logged_in": True, "user": serializer.data})
        else:
            return Response({"is_logged_in": False, "user": None})


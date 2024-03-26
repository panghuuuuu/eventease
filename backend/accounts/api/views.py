from rest_framework import authentication, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authtoken.serializers import AuthTokenSerializer
from rest_framework.authtoken.models import Token
# class GetMe(APIView):
#     serializer_class = UserDetailSerializer
#     permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

#     def get(self, request):
#         if self.request.user.is_authenticated:
#             serializer = self.serializer_class(self.request.user)
#             return Response({
#                 "is_logged_in": True,
#                 "user": serializer.data,
#                 "token": request.auth.key if request.auth else None  # Include token key if available
#             })
#         else:
#             return Response({"is_logged_in": False, "user": None})
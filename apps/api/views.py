from rest_framework.views import APIView, Response
from rest_framework import status


class HealthCheckView(APIView):
    def get(self, request, *args, **kwargs):
        return Response(status=status.HTTP_200_OK)

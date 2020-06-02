from django.contrib.auth import get_user_model, authenticate
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.models import Token
from rest_framework.generics import (
    CreateAPIView,
    UpdateAPIView,
    RetrieveAPIView,
    ListAPIView,
)
from apps.user.models import Transaction
from apps.user.serializers import (
    UserSerializer,
    UserCreateSerializer,
    ChangePasswordSerializer,
    TransactionSerializer,
)

User = get_user_model()


class LoginView(APIView):
    def post(self, *args, **kwargs):
        email = self.request.data.get("email")
        password = self.request.data.get("password")
        if email is None or password is None:
            return Response(
                {"error": "Please provide both username and password"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        user = authenticate(username=email, password=password)
        if not user:
            return Response(
                {"error": "Invalid Credentials"}, status=status.HTTP_404_NOT_FOUND
            )
        token, _ = Token.objects.get_or_create(user=user)
        return Response({"token": token.key}, status=status.HTTP_200_OK)


class UserDetail(RetrieveAPIView):
    """
    Returns the detail of the User authenticated.
    """

    serializer_class = UserSerializer
    permission_classes = (IsAuthenticated,)

    def get_object(self):
        return self.request.user


class UserCreate(CreateAPIView):
    """
    Creates a new non-active User instance.
    """

    serializer_class = UserCreateSerializer


class ChangePassword(UpdateAPIView):
    """
    Change the password of the user.
    """

    serializer_class = ChangePasswordSerializer
    permission_classes = (IsAuthenticated,)

    def get_object(self):
        return self.request.user


class TransactionList(ListAPIView):
    """
    Returns a list of all Transactions of the user.
    """

    serializer_class = TransactionSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        return Transaction.objects.filter(user=self.request.user)

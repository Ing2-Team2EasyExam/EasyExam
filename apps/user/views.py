from django.contrib.auth import get_user_model, authenticate
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.viewsets import ViewSet
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.models import Token
from rest_framework.generics import (
    CreateAPIView,
    UpdateAPIView,
    RetrieveUpdateAPIView,
    ListAPIView,
)
from apps.user.models import Transaction
from apps.user.serializers import (
    UserSerializer,
    UserCreateSerializer,
    ChangePasswordSerializer,
    TransactionSerializer,
)
from apps.user.services import generate_access_token, revoke_access_token
from .tasks import send_reset_password_email

User = get_user_model()


class LoginView(APIView):
    def post(self, *args, **kwargs):
        """
        Action on which the user perform a log in into the system, given out it's
        authentication token to them.

        API Params:
            email -- The email on which the user wants to log in
            password -- The password of the use
        Returns:
            token -- The token key on which the user need to set on the headers for
                    being authenticated
        """
        email = self.request.data.get("email")
        password = self.request.data.get("password")
        if email is None or password is None:
            return Response(
                {"error": "Please provide both username and password"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        user = authenticate(email=email, password=password)
        if not user:
            return Response(
                {"error": "Invalid Credentials"}, status=status.HTTP_404_NOT_FOUND
            )
        token = generate_access_token(user)
        return Response({"token": token.key}, status=status.HTTP_200_OK)


class LogoutView(APIView):
    permission_classes = (IsAuthenticated,)

    def delete(self, *args, **kwargs):
        """
        Action on which the user logs out of the system, deleting the authentication token
        from the database
        """
        user = self.request.user
        revoke_access_token(user)
        return Response(status=status.HTTP_200_OK)


class SendResetPasswordEmailView(APIView):
    def post(self, request, *args, **kwargs):
        send_reset_password_email.delay("cosme@fulanito.com", "123124")
        return Response(status=status.HTTP_200_OK)


class UserAccountView(RetrieveUpdateAPIView):
    """
    Returns the detail of the User authenticated.
    """

    serializer_class = UserSerializer
    permission_classes = (IsAuthenticated,)

    def get_object(self):
        return self.request.user


class ChangePasswordView(UpdateAPIView):
    """
    Change the password of the user.
    """

    serializer_class = ChangePasswordSerializer
    permission_classes = (IsAuthenticated,)

    def get_object(self):
        return self.request.user


### Legacy views
class UserCreate(CreateAPIView):
    """
    Creates a new non-active User instance.
    """

    serializer_class = UserCreateSerializer


class TransactionList(ListAPIView):
    """
    Returns a list of all Transactions of the user.
    """

    serializer_class = TransactionSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        return Transaction.objects.filter(user=self.request.user)

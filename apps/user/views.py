from django.contrib.auth import get_user_model
from rest_framework.generics import (
    CreateAPIView,
    UpdateAPIView,
    RetrieveAPIView,
    ListAPIView,
)
from rest_framework.permissions import IsAuthenticated

from apps.user.models import Transaction
from apps.user.serializers import (
    UserSerializer,
    UserCreateSerializer,
    ChangePasswordSerializer,
    TransactionSerializer,
)

User = get_user_model()


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

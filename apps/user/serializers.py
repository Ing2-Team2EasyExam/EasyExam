from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import check_password
from rest_framework import serializers
from rest_framework.serializers import ModelSerializer
from apps.user.services import create_inactive_user_from_email
from apps.user.models import Transaction

User = get_user_model()


class UserSerializer(ModelSerializer):
    """
    Serializer of the User model, used for reading the detail of a user.
    """

    class Meta:
        model = User
        fields = ("pk", "email", "is_active")
        extra_kwargs = {
            "email": {"read_only": True},
            "pk": {"read_only": True},
            "is_active": {"read_only": True},
        }


class UserCreateSerializer(ModelSerializer):
    """
    Serializer of the User model, used for creation of a user instance.
    """

    class Meta:
        model = User
        fields = ("email",)

    def create(self, validated_data):
        email = validated_data["email"]
        instance = create_inactive_user_from_email(email=email)
        return instance


class ChangePasswordSerializer(ModelSerializer):
    """
    Serializer of the User model, used specifically for changing the user's password.
    """

    old_password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ("old_password", "password")
        extra_kwargs = {"password": {"write_only": True}}

    def validate_old_password(self, value):
        if not check_password(value, self.context["request"].user.password):
            raise serializers.ValidationError("Invalid password")
        return value

    def update(self, instance, validated_data):
        password = validated_data.pop("password")
        instance.set_password(password)
        instance.save()
        return instance


class TransactionSerializer(ModelSerializer):
    """
    Serializer of the Transaction model.
    """

    class Meta:
        model = Transaction
        fields = ("change", "description")

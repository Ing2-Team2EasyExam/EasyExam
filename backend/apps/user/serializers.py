from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import check_password
from rest_framework import serializers
from rest_framework.serializers import ModelSerializer

from apps.user.models import Transaction

User = get_user_model()


class UserSerializer(ModelSerializer):
    """
    Serializer of the User model, used for reading the detail of a user.
    """

    class Meta:
        model = User
        fields = ("pk", "username", "email", "credits")
        extra_kwargs = {"credits": {"read_only": True}, "pk": {"read_only": True}}


class UserCreateSerializer(ModelSerializer):
    """
    Serializer of the User model, used for creation of a user instance.
    """

    class Meta:
        model = User
        fields = ("username", "email", "password", "credits", "pk")
        extra_kwargs = {
            "password": {"write_only": True},
            "credits": {"read_only": True},
            "pk": {"read_only": True},
        }

    def create(self, validated_data):
        password = validated_data.pop("password")
        instance = self.Meta.model(**validated_data)
        instance.set_password(password)
        instance.is_active = False
        instance.save()
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

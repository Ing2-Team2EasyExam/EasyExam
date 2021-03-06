from django.test import TestCase
from mixer.backend.django import mixer
from apps.user import serializers


class TestUserSerializers(TestCase):
    def setUp(self):
        self.email = "cosme@fulanito.com"
        self.user = mixer.blend("user.User", email=self.email)

    def test_user_serializer(self):
        user_data = {
            "email": self.user.email,
            "first_name": self.user.first_name,
            "last_name": self.user.last_name,
            "is_admin": self.user.is_admin,
        }
        serializer = serializers.UserSerializer(instance=self.user)
        self.assertEqual(serializer.data, user_data)

    def test_user_serializer_edition(self):
        user_data = {
            "email": self.user.email,
            "first_name": "Cosme",
            "last_name": "Fulanito",
        }
        serializer = serializers.UserSerializer(instance=self.user, data=user_data)
        self.assertTrue(serializer.is_valid())
        new_user = serializer.save()
        self.assertEqual(new_user.first_name, "Cosme")
        self.assertEqual(new_user.last_name, "Fulanito")

    def test_user_create_serializer(self,):
        email = "dave@newuser.com"
        first_name = "David"
        last_name = "Hasselhoff"
        data = {"email": email, "first_name": first_name, "last_name": last_name}
        create_serializer = serializers.UserCreateSerializer(data=data)
        self.assertTrue(create_serializer.is_valid())
        new_user = create_serializer.save()
        self.assertEqual(email, new_user.email)
        self.assertEqual(f"{first_name} {last_name}", new_user.full_name)

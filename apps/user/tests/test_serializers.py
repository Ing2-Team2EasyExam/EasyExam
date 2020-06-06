from django.test import TestCase
from mixer.backend.django import mixer
from apps.user import serializers


class TestUserSerializers(TestCase):
    def setUp(self):
        self.email = "cosme@fulanito.com"
        self.user = mixer.blend("user.User", email=self.email)

    def test_user_serializer(self):
        user_data = {
            "pk": self.user.pk,
            "email": self.user.email,
            "is_active": self.user.is_active,
        }
        serializer = serializers.UserSerializer(instance=self.user)
        self.assertEqual(serializer.data, user_data)

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

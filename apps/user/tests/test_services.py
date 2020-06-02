from django.test import TestCase
from mixer.backend.django import mixer
from rest_framework.authtoken.models import Token
from apps.user import services


class TestServices(TestCase):
    def setUp(self):
        self.user = mixer.blend("user.User")
        self.token = Token.objects.create(user=self.user)

    def test_generate_access_token(self):
        service_token = services.generate_access_token(self.user)
        self.assertEqual(service_token, self.token)

    def test_revoke_access_token(self):
        services.revoke_access_token(self.user)
        self.assertFalse(Token.objects.filter(user=self.user).exists())

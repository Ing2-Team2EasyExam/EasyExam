from django.test import TestCase
from mixer.backend.django import mixer


class TestUser(TestCase):
    def setUp(self):
        self.user_first_name = "Cosme"
        self.user_last_name = "Fulanito"
        self.user_email = "cosme@fulanito.com"
        self.user = mixer.blend(
            "user.User",
            email=self.user_email,
            first_name=self.user_first_name,
            last_name=self.user_last_name,
        )

    def test_fullname_property(self):
        self.assertEqual("Cosme Fulanito", self.user.fullname)

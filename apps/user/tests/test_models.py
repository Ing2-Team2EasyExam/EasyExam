from django.test import TestCase
from mixer.backend.django import mixer


class TestUser(TestCase):
    def setUp(self):
        self.first_name = "cosme"
        self.last_name = "fulanito"
        self.email = "cosme@fulanito.com"
        self.user = mixer.blend(
            "user.User",
            email=self.email,
            first_name=self.first_name,
            last_name=self.last_name,
        )

    def test_user_properties(self):
        self.assertEqual(self.user.fullname, "cosme fulanito")
        self.assertEqual(self.user.date_joined, self.user.created_at)
        self.assertFalse(self.user.is_admin)

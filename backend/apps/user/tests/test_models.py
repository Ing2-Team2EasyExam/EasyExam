from django.test import TestCase
from mixer.backend.django import mixer


class TestUser(TestCase):
    def setUp(self):
        self.user = mixer.blend(
            "apps.user",
            email="cosme@fulanito.com",
            first_name="cosme",
            last_name="fulanito",
        )

    def test_fullname(self):
        self.assertEqual(self.user.fullname, "cosme fulanito")

    def test_str(self):
        self.assertEqual(str(self.user), "1 cosme@fulanito.com")

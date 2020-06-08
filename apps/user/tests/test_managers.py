from django.test import TestCase
from django.contrib.auth.models import Group
from django.contrib.auth.models import Permission
from ..managers import UserManager
from ..models import User


class TestUserManager(TestCase):
    def setUp(self):
        self.email = "cosme@fulanito.com"
        self.password = "me da una copilla porfavor"
        self.manager = UserManager()
        self.manager.model = User

    def test_create_superuser(self):
        self.manager.create_superuser(email=self.email, password=self.password)
        user, created = User.objects.get_or_create(email=self.email)
        self.assertFalse(created)
        self.assertTrue(user.is_admin)
        self.assertTrue(user.groups.filter(name="admin").exists())

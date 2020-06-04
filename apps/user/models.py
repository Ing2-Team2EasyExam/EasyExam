from django.contrib.auth.models import PermissionsMixin
from django.contrib.auth.base_user import AbstractBaseUser
from django.db import models
from apps.exam.storage import OverwriteStorage
from django.conf import settings

from .managers import UserManager


class User(AbstractBaseUser, PermissionsMixin):

    # Credentials
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    is_active = models.BooleanField(default=False)

    # Dates
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    # Profile image
    image = models.ImageField(
        upload_to=settings.USER_IMAGE_PATH,
        storage=OverwriteStorage(),
        blank=True,
        null=True,
    )

    objects = UserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    class Meta:
        verbose_name = "user"
        verbose_name_plural = "users"

    @property
    def is_admin(self):
        return self.is_superuser

    @property
    def full_name(self):
        return f"{self.first_name} {self.last_name}"

    @property
    def username(self):
        return self.email


class Transaction(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    change = models.IntegerField()
    description = models.CharField(max_length=200)

    class Meta:
        abstract = True

    def save(self, *args, **kwargs):
        super(Transaction, self).save(*args, **kwargs)
        # self.user.credits += self.change
        self.user.save()

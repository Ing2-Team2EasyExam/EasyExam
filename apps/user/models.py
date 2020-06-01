from django.contrib.auth.models import AbstractUser
from django.db import models
from apps.exam.storage import OverwriteStorage
from django.conf import settings


class User(AbstractUser):
    email = models.EmailField(unique=True, blank=False)
    updated_at = models.DateTimeField(auto_now=True)
    image = models.ImageField(
        upload_to=settings.USER_IMAGE_PATH,
        storage=OverwriteStorage(),
        blank=True,
        null=True,
    )

    @property
    def is_admin(self):
        return self.is_superuser

    @property
    def fullname(self):
        return f"{self.first_name} {self.last_name}"

    @property
    def created_at(self):
        return self.date_joined


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

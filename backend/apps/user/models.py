from django.contrib.auth.models import AbstractUser
from django.db import models
from datetime import datetime


class User(AbstractUser):
    email = models.EmailField(blank=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    @property
    def fullname(self):
        return f"{self.first_name} {self.last_name}"

    @property
    def is_admin(self):
        return self.is_superuser


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

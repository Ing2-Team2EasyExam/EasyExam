from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    email = models.EmailField(blank=False)
    credits = models.IntegerField(default=0)


class Transaction(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    change = models.IntegerField()
    description = models.CharField(max_length=200)

    def save(self, *args, **kwargs):
        super(Transaction, self).save(*args, **kwargs)
        self.user.credits += self.change
        self.user.save()

from datetime import timezone

from django.contrib.auth.base_user import AbstractBaseUser
from django.contrib.auth.models import User, PermissionsMixin
from django.db import models
from datetime import timezone


# Create your models here.

WEIGHT_UNITS = (
    ('kg', 'kg'),
    ('g', 'g')
)


class Product(models.Model):
    product_name = models.CharField(max_length=255)
    product_weight = models.IntegerField()
    description = models.TextField(null=True, blank=True)
    weight_unit = models.CharField(max_length=2, choices=WEIGHT_UNITS, default='g')
    image = models.ImageField(upload_to="images/", null=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    price = models.IntegerField(default=0)

    def __str__(self):
        return f"{self.product_name} {self.product_weight}гр"


class UserAddress(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    address = models.TextField()
    mobile = models.CharField(max_length=20)
    city = models.CharField(max_length=50)
    municipality = models.CharField(max_length=50)



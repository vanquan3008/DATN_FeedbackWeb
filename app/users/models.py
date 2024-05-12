from django.db import models
from django.utils import timezone

# Create your models here.
class User(models.Model):
    user_id = models.AutoField(primary_key=True)
    fullname = models.CharField(max_length=50)
    email = models.EmailField(unique=True)
    password_user = models.CharField(max_length=256)
    age = models.FloatField(null=True, blank=True)
    domain_work = models.CharField(max_length=20, null=True, blank=True)
    numberphone = models.CharField(max_length=12, null=True, blank=True)
    address = models.CharField(max_length=50, null=True, blank=True)
    url_image = models.URLField(max_length=200, null=True, blank=True)

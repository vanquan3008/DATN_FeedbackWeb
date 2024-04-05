from django.db import models


# Create your models here.
class user(models.Model):
    fullname = models.CharField(max_length=100)
    email = models.CharField(max_length=100, primary_key=True, unique=True)
    numberphone = models.CharField(max_length=100, null=True)
    age = models.IntegerField(null=True)
    address = models.CharField(max_length=100, null=True)
    domain = models.CharField(max_length=100, null=True)
    password = models.CharField(
        max_length=1024,
    )
    url_image = models.CharField(max_length=200, null=True)

    class Meta:
        db_table = "users"

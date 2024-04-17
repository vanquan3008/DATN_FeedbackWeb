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


class Post(models.Model):
    id_post = models.AutoField(primary_key=True)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    date_post = models.DateTimeField(default=timezone.now)
    title_post = models.CharField(max_length=300 ,null=True)
    content_post = models.CharField(max_length=300)
    image_content_url = models.URLField(max_length=200, null=True, blank=True)
    list_likes = models.TextField(null=True, blank=True)
    sentiment = models.FloatField(null=True, blank=True)


class Detail_post(models.Model):
    id_post = models.ForeignKey(Post, on_delete=models.CASCADE)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    comment_id = models.AutoField(primary_key=True)
    comment_content = models.CharField(max_length=500)


class Report(models.Model):
    id_report = models.AutoField(primary_key=True)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    date_create = models.DateTimeField(default=timezone.now)
    url_report = models.URLField(max_length=200)
    number_pos = models.IntegerField()
    number_neu = models.IntegerField()
    number_neg = models.IntegerField()


class Result_file(models.Model):
    id_file = models.AutoField(primary_key=True)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    file_name = models.CharField(max_length=50)
    date_save = models.DateTimeField(default=timezone.now)
    number_pos = models.IntegerField()
    number_neu = models.IntegerField()
    number_neg = models.IntegerField()


class Result_text(models.Model):
    id_text = models.AutoField(primary_key=True)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    text_content = models.CharField(max_length=10000)
    date_save = models.DateTimeField(default=timezone.now)
    sentiment = models.FloatField(null=True, blank=True)

from django.db import models
from users.models import User
from django.utils import timezone


# Create your models here.
class Post(models.Model):
    id_post = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, db_column="user_id")
    date_post = models.DateTimeField(default=timezone.now)
    title_post = models.CharField(max_length=300, null=True)
    content_post = models.CharField(max_length=300)
    image_content_url = models.URLField(max_length=200, null=True, blank=True)
    list_likes = models.TextField(null=True, blank=True)
    sentiment = models.TextField(null=True, blank=True)


# class Detail_post(models.Model):
#     post = models.ForeignKey(Post, on_delete=models.CASCADE)
#     user= models.ForeignKey(User, on_delete=models.CASCADE, db_column="user_id")
#     comment_id = models.AutoField(primary_key=True)
#     comment_content = models.CharField(max_length=500)
#     # date_comment = models.DateTimeField(default=timezone.now)


class Report(models.Model):
    id_report = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, db_column="user_id")
    date_create = models.DateTimeField(default=timezone.now)
    url_report = models.URLField(max_length=200)
    number_pos = models.IntegerField()
    number_neu = models.IntegerField()
    number_neg = models.IntegerField()


class Result_file(models.Model):
    id_file = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, db_column="user_id")
    file_name = models.CharField(max_length=50)
    date_save = models.DateTimeField(default=timezone.now)
    number_pos = models.IntegerField()
    number_neu = models.IntegerField()
    number_neg = models.IntegerField()


class Result_text(models.Model):
    id_text = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, db_column="user_id")
    text_content = models.CharField(max_length=10000)
    date_save = models.DateTimeField(default=timezone.now)
    sentiment = models.TextField(null=True, blank=True)
    detail_sentiment = models.CharField(max_length=10000)

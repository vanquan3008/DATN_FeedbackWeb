from django.db import models
from users.models import User
from django.utils import timezone


# Create your models here.
class Result_file(models.Model):
    id_file = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, db_column="user_id")
    file_name = models.CharField(max_length=50)
    date_save = models.DateTimeField(default=timezone.now)
    based_aspected = models.CharField(max_length=100000)
    emotion_sentiment = models.CharField(max_length=100000)
    attitude_sentiment = models.CharField(max_length=100000)
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

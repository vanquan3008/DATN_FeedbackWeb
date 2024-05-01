from django.db import models
from users.models import User
from posts.models import Post
from django.utils import timezone
# Create your models here.
    
class Detail_post(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    user= models.ForeignKey(User, on_delete=models.CASCADE, db_column="user_id")
    comment_id = models.AutoField(primary_key=True)
    comment_content = models.CharField(max_length=500)
    date_comment = models.DateTimeField(default=timezone.now)
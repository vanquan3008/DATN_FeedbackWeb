from django.contrib import admin
from .models import User, Post, Report, Detail_post, Result_file, Result_text

# Register your models here.
admin.site.register(User)
admin.site.register(Post)
admin.site.register(Report)
admin.site.register(Detail_post)
admin.site.register(Result_file)
admin.site.register(Result_text)

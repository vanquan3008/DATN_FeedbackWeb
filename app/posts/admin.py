from django.contrib import admin
from .models import  Post, Report, Result_file, Result_text

# Register your models here.

admin.site.register(Post)
admin.site.register(Report)
admin.site.register(Result_file)
admin.site.register(Result_text)

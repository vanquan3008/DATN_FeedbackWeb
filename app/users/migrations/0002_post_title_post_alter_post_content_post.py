# Generated by Django 5.0.4 on 2024-04-17 08:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='post',
            name='title_post',
            field=models.CharField(max_length=300, null=True),
        ),
        migrations.AlterField(
            model_name='post',
            name='content_post',
            field=models.CharField(max_length=300),
        ),
    ]

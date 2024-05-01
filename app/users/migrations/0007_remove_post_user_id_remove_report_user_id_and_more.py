# Generated by Django 5.0.4 on 2024-05-01 15:13

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0006_alter_post_sentiment_alter_result_text_sentiment'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='post',
            name='user_id',
        ),
        migrations.RemoveField(
            model_name='report',
            name='user_id',
        ),
        migrations.RemoveField(
            model_name='result_file',
            name='user_id',
        ),
        migrations.RemoveField(
            model_name='result_text',
            name='user_id',
        ),
        migrations.DeleteModel(
            name='Detail_post',
        ),
        migrations.DeleteModel(
            name='Post',
        ),
        migrations.DeleteModel(
            name='Report',
        ),
        migrations.DeleteModel(
            name='Result_file',
        ),
        migrations.DeleteModel(
            name='Result_text',
        ),
    ]
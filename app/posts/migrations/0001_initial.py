# Generated by Django 5.0.4 on 2024-05-01 15:13

import django.db.models.deletion
import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('users', '0007_remove_post_user_id_remove_report_user_id_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='Post',
            fields=[
                ('id_post', models.AutoField(primary_key=True, serialize=False)),
                ('date_post', models.DateTimeField(default=django.utils.timezone.now)),
                ('title_post', models.CharField(max_length=300, null=True)),
                ('content_post', models.CharField(max_length=300)),
                ('image_content_url', models.URLField(blank=True, null=True)),
                ('list_likes', models.TextField(blank=True, null=True)),
                ('sentiment', models.TextField(blank=True, null=True)),
                ('user', models.ForeignKey(db_column='user_id', on_delete=django.db.models.deletion.CASCADE, to='users.user')),
            ],
        ),
        migrations.CreateModel(
            name='Detail_post',
            fields=[
                ('comment_id', models.AutoField(primary_key=True, serialize=False)),
                ('comment_content', models.CharField(max_length=500)),
                ('user', models.ForeignKey(db_column='user_id', on_delete=django.db.models.deletion.CASCADE, to='users.user')),
                ('post', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='posts.post')),
            ],
        ),
        migrations.CreateModel(
            name='Report',
            fields=[
                ('id_report', models.AutoField(primary_key=True, serialize=False)),
                ('date_create', models.DateTimeField(default=django.utils.timezone.now)),
                ('url_report', models.URLField()),
                ('number_pos', models.IntegerField()),
                ('number_neu', models.IntegerField()),
                ('number_neg', models.IntegerField()),
                ('user', models.ForeignKey(db_column='user_id', on_delete=django.db.models.deletion.CASCADE, to='users.user')),
            ],
        ),
        migrations.CreateModel(
            name='Result_file',
            fields=[
                ('id_file', models.AutoField(primary_key=True, serialize=False)),
                ('file_name', models.CharField(max_length=50)),
                ('date_save', models.DateTimeField(default=django.utils.timezone.now)),
                ('number_pos', models.IntegerField()),
                ('number_neu', models.IntegerField()),
                ('number_neg', models.IntegerField()),
                ('user', models.ForeignKey(db_column='user_id', on_delete=django.db.models.deletion.CASCADE, to='users.user')),
            ],
        ),
        migrations.CreateModel(
            name='Result_text',
            fields=[
                ('id_text', models.AutoField(primary_key=True, serialize=False)),
                ('text_content', models.CharField(max_length=10000)),
                ('date_save', models.DateTimeField(default=django.utils.timezone.now)),
                ('sentiment', models.TextField(blank=True, null=True)),
                ('detail_sentiment', models.CharField(max_length=10000)),
                ('user', models.ForeignKey(db_column='user_id', on_delete=django.db.models.deletion.CASCADE, to='users.user')),
            ],
        ),
    ]

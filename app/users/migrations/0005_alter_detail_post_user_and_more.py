# Generated by Django 5.0.3 on 2024-04-28 02:14

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0004_result_text_detail_sentiment'),
    ]

    operations = [
        migrations.AlterField(
            model_name='detail_post',
            name='user',
            field=models.ForeignKey(db_column='user_id', on_delete=django.db.models.deletion.CASCADE, to='users.user'),
        ),
        migrations.RenameField(
            model_name='detail_post',
            old_name='user',
            new_name='user_id',
        ),
        migrations.AlterField(
            model_name='post',
            name='user',
            field=models.ForeignKey(db_column='user_id', on_delete=django.db.models.deletion.CASCADE, to='users.user'),
        ),
        migrations.RenameField(
            model_name='post',
            old_name='user',
            new_name='user_id',
        ),
        migrations.AlterField(
            model_name='report',
            name='user',
            field=models.ForeignKey(db_column='user_id', on_delete=django.db.models.deletion.CASCADE, to='users.user'),
        ),
        migrations.RenameField(
            model_name='report',
            old_name='user',
            new_name='user_id',
        ),
        migrations.AlterField(
            model_name='result_file',
            name='user',
            field=models.ForeignKey(db_column='user_id', on_delete=django.db.models.deletion.CASCADE, to='users.user'),
        ),
        migrations.RenameField(
            model_name='result_file',
            old_name='user',
            new_name='user_id',
        ),
        migrations.AlterField(
            model_name='result_text',
            name='user',
            field=models.ForeignKey(db_column='user_id', on_delete=django.db.models.deletion.CASCADE, to='users.user'),
        ),
        migrations.RenameField(
            model_name='result_text',
            old_name='user',
            new_name='user_id',
        ),
    ]

# Generated by Django 5.1.2 on 2024-11-29 20:23

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('tracks', '0002_remove_track_user'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='track',
            name='cover_image',
        ),
    ]

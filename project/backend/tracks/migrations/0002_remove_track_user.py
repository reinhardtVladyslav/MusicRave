# Generated by Django 5.1.2 on 2024-11-29 20:22

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('tracks', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='track',
            name='user',
        ),
    ]

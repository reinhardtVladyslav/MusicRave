# Generated by Django 5.1.2 on 2024-11-20 00:17

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='users',
            old_name='first_name',
            new_name='username',
        ),
        migrations.RemoveField(
            model_name='users',
            name='last_name',
        ),
    ]

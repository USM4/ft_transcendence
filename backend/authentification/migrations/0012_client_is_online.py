# Generated by Django 5.1.3 on 2024-11-18 20:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authentification', '0011_alter_client_secret_key'),
    ]

    operations = [
        migrations.AddField(
            model_name='client',
            name='is_online',
            field=models.BooleanField(default=True),
        ),
    ]

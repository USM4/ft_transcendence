# Generated by Django 5.1.1 on 2024-10-02 00:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authentification', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='client',
            name='username',
            field=models.CharField(default='hhhh', max_length=255, unique=True),
        ),
    ]
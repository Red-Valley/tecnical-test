# Generated by Django 3.1 on 2021-10-25 19:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0003_auto_20211025_1927'),
    ]

    operations = [
        migrations.RenameField(
            model_name='account',
            old_name='identiy',
            new_name='identity',
        ),
        migrations.AlterField(
            model_name='account',
            name='phone_number',
            field=models.CharField(blank=True, max_length=80, null=True, verbose_name='Telefono'),
        ),
    ]

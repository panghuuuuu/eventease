# Generated by Django 5.0.2 on 2024-04-18 14:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('services', '0004_review_review_user'),
    ]

    operations = [
        migrations.AlterField(
            model_name='review',
            name='review_body',
            field=models.TextField(max_length=10000),
        ),
    ]
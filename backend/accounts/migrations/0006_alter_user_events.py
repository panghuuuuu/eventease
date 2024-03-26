# Generated by Django 5.0.2 on 2024-03-26 04:35

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("accounts", "0005_alter_user_birthday"),
        ("events", "0001_initial"),
    ]

    operations = [
        migrations.AlterField(
            model_name="user",
            name="events",
            field=models.ManyToManyField(
                blank=True, related_name="participants", to="events.event"
            ),
        ),
    ]

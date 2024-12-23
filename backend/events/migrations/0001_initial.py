# Generated by Django 5.0.2 on 2024-04-23 08:14

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):
    initial = True

    dependencies = [
        ("services", "0001_initial"),
    ]

    operations = [
        migrations.CreateModel(
            name="ChosenService",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "package",
                    models.ForeignKey(
                        default=0,
                        on_delete=django.db.models.deletion.CASCADE,
                        to="services.package",
                    ),
                ),
                (
                    "service",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to="services.service",
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="Event",
            fields=[
                (
                    "event_name",
                    models.CharField(default="Default Event Name", max_length=200),
                ),
                (
                    "event_type",
                    models.CharField(
                        choices=[
                            ("WEDDING", "Wedding"),
                            ("BIRTHDAY", "Birthday"),
                            ("PROM", "Prom"),
                            ("CORPORATE MEEING", "Corporate Meeting"),
                            ("SEMINAR", "Seminar"),
                            ("PARTY", "Party"),
                        ],
                        default="Party",
                        max_length=20,
                    ),
                ),
                ("event_start_date", models.DateField(blank=True)),
                ("event_end_date", models.DateField(blank=True)),
                ("budget", models.FloatField()),
                ("pax", models.IntegerField()),
                ("created", models.DateTimeField(auto_now_add=True)),
                ("id", models.AutoField(primary_key=True, serialize=False)),
                (
                    "services",
                    models.ManyToManyField(
                        blank=True,
                        null=True,
                        related_name="event_services",
                        to="events.chosenservice",
                    ),
                ),
            ],
        ),
        migrations.AddField(
            model_name="chosenservice",
            name="event",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE, to="events.event"
            ),
        ),
    ]

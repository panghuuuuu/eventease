# Generated by Django 5.0.2 on 2024-04-19 05:43

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('services', '0002_review'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AlterField(
            model_name='review',
            name='review_body',
            field=models.TextField(max_length=10000),
        ),
        migrations.CreateModel(
            name='Reports',
            fields=[
                ('report_id', models.AutoField(primary_key=True, serialize=False)),
                ('report_datetime', models.DateTimeField(auto_now_add=True)),
                ('report_title', models.TextField(max_length=50)),
                ('report_body', models.TextField(max_length=2000)),
                ('reported_service', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='services.service')),
                ('reporting_user', models.ForeignKey(default=0, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
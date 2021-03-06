# Generated by Django 2.2.13 on 2020-07-19 22:04

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ("exam", "0003_add_unique_together"),
    ]

    operations = [
        migrations.AlterField(
            model_name="exam",
            name="course_name",
            field=models.CharField(blank=True, max_length=100),
        ),
        migrations.AlterField(
            model_name="exam", name="due_date", field=models.DateField(blank=True)
        ),
        migrations.AlterField(
            model_name="exam", name="end_time", field=models.TimeField(blank=True)
        ),
        migrations.AlterField(
            model_name="exam", name="start_time", field=models.TimeField(blank=True)
        ),
        migrations.AlterField(
            model_name="exam",
            name="teacher",
            field=models.CharField(blank=True, max_length=100),
        ),
        migrations.AlterField(
            model_name="exam",
            name="university",
            field=models.CharField(blank=True, max_length=100),
        ),
        migrations.AlterUniqueTogether(
            name="exam", unique_together={("name", "owner", "created_at")}
        ),
    ]

# Generated by Django 5.0.3 on 2024-04-25 12:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Platform', '0005_rename__id_utilisateur_database_id_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='etudiant',
            name='search_sujet_here',
            field=models.BooleanField(default=True),
        ),
    ]

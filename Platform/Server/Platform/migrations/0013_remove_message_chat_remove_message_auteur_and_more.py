# Generated by Django 5.0.3 on 2024-05-15 14:31

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('Platform', '0012_remove_etudiant_liste_de_choix_remove_etudiant_pfe_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='message',
            name='chat',
        ),
        migrations.RemoveField(
            model_name='message',
            name='auteur',
        ),
        migrations.DeleteModel(
            name='Chat',
        ),
        migrations.DeleteModel(
            name='Message',
        ),
    ]

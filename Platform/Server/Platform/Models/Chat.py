from django.db import models

# class Chat(models.Model):
#     id = models.AutoField(primary_key=True)
#     etudiant = models.ForeignKey("Etudiant", on_delete=models.CASCADE, related_name="chat")
#     encadreur = models.ForeignKey("Encadreur", on_delete=models.CASCADE, related_name="chat")

# class Message(models.Model):
#     id   = models.AutoField(primary_key=True)

#     text = models.TextField()
#     date = models.DateTimeField(auto_now_add= True)
#     etat = models.BooleanField()
#     chat = models.ForeignKey(Chat, on_delete=models.CASCADE, related_name="messages")
#     auteur = models.ForeignKey("Utilisateur", on_delete=models.CASCADE)

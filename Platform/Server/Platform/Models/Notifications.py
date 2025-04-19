from django.db import models
from datetime import datetime
# from .Subjets import SujetEncadreur


# Types
NOTIFICATION_FIN_SOUMISSION_SUJET = 1
NOTIFICATION_SUJET_AFFECTE = 2
NOTIFICATION_GENERAL = 3
NOTIFICATION_DELAI = 4

class Notification(models.Model):
    id = models.AutoField(primary_key=True)
    
    date = models.DateTimeField(auto_now_add= True)
    lu = models.BooleanField()
    destinataire = models.ForeignKey("Utilisateur", on_delete=models.CASCADE, related_name="notification")

    child_type = models.PositiveSmallIntegerField()

    @classmethod
    def create(cls, date, destinataire, lu, child_type):
        temp = cls(date=date, destinataire=destinataire, lu=lu, child_type=child_type)
        temp.save()
        return temp

    @classmethod
    def get(cls, id):
        return cls.objects.get(id=id)

    @classmethod
    def filter_non_lu(cls, destinataire):
        return cls.objects.filter(lu=False, destinataire=destinataire)



    def set_lu(self, lu):
        self.lu = lu

    def dict(self, _dict=None):
        if _dict is None:
            _dict = {}
        _dict["id"] = self.id
        _dict["date"] = self.date.strftime("%Y-%m-%d %H:%M:%S")
        _dict["lu"] = self.lu
        return _dict

    def get_sub_object(self) -> "NotificationSujetAffecte|NotificationDelai":
        if self.child_type == NOTIFICATION_SUJET_AFFECTE:
            return self.notification_sujet_affecte
        if self.child_type == NOTIFICATION_DELAI:
            return self.notification_delai
        if self.child_type == NOTIFICATION_FIN_SOUMISSION_SUJET:
            return self.notification_fin_soumission_sujet
        if self.child_type == NOTIFICATION_GENERAL:
            return self.notification_general


    def get_full_object(self):
        return self.get_sub_object().get_full_object()
    

class NotificationGeneral(models.Model):
    message = models.TextField()

    parent = models.OneToOneField(Notification, on_delete=models.CASCADE, related_name="notification_general")

    @classmethod
    def create(cls, destination, message, date=None):
        if date is None:
            date = datetime.now()
        temp = cls(message=message,
                   parent=Notification.create(date=date, destinataire=destination, lu=False, child_type=NOTIFICATION_GENERAL))
        temp.save()
        return temp


    def save(self):
        self.parent.save()
        super().save()

    def get_full_object(self):
        return self

    def get_type_str(self):
        return "general"
    
    def set_lu(self, lu):
        self.parent.set_lu(lu)

    def dict(self, _dict=None):
        if _dict is None:
            _dict = {}
        _dict = self.parent.dict(_dict)
        _dict["type"] = self.get_type_str()
        _dict["message"] = self.message
        return _dict
        
        

class NotificationSujetAffecte(models.Model):
    sujet = models.ForeignKey("Sujet", on_delete=models.CASCADE)

    parent = models.OneToOneField(Notification, on_delete=models.CASCADE, related_name="notification_sujet_affecte")

    @classmethod
    def create(cls, date, destination, sujet):
        temp = cls(sujet=sujet, 
                   parent=Notification.create(date=date, destinataire=destination, lu=False, child_type=NOTIFICATION_SUJET_AFFECTE))
        temp.save()
        return temp

    def save(self):
        self.parent.save()
        super().save()

    def get_full_object(self):
        return self

    def get_type_str(self):
        return "projet-attribue"

    def set_lu(self, lu):
        self.parent.set_lu(lu)


    def dict(self, _dict=None):
        if _dict is None:
            _dict = {}
        _dict = self.parent.dict(_dict)
        _dict["type"] = self.get_type_str()
        return _dict


class NotificationDelai(models.Model):
    delai = models.DateTimeField()
    parent = models.OneToOneField(Notification, on_delete=models.CASCADE, related_name="notification_delai")
    message = models.TextField()


    @classmethod
    def create(cls, date, destination, delai, message):
        temp = cls(delai=delai, message=message,
                   parent=Notification.create(date=date, destinataire=destination, lu=False, child_type=NOTIFICATION_DELAI))
        temp.save()
        return temp
    
    def save(self):
        self.parent.save()
        super().save()

    def get_full_object(self):
        return self

    def get_type_str(self):
        return "delai"
    
    def set_lu(self, lu):
        self.parent.set_lu(lu)

    def dict(self, _dict=None):
        if _dict is None:
            _dict = {}
        _dict = self.parent.dict(_dict)
        _dict["type"] = self.get_type_str()
        _dict["delai"] = self.delai.strftime("%Y-%m-%d %H:%M:%S")
        _dict["message"] = self.message
        return _dict
    
# class NotificationFinSoumissionSujet(models.Model):
#     message = models.TextField()

#     parent = models.OneToOneField(Notification, on_delete=models.CASCADE, related_name="notification_fin_soumission_sujet")

#     @classmethod
#     def create(cls, date, destination, message):
#         temp = cls(message=message,
#                    parent=Notification.create(date=date, destinataire=destination, lu=False, child_type=NOTIFICATION_FIN_SOUMISSION_SUJET))
#         temp.save()
#         return temp

#     def save(self):
#         self.parent.save()
#         super().save()

#     def get_full_object(self):
#         return self

#     def get_type_str(self):
#         return "Fin soumission sujet"
    
#     def set_lu(self, lu):
#         self.parent.set_lu(lu)

#     def dict(self, _dict=None):
#         if _dict is None:
#             _dict = {}
#         _dict = self.parent.dict(_dict)
#         _dict["type"] = self.get_type_str()
#         _dict["message"] = self.message
#         return _dict

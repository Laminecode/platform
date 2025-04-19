from typing import Any, List, Self
from django.db import models
from .Notifications import *
from datetime import datetime
from typing import Union
from django.db.models import Q, Count, F
from Server_side.utils import Config, str_to_datetime

# from .Subjets import SujetEncadreur

# Types
ETUDIANT		= 0
ENCADREUR		= 1
ADMINISTRATEUR 	= 2

class Utilisateur(models.Model):
    database_id   = models.AutoField(primary_key=True)
    
    child_type = models.PositiveSmallIntegerField()

    @classmethod
    def get(cls, user_id) -> "Utilisateur":
        return cls.objects.get(user_id=user_id)
    
    @classmethod
    def create(cls, child_type):
        temp = cls(child_type=child_type)
        temp.save()
        return temp
    
    def get_notifications_non_lu(self):
        return Notification.filter_non_lu(self)


    def get_full_object(self):
        return self.get_sub_object().get_full_object()

    def get_sub_object(self) -> "Encadreur|Etudiant|Administrateur":
        if self.child_type == ADMINISTRATEUR:
            return self.administrateur
        if self.child_type == ENCADREUR:
            return self.encadreur
        if self.child_type == ETUDIANT:
            return self.etudiant
        


    def get_id(self):
        return self.user_id
    def set_id(self, value):
        self.user_id = value

    def get_type(self):
        return self.child_type
    def get_type_str(self):
        if self.child_type == ETUDIANT:
            return "etudiant"
        if self.child_type == ENCADREUR:
            return "encadreur"
        if self.child_type == ADMINISTRATEUR:
            return "administrateur"


    def dict(self, _dict=None):
        return {}
    
class Administrateur(models.Model):
    username = models.CharField(max_length=100)
    user_id = models.CharField(max_length=100) #unique 
    password = models.CharField(max_length=100)
    superuser = models.BooleanField(default=False)

    parent = models.OneToOneField(Utilisateur, on_delete=models.CASCADE, related_name="administrateur")

    @classmethod
    def get(cls, user_id) -> "Administrateur":
        try:
            return Administrateur.objects.get(user_id=user_id)
        except:
            return None

    @classmethod
    def exist(cls, user_id):
        return cls.objects.filter(user_id=user_id).exists()

    @classmethod
    def create(cls, user_id, password, username="", superuser=False):
        temp = cls(username=username, user_id=user_id, password=password, superuser=superuser,
                   parent=Utilisateur.create(child_type=ADMINISTRATEUR))
        temp.save()
        return temp

    @classmethod
    def all(cls):
        return cls.objects.all()
    
    @classmethod
    def all_except_self(cls, user_id):
        return cls.objects.exclude(user_id=user_id)


    def save(self):
        self.parent.save()
        super().save()

    def delete(self):
        super().delete()
        self.parent.delete()
    

    def get_full_object(self):
        return self

    def get_sub_class(self):
        return self
    
    def get_user_id(self):
        return self.user_id
    def set_user_id(self, value):
        self.user_id = value

    def get_password(self):
        return self.password
    def set_password(self, value):
        self.password = value
    
    def get_username(self):
        return self.username
    def set_username(self, value):
        self.username = value
    
    def get_superuser(self):
        return self.superuser

    def get_notifications_non_lu(self):
        return self.parent.get_notifications_non_lu()

    def _dict1(self, _dict=None):
        if _dict is None:
            _dict = {}

        _dict["username"] = self.username
        return _dict
    
    def _dict2(self, _dict=None):
        if _dict is None:
            _dict = {}
            
        _dict = self._dict1(_dict)
        _dict["password"] = self.password
        _dict["user_id"] = self.user_id
        _dict["superuser"] = self.superuser
        return _dict
    
    def dict_for_super_admin(self, _dict=None):
        if _dict is None:
            _dict = {}

        _dict["admin"] = self._dict2()
        return _dict
                
    def dict_for_self(self, _dict=None):
        if _dict is None:
            _dict = {}

        _dict["admin"] = self._dict2()
        return _dict
    

class Choix(models.Model):
    id = models.AutoField(primary_key=True)
    groupe = models.ForeignKey("Groupe", on_delete=models.CASCADE, related_name="liste_choix")
    projet = models.ForeignKey("Sujet", on_delete=models.CASCADE, related_name="groupe_liste_choix")
    order = models.IntegerField()


    @classmethod
    def create(cls, groupe, projet, order):
        temp = cls(groupe=groupe, projet=projet, order=order)
        temp.save()
        return temp
    
    def get_projet(self) -> "Sujet":
        return self.projet
    def get_groupe(self):
        return self.groupe
    def get_order(self):
        return self.order
    def set_order(self, value):
        self.order = value

    def __str__(self) -> str:
        return f"{self.projet.get_titre()} - {self.order}"

class Groupe(models.Model):
    id = models.AutoField(primary_key=True)
    active = models.BooleanField(default=True)
    annee = models.IntegerField(default=datetime.now().year)
    palier = models.CharField(max_length=100)
    specialite = models.CharField(max_length=100)
    
    #following attr not init in constructor
    PFE = models.OneToOneField("Sujet", null=True,  on_delete=models.CASCADE, related_name='groupe')
    encadreur_favoris = models.ManyToManyField('Encadreur')
    sujet_favoris = models.ManyToManyField('Sujet', related_name='groupe_favoris')
    # liste_choix = models.ManyToManyField("Sujet", related_name='groupe_liste_choix')


    # etudiants: models.ManyToManyField["Etudiant"]

    @classmethod
    def create(cls, active=True, annee=0, palier="", specialite=""):
        annee = annee if annee != 0 else datetime.now().year
        temp = cls(active=active, annee=annee, palier=palier, specialite=specialite)
        temp.save()
        return temp

    @classmethod
    def get(cls, id):
        return cls.objects.get(id=id)

    @classmethod
    def all(cls):
        return cls.objects.all()

    @classmethod
    def all_active(cls):
        return cls.all().filter(active=True)

    @classmethod
    def count_active(cls):
        return cls.objects.filter(active=True).count()

    @classmethod
    def count_inactive(cls):
        return cls.objects.filter(active=False).count()
    
    @classmethod
    def count_pfe(cls):
        return cls.objects.filter(PFE__isnull=False).count()
    
    @classmethod
    def count_no_pfe(cls):
        return cls.objects.filter(PFE__isnull=True).count()
    
    @classmethod
    def filter_no_pfe(cls, queryset=None):
        if queryset is None:
            queryset = cls.all()
        return queryset.filter(PFE__isnull=True)
    

    def notify_sujet_affecte(self):
        etudiant: Etudiant
        for etudiant in self.get_etudiants():
            NotificationSujetAffecte.create(date=datetime.now(), destination=etudiant.get_parent(), sujet=self.get_pfe())

    def notify_no_sujet_affecte(self):
        etudiant: Etudiant
        for etudiant in self.get_etudiants():
            NotificationGeneral.create(date=datetime.now(), destination=etudiant.get_parent(), message="Aucun projet n'a été attribué pour vous")


    def delete(self):
        self.remove_pfe()
        self.clear_encadreur_favoris()
        self.clear_sujet_favoris()
        self.clear_liste_de_choix()
        for etudiant in self.get_etudiants():
            etudiant.delete()
        super().delete()


    def _dict1(self, _dict=None):
        if _dict is None:
            _dict = {}
        _dict["id"] = self.id
        _dict["palier"] = self.palier
        _dict["annee"] = self.annee
        _dict["specialite"] = self.specialite
    
        return _dict
    
    
    def dict_for_encadreur(self, _dict=None):
        if _dict is None:
            _dict = {}
        _dict["groupe"] = self._dict1()
        return _dict
    
    def _dict2(self, _dict=None):
        if _dict is None:
            _dict = {}
        _dict = self._dict1(_dict)
        _dict["active"] = self.active
        
        return _dict

    def dict_for_etudiant(self, _dict=None):
        if _dict is None:
            _dict = {}
        _dict["groupe"] = self._dict2()
        return _dict
    
    def dict_for_admin(self, _dict=None):
        if _dict is None:
            _dict = {}
        _dict["groupe"] = self._dict2()
        return _dict
    


    def get_palier(self):
        return self.palier
    def set_palier(self, value):
        self.palier = value

    def get_specialite(self):
        return self.specialite
    def set_specialite(self, value):
        self.specialite = value

    def get_annee(self):
        return self.annee
    def set_annee(self, value):
        self.annee = value

    def get_active(self):
        return self.active
    def set_active(self, value):
        self.active = value


    def get_pfe(self):
        try:
            return self.PFE
        except:
            return None
        
    def set_pfe(self, sujet):
        self.PFE = sujet
    def remove_pfe(self):
        self.PFE = None
    def has_pfe(self):
        return self.get_pfe() is not None
    

    def get_encadreur_favoris(self):
        return self.encadreur_favoris.all()
    def add_encadreur_favoris(self, encadreur):
        self.encadreur_favoris.add(encadreur)
    def remove_encadreur_favoris(self, encadreur):
        self.encadreur_favoris.remove(encadreur)
    def clear_encadreur_favoris(self):
        self.encadreur_favoris.clear()
    def encadreur_in_favoris(self, encadreur):
        return encadreur in self.get_encadreur_favoris()
    
    def get_sujet_favoris(self):
        return self.sujet_favoris.all()
    def add_sujet_favoris(self, sujet):
        self.sujet_favoris.add(sujet)
    def remove_sujet_favoris(self, sujet):
        self.sujet_favoris.remove(sujet)
    def clear_sujet_favoris(self):
        self.sujet_favoris.clear()
    def sujet_in_favoris(self, sujet):
        return sujet in self.get_sujet_favoris()
    
    def get_projets_from_liste_de_choix(self) -> List["Sujet"]:
        choix = self.get_liste_de_choix()
        c : Choix
        return [c.get_projet() for c in choix]
    def get_liste_de_choix(self):
        return self.liste_choix.all().order_by("order")
    def add_liste_de_choix(self, projet):
        choix= self.get_liste_de_choix()
        
        if choix:
            order = choix[len(choix) - 1].get_order() + 1
        else:
            order = 0
        Choix.create(groupe=self, projet=projet, order=order)
    def remove_liste_de_choix(self, sujet):
        choix = self.get_liste_de_choix()
        iterator = iter(choix)
        c : Choix
        for c in iterator:
            if c.get_projet() == sujet:
                c.delete()
                break
        for c in iterator:
            c.set_order(c.get_order() - 1)
            c.save()
    def reorder_liste_de_choix(self, new_order):
        choix = self.get_liste_de_choix()
        for i, _id in enumerate(new_order):
            for c in choix:
                if c.get_projet().get_id() == _id:
                    c.set_order(i)
                    c.save()
    def projet_in_liste_choix(self, projet):
        return projet in self.get_projets_from_liste_de_choix()
    def clear_liste_de_choix(self):
        for choix in self.get_liste_de_choix():
            choix.delete()
    def sujet_in_liste_choix(self, sujet):
        return sujet in self.get_projets_from_liste_de_choix()
    def can_add_to_liste_de_choix(self):
        return not self.has_pfe()


    def get_etudiants(self):
        return self.etudiants.all()
    def add_etudiant(self, etudiant):
        etudiant.set_groupe(self)
    def remove_etudiant(self, etudiant):
        etudiant.set_groupe(None)


    def get_domaines(self):
        res = []
        for etudiant in self.etudiants.all():
            for domaine in etudiant.get_domaines():
                if domaine not in res:
                    res.append(domaine)
        return res
    
    def get_outils(self):
        res = []
        for etudiant in self.etudiants.all():
            for outil in etudiant.get_outils():
                if outil not in res:
                    res.append(outil)
        return res
    
    def notify_delai_attribution_automatique(self, delai):
        for etudiant in self.get_etudiants():
            NotificationDelai.create(date=datetime.now(), destination=etudiant.get_parent(), delai=str_to_datetime(delai), message="Dernier délai pour remplir la liste de choix avant l'attribution automatique")

class Etudiant(models.Model):
    @classmethod
    def get(cls, user_id) -> "Etudiant":
        return Etudiant.objects.get(user_id=user_id)
        
    user_id = models.CharField(max_length=50) #unique
    password = models.CharField(max_length=30)
    username = models.CharField(max_length=60)
    preferences = models.TextField()
    outils_et_connaissances = models.TextField()
    
    groupe: Groupe = models.ForeignKey(Groupe, null=True, on_delete=models.CASCADE, related_name="etudiants")
    parent = models.OneToOneField(Utilisateur, on_delete=models.CASCADE, related_name="etudiant")

    @classmethod
    def exist(cls, user_id):
        return cls.objects.filter(user_id=user_id).exists()

    @classmethod
    def create(cls, user_id, password, username="", preferences=None, outils=None):
        temp = cls(username=username, user_id=user_id, password=password,
                   parent=Utilisateur.create(child_type=ETUDIANT))
        if preferences is not None:
            temp.set_domaines(preferences)
        if outils is not None:
            temp.set_outils(outils)
        temp.save()
        return temp
    
    @classmethod
    def all(cls):
        return cls.objects.all()
    
    @classmethod
    def filter_no_pfe(cls):
        groupes = Groupe.filter_no_pfe()
        res = []
        for groupe in groupes:
            for etudiant in groupe.get_etudiants():
                res.append(etudiant)
        return res
    
    @classmethod
    def filter_user_id(cls, user_id, queryset=None):
        if queryset is None:
            queryset = cls.all()
        return queryset.filter(user_id__icontains=user_id)


    
    def notify_delai_affectation_automatique(self, delai):
        NotificationDelai.create(date=datetime.now(), destination=self.get_parent(), delai=delai, message="Dernier délai pour remplir la liste de choix avant l'attribution automatique")


    def save(self):
        self.parent.save()    
        super().save()
    
    def delete(self):
        self.groupe.remove_etudiant(self)
        # self.groupe.save()
        super().delete()
        self.parent.delete()


    def get_full_object(self):
        return self
    def get_sub_class(self):
        return self

    def get_user_id(self):
        return self.user_id
    def set_user_id(self, value):
        self.user_id = value

    def get_password(self):
        return self.password
    def set_password(self, value):
        self.password = value

    def get_domaines(self):
        return self.preferences.split()
    def set_domaines(self, value):
        self.preferences = " ".join(value)

    def get_outils(self):
        return self.outils_et_connaissances.split()
    def set_outils(self, value):
        self.outils_et_connaissances = " ".join(value)

    def get_username(self):
        return self.username
    def set_username(self, value):
        self.username = value

    def get_groupe(self):
        return self.groupe
    def set_groupe(self, gorupe):
        self.groupe: Groupe = gorupe

    def get_parent(self):
        return self.parent

    def get_notifications_non_lu(self):
        return self.parent.get_notifications_non_lu()

    def _dict1(self, _dict=None):
        if _dict is None:
            _dict = {}
        _dict["user_id"] = self.user_id
        _dict["username"] = self.username
        _dict["preferences"] = self.get_domaines()
        _dict["outils"] = self.get_outils()

        return _dict
    
    def dict_for_etudiant(self, _dict=None):
        if _dict is None:
            _dict = {}

        _dict["etudiant"] = self._dict1()
        return _dict

    def dict_for_encadreur(self, _dict=None):
        if _dict is None:
            _dict = {}

        _dict["etudiant"] = self._dict1()
        return _dict

    def _dict2(self, _dict=None):
        if _dict is None:
            _dict = {}
        _dict = self._dict1(_dict)
        _dict["password"] = self.password

        return _dict

    def dict_for_admin(self, _dict=None):
        if _dict is None:
            _dict = {}

        _dict["etudiant"] = self._dict2()
        return _dict



ENCADREUR_INTERNE = 0
ENCADREUR_EXTERNE = 1
class Encadreur(models.Model):
    # foreign key to Utilisateur
    parent = models.OneToOneField(Utilisateur, on_delete=models.CASCADE, related_name="encadreur")
    # attributes
    id = models.AutoField(primary_key=True)
    user_id = models.CharField(max_length=50) #unique
    password = models.CharField(max_length=30)
    username = models.CharField(max_length=60)
    expertises = models.TextField(default="")
    outils = models.TextField(default="")
    nombre_binome_max = models.IntegerField()
    bureau = models.CharField(max_length=100)
    moyen_contact = models.TextField()
    visible = models.BooleanField()

    child_type = models.PositiveSmallIntegerField()
    # methods
    @classmethod
    def get(cls, user_id) -> "Encadreur":
        return Encadreur.objects.get(user_id=user_id)
    
    @classmethod
    def exist(cls, user_id):
        return cls.objects.filter(user_id=user_id).exists()
    
    @classmethod
    def get_valid_for_etudiant(cls):
        # visible = True
        # nombre_groupe < nombre_binome_max
        res = cls.objects.filter(visible=True)
        print(res)
        res = res.annotate(count=Count("sujet_publie__id", filter=Q(sujet_publie__groupe__isnull=False))).filter(count__lt=F("nombre_binome_max"))
        print(res)
        return res
    
    def __str__(self):
        return str(self.nombre_binome_max)

    @classmethod
    def all(cls):
        return cls.objects.all()

    @classmethod
    def filter_username(cls, username, queryset=None):
        if queryset is None:
            queryset = cls.all()
        return queryset.filter(username__icontains=username)

    @classmethod
    def filter_user_id(cls, user_id, queryset=None):
        if queryset is None:
            queryset = cls.all()
        return queryset.filter(user_id__icontains=user_id)

    # def get_nombre_groupe(self):
    #     Sujet.get_assigned().count()

    @classmethod
    def create(cls, user_id, password, child_type, username="", nombre_binome_max=4, bureau="", moyen_contact="", visible=True, expertises: List|None=None, outils: List|None=None):
        temp = cls(username=username, user_id=user_id, password=password, child_type=child_type, nombre_binome_max=nombre_binome_max, bureau=bureau, moyen_contact=moyen_contact, visible=visible,
                   parent=Utilisateur.create(child_type=ENCADREUR))
        if expertises is not None:
            temp.set_domaines(expertises)
        if outils is not None:
            temp.set_outils(outils)
        temp.save()
        return temp
    
    def save(self):
        self.parent.save()
        super().save()

    def delete(self):
        self.delete_sujets()
        super().delete()
        self.parent.delete()

    def get_notifications_non_lu(self):
        return self.parent.get_notifications_non_lu()

    def _dict1(self, _dict=None):
        if _dict is None:
            _dict = {}
        _dict["username"] = self.username
        _dict["expertises"] = self.get_domaines()
        _dict["outils"] = self.get_outils()      
        _dict["type"] = self.get_type_str()
        _dict["nombre_binome_max"] = self.nombre_binome_max
        _dict["bureau"] = self.bureau
        _dict["moyen_contact"] = self.moyen_contact
        _dict["user_id"] = self.get_user_id()

        return _dict
    
    def _dict2(self, _dict=None):
        if _dict is None:
            _dict = {}
        _dict = self._dict1(_dict)
        _dict["visible"] = self.visible
        return _dict
    
    def _dict3(self, _dict=None):
        if _dict is None:
            _dict = {}
        _dict = self._dict2(_dict)
        _dict["password"] = self.password
        _dict["is_deletable"] = self.count_sujet_assigned() == 0
        return _dict

    def notify_delai_soumission_sujet(self, delai):
        NotificationDelai.create(date=datetime.now(), destination=self.get_parent(), delai=str_to_datetime(delai), message="Dernier delai pour soumettre les projets")
    def notify_fin_soumission_sujet(self):
        NotificationGeneral.create(date=datetime.now(), destination=self.get_parent(), message="La soumission des projets est terminée")
        print(self.get_parent().get_notifications_non_lu())

    
    def remove_sujet(self, sujet):
        sujet.remove_encadreur()
        sujet.save()

    def delete_sujet(self, sujet):
        sujet.delete()

    def delete_sujets(self):
        for sujet in self.get_sujet_publie():
            sujet.delete()
            
    def add_sujet(self, sujet):
        sujet.set_encadreur(self)
        sujet.save()
    

    def get_full_object(self):
        return self.get_sub_object().get_full_object()
    def get_sub_object(self) -> "EncadreurInterne|EncadreurExterne":
        if self.child_type == ENCADREUR_INTERNE:
            return self.encadreur_interne
        if self.child_type == ENCADREUR_EXTERNE:
            return self.encadreur_externe

    def get_user_id(self):
        return self.user_id
    def set_user_id(self, value):
        self.user_id = value

    def get_password(self):
        return self.password
    def set_password(self, value):
        self.password = value

    def get_domaines(self):
        return self.expertises.split()
    def set_domaines(self, value):
        self.expertises = " ".join(value)

    def get_outils(self):
        return self.outils.split()
    def set_outils(self, value):
        self.outils = " ".join(value)

    def get_username(self):
        return self.username
    def set_username(self, value):
        self.username = value

    def get_nombre_binome_max(self):
        return self.nombre_binome_max
    def set_nombre_binome_max(self, value):
        self.nombre_binome_max = value

    def get_bureau(self):
        return self.bureau
    def set_bureau(self, value):
        self.bureau = value

    def get_moyen_contact(self):
        return self.moyen_contact
    def set_moyen_contact(self, value):
        self.moyen_contact = value

    def get_visible(self):
        return self.visible
    def set_visible(self, value):
        self.visible = value

    def has_sujet_with_title(self, titre):
        return Sujet.filter_titre(titre, self.get_sujet_publie()).exists()

    def count_sujet_assigned(self):
        return self.get_sujet_publie().filter(groupe__isnull=False).count()


    def get_parent(self):
        return self.parent
    
    def get_type(self):
        return self.child_type
    def get_type_str(self):
        if self.child_type == ENCADREUR_INTERNE:
            return "interne"
        if self.child_type == ENCADREUR_EXTERNE:
            return "externe"

    def get_sujet_publie(self):
        return self.sujet_publie.all()
    def get_sujet_attribue(self):
        return Sujet.filter_attribue(self.get_sujet_publie())


class Sujet(models.Model):
    id = models.AutoField(primary_key=True)

    titre = models.CharField(max_length=300) # unique
    description = models.TextField(default="")
    domaines = models.TextField(default="")
    outils_et_connaissances = models.TextField(default="")
    # disponible = models.BooleanField(default=True)
    palier = models.CharField(max_length=4)
    liste_specialites = models.TextField(default="")
    visible = models.BooleanField(default=True)

    encadreur: Encadreur = models.ForeignKey("Encadreur", null=True, on_delete=models.CASCADE, related_name="sujet_publie")
    
    @classmethod
    def create(cls, titre, description, palier, encadreur, visible, liste_specialite, domaines, outils):
        temp = cls(palier=palier, encadreur=encadreur, titre=titre, description=description, visible=visible)
        temp.set_domaines(domaines)
        temp.set_outils(outils)
        temp.set_liste_specialites(liste_specialite)
        temp.save()

        return temp
    
    @classmethod
    def get(cls, id):
        return cls.objects.get(id=id)

    @classmethod
    def filter_valid_for_etudiant(cls, etudiant_palier, etudiant_groupe_specialite, queryset=None):
        # disponible = true
        # palier = etudiant.palier
        # etudiant.groupe.speicalite in liste_specialite
        # visible = True
        if queryset is None:
            queryset = cls.all()
        res = cls.objects.filter(groupe__isnull=True, visible=True, palier=etudiant_palier)
        res = res.filter(~Q(palier="M2") | Q(liste_specialites="") | Q(liste_specialites__contains=etudiant_groupe_specialite))
        return res

    @classmethod
    def get_assigned(cls, queryset=None):
        if queryset is None:
            queryset = Sujet.get_all()
        return queryset.filter(groupe=None)

    @classmethod
    def get_all(cls):
        return cls.objects.all()

    @classmethod
    def filter_titre(cls, titre, queryset=None):
        if queryset is None:
            queryset = cls.get_all()

        return queryset.filter(titre__icontains=titre)

    @classmethod
    def all(cls):
        return cls.objects.all()    
    
    @classmethod
    def filter_attribue(cls, queryset=None):
        if queryset is None:
            queryset = cls.all()
        return queryset.filter(groupe__isnull=False)

    @classmethod
    def filter_non_attribue(cls, queryset=None):
        if queryset is None:
            queryset = cls.all()
        return queryset.filter(groupe__isnull=True)


    @classmethod
    def _count_type(cls, _type):
        return cls.objects.filter(encadreur__child_type=_type).count()
    
    @classmethod
    def count_interne(cls):
        return cls._count_type(ENCADREUR_INTERNE)

    @classmethod
    def count_externe(cls):
        return cls._count_type(ENCADREUR_EXTERNE)

    @classmethod
    def count_l3(cls):
        return cls.all().filter(palier="L3").count()
    
    @classmethod
    def count_m1(cls):
        return cls.all().filter(palier="M1").count()
    


    def is_disponible(self):
        return self.get_groupe() is None

    def is_assigned(self):
        return self.get_groupe() is not None

    def can_be_assigned(self):
        return self.is_disponible() and self.is_visible() and self.get_encadreur().count_sujet_assigned() <= self.get_encadreur().get_nombre_binome_max()



    def get_domaines(self):
        return self.domaines.split()
    def set_domaines(self, domains):
        self.domaines = " ".join(domains)

    def get_outils(self):
        return self.outils_et_connaissances.split()
    def set_outils(self, outils):
        self.outils_et_connaissances = " ".join(outils)
    
    def is_visible(self):
        return self.visible
    def set_visible(self, value):
        self.visible = value

    def get_liste_specialites(self):
        return self.liste_specialites.split()
    def set_liste_specialites(self, value): 
        self.liste_specialites = " ".join(value)
    
    def get_groupe(self):
        try:
            return self.groupe
        except:
            return None
        
    def get_id(self):
        return self.id

    def set_description(self, description):
        self.description = description

    def get_titre(self):
        return self.titre
    def set_titre(self, titre):
        self.titre = titre

    def get_type(self):
        if self.encadreur.get_type() == ENCADREUR_INTERNE:
            return "interne"
        return "externe"


    def _dict1(self, _dict=None):
        if _dict is None:
            _dict = {}
        _dict["id"] = self.id
        _dict["titre"] = self.titre
        _dict["desc"] = self.description
        _dict["domaines"] = self.get_domaines()
        _dict["outils"] = self.get_outils()
        _dict["type"] = self.get_type()
        
        return _dict

    def dict_for_etudiant(self, _dict=None, etudiant: Etudiant|None=None):
        if _dict is None:
            _dict = {}
        temp = self._dict1()
        if etudiant is not None:
            temp["is_favoris"] = etudiant.get_groupe().sujet_in_favoris(self) 
            temp["is_choix"] = etudiant.get_groupe().projet_in_liste_choix(self)
        _dict["sujet"] = temp
        return _dict
    
    def _dict2(self, _dict=None):
        if _dict is None:
            _dict = {}
        _dict = self._dict1(_dict)
        _dict["disponible"] = self.is_disponible()
        _dict["visible"] = self.visible
        _dict["palier"] = self.palier
        _dict["liste_specialites"] = self.get_liste_specialites()

        return _dict

    def dict_for_encadreur(self, _dict=None):
        if _dict is None:
            _dict = {}
        

        _dict["sujet"] = self._dict2()
        return _dict
    
    def dict_for_admin(self, _dict=None):
        if _dict is None:
            _dict = {}
        
        _dict["sujet"] = self._dict2()
        return _dict


    def save(self):
        super().save()

    def delete(self):
        self.remove_encadreur()
        super().delete()

    def remove_groupe_favoris(self):
        for groupe in self.get_groupe_favoris():
            groupe.remove_sujet_favoris(self)

    def get_groupe_favoris(self):
        return self.groupe_favoris.all()
    
    def remove_groupe_liste_choix(self):
        for groupe in self.get_groupe_liste_choix():
            groupe.remove_sujet_choix(self)

    def get_groupe_liste_choix(self):
        return self.groupe_liste_choix.all()
    
    def remove_groupe(self):
        self.groupe.remove_sujet(self)


    def get_encadreur(self):
        return self.encadreur.get_full_object()
    
    def set_encadreur(self, encadreur):
        self.encadreur = encadreur
    
    def remove_encadreur(self):
        self.encadreur = None

    def get_palier(self):
        return self.palier

    def set_palier(self, palier):
        self.palier = palier




class EncadreurInterne(models.Model):
    # foreign key to Encadreur
    parent = models.OneToOneField(Encadreur, on_delete=models.CASCADE, related_name="encadreur_interne")
    # attributes
    id = models.AutoField(primary_key=True)
    grade = models.CharField(max_length=30)
    specialite = models.CharField(max_length=50)

    # methods 
    @classmethod
    def get(cls, user_id) -> "EncadreurInterne":
        return Encadreur.get(user_id).get_sub_object()
    
    @classmethod
    def create(cls, user_id, password, username="", nombre_binome_max=4, bureau="", moyen_contact="", visible=True, specialite="", grade="", expertises: List|None=None, outils: List|None=None):
        temp = cls(specialite=specialite, grade=grade,
                   parent=Encadreur.create(username=username, user_id=user_id, password=password, child_type=ENCADREUR_INTERNE, nombre_binome_max=nombre_binome_max, bureau=bureau, moyen_contact=moyen_contact, visible=visible, expertises=expertises, outils=outils))
        temp.save()
        return temp

    @classmethod
    def all(cls):
        return cls.objects.all()
    


    def save(self):
        self.parent.save()
        super().save()

    def delete(self):
        super().delete()
        self.parent.delete()


    def _dict1(self, _dict=None):
        if _dict is None:
            _dict = {}
        _dict["grade"] = self.grade
        _dict["specialite"] = self.specialite

        return _dict

    def dict_for_etudiant(self, _dict=None, etudiant: Etudiant|None=None):
        if _dict is None:
            _dict = {}
        temp = self.parent._dict1()
        if etudiant is not None:
            temp["is_favoris"] = etudiant.get_groupe().encadreur_in_favoris(self.get_parent())
        _dict["encadreur"] = self._dict1(temp)
        return _dict
    
    def dict_for_encadreur(self, _dict=None):
        if _dict is None:
            _dict = {}

        temp = self._dict1()
        _dict["encadreur"] = self.parent._dict2(temp)
        return _dict

    def dict_for_admin(self, _dict=None):
        if _dict is None:
            _dict = {}
        temp = self._dict1()

        _dict["encadreur"] = self.parent._dict3(temp)
        return _dict

    def get_user_id(self):
        return self.parent.get_user_id()
    def set_user_id(self, value):
        self.parent.set_user_id(value)


    def get_full_object(self):
        return self
    def get_sub_object(self):
        return self

    def get_type(self):
        return ENCADREUR_INTERNE
    def get_type_str(self):
        return "interne"

    def get_parent(self):
        return self.parent
    def get_sujet_publie(self):
        return self.parent.get_sujet_publie()
    

    def get_grade(self):
        return self.grade
    def set_grade(self, value):
        self.grade = value

    def get_specialite(self):
        return self.specialite
    def set_specialite(self, value):
        self.specialite = value

    def get_username(self):
        return self.parent.get_username()
    def set_username(self, value):
        self.parent.set_username(value)

    def get_password(self):
        return self.parent.get_password()
    def set_password(self, value):
        self.parent.set_password(value)

    def get_domaines(self):
        return self.parent.get_domaines()
    def set_domaines(self, value):
        self.parent.set_domaines(value)

    def get_outils(self):
        return self.parent.get_outils()
    def set_outils(self, value):
        self.parent.set_outils(value)

    def get_nombre_binome_max(self):
        return self.parent.get_nombre_binome_max()
    def set_nombre_binome_max(self, value):
        self.parent.set_nombre_binome_max(value)

    def get_bureau(self):
        return self.parent.get_bureau()
    def set_bureau(self, value):
        self.parent.set_bureau(value)

    def get_moyen_contact(self):
        return self.parent.get_moyen_contact()
    def set_moyen_contact(self, value):
        self.parent.set_moyen_contact(value)

    def get_visible(self):
        return self.parent.get_visible()
    def set_visible(self, value):
        self.parent.set_visible(value)

    def count_sujet_assigned(self):
        return self.parent.count_sujet_assigned()



class EncadreurExterne(models.Model):
    # foreign key to Encadreur
    parent = models.OneToOneField(Encadreur, on_delete=models.CASCADE, related_name="encadreur_externe")
    # attributes
    id = models.AutoField(primary_key=True)
    societe = models.CharField(max_length=300)
    poste = models.CharField(max_length=100)

    # methods 
    @classmethod
    def get(cls, user_id) -> "EncadreurExterne":
        return Encadreur.get(user_id).get_sub_object()
    
    @classmethod
    def create(cls, user_id, password, username="", nombre_binome_max=4, bureau="", moyen_contact="", visible=True, societe="", poste="", expertises: List|None=None, outils: List|None=None):
        temp = cls(societe=societe, poste=poste,
                   parent=Encadreur.create(username=username, user_id=user_id, password=password, child_type=ENCADREUR_EXTERNE, nombre_binome_max=nombre_binome_max, bureau=bureau, moyen_contact=moyen_contact, visible=visible, expertises=expertises, outils=outils))
        temp.save()
        return temp

    def save(self):
        self.parent.save()
        super().save()

    def delete(self):
        super().delete()
        self.parent.delete()

    def _dict1(self, _dict=None):
        if _dict is None:
            _dict = {}
        _dict["poste"] = self.poste
        _dict["societe"] = self.societe

        return _dict

    def dict_for_etudiant(self, _dict=None, etudiant: Etudiant|None=None):
        if _dict is None:
            _dict = {}
        temp = self.parent._dict1()
        if etudiant is not None:
            temp["is_favoris"] = etudiant.get_groupe().encadreur_in_favoris(self.get_parent())
        _dict["encadreur"] = self._dict1(temp)
        return _dict
    
    def dict_for_encadreur(self, _dict=None):
        if _dict is None:
            _dict = {}

        temp = self._dict1()
        _dict["encadreur"] = self.parent._dict2(temp)
        return _dict

    def dict_for_admin(self, _dict=None):
        if _dict is None:
            _dict = {}
        temp = self._dict1()
        _dict["encadreur"] = self.parent._dict3(temp)
        return _dict

    def get_user_id(self):
        return self.parent.get_user_id()
    def set_user_id(self, value):
        self.parent.set_user_id(value)
        
    def get_full_object(self):
        return self
    def get_sub_object(self):
        return self
    
    def get_type(self):
        return ENCADREUR_EXTERNE
    def get_type_str(self):
        return "externe"

    def get_parent(self):
        return self.parent
    def get_sujet_publie(self):
        return self.parent.get_sujet_publie()
    
    def get_societe(self):
        return self.societe
    def set_societe(self, value):
        self.societe = value

    def get_poste(self):
        return self.poste
    def set_poste(self, value):
        self.poste = value

    def get_username(self):
        return self.parent.get_username()
    def set_username(self, value):
        self.parent.set_username(value)

    def get_password(self):
        return self.parent.get_password()
    def set_password(self, value):
        self.parent.set_password(value)

    def get_domaines(self):
        return self.parent.get_domaines()
    def set_domaines(self, value):
        self.parent.set_domaines(value)

    def get_outils(self):
        return self.parent.get_outils()
    def set_outils(self, value):
        self.parent.set_outils(value)

    def get_nombre_binome_max(self):
        return self.parent.get_nombre_binome_max()
    def set_nombre_binome_max(self, value):
        self.parent.set_nombre_binome_max(value)

    def get_bureau(self):
        return self.parent.get_bureau()
    def set_bureau(self, value):
        self.parent.set_bureau(value)

    def get_moyen_contact(self):
        return self.parent.get_moyen_contact()
    def set_moyen_contact(self, value):
        self.parent.set_moyen_contact(value)

    def get_visible(self):
        return self.parent.get_visible()
    def set_visible(self, value):
        self.parent.set_visible(value)

    def count_sujet_assigned(self):
        return self.parent.count_sujet_assigned()

from django.db import models
from django.db.models import Q
from .Users import ENCADREUR_EXTERNE, ENCADREUR_INTERNE, Encadreur


# from .Users import Etudiant

# Types
SUJET_ETUDIANT  = 0
SUJET_ENCADREUR = 1



class Sujet(models.Model):
    id = models.AutoField(primary_key=True)

    titre = models.CharField(max_length=100) # unique
    description = models.TextField(default="")
    domaines = models.TextField(default="")
    outils_et_connaissances = models.TextField(default="")
    disponible = models.BooleanField(default=True)
    palier = models.CharField(max_length=100)
    liste_specialites = models.TextField(default="")
    visible = models.BooleanField(default=True)

    encadreur: Encadreur = models.ForeignKey("Encadreur", null=True, on_delete=models.CASCADE, related_name="sujet_publie")
    
    @classmethod
    def create(cls, titre, description, palier, encadreur, disponible, visible, liste_specialite, domaines, outils):
        temp = cls(disponible=disponible, palier=palier, encadreur=encadreur, type=encadreur.get_type_str(), titre=titre, description=description, )
        temp.set_domaines(domaines)
        temp.set_outils(outils)
        temp.save()
        return temp
    
    @classmethod
    def get(cls, id):
        return cls.objects.get(id=id)

    @classmethod
    def get_valid_for_etudiant(cls, etudiant_palier, etudiant_groupe_specialite):
        # disponible = true
        # palier = etudiant.palier
        # etudiant.groupe.speicalite in liste_specialite
        # visible = True
        res = cls.objects.filter(disponible=True, visible=True, palier=etudiant_palier)
        res = res.filter(~Q(palier="M2") | Q(liste_specialites__contains=etudiant_groupe_specialite))
        return res

    @classmethod
    def get_all(cls):
        return cls.objects.all()

    @classmethod
    def get_titre(cls, titre, queryset=None):
        if queryset is None:
            queryset = cls.get_all()

        return queryset.filter(titre__contains=titre)
        


    @classmethod
    def _count_type(cls, _type):
        return cls.objects.filter(encadreur__child_type=_type).count()
    
    @classmethod
    def count_interne(cls):
        return cls._count_type(ENCADREUR_INTERNE)

    @classmethod
    def count_externe(cls):
        return cls._count_type(ENCADREUR_EXTERNE)


    def get_domaines(self):
        return self.domaines.split()
    def set_domaines(self, domains):
        self.domaines = " ".join(domains)

    def get_outils(self):
        return self.outils_et_connaissances.split()
    def set_outils(self, outils):
        self.outils_et_connaissances = " ".join(outils)
    
    
    def get_groupe(self):
        try:
            return self.groupe
        except:
            return None

    def set_description(self, description):
        self.description = description

    def set_titre(self, titre):
        self.titre = titre

    def get_type(self):
        if self.encadreur.get_type() == ENCADREUR_INTERNE:
            return "interne"
        return "externe"
    

    def dict(self, _dict=None):
        if _dict is None:
            _dict = {}
        _dict["id"] = self.id
        _dict["titre"] = self.titre
        _dict["desc"] = self.description
        _dict["domaines"] = self.get_domaines()
        _dict["outils"] = self.get_outils() 
        _dict["type"] = self.get_type()
        _dict["disponible"] = self.disponible
        _dict["visible"] = self.visible
        _dict["palier"] = self.palier

        return _dict

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

    def dict_for_etudiant(self, _dict=None):
        if _dict is None:
            _dict = {}

        _dict["sujet"] = self._dict1()
        return _dict
    
    def _dict2(self, _dict=None):
        if _dict is None:
            _dict = {}
        _dict = self._dict1(_dict)
        _dict["disponible"] = self.disponible
        _dict["visible"] = self.visible
        _dict["palier"] = self.palier

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
        self.remove_groupe_favoris()
        self.remove_groupe_liste_choix()
        self.remove_groupe()
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


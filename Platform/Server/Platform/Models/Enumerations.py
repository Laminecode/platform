from django.db import models


class Domaine(models.Model):
	id = models.AutoField(primary_key=True)
	nom = models.CharField(max_length=30)
	active = models.BooleanField(default=True)

	@classmethod
	def exist(cls, nom: str) -> bool:
		return cls.objects.filter(nom=nom).exists()

	@classmethod
	def create(cls, nom: str):
		temp = cls.objects.create(nom=nom)
		temp.save()
		return temp
	
	@classmethod
	def get(cls, nom: str):
		return cls.objects.get(nom=nom)

	@classmethod
	def all(cls):
		return cls.objects.all()
	
	@classmethod
	def all_active(cls):
		return cls.all().filter(active=True)

	@classmethod
	def all_inactive(cls):
		return cls.all().filter(active=False)
	
	def get_active(self) -> bool:
		return self.active
	def set_active(self, active: bool):
		self.active = active
		
	def get_nom(self) -> str:
		return self.nom
	def set_nom(self, nom: str):
		self.nom = nom

	def _dict1(self, info=None) -> dict:
		if info is None:
			info = {}
		info["nom"] = self.get_nom()
		return info

	def dict_for_etudiant(self, info=None) -> dict:
		if info is None:
			info = {}
		return self._dict1()
	
	def dict_for_encadreur(self, info=None) -> dict:
		if info is None:
			info = {}
		return self._dict1()
	
	def _dict2(self, info=None) -> dict:
		if info is None:
			info = {}
		info = self._dict1(info)
		info["active"] = self.get_active()
		return info

	def dict_for_admin(self, info=None) -> dict:
		if info is None:
			info = {}
		return self._dict2()
	

class Competence(models.Model):
	id = models.AutoField(primary_key=True)
	nom = models.CharField(max_length=30)
	active = models.BooleanField(default=True)

	@classmethod
	def exist(cls, nom: str) -> bool:
		return cls.objects.filter(nom=nom).exists()

	@classmethod
	def create(cls, nom: str):
		temp = cls.objects.create(nom=nom)
		temp.save()
		return temp

	@classmethod
	def get(cls, nom: str):
		return cls.objects.get(nom=nom)

	@classmethod
	def all(cls):
		return cls.objects.all()
	
	@classmethod
	def all_active(cls):
		return cls.all().filter(active=True)

	@classmethod
	def all_inactive(cls):
		return cls.all().filter(active=False)
	
	
	def get_active(self) -> bool:
		return self.active
	def set_active(self, active: bool):
		self.active = active
		
	def get_nom(self) -> str:
		return self.nom
	def set_nom(self, nom: str):
		self.nom = nom

	def _dict1(self, info=None) -> dict:
		if info is None:
			info = {}
		info["nom"] = self.get_nom()
		return info

	def dict_for_etudiant(self, info=None) -> dict:
		if info is None:
			info = {}
		return self._dict1()
	
	def dict_for_encadreur(self, info=None) -> dict:
		if info is None:
			info = {}
		return self._dict1()
	
	def _dict2(self, info=None) -> dict:
		if info is None:
			info = {}
		info = self._dict1(info)
		info["active"] = self.get_active()
		return info

	def dict_for_admin(self, info=None) -> dict:
		if info is None:
			info = {}
		return self._dict2()


class Specialite(models.Model):
	id = models.AutoField(primary_key=True)
	nom = models.CharField(max_length=30)
	palier = models.CharField(max_length=4)
	active = models.BooleanField(default=True)


	@classmethod
	def exist(cls, nom: str) -> bool:
		return cls.objects.filter(nom=nom).exists()

	@classmethod
	def create(cls, nom: str, palier: str):
		temp = cls.objects.create(nom=nom, palier=palier)
		temp.save()
		return temp
	
	@classmethod
	def get(cls, nom: str):
		return cls.objects.get(nom=nom)

	@classmethod
	def all(cls):
		return cls.objects.all()
	
	@classmethod
	def all_active(cls):
		return cls.all().filter(active=True)

	@classmethod
	def all_inactive(cls):
		return cls.all().filter(active=False)
	
	@classmethod
	def filter_palier(cls, palier: str, queryset=None):
		if queryset is None:
			queryset = cls.all()
		return queryset.filter(palier=palier)
	
	
	def get_active(self) -> bool:
		return self.active
	def set_active(self, active: bool):
		self.active = active
		
	def get_nom(self) -> str:
		return self.nom
	def set_nom(self, nom: str):
		self.nom = nom

	def get_palier(self) -> str:
		return self.palier
	def set_palier(self, palier: str):
		self.palier = palier

	def _dict1(self, info=None) -> dict:
		if info is None:
			info = {}
		info["nom"] = self.get_nom()
		info["palier"] = self.get_palier()
		return info

	def dict_for_etudiant(self, info=None) -> dict:
		if info is None:
			info = {}
		return self._dict1()
	
	def dict_for_encadreur(self, info=None) -> dict:
		if info is None:
			info = {}
		return self._dict1()
	
	def _dict2(self, info=None) -> dict:
		if info is None:
			info = {}
		info = self._dict1(info)
		info["active"] = self.get_active()
		return info

	def dict_for_admin(self, info=None) -> dict:
		if info is None:
			info = {}
		return self._dict2()

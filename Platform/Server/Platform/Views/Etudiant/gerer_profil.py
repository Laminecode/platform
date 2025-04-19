from ..utils import *
from ..gerer_notifcation import _get_notifications


@view_decorator
def set_profil(data: Data):
	etudiant = Etudiant.get(data.get_user_id())
	etudiant.set_domaines(data["preferences"])
	etudiant.set_outils(data["outils"])
	etudiant.get_groupe().set_active(data["active"])
	etudiant.save()
	return generate_json_response({})

@view_decorator
def get_profil(data):
	etudiant = Etudiant.get(data.get_user_id())
	groupe = etudiant.get_groupe()
	temp = etudiant.dict_for_etudiant()
	temp = groupe.dict_for_etudiant(temp)
	
	return generate_json_response(temp)	

@view_decorator
def get_notifications(data: Data):
	return _get_notifications(Etudiant, data)
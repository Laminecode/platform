from ..utils import *
from ..gerer_notifcation import _get_notifications

@view_decorator
def get_profil(data: Data):
	encadreur = Encadreur.get(data.get_user_id()).get_full_object()
	return generate_json_response(encadreur.dict_for_encadreur())

@view_decorator
def set_profil(data: Data):
	encadreur = Encadreur.get(data.get_user_id()).get_full_object()
	encadreur.set_domaines(data["expertises"])
	encadreur.set_outils(data["outils"])
	encadreur.set_nombre_binome_max(data["nombre_binome_max"])
	encadreur.set_visible(data["visible"])
	encadreur.set_bureau(data["bureau"])
	encadreur.set_moyen_contact(data["moyen_contact"])
	# if data["type"] == "interne":
	# 	encadreur.set_grade(data["grade"])
	# 	encadreur.set_specialite(data["specialite"])
	# else:
	# 	encadreur.set_poste(data["poste"])
	# 	encadreur.set_societe(data["societe"])

	encadreur.save()
	return generate_json_response({})

	
@view_decorator
def get_notifications(data: Data):
	return _get_notifications(Encadreur, data)
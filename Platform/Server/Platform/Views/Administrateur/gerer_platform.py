from ..utils import *
from Server_side.utils import Config
from ..platform import attribution_automatique_func

# @view_decorator
# def set_date_affectation_automatique(data):
# 	return generate_json_response({})
	
# @view_decorator
# def get_date_affectation_automatique(data):
# 	date = Config().get_date_affectation_automatique()
# 	return generate_json_response({"date": date})

@view_decorator
def set_session(data):
	session = data["active"]
	date = data["date"]
	if session:
		Config().set_date_affectation_automatique(date)
	Config().set_session(session)
	Config().set_reminder_attribution_automatique(session)
	return generate_json_response({})

@view_decorator
def get_session(data):
	session = Config().get_session()
	date = Config().get_date_affectation_automatique()
	return generate_json_response({"active": session, "date": date})


@view_decorator
def launch_affectation_automatique(data):
	return attribution_automatique_func(data)

@view_decorator
def get_nombre_choix_max(data):
	nombre_choix_max = Config().get_nombre_choix_max()
	return generate_json_response({"nombre_choix_max": nombre_choix_max})

@view_decorator
def set_nombre_choix_max(data):
	Config().set_nombre_choix_max(data["nombre_choix_max"])
	return generate_json_response({})


@view_decorator
def set_soumission_sujet(data):
	soumission = data["active"]
	date = data["date"]
	encadreurs = Encadreur.all()
	if soumission:
		for encadreur in encadreurs:
			encadreur.notify_delai_soumission_sujet(data["date"])

		Config().set_date_soumission_sujet(date)
	else:
		for encadreur in encadreurs:
			encadreur.notify_fin_soumission_sujet()
	Config().set_soumission_sujet(soumission)
	Config().set_reminder_soumission_sujet(soumission)
	return generate_json_response({})

@view_decorator
def get_soumission_sujet(data):
	soumission = Config().get_soumission_sujet()
	date = Config().get_date_soumission_sujet()
	return generate_json_response({"active": soumission, "date": date})



# enumeration views

@view_decorator
def add_domaine(data):
	print("Adding domaine")
	if Domaine.exist(nom=data["nom"]):
		return generate_json_response({"success": False, "error": "Domaine already exists"})
	Domaine.create(nom=data["nom"])
	return generate_json_response({"success": True})

@view_decorator
def set_domaine(data):
	domaine = Domaine.get(nom=data["nom"])
	domaine.set_active(data["active"])

	if domaine.get_nom() == data["new_nom"]: 
		domaine.save()
		return generate_json_response({"success": True})
	else:
		if Domaine.exist(nom=data["new_nom"]):
			return generate_json_response({"success": False, "error": "Domaine already exists"})
		else:
			domaine.set_nom(data["new_nom"])
			domaine.save()
			return generate_json_response({"success": True})

@view_decorator
def delete_all_domaines(data):
	domaines = Domaine.all()
	for domaine in domaines:
		domaine.delete()
	return generate_json_response({"success": True})



@view_decorator
def add_competence(data):
	if Competence.exist(nom=data["nom"]):
		return generate_json_response({"success": False, "error": "Competence already exists"})
	Competence.create(nom=data["nom"])
	return generate_json_response({"success": True})

@view_decorator
def set_competence(data):
	competence = Competence.get(nom=data["nom"])
	competence.set_active(data["active"])

	if competence.get_nom() == data["new_nom"]: 
		competence.save()
		return generate_json_response({"success": True})
	else:
		if Competence.exist(nom=data["new_nom"]):
			return generate_json_response({"success": False, "error": "Competence already exists"})
		else:
			competence.set_nom(data["new_nom"])
			competence.save()
			return generate_json_response({"success": True})
		
@view_decorator
def delete_all_competences(data):
	competences = Competence.all()
	for competence in competences:
		competence.delete()
	return generate_json_response({"success": True})


@view_decorator
def add_specialite(data):
	if Specialite.exist(nom=data["nom"]):
		return generate_json_response({"success": False, "error": "Specialite already exists"})
	Specialite.create(nom=data["nom"], palier=data["palier"])
	return generate_json_response({"success": True})

@view_decorator
def set_specialite(data):
	specialite = Specialite.get(nom=data["nom"])
	specialite.set_active(data["active"])
	specialite.set_palier(data["palier"])

	if specialite.get_nom() == data["new_nom"]: 
		specialite.save()
		return generate_json_response({"success": True})
	else:
		if Specialite.exist(nom=data["new_nom"]):
			return generate_json_response({"success": False, "error": "Specialite already exists"})
		else:
			specialite.set_nom(data["new_nom"])
			specialite.save()
			return generate_json_response({"success": True})
		
@view_decorator
def delete_all_specialites(data):
	specialites = Specialite.all()
	for specialite in specialites:
		specialite.delete()
	return generate_json_response({"success": True})
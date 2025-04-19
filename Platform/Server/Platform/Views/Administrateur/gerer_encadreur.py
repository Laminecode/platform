from ..utils import *


@view_decorator
def creer_encadreur(data):
	if Encadreur.exist(data["email"]):
		return generate_json_response({"success": False, "error": "Email already exists"})

	if data["type"] == "interne":
		encadreur = EncadreurInterne.create(user_id=data["email"], password=data["password"], username=data["nom"] + " " + data["prenom"], grade=data["grade"], specialite=data["specialite"])
	else:
		encadreur = EncadreurExterne.create(user_id=data["email"], password=data["password"], username=data["nom"] + " " + data["prenom"], societe=data["societe"], poste=data["poste"])
	return generate_json_response({"success": True})

@view_decorator
def get_all_encadreurs(data):
	encadreurs = Encadreur.objects.all()
	res = []
	for e in encadreurs:
		
		res.append(e.get_full_object().dict_for_admin())
	return generate_json_response({"res": res})


def _get_encadreur(email):
	encadreur = Encadreur.get(email)
	return encadreur.get_full_object().dict_for_admin()

@view_decorator
def get_encadreur(data):
	return generate_json_response(_get_encadreur(data["email"]))

@view_decorator
def rechercher_encadreur(data):
	encadreurs = Encadreur.filter_user_id(data["email"])
	res = []
	for e in encadreurs:
		res.append(e.get_full_object().dict_for_admin())
	return generate_json_response({"res": res})



@view_decorator
def set_encadreur(data):
	encadreur = Encadreur.get(data["user_id"]).get_full_object()
	encadreur.set_user_id(data["email"])
	encadreur.set_username(data["username"])
	encadreur.set_password(data["password"])	
	encadreur.set_nombre_binome_max(data["nombre_binome_max"])
	encadreur.set_moyen_contact(data["moyen_contact"])
	encadreur.set_bureau(data["bureau"])
	encadreur.set_visible(data["visible"])
	if data["type"] == "interne":
		encadreur.set_grade(data["grade"])
		encadreur.set_specialite(data["specialite"])
	else:
		encadreur.set_poste(data["poste"])
		encadreur.set_societe(data["societe"])

	
	encadreur.save()
	return generate_json_response({})

@view_decorator
def delete_encadreur(data):
	encadreur = Encadreur.get(data["email"]).get_full_object()
	encadreur.delete()
	return generate_json_response({"success": True})
from ..utils import *


@view_decorator
def creer_groupe(data):
	groupe_data = data["groupe"]
	etudiants_data = data["etudiants"]
	groupe = Groupe.create(active=groupe_data["active"], specialite=groupe_data["specialite"], palier=groupe_data["palier"], annee=groupe_data["annee"])
	for etudiant_data in etudiants_data:
		etudiant = Etudiant.create(user_id=etudiant_data["matricule"], password=etudiant_data["password"], username=etudiant_data["nom"] + " " + etudiant_data["prenom"])
		etudiant.set_groupe(groupe)
		etudiant.save()
	return generate_json_response({"success": True})




@view_decorator
def get_all_etudiants(data):
	etudiants = Etudiant.objects.all()
	res = []
	for e in etudiants:
		info = e.dict_for_admin()
		info = e.get_groupe().dict_for_admin(info)
		res.append(info)
	return generate_json_response({"res": res})


def _get_etudiant(data):
	etudiant = Etudiant.get(data["matricule"])
	return etudiant.dict_for_admin()

@view_decorator
def get_etudiant(data):
	return generate_json_response(_get_etudiant(data))

@view_decorator
def rechercher_etudiant(data):
	etudiants = Etudiant.filter_user_id(data["matricule"])
	res = []
	for e in etudiants:
		info = e.dict_for_admin()
		info = e.get_groupe().dict_for_admin(info)
		res.append(info)
	return generate_json_response({"res": res})



@view_decorator
def set_etudiant(data):
	etudiant = Etudiant.get(data["user_id"])
	etudiant.set_user_id(data["matricule"])
	etudiant.set_password(data["password"])
	etudiant.set_username(data["username"]) 
	etudiant.save()
	return generate_json_response({"success": True})


@view_decorator
def get_groupe(data):
	groupe = Etudiant.get(data["matricule"]).get_groupe()
	res = {}
	res["groupe"] = groupe.dict_for_admin()
	etudiants = []
	for e in groupe.get_etudiants():
		etudiants.append(e.dict_for_admin())	
	res["etudiants"] = etudiants
	return generate_json_response(res)

@view_decorator
def set_groupe(data):
	groupe = Etudiant.get(data["matricule"]).get_groupe()
	groupe.set_active(data["active"])
	groupe.set_specialite(data["specialite"])
	groupe.set_palier(data["palier"])
	groupe.set_annee(data["annee"])
	groupe.save()
	return generate_json_response({"success": True})


@view_decorator
def delete_groupe(data):
	groupe = Groupe.get(data["id"])
	groupe.delete()
	return generate_json_response({"success": True})


@view_decorator
def set_pfe_to_groupe(data):
	groupe = Groupe.get(data["groupe_id"])
	sujet = Sujet.get(data["sujet_id"])
	groupe.set_pfe(sujet)
	groupe.notify_sujet_affecte()
	groupe.save()
	return generate_json_response({"success": True})

@view_decorator
def get_pfe_de_groupe(data: Data):
	groupe = Groupe.get(data["id"])
	if groupe.has_pfe():
		pfe: Sujet = groupe.get_pfe()
		info = pfe.dict_for_admin()
		info = pfe.get_encadreur().dict_for_admin(info)
		return generate_json_response({"has_pfe": True, "pfe": info})
	else:
		return generate_json_response({"has_pfe": False})


@view_decorator
def remove_pfe_from_groupe(data):
	groupe = Groupe.get(data["id"])
	groupe.remove_pfe()
	groupe.save()
	return generate_json_response({"success": True})

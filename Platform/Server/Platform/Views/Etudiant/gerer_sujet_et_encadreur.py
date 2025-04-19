from Server_side.utils import Config
from ..utils import *
from ..platform import is_phase_attribution_automatique


@view_decorator
def get_sujet(data: Data):
	sujet = Sujet.get(data["id"])
	etudiant = Etudiant.get(data.get_user_id())
	info = sujet.dict_for_etudiant(etudiant=etudiant)
	info = sujet.get_encadreur().dict_for_etudiant(info)
	return generate_json_response(info)

@view_decorator
def get_encadreur(data: Data):
	encadreur = Encadreur.get(data["user_id"])
	etudiant = Etudiant.get(data.get_user_id())
	info = encadreur.get_full_object().dict_for_etudiant(etudiant=etudiant)
	return generate_json_response(info)


@view_decorator
def get_sujets_de_encadreur(data: Data):
	encadreur = Encadreur.get(data["user_id"])
	etudiant = Etudiant.get(data.get_user_id())
	groupe = etudiant.get_groupe()
	sujets = Sujet.filter_valid_for_etudiant(etudiant_palier=groupe.get_palier(), etudiant_groupe_specialite=groupe.get_specialite(), queryset=encadreur.get_sujet_publie())
	res = []
	sujet: Sujet
	for sujet in sujets:
		info = sujet.dict_for_etudiant(etudiant=etudiant)
		res.append(info)
	return generate_json_response({"res": res})



# Sujet favoris
@view_decorator
def get_sujet_favoris(data: Data):
	sujets = Etudiant.get(data.get_user_id()).get_groupe().get_sujet_favoris()
	res = []
	sujet: Sujet
	for sujet in sujets:
		info = sujet.dict_for_etudiant()
		info = sujet.get_encadreur().dict_for_etudiant(info)
		res.append(info)
	return generate_json_response({"res": res})

@view_decorator
def add_sujet_favoris(data: Data):
	groupe = Etudiant.get(data.get_user_id()).get_groupe()
	sujet = Sujet.get(data["id"])
	groupe.add_sujet_favoris(sujet)
	groupe.save()
	return generate_json_response({})

@view_decorator
def delete_sujet_favoris(data: Data):
	groupe = Etudiant.get(data.get_user_id()).get_groupe()
	sujet = Sujet.get(data["id"])
	groupe.remove_sujet_favoris(sujet)
	groupe.save()
	return generate_json_response({})


# Encadreur favoris
@view_decorator
def get_encadreur_favoris(data: Data):
	encadreurs = Etudiant.get(data.get_user_id()).get_groupe().get_encadreur_favoris()
	res = []
	encadreur: Encadreur
	for encadreur in encadreurs:
		info = encadreur.get_full_object().dict_for_etudiant()
		res.append(info)
	return generate_json_response({"res": res})

@view_decorator
def add_encadreur_favoris(data: Data):
	groupe = Etudiant.get(data.get_user_id()).get_groupe()
	encadreur = Encadreur.get(data["user_id"])
	groupe.add_encadreur_favoris(encadreur)
	groupe.save()
	return generate_json_response({})

@view_decorator
def delete_encadreur_favoris(data: Data):
	groupe = Etudiant.get(data.get_user_id()).get_groupe()
	encadreur = Encadreur.get(data["user_id"])
	groupe.remove_encadreur_favoris(encadreur)
	groupe.save()
	return generate_json_response({})




# Sujet liste de choix
@view_decorator
def get_liste_de_choix(data: Data):
	liste = Etudiant.get(data.get_user_id()).get_groupe().get_projets_from_liste_de_choix()
	res = []
	sujet: Sujet
	for sujet in liste:
		info = sujet.dict_for_etudiant()
		info = sujet.get_encadreur().dict_for_etudiant(info)
		res.append(info)
	return generate_json_response({"res": res})

@view_decorator
def add_liste_de_choix(data: Data):
	groupe = Etudiant.get(data.get_user_id()).get_groupe()
	sujet = Sujet.get(data["id"])
	groupe.add_liste_de_choix(sujet)
	groupe.save()
	return generate_json_response({})


@view_decorator
def delete_liste_de_choix(data: Data):
	groupe = Etudiant.get(data.get_user_id()).get_groupe()
	sujet = Sujet.get(data["id"])
	groupe.remove_liste_de_choix(sujet)
	groupe.save()
	return generate_json_response({})

@view_decorator
def reorder_liste_de_choix(data: Data):
	groupe = Etudiant.get(data.get_user_id()).get_groupe()
	groupe.reorder_liste_de_choix(data["new_order"])
	groupe.save()
	return generate_json_response({})

@view_decorator
def can_modify_liste_de_choix(data):
	groupe = Groupe.get(data["id"])
	able = is_phase_attribution_automatique() and not groupe.has_pfe()
	limit = groupe.get_liste_de_choix().count() < Config().get_nombre_choix_max()
	return generate_json_response({"able": able, "less_than_limit": limit})



@view_decorator
def get_pfe(data: Data):
	groupe = Etudiant.get(data.get_user_id()).get_groupe()
	if groupe.has_pfe():
		pfe: Sujet = groupe.get_pfe()
		info = pfe.dict_for_etudiant()
		info = pfe.get_encadreur().dict_for_etudiant(info)
		return generate_json_response({"has_pfe": True, "pfe": info})
	else:
		return generate_json_response({"has_pfe": False})
	

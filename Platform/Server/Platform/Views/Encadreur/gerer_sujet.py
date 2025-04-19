from ..utils import *
from typing import List
from ..gerer_notifcation import _get_notifications

@view_decorator
def get_sujets(data: Data):
	encadreur = Encadreur.get(data.get_user_id())
	res = []
	sujet: Sujet
	for sujet in encadreur.get_sujet_publie():
		res.append(sujet.dict_for_encadreur())
	
	return generate_json_response({"res": res})


@view_decorator
def get_sujet(data: Data):
	sujet = Sujet.get(id=data["id"])
	return generate_json_response(sujet.dict_for_encadreur())


@view_decorator
def creer_sujet(data: Data):
	encadreur = Encadreur.get(data.get_user_id())
	titre = data["titre"]

	if encadreur.has_sujet_with_title(titre):
		return generate_json_response({"success": False, "erreur": "Sujet avec le meme titre existe deja"})
	else:
		sujet = Sujet.create(titre=data["titre"], description=data["desc"], 
					   palier=data["palier"], encadreur=encadreur, 
					   liste_specialite=data["liste_specialites"], visible=data["visible"],
					   domaines=data["domaines"], outils=data["outils"])
		sujet.save()
		return generate_json_response({"success": True})


@view_decorator
def modifer_sujet(data: Data):
	encadreur = Encadreur.get(data.get_user_id())
	sujet: Sujet = Sujet.get(id=data["id"])
	if sujet.get_titre() != data["titre"] and encadreur.has_sujet_with_title(data["titre"]):
		return generate_json_response({"success": False, "erreur": "Sujet avec le meme titre existe deja"})
	
	sujet.set_domaines(data["domaines"])
	sujet.set_outils(data["outils"])
	sujet.set_titre(data["titre"])
	sujet.set_description(data["desc"])
	sujet.set_palier(data["palier"])
	sujet.set_visible(data["visible"])
	sujet.set_liste_specialites(data["liste_specialites"])
	sujet.save()

	return generate_json_response({"success": True})


@view_decorator
def supprimer_sujet(data: Data):
	sujet: Sujet = Sujet.get(id=data["id"])
	if sujet.is_assigned():
		return generate_json_response({"success": False, "erreur": "Sujet est assigne a un etudiant"})
	sujet.delete()
	return generate_json_response({"success": True})


@view_decorator
def rechercher_sujet(data: Data):
	encadreur = Encadreur.get(data.get_user_id())
	sujets_publies = encadreur.get_sujet_publie()
	sujets = Sujet.filter_titre(titre=data["titre"], queryset=sujets_publies)
	res = []
	for sujet in sujets:
		res.append(sujet.dict_for_encadreur())
	return generate_json_response({"res": res})
from ..utils import view_decorator, generate_json_response, Data
from ...models import *


@view_decorator
def get_sujet(data: Data):
	sujet = Sujet.get(data["id"])
	info = sujet.dict_for_admin()
	info = sujet.get_encadreur().dict_for_admin(info)
	return generate_json_response(info)


@view_decorator
def rechercher_sujet(data: Data):
	sujets = Sujet.filter_titre(data["titre"])
	res = []
	for s in sujets:
		info = s.dict_for_admin()
		info = s.get_encadreur().dict_for_admin(info)
		res.append(info)
	return generate_json_response({"res": res})

@view_decorator
def get_sujets(data):
	sujets = Sujet.all()
	res = []
	for s in sujets:
		info = s.dict_for_admin()
		info = s.get_encadreur().dict_for_admin(info)
		res.append(info)
	return generate_json_response({"res": res})


@view_decorator
def rechercher_sujet_non_attribue(data: Data):
	groupe = Groupe.get(data["id"])
	sujets = Sujet.filter_valid_for_etudiant(etudiant_palier=groupe.get_palier(), etudiant_groupe_specialite=groupe.get_specialite())
	sujets = Sujet.filter_titre(data["titre"], queryset=sujets)
	res = []
	for s in sujets:
		info = s.dict_for_admin()
		info = s.get_encadreur().dict_for_admin(info)
		res.append(info)
	return generate_json_response({"res": res})


@view_decorator
def get_sujets_non_attribue(data: Data):
	groupe = Groupe.get(data["id"])
	sujets = Sujet.filter_valid_for_etudiant(etudiant_palier=groupe.get_palier(), etudiant_groupe_specialite=groupe.get_specialite())
	res = []
	for s in sujets:
		info = s.dict_for_admin()
		info = s.get_encadreur().dict_for_admin(info)
		res.append(info)
	return generate_json_response({"res": res})

from ..utils import *

@view_decorator
def get_etudiants(data: Data):
	encadreur = Encadreur.get(data.get_user_id())
	res = []
	sujet: Sujet
	for sujet in encadreur.get_sujet_attribue():
		groupe: Groupe = sujet.get_groupe()
		info = sujet.dict_for_encadreur()
		info = groupe.dict_for_encadreur(info)
		liste_etudiants = []
		etudiant: Etudiant
		for etudiant in groupe.get_etudiants():
			liste_etudiants.append(etudiant.dict_for_encadreur())
		info["etudiants"] = liste_etudiants
		res.append(info)


	return generate_json_response({"res": res})


@view_decorator
def get_etudiant(data: Data):
	etudiant = Etudiant.get(data["matricule"])
	groupe = etudiant.get_groupe()
	info = etudiant.dict_for_encadreur()
	info = groupe.dict_for_encadreur(info)
	return generate_json_response(info)
	


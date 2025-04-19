from .utils import *
from Server_side.utils import *
from random import shuffle

def attribution_automatique_func(data):

	groupes = list(Groupe.filter_no_pfe())
	shuffle(groupes)
	for groupe in groupes:
		sujet: Sujet
		for sujet in groupe.get_projets_from_liste_de_choix():
			if sujet.can_be_assigned():
				groupe.set_pfe(sujet)
				groupe.notify_sujet_affecte()
				groupe.save()
				break
		else:
			groupe.notify_no_sujet_affecte()
			groupe.save()
			

		
	Config().set_session(False)
	return generate_json_response({})


@view_decorator
def attribution_automatique(data):
	return attribution_automatique_func(data)

@view_decorator
def delai_attribution_automatique(data):
	etudiants = Etudiant.filter_no_pfe()
	delai = str_to_datetime(Config().get_date_affectation_automatique())
	etudiant: Etudiant
	for etudiant in etudiants:
		etudiant.notify_delai_affectation_automatique(delai=delai)


	# Config().set_reminder_attribution_automatique(False)
	return generate_json_response({})


@view_decorator
def fin_soumission_sujet(data):
	encadreurs = Encadreur.all()
	for encadreur in encadreurs:
		encadreur.notify_fin_soumission_sujet()
	
	
	Config().set_soumission_sujet(False)
	return generate_json_response({})

@view_decorator
def delai_soumission_sujet(data):
	encadreurs = Encadreur.all()
	delai = str_to_datetime(Config().get_date_soumission_sujet())
	for encadreur in encadreurs:
		encadreur.notify_delai_soumission_sujet(delai=delai)

	Config().set_reminder_attribution_automatique(False)
	return generate_json_response({})



@view_decorator
def get_date_attribution_automatique(data):
	if Config().get_session() and not Config().get_soumission_sujet() :
		return generate_json_response({"date": Config().get_date_affectation_automatique(), "active": True})
	return generate_json_response({"active": False})  

@view_decorator
def get_date_soumission_sujet(data):
	if Config().get_soumission_sujet():
		return generate_json_response({"date": Config().get_date_soumission_sujet(), "active": True})
	return generate_json_response({"active": False})

@view_decorator
def get_domaines(data):
	domaines = Domaine.all()
	res = []
	for domaine in domaines:
		res.append(domaine.dict_for_admin())
	return generate_json_response({"res": res})


	
@view_decorator
def get_competences(data):
	competences = Competence.all()
	res = []
	for competence in competences:
		res.append(competence.dict_for_admin())
	return generate_json_response({"res": res})

@view_decorator
def get_specialites(data):
	specialites = Specialite.all()
	res = []
	for specialite in specialites:
		res.append(specialite.dict_for_admin())
	return generate_json_response({"res": res})

@view_decorator
def get_specialite_de_palier(data):
	specialites = Specialite.filter_palier(data["palier"])
	res = []
	for specialite in specialites:
		res.append(specialite.dict_for_admin())
	return generate_json_response({"res": res})



def is_phase_attribution_automatique():
	"""
	the phase after the soumission des sujets and before attribution automatique
	when students can choose their subjects and add them to their liste de choix
	"""
	return Config().get_session() and not Config().get_soumission_sujet()


@view_decorator
def is_phase_attribution_automatique_view(data):
	return generate_json_response({"bool": is_phase_attribution_automatique()})




def is_phase_soumission_sujet():
	"""
	the phase when encadreur can add subjects
	"""
	return Config().get_soumission_sujet()

@view_decorator
def is_phase_soumission_sujet_view(data):
	return generate_json_response({"bool": is_phase_soumission_sujet()})

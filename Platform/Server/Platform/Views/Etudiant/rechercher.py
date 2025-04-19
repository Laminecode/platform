from ..utils import view_decorator, csrf_exempt, Data, generate_json_response
from ...models import *
from typing import *

def match_sublist_exactly(list1, list2):
	for elem in list2:
		if not elem in list1:
			return False
	return True

def filter_by_domains_and_outils(results, domains_search, outils_search):
	new_results = []
	result: Encadreur|Sujet
	for result in results:
		domains = result.get_domaines()
		outils = result.get_outils()
		if match_sublist_exactly(domains, domains_search) and match_sublist_exactly(outils, outils_search):
			new_results.append(result)
	return new_results



def match_sujet(filters: Data):
	title = filters["titre"]
	groupe = Etudiant.get(filters.get_user_id()).get_groupe()
	result = Sujet.filter_valid_for_etudiant(etudiant_palier=groupe.get_palier(), etudiant_groupe_specialite=groupe.get_specialite())
	if title:
		result = Sujet.filter_titre(queryset=result, titre=title)

	result = filter_by_domains_and_outils(result, filters["domaines"], filters["outils"])
	return result


@view_decorator
def recherhcer_sujet(filters):
	result = match_sujet(filters)
	etudiant = Etudiant.get(filters.get_user_id())
	res = []
	sujet: Sujet
	for sujet in result:
		info = sujet.dict_for_etudiant(etudiant=etudiant)
		info = sujet.get_encadreur().dict_for_etudiant(info)
		res.append(info)

	return generate_json_response({"res": res})
	

def match_encadreur(filters : Data):
	username = filters["username"]
	result = Encadreur.get_valid_for_etudiant()
	# print(result)
	if username:
		result = Encadreur.filter_username(username=username, queryset=result)

	result = filter_by_domains_and_outils(result, filters["domaines"], filters["outils"])

	return result

@view_decorator
def recherhcer_encadreur(filters):
	result = match_encadreur(filters)
	etudiant = Etudiant.get(filters.get_user_id())
	res = []
	encadreur: Encadreur
	for encadreur in result:
		res.append(encadreur.get_full_object().dict_for_etudiant(etudiant=etudiant))


	return generate_json_response({"res": res})



class Rank:
	def __init__(self, rank):
		self.rank = rank

	def __lt__(self, other):
		return self.rank < other.rank
	
class ObjRank(Rank):
	def __init__(self, obj, etudiant_domains, etudiant_outils):
		self.obj: Sujet|Encadreur = obj
		super().__init__(self.calc_rank(etudiant_domains, etudiant_outils))

	def calc_rank(self, etudiant_domains, etudiant_outils):
		rank = 0
		obj_domains = self.obj.get_domaines()
		obj_outils = self.obj.get_outils()
		for domain in obj_domains:
			if domain in etudiant_domains:
				rank += 2
		for domain in obj_outils:
			if domain in etudiant_outils:
				rank += 1
		
		return rank

def sort_objs(objs, etudiant_domains, etudiant_outils):
	objs = [ObjRank(obj, etudiant_domains, etudiant_outils) for obj in objs]
	objs = sorted(objs, reverse=True)
	return objs
	

def get_sorted_obj(objs: List[ObjRank]):
	for obj in objs:
		yield obj.obj




# @view_decorator
@view_decorator
def suggerer_sujet(filters: Data):
	etudiant = Etudiant.get(filters.get_user_id())
	groupe = etudiant.get_groupe()
	result = Sujet.filter_valid_for_etudiant(etudiant_palier=groupe.get_palier(), etudiant_groupe_specialite=groupe.get_specialite())
	result = sort_objs(result, groupe.get_domaines(), groupe.get_outils())

	res = []
	sujet: Sujet
	for sujet in get_sorted_obj(result):
		info = sujet.dict_for_etudiant(etudiant=etudiant)
		info = sujet.get_encadreur().dict_for_etudiant(info)
		res.append(info)

	return generate_json_response({"res": res})


@view_decorator
def suggerer_encadreur(filters: Data):
	etudiant = Etudiant.get(filters.get_user_id())
	groupe = etudiant.get_groupe()
	result = Encadreur.get_valid_for_etudiant()
	result = sort_objs(result, groupe.get_domaines(), groupe.get_outils())

	res = []
	encadreur: Encadreur
	for encadreur in get_sorted_obj(result):
		res.append(encadreur.get_full_object().dict_for_etudiant(etudiant=etudiant))

	return generate_json_response({"res": res})





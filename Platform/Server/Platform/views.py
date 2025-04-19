import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import *
from typing import *

def extract_json(view):
	def wrapper(request):
		return view(json.loads(request.body))
	return wrapper







# def pack_sujets_encadreur(result):
	
# 	res = []
# 	sujet: Sujet
# 	for sujet in result:
# 		temp = {}
# 		temp["titre"] = sujet.titre
# 		temp["desc"] = sujet.description
# 		temp["domaines"] = sujet.domaines 
# 		temp["outils"] = sujet.outils_et_connaissances 

# 		res.append(temp)
# 	return res

# def pack_encadreurs(result):
# 	res = []
# 	encadreur: Encadreur
# 	for encadreur in result:
# 		temp = {}
# 		temp["nom"] = encadreur.nom
# 		temp["prenom"] = encadreur.prenom
# 		# temp["type"] = "encadreur"
# 		temp["spec"] = encadreur.specialite
# 		temp["grade"] = encadreur.grade		
# 		temp["domaines"] = encadreur.expertises 
# 		temp["outils"] = encadreur.outils_et_connaissances 

# 		# packer.add(temp)
# 		res.append(temp)
# 	return res

	
# def match_sublist_exactly(results, constraints):
# 	for constraint in constraints:
# 		if not constraint in results:
# 			return False
# 	return True

# def filter_by_domains(results, domains):
# 	new_results = []
# 	for result in results:
# 		domains = result.get_domains()
# 		if match_sublist_exactly(domains, domains):
# 			new_results.append(result)
# 	return new_results

# def filter_by_outils(results, constraints):
# 	new_results = []
# 	for result in results:
# 		outils = result.get_outils()
# 		if match_sublist_exactly(outils, constraints):
# 			new_results.append(result)
# 	return new_results

# def filter_by_domains_and_outils(results, domains_search, outils_search):
# 	new_results = []
# 	for result in results:
# 		domains = result.get_domains()
# 		outils = result.get_outils()
# 		if match_sublist_exactly(domains, domains_search) and match_sublist_exactly(outils, outils_search):
# 			new_results.append(result)
# 	return new_results


# def match_sujet(filters):
# 	title = filters["search_input"]

# 	if (title == ""):
# 		result = Sujet.objects.all()
# 	else:
# 		regex = f"{title}.*"
# 		result = Sujet.objects.filter(titre__iregex=regex)

# 	filter_by_domains_and_outils(result, filters["domaines"], filters["outils"])

# 	return result

# def match_sujet(filters):
# 	title = filters["search_input"]

# 	if (title == ""):
# 		# result = Sujet.objects.all()
# 		result = SujetEncadreur.objects.all()
# 	else:
# 		regex = f"{title}.*"
# 		result = SujetEncadreur.objects.filter(parent__titre__iregex=regex)

# 	# filter_by_domains_and_outils(result, filters["domaines"], filters["outils"])
# 	print(result)
	
# 	return result

# def match_encadreur(filters : Dict[str,str]):
# 	if (filters["search_input"] == ""):
# 		result = Encadreur.objects.all()
# 	else:
# 		input = filters["search_input"].split()
# 		nom = input[0]
# 		prenom = " ".join(input[1:])
# 		print(nom, prenom)
# 		if (nom == ""):
# 			regex_nom = ".*"
# 		else:
# 			regex_nom = f"{nom}.*"

# 		if (prenom == ""):
# 			regex_prenom = ".*"
# 		else:
# 			regex_prenom = f"{prenom}.*"

# 		print(regex_nom, regex_prenom)
# 		result = Encadreur.objects.filter(nom__iregex=regex_nom, prenom__iregex=regex_prenom, )

# 	result = filter_by_domains_and_outils(result, filters["domaines"], filters["outils"])

# 	return result



# def match_best_result(filters):
# 	# result: models.QuerySet
# 	# packer: Packer = Packer()
	
# 	if filters["type"] == "sujet":
# 		return pack_sujets(match_sujet(filters))
# 	elif filters["type"] == "encadreur":
# 		return pack_encadreurs(match_encadreur(filters))


# @csrf_exempt
# @extract_json
# def rechercher(filters):
# 	print(filters)
# 	result = {}
# 	# result["res"] = match_best_result(data)
# 	if filters["type"] == "sujet":
# 		result["res"] = pack_sujets_encadreur(match_sujet(filters))
# 		result["type"] = "sujet"
# 	elif filters["type"] == "encadreur":
# 		result["res"] = pack_encadreurs(match_encadreur(filters))
# 		result["type"] = "encadreur"
# 	# print(result)
# 	return JsonResponse(result)

# # Create your views here.

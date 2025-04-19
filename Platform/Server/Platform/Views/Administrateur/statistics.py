from ..utils import view_decorator, generate_json_response
from ...models import *


@view_decorator
def get_statistiques(data):

	num_students = Etudiant.objects.count()
	num_groups = Groupe.objects.count()
	num_subjects_interne = Sujet.count_interne()
	num_subjects_externe = Sujet.count_externe()
	num_encadreurs_interne = EncadreurInterne.objects.count()
	num_encadreurs_externe = EncadreurExterne.objects.count()

	num_active_groups = Groupe.count_active()
	num_inactive_groups = Groupe.count_inactive()

	num_groupe_with_pfe = Groupe.count_pfe()
	num_groupe_without_pfe = Groupe.count_no_pfe()

	num_projet_l3 = Sujet.count_l3()
	num_projet_m2 = Sujet.count_m1()

	# Return the statistics as a JSON response
	return generate_json_response({
		"num_students": num_students,
		"num_groups": num_groups,
		"num_subjects_interne": num_subjects_interne,
		"num_subjects_externe": num_subjects_externe,
		"num_encadreurs_interne": num_encadreurs_interne,
		"num_encadreurs_externe": num_encadreurs_externe,

		"num_active_groups": num_active_groups,
		"num_inactive_groups": num_inactive_groups,

		"num_groupe_with_pfe": num_groupe_with_pfe,
		"num_groupe_without_pfe": num_groupe_without_pfe,

		"num_projet_l3": num_projet_l3,
		"num_projet_m2": num_projet_m2
	})
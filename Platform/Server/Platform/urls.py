
from django.urls import path
from .Views import gerer_notifcation, login, server_side
from .Views.Etudiant import rechercher as etudiant_rechercher, gerer_sujet_et_encadreur as etudiant_gerer_sujet_et_encadreur, gerer_profil as etudiant_gerer_profil
from .Views.Encadreur import gerer_sujet as encadreur_gerer_sujet, gerer_etudiant as encadreur_gerer_etudiant, gerer_profil as encadreur_gerer_profil
from .Views.Administrateur import gerer_platform, statistics, gerer_profil as admin_gerer_profil, gerer_encadreur as admin_gerer_encadreur, gerer_etudiant as admin_gerer_etudiant, gerer_admin as admin_gerer_admin, gerer_sujet as admin_gerer_sujet
from .Views import platform

urlpatterns = [
	# path("signin/", auth.signin),



    # server side views
	path("auth_side_server/", server_side.auth),

	path("attribution_automatique/", platform.attribution_automatique), # verified
	path("delai_attribution_automatique/", platform.delai_attribution_automatique), # verified

	path("fin_soumission_sujet/", platform.fin_soumission_sujet), # verified
	path("delai_fin_soumission_sujet/", platform.delai_soumission_sujet), # verified

	# admin views
	path("admin/login/", login.login_admin), # verified tested
	path("admin/logout/", login.logout), # verified tested

	path("admin/get_profil/", admin_gerer_profil.get_profil), # verified  tested
	path("admin/set_profil/", admin_gerer_profil.set_profil), # verified tested

	# path("creer_superadmin/", admin_gerer_admin.creer_superadmin), # verified tested

	path("admin/set_attribution_automatique/", gerer_platform.set_session), # verified
	path("admin/get_attribution_automatique/", gerer_platform.get_session), # verified

	path("admin/launch_attribution_automatique/", gerer_platform.launch_affectation_automatique), # verified

	path("admin/set_nombre_choix_max/", gerer_platform.set_nombre_choix_max), # verified
	path("admin/get_nombre_choix_max/", gerer_platform.get_nombre_choix_max), # verified

	path("admin/set_soumission_sujet/", gerer_platform.set_soumission_sujet), # verified
	path("admin/get_soumission_sujet/", gerer_platform.get_soumission_sujet), # verified

	path("admin/get_etudiants/", admin_gerer_etudiant.get_all_etudiants), # verified
	path("admin/get_etudiant/", admin_gerer_etudiant.get_etudiant), # verified
	path("admin/set_etudiant/", admin_gerer_etudiant.set_etudiant), # verified
	path("admin/rechercher_etudiant/", admin_gerer_etudiant.rechercher_etudiant), # verified
	path("admin/creer_groupe/", admin_gerer_etudiant.creer_groupe), # verified
	path("admin/get_groupe/", admin_gerer_etudiant.get_groupe), # verified
	path("admin/set_groupe/", admin_gerer_etudiant.set_groupe), # verified
	path("admin/delete_groupe/", admin_gerer_etudiant.delete_groupe), # verified

	path("admin/creer_encadreur/", admin_gerer_encadreur.creer_encadreur), # verified
	path("admin/get_encadreurs/", admin_gerer_encadreur.get_all_encadreurs), # verified
	path("admin/get_encadreur/", admin_gerer_encadreur.get_encadreur), # verified
	path("admin/set_encadreur/", admin_gerer_encadreur.set_encadreur), # verified
	path("admin/delete_encadreur/", admin_gerer_encadreur.delete_encadreur), # verified
	path("admin/rechercher_encadreur/", admin_gerer_encadreur.rechercher_encadreur), # verified
	
	path("admin/get_sujet/", admin_gerer_sujet.get_sujet), # verified
	path("admin/get_sujets/", admin_gerer_sujet.get_sujets), # verified	
	path("admin/rechercher_sujet/", admin_gerer_sujet.rechercher_sujet), # verified
	path("admin/get_sujets_non_attribue/", admin_gerer_sujet.get_sujets_non_attribue), # verified
	path("admin/rechercher_sujet_non_attribue/", admin_gerer_sujet.rechercher_sujet_non_attribue), # verified
	
	path("admin/set_pfe_to_groupe/", admin_gerer_etudiant.set_pfe_to_groupe), # verified
	path("admin/get_pfe_de_groupe/", admin_gerer_etudiant.get_pfe_de_groupe), # verified
	path("admin/remove_pfe_from_groupe/", admin_gerer_etudiant.remove_pfe_from_groupe), # verified

	path("admin/get_admin/", admin_gerer_admin.get_admin), # verified
	path("admin/creer_admin/", admin_gerer_admin.creer_administrateur), # verified
	path("admin/get_admins/", admin_gerer_admin.get_admins), # verified
	path("admin/set_admin/", admin_gerer_admin.set_admin), # verified
	path("admin/delete_admin/", admin_gerer_admin.delete_admin), # verified

	path("admin/get_statistiques/", statistics.get_statistiques), # verified tested 

	path("admin/get_domaines/", platform.get_domaines), # verified
	path("admin/add_domaine/", gerer_platform.add_domaine), # verified
	path("admin/set_domaine/", gerer_platform.set_domaine), # verified

	path("admin/get_competences/", platform.get_competences), # verified
	path("admin/add_competence/", gerer_platform.add_competence), # verified
	path("admin/set_competence/", gerer_platform.set_competence), # verified

	path("admin/get_specialites/", platform.get_specialites), # verified
	path("admin/add_specialite/", gerer_platform.add_specialite), # verified
	path("admin/set_specialite/", gerer_platform.set_specialite), # verified
	path("admin/get_specialites_de_palier/", platform.get_specialite_de_palier), # verified

	path("admin/get_notifications/", admin_gerer_profil.get_notifications), # verified


	# etudiant views
	path("etudiant/login/", login.login_etudiant), # verified
	path("etudiant/logout/", login.logout), # verified
	
	path("etudiant/get_profil/", etudiant_gerer_profil.get_profil), # verified
	path("etudiant/set_profil/", etudiant_gerer_profil.set_profil), # verified
	
	path("etudiant/get_sujet/", etudiant_gerer_sujet_et_encadreur.get_sujet), # verified
	path("etudiant/get_encadreur/", etudiant_gerer_sujet_et_encadreur.get_encadreur), # verified
	path("etudiant/get_suejets_de_encadreur/", etudiant_gerer_sujet_et_encadreur.get_sujets_de_encadreur), # verified

	path("etudiant/rechercher_sujet/", etudiant_rechercher.recherhcer_sujet), # verified
	path("etudiant/rechercher_encadreur/", etudiant_rechercher.recherhcer_encadreur), # verified
	path("etudiant/suggerer_sujet/", etudiant_rechercher.suggerer_sujet), # verified
	path("etudiant/suggerer_encadreur/", etudiant_rechercher.suggerer_encadreur), # verified

	path("etudiant/get_sujet_favoris/", etudiant_gerer_sujet_et_encadreur.get_sujet_favoris), # verified
	path("etudiant/add_sujet_favoris/", etudiant_gerer_sujet_et_encadreur.add_sujet_favoris), # verified
	path("etudiant/delete_sujet_favoris/", etudiant_gerer_sujet_et_encadreur.delete_sujet_favoris), # verified

	path("etudiant/get_encadreur_favoris/", etudiant_gerer_sujet_et_encadreur.get_encadreur_favoris), # verified
	path("etudiant/add_encadreur_favoris/", etudiant_gerer_sujet_et_encadreur.add_encadreur_favoris), # verified
	path("etudiant/delete_encadreur_favoris/", etudiant_gerer_sujet_et_encadreur.delete_encadreur_favoris), # verified
	
	path("etudiant/get_liste_de_choix/", etudiant_gerer_sujet_et_encadreur.get_liste_de_choix), # verified
	path("etudiant/add_liste_de_choix/", etudiant_gerer_sujet_et_encadreur.add_liste_de_choix), # verified
	path("etudiant/delete_liste_de_choix/", etudiant_gerer_sujet_et_encadreur.delete_liste_de_choix), # verified
	path("etudiant/reorder_liste_de_choix/", etudiant_gerer_sujet_et_encadreur.reorder_liste_de_choix), # verified
	path("etudiant/can_modify_liste_de_choix/", etudiant_gerer_sujet_et_encadreur.can_modify_liste_de_choix), # verified
	path("etudiant/get_pfe/", etudiant_gerer_sujet_et_encadreur.get_pfe), # verified

	path("etudiant/get_domaines/", platform.get_domaines), # verified
	path("etudiant/get_competences/", platform.get_competences), # verified
	path("etudiant/get_specialites/", platform.get_specialites), # verified

	path("etudiant/get_notifications/", etudiant_gerer_profil.get_notifications), # verified
    path("etudiant/get_date_attribution_automatique/", platform.get_date_attribution_automatique), # verified

	# encadreur views
	path("encadreur/login/", login.login_encadreur), # verified
	path("encadreur/logout/", login.logout), # verified

	path("encadreur/get_profil/", encadreur_gerer_profil.get_profil), # verified
	path("encadreur/set_profil/", encadreur_gerer_profil.set_profil), # verified

	path("encadreur/get_sujets/", encadreur_gerer_sujet.get_sujets), # verified
	path("encadreur/get_sujet/", encadreur_gerer_sujet.get_sujet), # verified
	path("encadreur/modify_sujet/", encadreur_gerer_sujet.modifer_sujet), # verified
	path("encadreur/creer_sujet/", encadreur_gerer_sujet.creer_sujet), # verified
	path("encadreur/supprimer_sujet/", encadreur_gerer_sujet.supprimer_sujet), # verified
	path("encadreur/rechercher_sujet/", encadreur_gerer_sujet.rechercher_sujet), # verified

	path("encadreur/get_groupes/", encadreur_gerer_etudiant.get_etudiants),
	path("encadreur/get_etudiant/", encadreur_gerer_etudiant.get_etudiant), # verified

	path("encadreur/get_domaines/", platform.get_domaines), # verified
	path("encadreur/get_competences/", platform.get_competences), # verified
	path("encadreur/get_specialites/", platform.get_specialites), # verified
	path("encadreur/get_specialites_de_palier/", platform.get_specialite_de_palier), # verified

	path("encadreur/get_notifications/", encadreur_gerer_profil.get_notifications), # verified
    path("encadreur/get_date_soumission_sujet/", platform.get_date_soumission_sujet), # verified

	# UI views
	path("set_notification_lu/", gerer_notifcation.set_notification_lu), 

	path("is_phase_attribution_automatique/", platform.is_phase_attribution_automatique_view), # verified
	path("is_phase_soumission_sujet/", platform.is_phase_soumission_sujet_view), # verified

	# testing views
	path("delete_all_domaines/", gerer_platform.delete_all_domaines), # verified
	path("delete_all_competences/", gerer_platform.delete_all_competences), # verified
	path("delete_all_specialites/", gerer_platform.delete_all_specialites), # verified
	
]


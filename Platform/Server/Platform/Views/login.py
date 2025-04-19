
from .utils import *


def create_session_object(user_id):
	secret_key[user_id] = gen_rand_secret_key()
	return {"id": user_id, "key": gen_auth_token(user_id)}

@json_decorator
def login_etudiant(data):
	if Etudiant.exist(user_id=data["matricule"]):
		etudiant = Etudiant.get(user_id=data["matricule"])
		if etudiant.get_password() == data["password"]:
			return JsonResponse({"success": True, "session": create_session_object(etudiant.get_user_id())})
	return JsonResponse({"success": False})

@json_decorator
def login_encadreur(data):
	if Encadreur.exist(user_id=data["email"]):
		encadreur = Encadreur.get(user_id=data["email"])
		if encadreur.get_password() == data["password"]:
			return JsonResponse({"success": True, "session": create_session_object(encadreur.get_user_id())})
	return JsonResponse({"success": False})



@json_decorator
def login_admin(data):
	if Administrateur.exist(user_id=data["email"]):
		admin = Administrateur.get(user_id=data["email"])
		if admin.get_password() == data["password"]:
			return JsonResponse({"success": True, "session": create_session_object(admin.get_user_id())})
	return JsonResponse({"success": False})


@view_decorator
def logout(data: Data):
	secret_key.pop(data.get_user_id())
	return JsonResponse({})
	

# @view_decorator


		
from ..utils import *


@view_decorator
def creer_administrateur(data):
	if Administrateur.exist(data["user_id"]):
		return generate_json_response({"success": False, "error": "Email already exists"})
	
	administrateur = Administrateur.create(user_id=data["user_id"], password=data["password"], username=data["nom"] + " " + data["prenom"], superuser=False)
	return generate_json_response({"success": True})


@csrf_exempt
def creer_superadmin(req):
	Administrateur.create(user_id="admin", password="password", username="username", superuser=True)
	return JsonResponse({})

@view_decorator
def get_admins(data: Data):
	admins = Administrateur.all_except_self(data.get_user_id())
	res = []
	for admin in admins:
		res.append(admin.dict_for_super_admin())

	return generate_json_response({"res": res})


@view_decorator
def get_admin(data: Data):
	admin = Administrateur.get(data["user_id"])
	return generate_json_response(admin.dict_for_super_admin())

@view_decorator
def set_admin(data: Data):
	admin = Administrateur.get(data["user_id"])
	admin.set_password(data["password"])
	admin.set_username(data["username"])
	admin.set_user_id(data["new_user_id"])
	admin.save()
	return generate_json_response({"success": True})
	
@view_decorator
def delete_admin(data: Data):
	Administrateur.get(data["user_id"]).delete()
	return generate_json_response({"success": True})
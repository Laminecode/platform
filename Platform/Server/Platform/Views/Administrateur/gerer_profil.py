from ..utils import *
from ..gerer_notifcation import _get_notifications


@view_decorator
def get_profil(data: Data):
	admin = Administrateur.get(data.get_user_id())
	return generate_json_response(admin.dict_for_self())


@view_decorator
def set_profil(data: Data):
	admin = Administrateur.get(data.get_user_id())
	admin.set_user_id(data["user_id"])
	admin.set_password(data["password"])
	admin.set_username(data["username"])
	admin.save()
	return JsonResponse({})

@view_decorator
def get_notifications(data: Data):
	return _get_notifications(Administrateur, data)
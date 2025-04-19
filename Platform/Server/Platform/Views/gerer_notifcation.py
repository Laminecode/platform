from .utils import *




def _get_notifications(User, data: Data):
	utilisateur = User.get(data.get_user_id())
	notifications = utilisateur.get_notifications_non_lu()
	res = []
	notification: Notification
	for notification in notifications:
		res.append(notification.get_full_object().dict())

	return generate_json_response({"res": res})


@view_decorator
def set_notification_lu(data: Data):
	notification = Notification.get(data["id"]).get_full_object()
	notification.set_lu(True)
	notification.save()
	return generate_json_response({})

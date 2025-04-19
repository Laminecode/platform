from django.http import JsonResponse
from .utils import extract_json, json_decorator, csrf_exempt, secret_key, gen_auth_token, gen_rand_secret_key

# @view_decorator
@csrf_exempt
def test(data):
	print("Hello, world!, server request was successful")

	return JsonResponse({})

@json_decorator
# @csrf_exempt
# @extract_json
def auth(request):
	print("Getting authentication request from side server...", request)
	id = request["id"]
	secret_key[id] = gen_rand_secret_key()
	print(secret_key)
	return JsonResponse({"session": {"id": id, "key": gen_auth_token(id)}})



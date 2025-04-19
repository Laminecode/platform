import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from ..models import *
from typing import *
from Server_side.utils import Config
import hashlib
import hmac
import os


# def pack_result(objects):
# 	"""
# 	Takes a list of objects that have a .dict() method 
# 	Returns a list of dictionaries gotten from calling .dict() on each object
# 	"""
# 	return [object.dict() for object in objects]
	

class Data:
	def __init__(self, _dict: dict):
		self.data = _dict
	
	def get_full_data(self):
		return self.data

	def __getitem__(self, key):
		return self.data["payload"][key]


	def get_user_id(self):
		return self.data["session"]["id"]
	

def extract_json(view):
	def wrapper(request):
		return view(json.loads(request.body))
	return wrapper


def gen_rand_secret_key():
	return hashlib.sha256(os.urandom(32)).hexdigest()



class SessionKey:
	def __init__(self) -> None:
		self.filename = "sessions.json"

	def __setitem__(self, key, value):
		try:
			data = json.load(open(self.filename, "r"))
		except:
			data = {}
		data[key] = value
		json.dump(data, open(self.filename, "w"))

	def __getitem__(self, key):
		try:
			data = json.load(open(self.filename, "r"))
		except:
			data = {}
			with open(self.filename, "w") as file:
				json.dump(data, file)
		return data[key]
	
	def pop(self, key):
		data = json.load(open(self.filename, "r"))
		data.pop(key)
		json.dump(data, open(self.filename, "w"))
	
secret_key = SessionKey()

# 
def gen_auth_token(_id):
	key = hmac.new(secret_key[_id].encode(), str(_id).encode(), hashlib.sha256).hexdigest()
	return key


def check_auth_token(func):
	def wrapper(data: dict):
		user_id = data["session"]["id"]
		key = data["session"]["key"]
		try:
			if key == gen_auth_token(user_id):
				temp = Data(data)
				try:
					return func(temp)
				except KeyError as e:
					return generate_json_response({"error": f"Missing key in data: {e}"}, KEY_ERROR)
			else:
				return generate_json_response({"error": "Invalid auth token"}, INVALID_SESSION)
		except KeyError:
			return generate_json_response({"error": "Invalid session"}, INVALID_SESSION)
	return wrapper


def json_decorator(view):
	@csrf_exempt
	@extract_json
	def wrapper(data):
		return view(data)
	return wrapper

def view_decorator(func):
	@csrf_exempt
	@extract_json
	@check_auth_token
	def wrapper(data):
		return func(data)
	return wrapper


SUCCESS = 0
INVALID_SESSION = 1	
KEY_ERROR = 2
def generate_json_response(payload: Dict, status=SUCCESS):
	return JsonResponse({"status": status, "payload": payload})

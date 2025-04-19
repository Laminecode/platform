from requests import post as post_request
import time
from typing import List
from datetime import datetime, timedelta
from utils import *


SUCCESS = 0
INVALID_SESSION = 1

REMINDER_DELAI_ATRIBUTION_AUTOMATIQUE = 2
REMINDER_DELAI_SOUMISSION_SUJET = 2

url = "http://localhost:8000/platform/"
headers = {"Content-Type": "application/json"}

def post(service, data=None):
	if data is None:
		data = {}
	# data = json.dumps(data)
	# print("Posting data: ", data)
	res = post_request(url+service, json=data, headers=headers)
	# print(type(res), res)
	res = res.json()
	return res

class JsonData:
	session = {}
	def __init__(self, data=None) -> None:
		if data is None:
			data = {}
		self.data = {
			"session": JsonData.session,
            "payload": data
		}	
	def __setitem__(self, key, value) -> None:
		self.data["payload"][key] = value
		 

	def get(self):
		return self.data

def post_auth(service, data: None|dict = None):
	"""
	this is the function to be used to post data to the server after authentification
	where if the session is invalid, it will try to re-authentificate and then post the data
	"""
	if data is None:
		data = {}
	while True:
		json_data = JsonData(data).get()
		res = post(service, json_data)
		if res["status"] == SUCCESS:
			return res["payload"]
		elif res["status"] == INVALID_SESSION:
			time.sleep(1)
			auth()


def auth():
	print("Authentificating...")
	response = post("auth_side_server/", {"id": "server", "password": "Th3Qu!ckBr0wnF0xJum$0v3rTh3L@zyD0g!"})
	print("Authentification response: ", response)
	JsonData.session = response["session"]
	print("Authentification successfull")
	return True



def post_affectation_automatique():
	post_auth("attribution_automatique/")
	print("Affectation done")
	Config().set_session(False)
	return False

def update_affectation_automatique(old_object: None|TimedAction):
	config = Config()
	session = config.get_session()
	if not session:
		return None
	date = str_to_timedelta_from_now(config.get_date_affectation_automatique())
	if old_object is not None:
		old_object.update_time(date)
		return old_object
	else:
		return TimedAction(date=date, action=post_affectation_automatique)


def post_delai():
	post_auth("delai_attribution_automatique/")
	print("Delai done")
	Config().set_reminder_attribution_automatique(False)
	return False

def update_delai(old_object: None|TimedAction):
	config = Config()
	session = config.get_session()
	reminder = config.get_reminder_attribution_automatique()
	if not session or not reminder:
		return None
	date = str_to_timedelta_from_now(config.get_date_affectation_automatique())
	if old_object is not None:
		old_object.update_time(date - timedelta(days=REMINDER_DELAI_ATRIBUTION_AUTOMATIQUE))
		return old_object
	else:
		return TimedAction(date=date - timedelta(days=REMINDER_DELAI_ATRIBUTION_AUTOMATIQUE), action=post_delai)


def post_fin_soumission_sujet():
	post_auth("fin_soumission_sujet/")
	print("Fin soumission done")
	Config().set_soumission_sujet(False)
	return False

def update_fin_soumission_sujet(old_object: None|TimedAction):
	config = Config()
	session = config.get_soumission_sujet()
	if not session:
		return None
	date = str_to_timedelta_from_now(config.get_date_soumission_sujet())
	if old_object is not None:
		old_object.update_time(date)
		return old_object
	else:
		return TimedAction(date=date, action=post_fin_soumission_sujet)
	
def post_delai_soumission_sujet():
	post_auth("delai_fin_soumission_sujet/")
	print("Delai soumission done")
	Config().set_reminder_soumission_sujet(False)
	return False

def update_delai_soumission_sujet(old_object: None|TimedAction):
	config = Config()
	session = config.get_soumission_sujet()
	reminder = config.get_reminder_soumission_sujet()
	if not session or not reminder:
		return None
	date = str_to_timedelta_from_now(config.get_date_soumission_sujet())
	if old_object is not None:
		old_object.update_time(date - timedelta(days=REMINDER_DELAI_SOUMISSION_SUJET))
		return old_object
	else:
		return TimedAction(date=date - timedelta(days=REMINDER_DELAI_SOUMISSION_SUJET), action=post_delai_soumission_sujet)


class Task:
	def __init__(self, task_id, task):
		self.task_id = task_id
		self.task = task

	def run(self):
		return self.task.run()

	def id(self):
		return self.task_id
	
	def get_task(self):
		return self.task

	def __str__(self):
		return f"Task {self.task_id}"

class Scheduler:
	def __init__(self):
		self.tasks: List[Task] = []

	def add(self, task, id):
		self.tasks.append(Task(task_id=id, task=task))

	def remove(self, id):
		# self.tasks.append(id)
		i = 0
		for task in self.tasks:
			if task.id() == id:
				break
			i += 1
		self.tasks.pop(i)

	def get_tasks(self):
		return [task for task in self.tasks]
	
	def get_task(self, task_id):
		for task in self.tasks:
			if task.id() == task_id:
				return task.get_task()
		return None
	

	def run(self):
		"""
		Runs the tasks in the scheduler.
		If a task returns False, it is removed from the scheduler.
		Else, it is kept in the scheduler.
		"""
		while True:
			
			for task in self.get_tasks():
				# print(task, end=", ")
				if not task.run():
					self.tasks.remove(task)
			# print()

		


if __name__ == '__main__':
	print("authenticating...")
	auth()
	config = Config()
	scheduler = Scheduler()
	# manager = Manager(config, scheduler)

	affectation_automatique = UpdatedAction(Timer(10), None, update_affectation_automatique)
	scheduler.add(affectation_automatique, "AffectationAutomatique")

	delai_attribution_automatique = UpdatedAction(Timer(10), None, update_delai)
	scheduler.add(delai_attribution_automatique, "Delai")

	fin_soumission_sujet = UpdatedAction(Timer(10), None, update_fin_soumission_sujet)
	scheduler.add(fin_soumission_sujet, "FinSoumission")

	delai_soumission_sujet = UpdatedAction(Timer(10), None, update_delai_soumission_sujet)
	scheduler.add(delai_soumission_sujet, "DelaiSoumission")



	


	scheduler.run()

	pass




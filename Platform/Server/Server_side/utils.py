import json
import os
from datetime import datetime, timedelta
import time

config_path = "config.json"

def str_to_datetime(date_str):
	return datetime.strptime(date_str, "%Y-%m-%d %H:%M:%S")

def str_to_timedelta_from_now(date_str):
	return datetime.strptime(date_str, "%Y-%m-%d %H:%M:%S") - datetime.now()


class Timer:
	def __init__(self, duration):	
		self.duration = duration  # Time in seconds to wait
		self.start = time.time()
	
	def reset(self):
		self.start = time.time()

	def __call__(self):
		elapsed_time = time.time() - self.start
		return elapsed_time >= self.duration



class TimedAction:
	def __init__(self, date: timedelta, action):
		self.timer = Timer(date.total_seconds())
		self.action = action

	def update_time(self, date: timedelta):
		self.timer = Timer(date.total_seconds())

	def update_action(self, action):
		self.action = action

	def __call__(self):
		if self.timer():
			self.timer.reset()
			return self.action()
		return True

class Config:
	def __init__(self):
		# print("intinializing config")
		if not os.path.exists(config_path):
			# print("config doesn't exit")
			with open(config_path, "w") as config:
				json.dump({"updated": False}, config)

		with open(config_path, "r") as config:
			self.data = json.load(config)
		# print("loaded config", self.data)

	def update(self):
		"""
		Updates the configuration data from the JSON file.

		Returns:
		bool: True if the configuration data has been updated, False otherwise.
		"""
		with open(config_path, "r") as config:
			self.data = json.load(config)

		updated = self.data["updated"]
		if updated == True:
			self._update_config("updated", False)
		return updated

	def get_date_affectation_automatique(self): 
		try:
			return self.data["date_affectation_automatique"]
		except KeyError:
			return ""
	
	def get_session(self):
		try:
			return self.data["session"]
		except KeyError:
			return False

	def get_reminder_attribution_automatique(self):
		try:
			return self.data["reminder_attribution_automatique"]
		except KeyError:
			return False

	def get_date_soumission_sujet(self):
			try:
				return self.data["date_soumission_sujet"]
			except KeyError:
				return ""
			
	def get_soumission_sujet(self):
		try:
			return self.data["soumission_sujet"]
		except KeyError:
			return False

	def get_reminder_soumission_sujet(self):
		try:
			return self.data["reminder_soumission_sujet"]
		except KeyError:
			return False

	def get_nombre_choix_max(self):
		try:
			return int(self.data["nombre_choix_max"])
		except KeyError:
			return 6

	def _update_config(self, key, value):
		"""
		Updates the configuration data in the JSON file.

		Args:
		key (str): The key of the configuration data to be updated.
		value (any): The new value for the specified key.

		Returns:
		None

		Raises:
		FileNotFoundError: If the configuration file does not exist.

		This method updates the configuration data in the JSON file by setting the specified key to the new value and marking the configuration as updated. It then writes the updated data back to the JSON file.
		"""
		self.data["updated"] = True
		self.data[key] = value
		with open(config_path, "w") as config:
			json.dump(self.data, config, indent=4)

	def set_date_affectation_automatique(self, date: str):
		self._update_config("date_affectation_automatique", date)

	def set_session(self, session: bool):
		self._update_config("session", session)

	def set_reminder_attribution_automatique(self, reminder: bool):
		self._update_config("reminder_attribution_automatique", reminder)

	def set_secret_key(self, secret_key: str):
		self._update_config("secret_key", secret_key)

	def set_date_soumission_sujet(self, date: str):
		self._update_config("date_soumission_sujet", date)

	def set_soumission_sujet(self, soumission: bool):
		self._update_config("soumission_sujet", soumission)

	def set_reminder_soumission_sujet(self, reminder: bool):
		self._update_config("reminder_soumission_sujet", reminder)

	def set_nombre_choix_max(self, nombre_choix_max: int):
		self._update_config("nombre_choix_max", nombre_choix_max)

class UpdatedAction:
	"""
	This class stores an action that should be executed.
	The action is called every time the `.run()` method of this class is called.
	If the action returns `True`, then this class returns `True`, else `False`.
	This class also has timer to update the action every time the timer is up.
	This class stores a callabale that gets called every time the timer is up and passes the current action to it, and expects an action in return to be stored that can be None.
	"""
	def __init__(self, update_timer, action, update_method) -> None:
		self.update_timer = update_timer
		self.action = action
		self.update_method = update_method

	def run(self):
		"""
		Updates the action if the timer is up, then executes the stored action and returns the result.
		"""
		
		if self.update_timer():
			self.action = self.update_method(self.action)
			self.update_timer.reset()
			print("Updated action")
		if self.action is not None:
			if not self.action():
				self.action = None
		return True


import random


first_names = ["Alice", "Bob", "Charlie", "David", "Emily", "Fiona", "George", 
              "Henry", "Isabella", "Jack", "Olivia", "William", "Sophia", 
              "James", "Ava", "Benjamin", "Charlotte", "Lucas", "Mia"]
last_names = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Miller", "Davis", "Garcia", 
             "Rodriguez", "Wilson", "Moore", "Lewis", "Robinson", "Walker", "Clark", "Young", "Allen", 
             "Wright", "Scott"]

cs_subjects = [
  "Algorithms and Data Structures",
  "Software Engineering Principles",
  "Computer Networks and Communication",
  "Introduction to Artificial Intelligence",
  "Database Management Systems",
  "Cryptography and Network Security",
  "Object-Oriented Programming",
  "Human-Computer Interaction (HCI)",
  "Operating Systems Fundamentals",
  "Web Development and Design",
  "Compiler Design and Programming Languages",
  "Computer Graphics and Visualization",
  "Machine Learning and Deep Learning",
  "Natural Language Processing (NLP)",
  "Software Design Patterns and Best Practices"
]

domains = ["GL", "WEB", "Archi", "MIV", "LLM", "Cloud", 
  "Sec", "AI", "IoT", "VR", "Blockchain", "DS", "SE", "ML", "CN"]

technologies = [
	"Python", "JavaScript", "Java", "C", "C++", "C#", "PHP", "Ruby", "Swift", "Go", "Kotlin", "R", "SQL", "Assembly Language", "HTML", "CSS", 
	"Django", "Spring", "React", "Express", "Laravel", "Angular", "Vue", "Node", ".NET", "Flask", "Rails", "SwiftUI",
 	"TensorFlow", "NumPy", "Pandas", "Scikit-learn", "React Bootstrap", "Lodash", "Axios", "jQuery", "Bootstrap",
]

encadreur_grade = ["D+", "D", "C-", "C", "C+", "B-", "B", "B+", "A-", "A", "A+", "S"]
encadreur_filiere = ["SIQ", "AI"]
encadreur_type = ["interne", "externe"]
palier = ["L3", "M2"]	

def generate_nom() :
	return random.choice(first_names)

def generate_prenom() :
	return random.choice(last_names)

def _generate_from_list(options) :
	res = []
	temp = [d for d in options]
	for i in range(random.randint(0, len(options))):
		choice = random.choice(temp)
		res.append(choice)
		temp.remove(choice)
	return " ".join(res)

def generate_domains():
	return _generate_from_list(domains)

def generate_technologies():
	return _generate_from_list(technologies)

def generate_encadreur_specialite():
	return random.choice(domains)

def generate_encadreur_grade():
	return random.choice(encadreur_grade)

def generate_encadreur_filiere():
	return random.choice(encadreur_filiere)

def generate_encadreur_domaine():
	return "informatique"

def generate_encadreur_type():
	return random.choice(encadreur_type)

def generate_id():
	return "0"

parent_id = 1
def generate_parent_id():
	global parent_id
	temp = parent_id
	parent_id += 1
	return str(temp)

sujet_name_num = 0
def generate_sujet_name():
	global sujet_name_num
	name = f"sujet {sujet_name_num}"
	sujet_name_num += 1
	return str(name)

def generate_sujet_description():
	desc = ""
	for i in range(random.randint(0, 100)):
		desc += "description "
	return desc

def generate_sujet_etat():
	return "0"

def generate_palier():
	return random.choice(palier)

sujet_encadreur_id_max = 0
def generate_sujet_encadreur_id():
	return str(random.randint(1, sujet_encadreur_id_max))






def generate_values(table_name, list_of_value_generators):
	request = f"INSERT INTO {table_name}"
	values  = []
	for value_generator in list_of_value_generators:
		value = value_generator()
		try:
			int(value)
		except ValueError:
			value = f"'{value}'"
		values.append(value)

	request  = f"{request} VALUES({", ".join(values)});"
	return request

def generate_encadreur_tuple(n):
	res = ""
	for i in range(n):
		res += generate_values("platform_encadreur", [generate_id, generate_nom, generate_prenom, generate_encadreur_type, generate_encadreur_domaine,
						   generate_encadreur_filiere, generate_encadreur_grade, generate_encadreur_specialite, generate_domains, generate_technologies, generate_parent_id])
		res += "\n"
	return res

def generate_password():
	return "password"

utilisateur_etudiant_type = lambda : "0" 
utilisateur_encadreur_type = lambda : "1"
utilisateur_administrateur_type = lambda : "2"

sujet_encadreur_type = lambda : "1"

def generate_utilisateur_tuple(n):
	res = ""
	for i in range(n):
		res += generate_values("platform_utilisateur", [generate_id, generate_password, utilisateur_encadreur_type])
		res += "\n"
	return res

def generate_sujet_tuple(n):
	res = ""
	for i in range(n):
		res += generate_values("platform_sujet", [generate_id, generate_sujet_name, generate_sujet_description, generate_domains, generate_technologies, generate_encadreur_type, sujet_encadreur_type])
		res += "\n"
	return res

def generate_sujet_encadreur_tuple(n):
	res = ""
	for i in range(n):
		res += generate_values("platform_sujetencadreur", [generate_id, generate_sujet_etat, generate_palier, generate_sujet_encadreur_id, generate_parent_id])
		res += "\n"
	return res
	

if __name__ == "__main__":
	print(generate_utilisateur_tuple(60))
	print()
	print()
	print()
	print()
	print(generate_encadreur_tuple(60))
	print()
	print()
	print()
	print()
	print(generate_sujet_tuple(60))
	print()
	print()
	print()
	print()
	sujet_encadreur_id_max = 60
	parent_id = 1
	print(generate_sujet_encadreur_tuple(60))


```js
groupe = {
	specialite: "",
	palier: "",
	annee: int,
	active: bool,

}
```


```js
etudiant = {
	nom: "",
	prenom: "",
	matricule: "",
	passowrd: "",
}
```

# Creer etudiant
## front -> back
```js
{
	etudiants: [
		etudiant
	],
	groupe: groupe,
}
```
## back -> front
```js
{
	
}
```


# Get Etudiants
## front -> back
```js
{
	
}
```
## back -> front
```js
{
	res: [
		etudiant->administrateur
	]
}
```

# Get Etudiant
## front -> back
```js
{
	matricule: "",
}
```
## back -> front
```js
{
	etudiant->administrateur
}
```

# Set Etudiant
## front -> back
```js
{
	user_id: "",
	matricule: "",
	password: "",
	username: "",
}
```
## back -> front
```js
{
	
}
```

# Get Groupe
## front -> back
```js
{
	matricule: "",
}
```
## back -> front
```js
{
	groupe: groupe->administrateur,
	etudiants: [
		etudiant->administrateur
	]
}
```	

# Set Groupe
## front -> back
```js
{
	matricule: "",
	annee: int,
	palier: "",
	specialite: "",
	visible: bool,
}
```
## back -> front
```js
{
	
}
```

# Rechercher Etudiant
## front -> back
```js
{
	matricule: "",
}
```
## back -> front
```js
{
	res: [
		etudiant->administrateur
	]
}
```

# Supprimer Groupe
## front -> back
```js
{
	id: int,
}
```
## back -> front
```js
{
	
}
```

# Set pfe to groupe
```js
{
	groupe_id: int,
	sujet_id: int,
}
```
## back -> front
```js
{
	
}
```

# Get pfe de groupe
```js
{
	id: int,
}
```
## back -> front
```js
{
	res: [
		sujet->administrateur,
		encaderur->administrateur
	]
}
```


# Remove pfe from groupe
```js
{
	id: int,
}
```
## back -> front
```js
{
	
}
```
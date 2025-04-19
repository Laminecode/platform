# Creer Encadreur
## front -> back
```js
{
	nom: "",
	prenom: "",
	email: "",
	password: "",
	type: "",
	case type = "interne":
		grade: "",
		specialite: "",
	case type = "externe":
		societe: "",
		poste: "",
}
```
## back -> front
```js
{
	success: bool,
	case success = false:
		error: ""	
}
```


# Get Encadreurs
## front -> back
```js
{
	
}
```
## back -> front
```js
{
	res: [
		encadreur->administrateur
	]
}
```

# Get Encadreur
## front -> back
```js
{
	email: ""
}
```
## back -> front
```js
{
	encadreur->administrateur
}
```

# Set Encadreur
## front -> back
```js
{
	user_id: "",
	email: "",
	username: "",
	password: "",
	nombre_binome_max: int,
	moyen_contact: "",
	bureau: "",
	visible: bool,
	type: "",
	case type = "interne":
		grade: "",
		specialite: "",
	case type = "externe":
		societe: "",
		poste: "",
}
```
## back -> front
```js
{
	
}
```

# Delete Encadreur
## front -> back
```js
{
	email: ""
}
```
## back -> front
```js
{
	
}
```

# Rehcercher Encadreur
## front -> back
```js
{
	email: ""
}
```
## back -> front
```js
{
	
	res : [
		encadreur->administrateur
	]
}
```
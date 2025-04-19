

# Get sujets
## front -> back 
```js
{

}
```

## back -> front
```js
{
	res: [
		sujet->encadreur,
	]
}
```

# Get Sujet
## front -> back
```js
{
	id: "",
}
```
## back -> front
```js
{
	sujet->encadreur,
}
```


# Creer Sujet
## front -> back
```js
{
	titre: "",
	desc: "",
	palier: "",
	liste_sepcialites: [""],
	visible: bool,
	outils: [""],
	domaines: [""],
	

}
```
## back -> front
```js
{
	success: bool,
	case success = false: 
		erreur: "",
}
```

# modifier sujet
## front -> back
```js
{
	id: "",
	titre: "",
	desc: "",
	palier: "",
	liste_sepcialites: [""],
	visible: bool,
	outils: [""],
	domaines: [""],
}
```
## back -> front
```js
{

}
```

# Supprimer sujet
## front -> back
```js
{
	id: "",	
}
```
## back -> front
```js
{
	success: bool,
	case success = false: 
		erreur: "",
}
```

# Recjercher sujet
## front -> back
```js
{
	title: "",
}
```
## back -> front
```js
{
	res: [
		sujet->encadreur,
	]
}
```



# Set session
## front -> back
```js
{
	active: bool,
	date: "YYYY-MM-DD HH:mm:ss",
}
```
## back -> front
```js
{
	
}
```

# Get session
## front -> back
```js
{
	
}
```
## back -> front
```js
{
	active: bool,
	date: "YYYY-MM-DD HH:mm:ss",
}
```

# Launch affectation automatique
## front -> back
```js
{

}
```
## front -> back
```js
{

}
```

# Get Nombre choix max
## front -> back
```js
{

}
```
## front -> back
```js
{
	nombre_choix_max: int,
}
```

# Set Nombre choix max
## front -> back
```js
{
	nombre_choix_max: int,
}
```
## front -> back
```js
{

}
```

# Set soumission sujet
## front -> back
```js
{
	active: bool,
	date: "YYYY-MM-DD HH:mm:ss",
}
```
## back -> front
```js
{
	
}
```

# Get soumission sujet
## front -> back
```js
{
	
}
```
## back -> front
```js
{
	active: bool,
	date: "YYYY-MM-DD HH:mm:ss",
}
```

# Add domaine
## front -> back
```js
{
	nom: "",
}
```
## back -> front
```js
{
	success: bool,
	case success = false:
		error: "",
}
```

# Get domaines
## front -> back
```js
{
	
}
```
## back -> front
```js
{
	res : [
		{
			nom: "",
			active: bool,
		}
	]
}
```

# Set domaine
## front -> back
```js
{
	nom: "",
	active: bool,
	new_nom: "",
}
```
## back -> front
```js
{
	success: bool,
	case success = false:
		error: "",
}
```

# Add competence 
## front -> back
```js
{
	nom: "",
}
```
## back -> front
```js
{
	success: bool,
	case success = false:
		error: "",
}
```

# Get competences
## front -> back
```js
{
	
}
```
## back -> front
```js
{
	res : [
		{
			nom: "",
			active: bool,
		}
	]
}
```

# Set competence
## front -> back
```js
{
	nom: "",
	active: bool,
	new_nom: "",
}
```
## back -> front
```js
{
	success: bool,
	case success = false:
		error: "",
}
```

# Add specialite
## front -> back
```js
{
	nom: "",
}
```
## back -> front
```js
{
	success: bool,
	case success = false:
		error: "",
}
```

# Get specialites
## front -> back
```js
{
	
}
```
## back -> front
```js
{
	res : [
		{
			nom: "",
			palier: "[L3-M2]",
			active: bool,
		}
	]
}
```

# Set specialite
## front -> back
```js
{
	nom: "",
	new_nom: "",
	palier: "[L3-M2]",
	active: bool,
}
```
## back -> front
```js
{
	success: bool,
	case success = false:
		error: "",
}
```


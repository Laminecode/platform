
# Get sujet
## front -> back
```js
{

}
```
## back -> front
```js
{
	sujet->etudiant,
	encadreur->etudiant
}
```

# Get encadreur
## front -> back
```js
{
	user_id: "",
}
```
## back -> front
```js
{
	encadreur->etudiant
}
```

# Get sujets de ecanadreur
## front -> back
```js
{
	user_id: "",
}
```
## back -> front
```js
{
	res: [
		sujet->etudiant
	]
}
```



<!-- sujet favoris -->

# Get sujet favoris
## front -> back
```js
{

}
```
## back -> front
```js
{
	res: [
		sujet->etudiant,
		encadreur->etudiant
	]
}
```

# Add sujet favoris
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

# Delete sujet favoris
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

<!-- encadreur favoris -->
# Get encadreur favoris
## front -> back
```js
{

}
```
## back -> front
```js
{
	res: [
		encadreur->etudiant
	]
}
```

# Add encadreur favoris
## front -> back
```js
{
	user_id: "",
}
```
## back -> front
```js
{
	
}
```

# Delete encadreur favoris
## front -> back
```js
{
	user_id: "",
}
```
## back -> front
```js
{
	
}
```


<!-- sujet liste de choix -->
# Check if able to add to liste de choix
## front -> back
```js
{
	id: int,
}
```
## back -> front
```js
{
	able: bool,
}
```

# Get sujet liste de choix
## front -> back
```js
{

}
```
## back -> front
```js
{
	res: [
		sujet->etudiant,
		encadreur->etudiant
	]
}
```
# Add sujet liste de choix
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

# Delete sujet liste de choix
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
# Reorder sujet liste de choix
## front -> back
```js
{
	new_order: [int]
}
```
## back -> front
```js
{
	
}
```

# Can add sujet to liste de choix
## front -> back
```js
{
	id: int,
}
```
## back -> front
```js
{
	able: bool,
	less_than_limit: bool,
}
```



# Get PFE
## front -> back
```js
{

}
```
## back -> front
```js
{
	has_pfe: boolean,
	case has_pfe = true
		pfe: {sujet->etudiant, encadreur->etudiant},
}
```






# Rechercher encadreur
## front -> back
```js
{
	username: "";
	domaines: [""];
	outils: [""];
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

# Rechercher sujet 
## front -> back
```js
{
	titre: "";
	domaines: [""];
	outils: [""];
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


# Suggerer sujet
## front -> back
```js
{
	
}
```
## back -> front
```js
{
	res : [
		sujet->etudiant
		encadreur->etudiant
	]
}
```

# Suggerer encadreur
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
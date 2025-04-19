
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
		{
			sujet->encadreur,
			etudiants: [
				etudiant->encadreur
			]
		}
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
	res: {
		etudiant->encadreur
		groupe->encadreur
	}
}
```
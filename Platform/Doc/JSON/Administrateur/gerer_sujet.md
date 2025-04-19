
# Get Sujet
## front -> back
```js
{
	id: int,
}
```
## back -> front
```js
{
	res: {
		sujet->admin,
		encadreur->admin
	}
}
```


# Get Sujets
## front -> back
```js
{
	
}
```
## back -> front
```js
{
	res: [
		sujet->admin,
		encadreur->admin
	]
}
```

# Rechercher Sujets
## front -> back
```js
{
	titre: "",
}
```
## back -> front
```js
{
	res: [
		sujet->admin,
		encadreur->admin
	]
}
```

# Get Sujets non attribue
## front -> back
```js
{
	id: int,
}
```
## back -> front
```js
{
	res: [
		sujet->admin,
		encadreur->admin
	]
}
```

# Rechercher Sujets non attribue
## front -> back
```js
{
	titre: "",
	id: int,
}
```
## back -> front
```js
{
	res: [
		sujet->admin,
		encadreur->admin
	]
}
```
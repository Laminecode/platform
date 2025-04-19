
```js
notification = {
	date: "YYYY-MM-DD HH:mm:ss",
	lu: bool,
}
```
```js
notification_sujet_affecte = {
	notification,
	type: "projet-attribue",
}
```
```js
nofitication_delai = {
	notification,
	delai: "YYYY-MM-DD HH:mm:ss",
	message: "",
	type: "delai",
}
```
```js
notification_general = {
	notification,
	message: "",
	type: "general",
}
```



# Get notifications
## front -> back
```js
{

}
```
## back -> front
```js
{
	res: [
		(
			notification_sujet_affecte-
			notification_delai-
			notification_general
		)

	],
}
```

# Set notification lu
## front -> back
```js
{
	id: int
}
```
## back -> front
```js
{

}
```
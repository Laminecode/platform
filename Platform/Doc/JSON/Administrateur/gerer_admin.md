
# Creer Admin
```js
{
	nom: "",
	prenom: "",
	user_id: "",
	password: "",
}
```
## back -> front
```js
{
	success: bool
	case success = false:
		error: ""
}
```

# Get Admins
## front -> back
```js
{
	
}
```
## back -> front
```js
{
	res: [
		admin->super_admin,
	]
}
```

# Get Admin
## front -> back
```js
{
	user_id: ""
}
```
## back -> front -> super_admin
```js
{
	admin->super_admin
}
```

# Set Admin
```js
{
	user_id: "",
	new_user_id: "",
	username: "",
	password: "",
}
```
## back -> front
```js
{

}
```

# Delete Admin
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

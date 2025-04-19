

- `name` = {} -> give the json a name to be used in different places
- `""` -> string
- `[""]` -> array of strings
- `["a-b"]` -> a string having value `a` or `b`
- `(a-b)` -> a or b
- [a] -> array of a
- ```case `attr` = `val` 
	`name` {...} 
	...```
	-> if the previous attribute `attr` was equal to `val`, then the `name` attribute and after it are declared (it's an if statement)
- `*path/name;` -> means all attributes in the previous declared json `name` in full file path `path` are added to this json;
- `attr: *path/name;` -> means the attribute `attr` contains the json `name` previously declared in full file path `path`
- 

- the shape of every request body from front to back should be as follows:
```js
{
	session: ./used/id,
	payload: {...},
}
```
- which means in all places, only what goes into the payload is specified, which is the important data, 

- but from back to front, the data will be sent directly with status and payload as follows
```js
{
	status: int,
	payload: {...}
}
```
- which means the status is the status code of the request, and the payload is the data that goes with it

SUCCESS = 0
INVALID_SESSION = 1	
KEY_ERROR = 2

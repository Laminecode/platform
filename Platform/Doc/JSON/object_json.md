```js
session = {
	id: "";
	key: "";
}
```

```js
etudiant->etudiant,encadreur = {
    username:'',
    user_id:'',
    outils:[''],
    preference:[""],
}
```
```js 
etudiant->adminstrateur = {
    etudiant->etudiant,encadreur
    password:'',
}
```
```js
groupe->encadreur = {
    specialite:'',
    annee:int,
    palier:'',
    outils:[''],
    preference:['']
}
```
```js
groupe->etudiant,administratreur={
    groupe->encadreur,
    active : bool
}
```
```js
encadreur->etudiant = {
    username:'',
    user_id:'',
    bureau:'',
    expertises:[''],
    outils:['']
    nbr_binome_max:int
    moyen_contact:'',
    type:'',
    case type = 'interne':
        specialite:'',
        grade:'',
    case type = 'externe':
        sociate:'',
        post:'', 

    // only for etudiant in some cases  
    is_favoris: bool,

}
```
```js
encadreur=>himself = {
    encadreur->etudiant,
    visiblite:bool,
}
```

```js
encadreur->administratruer = {
    encadreur->himself,
    password:'',
    is_deletable: bool,
}
```

```js
sujet->etudiant ={
    titre:'',
    domain:[''],
    outils:[''],
    description:'',
    type:'',
    // only for etudiant in some cases
    is_favorite: bool,
    is_choix: bool,
}
```
```js
sujet->encadreur,administratreur = {
    sujet->etudiant ,
    visible:bool,
    palier:'',
    liste_specialites: [''],

}
```


```js
admin->administrateur = {
    username:'',
    user_id:'',
    password:'',
}
```
```js
admin->self,super_admin = {
    admin->administrateur,
    superuser: bool,
}
```

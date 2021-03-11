# SMarvel

L'objectif est simple: Un CRUD fullstack permettant à plusieurs participants de noter leurs watch-times.


## 1. Data  (à adapter selon la db)

```
User {
  id: number,
  username: string,
  password: string
}

Watchtime {
  id: number
  hours: number
  viewDate: Date
  userId: number
}
```

## 2. Les étapes  

### 2.1. Authentification

Je saisis un `username`et un `password` dans le formulaire, si le `username` n'existe pas en DB, je crée un nouvel utilisateur avec les données saisies. Si le `username` existe déjà en DB, je vérifie que le `password` saisi est le bon, dans le cas contraire => erreur ! Si les informations sont valides, je redirige mon utilisateur vers la page `/Dashboard?token={myJWTToken}` 

### 2.2 CRUD
#### 2.2.1 Un utilisateur peut créer de nouveaux watch-times
#### 2.2.2 Un utilisateur peut visionner la liste de tout les watch-times de tout les utilisateurs sans restrictions
#### 2.2.3 Un utilisateur peut modifier / supprimer uniquement ses propres watch-times

### 2.3 Statistiques
#### 2.3.1 Somme des watch times pour une période donnée (e.g: un jour, un mois, un an)
#### 2.3.2 Moyenne des watch times
#### 2.3.3 Répartition des plus fans (par watchtime) (diagramme / liste)

### 2.4 Docker 
#### 2.4.1 Côté BACK : dockeriser API et DB
#### 2.4.2 Côté FRONT : dockeriser le client

 
### Petit bonus : l'interface n'est pas très belle, tu as carte blanche !
![civil war](https://i.imgur.com/EqvKVhL.jpg)

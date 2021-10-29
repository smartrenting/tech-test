# Smart BBQ

L'objectif est simple: Un CRUD fullstack permettant à plusieurs participants d'enregistrer leurs nombres de merguez grillées.


## 1. Data  

```
User {
  id: number,
  username: string,
  password: string
}

Barbecue {
  id: number
  merguez: number
  date: Date
  userId: number
}
```

## 2. Les étapes  

### 2.1. Authentification

Je saisis un `username`et un `password` dans le formulaire, si le `username` n'existe pas en DB, je crée un nouvel utilisateur avec les données saisies. Si le `username` existe déjà en DB, je vérifie que le `password` saisi est le bon, dans le cas contraire => erreur ! Si les informations sont valides, je redirige mon utilisateur vers la page `/dashboard?token={myJWTToken}` 

### 2.2 CRUD
#### 2.2.1 Un utilisateur peut créer un nouveau barbecue (Pour simplifier, on peut dire que le barbecue à toujours lieu le même jour que score est rentré)
#### 2.2.2 Un utilisateur peut visionner la liste de tout les barbecues de tout les utilisateurs sans restrictions
#### 2.2.3 Un utilisateur peut modifier / supprimer uniquement ses propres barbecues

### 2.3 Statistiques
#### 2.3.1 Somme totale de merguez grillées pour une date donnée
#### 2.3.2 Moyenne du nombre de merguez grillées par barbecue
#### 2.3.3 Répartition des chefs (nombre totale de merguez grillées / utilisateur) (diagramme / liste)

### 2.4 Docker (bonus)
#### 2.4.1 Côté BACK : dockeriser API et DB
#### 2.4.2 Côté FRONT : dockeriser le client

 
### Petit bonus : l'interface n'est pas très belle, tu as carte blanche !
![Sad barbecue is sad](https://i.imgur.com/tJKnQOW.jpg)

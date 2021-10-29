# Smart league

L'objectif est simple: Un CRUD fullstack permettant à plusieurs participants d'enregistrer leurs nombres de buts sur une partie.


## 1. Data  

```
User {
  id: number,
  username: string,
  password: string
}

Game {
  id: number
  goalie: number
  gameDate: Date
  userId: number
}
```

## 2. Les étapes  

### 2.1. Authentification

Je saisis un `username`et un `password` dans le formulaire, si le `username` n'existe pas en DB, je crée un nouvel utilisateur avec les données saisies. Si le `username` existe déjà en DB, je vérifie que le `password` saisi est le bon, dans le cas contraire => erreur ! Si les informations sont valides, je redirige mon utilisateur vers la page `/dashboard?token={myJWTToken}` 

### 2.2 CRUD
#### 2.2.1 Un utilisateur peut créer de nouveau score (Pour simplifier, on peut dire que la partie à toujours lieu le même jour que score est rentré)
#### 2.2.2 Un utilisateur peut visionner la liste de tout les scores de tout les utilisateurs sans restrictions
#### 2.2.3 Un utilisateur peut modifier / supprimer uniquement ses propres scores

### 2.3 Statistiques
#### 2.3.1 Somme valeur totale des buts pour une date donnée
#### 2.3.2 Moyenne des scores par utilisateurs
#### 2.3.3 Répartition des plus gros butteurs (diagramme / liste)

### 2.4 Docker (bonus)
#### 2.4.1 Côté BACK : dockeriser API et DB
#### 2.4.2 Côté FRONT : dockeriser le client

 
### Petit bonus : l'interface n'est pas très belle, tu as carte blanche !
![THIS IS SMART LEAGUE](https://i.imgur.com/bfetFe5.png)

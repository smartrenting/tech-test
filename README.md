# PPPint

L'objectif est simple: Un CRUD fullstack permettant à plusieurs participants de stocker leurs records de pintes.
(L'abus d'alcool est dangereux pour la santé, blablabla)

## 1. Data

```
User {
  id: number,
  username: string,
  password: string
}

Record {
  id: number
  userId: number
  pint: number
  drinkDate: Date
}
```

## 2. Les étapes

### 2.1. Authentification

Je saisis un `username`et un `password` dans le formulaire, si le `username` n'existe pas en DB, je crée un nouvel utilisateur avec les données saisies. Si le `username` existe déjà en DB, je vérifie que le `password` saisi est le bon, dans le cas contraire => erreur ! Si les informations sont valides, je redirige mon utilisateur vers la page `/beers?token={myJWTToken}`

### 2.2 CRUD

#### 2.2.1 Un utilisateur peut créer de nouveau record

#### 2.2.2 Un utilisateur peut visionner la liste des records de tout les utilisateurs sans restrictions

#### 2.2.3 Un utilisateur peut modifier / supprimer uniquement ses propres records

### 2.3 Statistiques

#### 2.3.1 Sachant qu'une pinte contient 50cl, afficher la moyenne en litre de biere bu sur une journée (date Input)

#### 2.3.3 Répartition des 5 plus gros buveurs (diagramme / liste)

### 2.4 Docker

#### 2.4.1 Côté BACK : dockeriser API et DB

#### 2.4.2 Côté FRONT : dockeriser le client

### Petit bonus : l'interface n'est pas très belle, tu as carte blanche !

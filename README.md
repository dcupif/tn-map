<h1 align="center">
  <br>
  <img src="http://telecomnancy.univ-lorraine.fr/sites/www.telecomnancy.univ-lorraine.fr/files/logotncomplet_0.jpg">
  <br>
  10 ans du batiment - TELECOM Nancy
  <br>
</h1>

<h4 align="center">Site réalisé à l'occasion des 10 ans du bâtiment de TELECOM Nancy <a href="http://telecomnancy.univ-lorraine.fr/" target="_blank">telecomnancy.univ-lorraine.fr</a>.</h4>
<br>

## Description

Cette application web Node.js / Express / MongoDB propose une carte du monde affichant la géolocalisation des utilisateurs connectés sur la plateforme.
Un systeme de messagerie instantanée est également disponible ainsi que différents liens vers les vidéos de retransmission
de l'évènement en direct.

## Fonctionnement

Vous aurez besoin d'une base de données MongoDB nommée 'tn-map'. Veillez à configurer les applications Google et Facebook en fonction de votre url. Une connexion HTTPS est nécessaire pour utiliser la fonction HTML5 'Geolocation.getCurrentPosition()'.

```bash
# Clone this repository
$ git clone https://github.com/dcupif/tn-map.git

# Go into the repository
$ cd tn-map

# Install dependencies
$ npm install

# Launch the app
$ npm start
```

## Auteurs

[Caroline BOYER](https://github.com/CarolineBoyer)

[Damien CUPIF](https://github.com/dcupif)

[Guillaume HABEN](https://github.com/GuillaumeHaben)

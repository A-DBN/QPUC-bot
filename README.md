## QPUC-bot

Un bot simple pour faire des Questions Pour un Champion sur Discord !

Pour inviter le bot : https://discord.com/api/oauth2/authorize?client_id=781821417729687572&permissions=8&scope=bot

### Fonctionnalités
- Sélection des Organisateurs, des Joueurs et des Finaliste
- Lancement du 9 Point Gagnants
- Lancement du 4 à la suite
- Lancement du Face à Face

### Commandes
- $help -> Donne les commandes directement sur Discord
- $orga @Orga1 @Orga2 @Orga2 -> Sélectionne les organisateurs/présentateurs
- $player @P1 @P2 @P3 @P4 -> Sélectionne les 4 joueurs pour le 9 Point Gagnants
- $final @Final1 @Final2 -> Sélectionne les 2 finalistes pour le Face à Face
- $qpuc1 -> Lance le bot pour une question (9 Points gagnants)
- $qpuc2 -> Lance le bot pour 40 sec de questions (4 à la suites)
- $qpuc2 @FinalisteAyantLaMain -> Lance le bot pour 40 sec avec des changements mains

### Utilisation
- $player -> Attribue 4 couleurs aux 4 joueurs qui seront leur buzzers
- $qpuc1 -> Cliquer sur un buzzer (Réaction) fera apparaitre un nouveau message avec des réactions, les organisateursla  peuvent valider ou non la réponse donnée
- $qpuc2 -> Lance 40 sec de timer
- $qpuc3 -> Lance 40 sec de timer avec un changement de main toutes les 10 sec tant que personne essaye de répondre. Si une réponse est donnée elle peut être validée ce qui coupe court à la question sinon la main est changée et le timer continue


### Fichier .env
 - Le .env doit contenir le prefix de votre commande ainsi que le token de connexion disponible ici : https://discord.com/developers/applications
 - Si le fichier de script n'est pas à la racine, indiquez l'emplacement du fichier dans la ligne const env = require('dotenv').config('PATH')

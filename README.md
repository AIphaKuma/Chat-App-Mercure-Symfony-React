# Real Time Chat App with Symfony - React - Mercure

Le système est donc composé des briques suivantes :
- Un back Symfony qui va gérer l'auth des users et l'enregistrement des messages en DB
- Un front en React qui prend la charge d'être un terminal de gestion de messages
- Un hub Mercure

Pour lancer le projet faut
```shell
docker-compose up -d
cd frontend
npm install
npm run start
```

Puis, depuis l'intérieur du container Symfony
```shell
cd /var/www/project
composer install
symfony console doctrine:database:create
symfony console doctrine:migrations:migrate
symfony console doctrine:fixtures:load
```

Rendez-vous ensuite sur http://localhost:8080 <br>
user : root <br>
no password

et prenez des utilisateurs au hasard, leurs password est 'password'

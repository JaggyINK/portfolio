// src/components/stations/docker/dockerQuestions.js

export const DOCKER_QUESTIONS = {
  easy: [
    {
      id: "e1",
      question: "Qu'est-ce que Docker ?",
      choices: [
        { text: "Un système d'exploitation", explanation: "Docker n'est pas un OS, c'est une plateforme de conteneurisation." },
        { text: "Une plateforme de conteneurisation d'applications", explanation: "Correct ! Docker permet d'empaqueter des applications avec leurs dépendances dans des conteneurs." },
        { text: "Un langage de programmation", explanation: "Docker n'est pas un langage, c'est un outil DevOps." },
        { text: "Un gestionnaire de bases de données", explanation: "Docker peut contenir des BDD mais n'en est pas un lui-même." }
      ],
      correctIndex: 1,
      category: "Concepts de base",
      difficulty: 1
    },
    {
      id: "e2",
      question: "Quelle commande affiche tous les conteneurs en cours d'exécution ?",
      choices: [
        { text: "docker list", explanation: "Cette commande n'existe pas en Docker." },
        { text: "docker ps", explanation: "Parfait ! `docker ps` liste les conteneurs actifs. Ajoute `-a` pour voir tous les conteneurs." },
        { text: "docker show", explanation: "Cette commande n'existe pas en Docker." },
        { text: "docker containers", explanation: "La commande correcte est `docker ps` ou `docker container ls`." }
      ],
      correctIndex: 1,
      category: "Commandes de base",
      difficulty: 1
    },
    {
      id: "e3",
      question: "Comment télécharger une image Docker depuis Docker Hub ?",
      choices: [
        { text: "docker get nginx", explanation: "La commande correcte est `docker pull`, pas `get`." },
        { text: "docker pull nginx", explanation: "Exact ! `docker pull` télécharge une image depuis Docker Hub." },
        { text: "docker download nginx", explanation: "Docker utilise `pull`, pas `download`." },
        { text: "docker fetch nginx", explanation: "La commande correcte est `pull`, pas `fetch`." }
      ],
      correctIndex: 1,
      category: "Images",
      difficulty: 1
    },
    {
      id: "e4",
      question: "Quelle commande lance un conteneur à partir d'une image ?",
      choices: [
        { text: "docker start", explanation: "`docker start` démarre un conteneur existant, pas un nouveau." },
        { text: "docker run", explanation: "Correct ! `docker run nginx` crée et démarre un nouveau conteneur." },
        { text: "docker create", explanation: "`docker create` crée un conteneur mais ne le démarre pas." },
        { text: "docker launch", explanation: "Cette commande n'existe pas en Docker." }
      ],
      correctIndex: 1,
      category: "Conteneurs",
      difficulty: 1
    },
    {
      id: "e5",
      question: "Comment arrêter un conteneur en cours d'exécution ?",
      choices: [
        { text: "docker kill <container_id>", explanation: "`kill` tue brutalement le conteneur. `stop` l'arrête proprement." },
        { text: "docker stop <container_id>", explanation: "Parfait ! `docker stop` envoie un signal SIGTERM pour un arrêt propre." },
        { text: "docker end <container_id>", explanation: "Cette commande n'existe pas en Docker." },
        { text: "docker pause <container_id>", explanation: "`pause` met en pause, ne stoppe pas définitivement." }
      ],
      correctIndex: 1,
      category: "Gestion des conteneurs",
      difficulty: 1
    },
    {
      id: "e6",
      question: "Quelle option permet d'exécuter un conteneur en arrière-plan (mode détaché) ?",
      choices: [
        { text: "-b", explanation: "L'option correcte est `-d` pour 'detached'." },
        { text: "-d", explanation: "Exact ! `docker run -d nginx` lance le conteneur en background." },
        { text: "-background", explanation: "Docker utilise `-d`, pas `-background`." },
        { text: "-daemon", explanation: "L'option courte est `-d`, pas `-daemon`." }
      ],
      correctIndex: 1,
      category: "Options de lancement",
      difficulty: 1
    },
    {
      id: "e7",
      question: "Comment lister toutes les images Docker locales ?",
      choices: [
        { text: "docker list images", explanation: "La commande correcte est `docker images` ou `docker image ls`." },
        { text: "docker images", explanation: "Parfait ! `docker images` affiche toutes les images téléchargées." },
        { text: "docker show images", explanation: "Cette commande n'existe pas en Docker." },
        { text: "docker get images", explanation: "La commande est `images`, pas `get images`." }
      ],
      correctIndex: 1,
      category: "Images",
      difficulty: 1
    },
    {
      id: "e8",
      question: "Quelle commande supprime un conteneur arrêté ?",
      choices: [
        { text: "docker delete <container_id>", explanation: "Docker utilise `rm`, pas `delete`." },
        { text: "docker rm <container_id>", explanation: "Correct ! `docker rm` supprime un conteneur. Ajoute `-f` pour forcer." },
        { text: "docker remove <container_id>", explanation: "La commande courte est `rm`, pas `remove` complet." },
        { text: "docker erase <container_id>", explanation: "Cette commande n'existe pas en Docker." }
      ],
      correctIndex: 1,
      category: "Suppression",
      difficulty: 1
    },
    {
      id: "e9",
      question: "Comment accéder au shell d'un conteneur en cours d'exécution ?",
      choices: [
        { text: "docker shell <container_id>", explanation: "Docker utilise `exec`, pas `shell`." },
        { text: "docker exec -it <container_id> /bin/bash", explanation: "Parfait ! `-it` ouvre un terminal interactif avec `/bin/bash` ou `/bin/sh`." },
        { text: "docker connect <container_id>", explanation: "Cette commande n'existe pas en Docker." },
        { text: "docker ssh <container_id>", explanation: "Docker n'utilise pas SSH pour ça, mais `exec`." }
      ],
      correctIndex: 1,
      category: "Interaction",
      difficulty: 1
    },
    {
      id: "e10",
      question: "Quelle option mappe un port du conteneur vers l'hôte ?",
      choices: [
        { text: "-port", explanation: "L'option correcte est `-p` pour 'port'." },
        { text: "-p 8080:80", explanation: "Exact ! `-p` mappe le port 80 du conteneur vers 8080 de l'hôte." },
        { text: "-map 8080:80", explanation: "Docker utilise `-p`, pas `-map`." },
        { text: "-expose 8080:80", explanation: "`--expose` déclare des ports, `-p` les publie." }
      ],
      correctIndex: 1,
      category: "Réseau",
      difficulty: 1
    }
  ],

  medium: [
    {
      id: "m1",
      question: "Qu'est-ce qu'un Dockerfile ?",
      choices: [
        { text: "Un fichier de log Docker", explanation: "Les logs Docker ne sont pas dans un Dockerfile." },
        { text: "Un fichier texte contenant les instructions pour construire une image Docker", explanation: "Correct ! Le Dockerfile définit les étapes : `FROM`, `RUN`, `COPY`, `CMD`, etc." },
        { text: "Un fichier de configuration du daemon Docker", explanation: "La config du daemon est dans `daemon.json`, pas Dockerfile." },
        { text: "Un fichier de données pour les conteneurs", explanation: "Le Dockerfile sert à construire des images, pas stocker des données." }
      ],
      correctIndex: 1,
      category: "Dockerfile",
      difficulty: 2
    },
    {
      id: "m2",
      question: "Quelle instruction Dockerfile définit l'image de base ?",
      choices: [
        { text: "BASE", explanation: "L'instruction correcte est `FROM`, pas `BASE`." },
        { text: "FROM", explanation: "Parfait ! `FROM ubuntu:22.04` définit l'image parente." },
        { text: "IMAGE", explanation: "Docker utilise `FROM`, pas `IMAGE`." },
        { text: "PARENT", explanation: "L'instruction est `FROM`, pas `PARENT`." }
      ],
      correctIndex: 1,
      category: "Dockerfile",
      difficulty: 2
    },
    {
      id: "m3",
      question: "Quelle différence entre CMD et ENTRYPOINT dans un Dockerfile ?",
      choices: [
        { text: "Aucune différence", explanation: "Il y a une différence importante de comportement." },
        { text: "CMD peut être écrasé facilement, ENTRYPOINT définit l'exécutable principal", explanation: "Exact ! ENTRYPOINT + CMD = commande par défaut modifiable." },
        { text: "CMD est plus rapide", explanation: "Ce n'est pas une question de vitesse." },
        { text: "ENTRYPOINT ne peut pas prendre d'arguments", explanation: "ENTRYPOINT peut prendre des arguments via CMD." }
      ],
      correctIndex: 1,
      category: "Dockerfile",
      difficulty: 2
    },
    {
      id: "m4",
      question: "Qu'est-ce qu'un volume Docker ?",
      choices: [
        { text: "Une sauvegarde de conteneur", explanation: "Les volumes ne sont pas des sauvegardes." },
        { text: "Un mécanisme de persistance de données en dehors du système de fichiers du conteneur", explanation: "Correct ! Les volumes survivent à la suppression du conteneur : `docker volume create`." },
        { text: "Un type de réseau", explanation: "Les volumes concernent le stockage, pas le réseau." },
        { text: "Une image compressée", explanation: "Les volumes ne sont pas des images." }
      ],
      correctIndex: 1,
      category: "Volumes",
      difficulty: 2
    },
    {
      id: "m5",
      question: "Comment construire une image à partir d'un Dockerfile ?",
      choices: [
        { text: "docker create -f Dockerfile", explanation: "La commande correcte est `docker build`, pas `create`." },
        { text: "docker build -t myapp .", explanation: "Parfait ! `-t` nomme l'image, `.` indique le contexte de build." },
        { text: "docker compile Dockerfile", explanation: "Docker utilise `build`, pas `compile`." },
        { text: "docker make myapp", explanation: "Cette commande n'existe pas en Docker." }
      ],
      correctIndex: 1,
      category: "Build",
      difficulty: 2
    },
    {
      id: "m6",
      question: "Qu'est-ce que docker-compose ?",
      choices: [
        { text: "Un outil pour définir et lancer des applications multi-conteneurs", explanation: "Exact ! docker-compose utilise un fichier YAML pour orchestrer plusieurs services." },
        { text: "Un éditeur de Dockerfile", explanation: "docker-compose ne sert pas à éditer des Dockerfile." },
        { text: "Un système de logs", explanation: "docker-compose orchestre des services, ne gère pas uniquement les logs." },
        { text: "Un réseau privé Docker", explanation: "docker-compose crée des réseaux mais n'en est pas un." }
      ],
      correctIndex: 0,
      category: "Docker Compose",
      difficulty: 2
    },
    {
      id: "m7",
      question: "Comment lancer tous les services définis dans docker-compose.yml ?",
      choices: [
        { text: "docker-compose start", explanation: "`start` démarre des services existants. `up` les crée et les démarre." },
        { text: "docker-compose up", explanation: "Parfait ! `docker-compose up -d` lance en arrière-plan." },
        { text: "docker-compose run", explanation: "`run` exécute une commande ponctuelle, pas tous les services." },
        { text: "docker-compose launch", explanation: "Cette commande n'existe pas en docker-compose." }
      ],
      correctIndex: 1,
      category: "Docker Compose",
      difficulty: 2
    },
    {
      id: "m8",
      question: "Que fait l'instruction COPY dans un Dockerfile ?",
      choices: [
        { text: "Copie un conteneur", explanation: "`COPY` ne copie pas de conteneurs." },
        { text: "Copie des fichiers/dossiers de l'hôte vers l'image", explanation: "Exact ! `COPY app.js /app/` copie depuis le contexte de build." },
        { text: "Copie des images Docker", explanation: "`COPY` copie des fichiers locaux, pas des images." },
        { text: "Crée une sauvegarde", explanation: "`COPY` ne crée pas de sauvegardes." }
      ],
      correctIndex: 1,
      category: "Dockerfile",
      difficulty: 2
    },
    {
      id: "m9",
      question: "Quelle différence entre COPY et ADD dans un Dockerfile ?",
      choices: [
        { text: "Aucune différence", explanation: "ADD a des fonctionnalités supplémentaires." },
        { text: "ADD peut extraire des archives tar et télécharger depuis des URLs", explanation: "Correct ! COPY est recommandé pour la simplicité, ADD pour des cas spéciaux." },
        { text: "COPY est plus rapide", explanation: "Ce n'est pas la différence principale." },
        { text: "ADD est obsolète", explanation: "ADD n'est pas obsolète, juste moins recommandé que COPY." }
      ],
      correctIndex: 1,
      category: "Dockerfile",
      difficulty: 2
    },
    {
      id: "m10",
      question: "Comment supprimer toutes les images Docker non utilisées ?",
      choices: [
        { text: "docker clean images", explanation: "Cette commande n'existe pas." },
        { text: "docker image prune", explanation: "Parfait ! `docker image prune -a` supprime toutes les images non utilisées." },
        { text: "docker remove unused", explanation: "La commande correcte est `prune`, pas `remove unused`." },
        { text: "docker gc", explanation: "Docker n'utilise pas `gc` (garbage collection) comme commande." }
      ],
      correctIndex: 1,
      category: "Nettoyage",
      difficulty: 2
    }
  ],

  hard: [
    {
      id: "h1",
      question: "Qu'est-ce qu'un multi-stage build dans Docker ?",
      choices: [
        { text: "Un build qui prend plusieurs heures", explanation: "Ce n'est pas lié à la durée." },
        { text: "Plusieurs instructions FROM dans un Dockerfile pour optimiser la taille finale", explanation: "Exact ! Multi-stage permet de compiler dans une image et copier uniquement les binaires dans l'image finale." },
        { text: "Un build avec plusieurs conteneurs", explanation: "Multi-stage concerne un seul Dockerfile, pas plusieurs conteneurs." },
        { text: "Un système de sauvegarde", explanation: "Multi-stage n'est pas un système de sauvegarde." }
      ],
      correctIndex: 1,
      category: "Build avancé",
      difficulty: 3
    },
    {
      id: "h2",
      question: "Qu'est-ce qu'un Docker Registry ?",
      choices: [
        { text: "Un fichier de configuration", explanation: "Un registry n'est pas un fichier de config." },
        { text: "Un serveur de stockage et distribution d'images Docker", explanation: "Parfait ! Docker Hub est un registry public, on peut héberger un registry privé." },
        { text: "Un type de réseau", explanation: "Les registries stockent des images, ce ne sont pas des réseaux." },
        { text: "Un outil de monitoring", explanation: "Les registries ne sont pas des outils de monitoring." }
      ],
      correctIndex: 1,
      category: "Registry",
      difficulty: 3
    },
    {
      id: "h3",
      question: "Quelle est la différence entre un conteneur et une machine virtuelle ?",
      choices: [
        { text: "Aucune différence", explanation: "Il y a des différences fondamentales." },
        { text: "Les conteneurs partagent le noyau de l'hôte, les VMs ont leur propre OS complet", explanation: "Exact ! Les conteneurs sont plus légers et démarrent plus vite que les VMs." },
        { text: "Les VMs sont plus rapides", explanation: "Au contraire, les conteneurs sont généralement plus rapides." },
        { text: "Les conteneurs ne peuvent pas être isolés", explanation: "Les conteneurs sont isolés via des namespaces et cgroups." }
      ],
      correctIndex: 1,
      category: "Concepts avancés",
      difficulty: 3
    },
    {
      id: "h4",
      question: "Qu'est-ce que Docker Swarm ?",
      choices: [
        { text: "Un outil de nettoyage Docker", explanation: "Swarm n'est pas un outil de nettoyage." },
        { text: "Un outil d'orchestration de conteneurs natif Docker", explanation: "Correct ! Swarm gère des clusters de Docker Engines (alternative à Kubernetes)." },
        { text: "Un réseau privé", explanation: "Swarm est un orchestrateur, pas juste un réseau." },
        { text: "Un type de volume", explanation: "Swarm n'est pas un type de volume." }
      ],
      correctIndex: 1,
      category: "Orchestration",
      difficulty: 3
    },
    {
      id: "h5",
      question: "Que fait l'instruction HEALTHCHECK dans un Dockerfile ?",
      choices: [
        { text: "Vérifie la syntaxe du Dockerfile", explanation: "HEALTHCHECK ne vérifie pas la syntaxe." },
        { text: "Définit une commande pour vérifier si le conteneur est en bonne santé", explanation: "Parfait ! Docker exécute périodiquement cette commande pour surveiller l'état du conteneur." },
        { text: "Crée une sauvegarde", explanation: "HEALTHCHECK ne crée pas de sauvegardes." },
        { text: "Active les logs", explanation: "HEALTHCHECK n'active pas les logs." }
      ],
      correctIndex: 1,
      category: "Monitoring",
      difficulty: 3
    },
    {
      id: "h6",
      question: "Qu'est-ce qu'un bind mount en Docker ?",
      choices: [
        { text: "Un type d'image", explanation: "Un bind mount n'est pas une image." },
        { text: "Un montage direct d'un fichier/dossier de l'hôte dans le conteneur", explanation: "Exact ! Contrairement aux volumes, les bind mounts dépendent de la structure de l'hôte." },
        { text: "Un réseau privé", explanation: "Les bind mounts concernent le stockage, pas le réseau." },
        { text: "Une commande de conteneur", explanation: "C'est un type de montage, pas une commande." }
      ],
      correctIndex: 1,
      category: "Stockage",
      difficulty: 3
    },
    {
      id: "h7",
      question: "Comment optimiser la taille d'une image Docker ?",
      choices: [
        { text: "Utiliser des images de base lourdes", explanation: "Au contraire, il faut utiliser des images légères comme Alpine." },
        { text: "Utiliser des images de base légères, combiner les RUN, utiliser .dockerignore et multi-stage builds", explanation: "Parfait ! Toutes ces techniques réduisent les layers et la taille finale." },
        { text: "Ajouter plus de layers", explanation: "Moins de layers = image plus petite." },
        { text: "Ne jamais nettoyer les caches", explanation: "Il faut nettoyer les caches (`apt-get clean`, `npm cache clean`) pour réduire la taille." }
      ],
      correctIndex: 1,
      category: "Optimisation",
      difficulty: 3
    },
    {
      id: "h8",
      question: "Qu'est-ce que Docker BuildKit ?",
      choices: [
        { text: "Un éditeur de Dockerfile", explanation: "BuildKit n'est pas un éditeur." },
        { text: "Un moteur de build amélioré avec cache intelligent et builds parallèles", explanation: "Exact ! BuildKit accélère les builds et ajoute des fonctionnalités comme les secrets." },
        { text: "Un type de conteneur", explanation: "BuildKit est un moteur de build, pas un conteneur." },
        { text: "Un système de logs", explanation: "BuildKit n'est pas un système de logs." }
      ],
      correctIndex: 1,
      category: "Build avancé",
      difficulty: 3
    },
    {
      id: "h9",
      question: "Qu'est-ce qu'un Docker secret ?",
      choices: [
        { text: "Un mot de passe Docker Hub", explanation: "Les secrets Docker ne sont pas limités à Docker Hub." },
        { text: "Un mécanisme sécurisé pour stocker des données sensibles (mots de passe, clés)", explanation: "Correct ! Les secrets sont chiffrés au repos et en transit dans Swarm." },
        { text: "Un type de volume", explanation: "Les secrets ne sont pas des volumes." },
        { text: "Un fichier caché", explanation: "Les secrets sont gérés par Docker, pas de simples fichiers cachés." }
      ],
      correctIndex: 1,
      category: "Sécurité",
      difficulty: 3
    },
    {
      id: "h10",
      question: "Que fait la commande `docker system prune` ?",
      choices: [
        { text: "Supprime uniquement les conteneurs", explanation: "`system prune` fait bien plus que ça." },
        { text: "Supprime conteneurs arrêtés, réseaux non utilisés, images danglings et cache de build", explanation: "Parfait ! Ajoute `-a` pour supprimer toutes les images non utilisées. Attention, c'est destructif !" },
        { text: "Redémarre Docker", explanation: "`system prune` ne redémarre pas Docker." },
        { text: "Crée une sauvegarde", explanation: "`prune` supprime, ne sauvegarde pas." }
      ],
      correctIndex: 1,
      category: "Nettoyage",
      difficulty: 3
    }
  ]
};

export const DIFFICULTY_META = {
  easy: {
    label: "Facile",
    description: "Commandes de base, images, conteneurs et docker run",
    color: "from-sky-500 to-blue-500",
    passingScore: 0.6
  },
  medium: {
    label: "Intermédiaire",
    description: "Dockerfile, docker-compose, volumes et réseaux",
    color: "from-blue-500 to-cyan-500",
    passingScore: 0.7
  },
  hard: {
    label: "Difficile",
    description: "Multi-stage builds, orchestration, optimisation et sécurité",
    color: "from-cyan-500 to-teal-500",
    passingScore: 0.8
  }
};
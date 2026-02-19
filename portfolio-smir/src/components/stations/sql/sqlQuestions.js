// src/components/stations/sql/sqlQuestions.js

export const SQL_QUESTIONS = {
  easy: [
    {
      id: "e1",
      question: "Quelle commande permet de récupérer des données dans une table SQL ?",
      choices: [
        { text: "GET", explanation: "GET n'est pas une commande SQL, c'est une méthode HTTP." },
        { text: "SELECT", explanation: "Correct ! `SELECT` permet de récupérer des données : `SELECT * FROM table`." },
        { text: "FETCH", explanation: "FETCH existe mais s'utilise avec des curseurs, pas pour une requête simple." },
        { text: "RETRIEVE", explanation: "Cette commande n'existe pas en SQL standard." }
      ],
      correctIndex: 1,
      category: "Commandes de base",
      difficulty: 1
    },
    {
      id: "e2",
      question: "Comment sélectionner toutes les colonnes d'une table `users` ?",
      choices: [
        { text: "SELECT ALL FROM users", explanation: "`ALL` n'est pas utilisé ainsi, on utilise `*`." },
        { text: "SELECT * FROM users", explanation: "Parfait ! `*` signifie 'toutes les colonnes'." },
        { text: "GET * FROM users", explanation: "`GET` n'existe pas en SQL." },
        { text: "SELECT users.*", explanation: "Il manque `FROM users` pour que la syntaxe soit complète." }
      ],
      correctIndex: 1,
      category: "SELECT",
      difficulty: 1
    },
    {
      id: "e3",
      question: "Quelle clause permet de filtrer les résultats d'un SELECT ?",
      choices: [
        { text: "FILTER", explanation: "`FILTER` n'est pas la clause standard pour filtrer." },
        { text: "WHERE", explanation: "Exact ! `WHERE` permet de filtrer : `SELECT * FROM users WHERE age > 18`." },
        { text: "HAVING", explanation: "`HAVING` filtre après un `GROUP BY`, pas pour un SELECT simple." },
        { text: "IF", explanation: "`IF` n'est pas une clause de filtrage en SQL." }
      ],
      correctIndex: 1,
      category: "Filtres",
      difficulty: 1
    },
    {
      id: "e4",
      question: "Comment trier les résultats par ordre croissant en SQL ?",
      choices: [
        { text: "SORT BY column ASC", explanation: "La commande est `ORDER BY`, pas `SORT BY`." },
        { text: "ORDER BY column ASC", explanation: "Correct ! `ASC` signifie 'ascendant' (ordre croissant)." },
        { text: "ORDER column ASCENDING", explanation: "La syntaxe correcte est `ORDER BY ... ASC`." },
        { text: "ARRANGE BY column", explanation: "`ARRANGE` n'existe pas en SQL." }
      ],
      correctIndex: 1,
      category: "Tri",
      difficulty: 1
    },
    {
      id: "e5",
      question: "Quelle commande permet d'insérer des données dans une table ?",
      choices: [
        { text: "ADD INTO", explanation: "La commande correcte est `INSERT INTO`, pas `ADD INTO`." },
        { text: "INSERT INTO", explanation: "Parfait ! `INSERT INTO table (col1, col2) VALUES (val1, val2)`." },
        { text: "PUT INTO", explanation: "`PUT` n'existe pas en SQL." },
        { text: "CREATE ROW", explanation: "`CREATE` sert à créer des structures, pas des données." }
      ],
      correctIndex: 1,
      category: "Insertion",
      difficulty: 1
    },
    {
      id: "e6",
      question: "Comment modifier des données existantes dans une table ?",
      choices: [
        { text: "MODIFY", explanation: "`MODIFY` s'utilise avec `ALTER TABLE`, pas pour modifier des données." },
        { text: "UPDATE", explanation: "Exact ! `UPDATE table SET column = value WHERE condition`." },
        { text: "CHANGE", explanation: "`CHANGE` n'est pas une commande SQL standard." },
        { text: "EDIT", explanation: "`EDIT` n'existe pas en SQL." }
      ],
      correctIndex: 1,
      category: "Modification",
      difficulty: 1
    },
    {
      id: "e7",
      question: "Quelle commande supprime des lignes dans une table ?",
      choices: [
        { text: "REMOVE", explanation: "La commande correcte est `DELETE`, pas `REMOVE`." },
        { text: "DELETE", explanation: "Correct ! `DELETE FROM table WHERE condition`." },
        { text: "DROP", explanation: "`DROP` supprime une table entière, pas des lignes." },
        { text: "ERASE", explanation: "`ERASE` n'existe pas en SQL." }
      ],
      correctIndex: 1,
      category: "Suppression",
      difficulty: 1
    },
    {
      id: "e8",
      question: "Que fait la commande `SELECT DISTINCT` ?",
      choices: [
        { text: "Trie les résultats", explanation: "`DISTINCT` ne trie pas, c'est `ORDER BY` qui trie." },
        { text: "Élimine les doublons", explanation: "Parfait ! `DISTINCT` ne garde que les valeurs uniques." },
        { text: "Compte les lignes", explanation: "Pour compter, on utilise `COUNT()`." },
        { text: "Sélectionne aléatoirement", explanation: "`DISTINCT` ne fait pas de sélection aléatoire." }
      ],
      correctIndex: 1,
      category: "SELECT",
      difficulty: 1
    },
    {
      id: "e9",
      question: "Quel opérateur teste si une valeur est NULL ?",
      choices: [
        { text: "= NULL", explanation: "On ne peut pas utiliser `=` avec NULL, il faut `IS NULL`." },
        { text: "IS NULL", explanation: "Correct ! `WHERE column IS NULL` teste la nullité." },
        { text: "== NULL", explanation: "`==` n'existe pas en SQL." },
        { text: "NULL?", explanation: "Cette syntaxe n'existe pas en SQL." }
      ],
      correctIndex: 1,
      category: "NULL",
      difficulty: 1
    },
    {
      id: "e10",
      question: "Comment limiter le nombre de résultats à 10 en SQL ?",
      choices: [
        { text: "TOP 10", explanation: "`TOP` est spécifique à SQL Server. La syntaxe standard est `LIMIT`." },
        { text: "LIMIT 10", explanation: "Parfait ! `SELECT * FROM users LIMIT 10` (MySQL, PostgreSQL)." },
        { text: "MAX 10", explanation: "`MAX()` est une fonction d'agrégation, pas une limite." },
        { text: "TAKE 10", explanation: "`TAKE` n'existe pas en SQL standard." }
      ],
      correctIndex: 1,
      category: "Limites",
      difficulty: 1
    }
  ],

  medium: [
    {
      id: "m1",
      question: "Quelle clause regroupe les résultats pour des agrégations ?",
      choices: [
        { text: "CLUSTER BY", explanation: "`CLUSTER BY` n'est pas la clause de regroupement." },
        { text: "GROUP BY", explanation: "Exact ! `GROUP BY` regroupe les lignes pour des fonctions comme `COUNT()`, `SUM()`." },
        { text: "GATHER BY", explanation: "Cette clause n'existe pas en SQL." },
        { text: "COLLECT BY", explanation: "`COLLECT` n'est pas une clause SQL." }
      ],
      correctIndex: 1,
      category: "Agrégation",
      difficulty: 2
    },
    {
      id: "m2",
      question: "Quelle fonction compte le nombre de lignes ?",
      choices: [
        { text: "SIZE()", explanation: "`SIZE()` n'existe pas en SQL." },
        { text: "COUNT()", explanation: "Parfait ! `SELECT COUNT(*) FROM users` compte toutes les lignes." },
        { text: "LENGTH()", explanation: "`LENGTH()` donne la longueur d'une chaîne, pas le nombre de lignes." },
        { text: "NUMBER()", explanation: "Cette fonction n'existe pas en SQL." }
      ],
      correctIndex: 1,
      category: "Fonctions d'agrégation",
      difficulty: 2
    },
    {
      id: "m3",
      question: "Quelle différence entre INNER JOIN et LEFT JOIN ?",
      choices: [
        { text: "Aucune différence", explanation: "Il y a une différence fondamentale." },
        { text: "INNER JOIN garde uniquement les correspondances, LEFT JOIN garde toutes les lignes de gauche", explanation: "Correct ! LEFT JOIN inclut les lignes sans correspondance (avec NULL à droite)." },
        { text: "LEFT JOIN est plus rapide", explanation: "Ce n'est pas la différence principale." },
        { text: "INNER JOIN trie automatiquement", explanation: "Les JOIN ne font pas de tri automatique." }
      ],
      correctIndex: 1,
      category: "Jointures",
      difficulty: 2
    },
    {
      id: "m4",
      question: "Que fait la clause HAVING en SQL ?",
      choices: [
        { text: "Filtre avant GROUP BY", explanation: "`HAVING` filtre après un `GROUP BY`, pas avant." },
        { text: "Filtre après GROUP BY sur les agrégats", explanation: "Exact ! `HAVING COUNT(*) > 5` filtre les groupes après agrégation." },
        { text: "Trie les résultats", explanation: "Le tri se fait avec `ORDER BY`, pas `HAVING`." },
        { text: "Crée des groupes", explanation: "C'est `GROUP BY` qui crée les groupes." }
      ],
      correctIndex: 1,
      category: "Agrégation",
      difficulty: 2
    },
    {
      id: "m5",
      question: "Qu'est-ce qu'une sous-requête (subquery) en SQL ?",
      choices: [
        { text: "Une requête dans une autre requête", explanation: "Correct ! Exemple : `SELECT * FROM users WHERE id IN (SELECT user_id FROM orders)`." },
        { text: "Une requête plus rapide", explanation: "Les sous-requêtes ne sont pas nécessairement plus rapides." },
        { text: "Une requête avec JOIN", explanation: "Les sous-requêtes ne sont pas des JOIN." },
        { text: "Une requête sur plusieurs tables", explanation: "Ce n'est pas la définition d'une sous-requête." }
      ],
      correctIndex: 0,
      category: "Sous-requêtes",
      difficulty: 2
    },
    {
      id: "m6",
      question: "Quelle fonction SQL retourne la date/heure actuelle ?",
      choices: [
        { text: "TODAY()", explanation: "`TODAY()` n'est pas la fonction standard." },
        { text: "NOW()", explanation: "Parfait ! `NOW()` retourne la date et l'heure actuelles (MySQL)." },
        { text: "CURRENT()", explanation: "`CURRENT` seul n'est pas une fonction complète." },
        { text: "TIME()", explanation: "`TIME()` extrait l'heure d'une datetime, ne retourne pas l'heure actuelle." }
      ],
      correctIndex: 1,
      category: "Fonctions de date",
      difficulty: 2
    },
    {
      id: "m7",
      question: "Que fait un INDEX en SQL ?",
      choices: [
        { text: "Supprime les doublons", explanation: "Les index n'éliminent pas les doublons." },
        { text: "Accélère les recherches", explanation: "Exact ! Un index optimise les requêtes SELECT en créant une structure de recherche rapide." },
        { text: "Crée une sauvegarde", explanation: "Les index ne créent pas de sauvegardes." },
        { text: "Trie automatiquement", explanation: "Les index ne trient pas visuellement les résultats." }
      ],
      correctIndex: 1,
      category: "Index",
      difficulty: 2
    },
    {
      id: "m8",
      question: "Quelle est la différence entre DELETE et TRUNCATE ?",
      choices: [
        { text: "Aucune différence", explanation: "Il y a des différences importantes." },
        { text: "DELETE peut avoir un WHERE, TRUNCATE supprime tout et réinitialise l'AUTO_INCREMENT", explanation: "Correct ! TRUNCATE est plus rapide mais supprime toute la table sans condition." },
        { text: "TRUNCATE est plus lent", explanation: "Au contraire, TRUNCATE est généralement plus rapide." },
        { text: "DELETE supprime la structure", explanation: "DELETE ne supprime que les données, pas la structure." }
      ],
      correctIndex: 1,
      category: "Suppression",
      difficulty: 2
    },
    {
      id: "m9",
      question: "Qu'est-ce qu'une clé étrangère (FOREIGN KEY) ?",
      choices: [
        { text: "Une clé primaire dans une autre table", explanation: "Ce n'est pas tout à fait ça." },
        { text: "Une colonne qui référence la clé primaire d'une autre table", explanation: "Exact ! Les FOREIGN KEY assurent l'intégrité référentielle entre tables." },
        { text: "Une clé de chiffrement", explanation: "Les clés étrangères n'ont rien à voir avec le chiffrement." },
        { text: "Un index automatique", explanation: "Les clés étrangères créent parfois des index mais ce n'est pas leur but principal." }
      ],
      correctIndex: 1,
      category: "Contraintes",
      difficulty: 2
    },
    {
      id: "m10",
      question: "Que fait la fonction COALESCE() ?",
      choices: [
        { text: "Fusionne plusieurs tables", explanation: "`COALESCE` ne fusionne pas de tables." },
        { text: "Retourne la première valeur non-NULL parmi ses arguments", explanation: "Parfait ! `COALESCE(col1, col2, 'default')` retourne la première valeur non-NULL." },
        { text: "Compte les NULL", explanation: "Pour compter les NULL, on utilise `COUNT()` avec un filtre." },
        { text: "Crée des colonnes", explanation: "`COALESCE` ne crée pas de colonnes." }
      ],
      correctIndex: 1,
      category: "Fonctions",
      difficulty: 2
    }
  ],

  hard: [
    {
      id: "h1",
      question: "Qu'est-ce qu'une transaction en SQL ?",
      choices: [
        { text: "Une requête unique", explanation: "Une transaction peut contenir plusieurs requêtes." },
        { text: "Un ensemble d'opérations qui doivent toutes réussir ou toutes échouer (ACID)", explanation: "Exact ! Les transactions garantissent l'intégrité : BEGIN, COMMIT, ROLLBACK." },
        { text: "Un type de jointure", explanation: "Les transactions ne sont pas des jointures." },
        { text: "Une sauvegarde automatique", explanation: "Les transactions ne créent pas de sauvegardes." }
      ],
      correctIndex: 1,
      category: "Transactions",
      difficulty: 3
    },
    {
      id: "h2",
      question: "Que signifie ACID dans le contexte des transactions ?",
      choices: [
        { text: "Advanced Code Integration Database", explanation: "Ce n'est pas la bonne signification." },
        { text: "Atomicity, Consistency, Isolation, Durability", explanation: "Parfait ! Les propriétés ACID garantissent la fiabilité des transactions." },
        { text: "Automatic Constraint Integrity Detection", explanation: "Ce n'est pas ACID." },
        { text: "Active Connection and Data Integration", explanation: "Ce n'est pas la définition d'ACID." }
      ],
      correctIndex: 1,
      category: "Transactions",
      difficulty: 3
    },
    {
      id: "h3",
      question: "Qu'est-ce qu'un TRIGGER en SQL ?",
      choices: [
        { text: "Une alerte utilisateur", explanation: "Les triggers ne sont pas des alertes visuelles." },
        { text: "Un code qui s'exécute automatiquement avant/après une opération (INSERT, UPDATE, DELETE)", explanation: "Exact ! Les triggers automatisent des actions : `CREATE TRIGGER before_insert BEFORE INSERT ON table`." },
        { text: "Un type de contrainte", explanation: "Les triggers ne sont pas des contraintes." },
        { text: "Une commande de démarrage", explanation: "Les triggers ne démarrent pas de services." }
      ],
      correctIndex: 1,
      category: "Triggers",
      difficulty: 3
    },
    {
      id: "h4",
      question: "Quelle différence entre une VUE (VIEW) et une TABLE ?",
      choices: [
        { text: "Aucune différence", explanation: "Il y a une différence fondamentale." },
        { text: "Une vue est une requête stockée, une table stocke des données physiques", explanation: "Correct ! Une vue est une 'table virtuelle' définie par une requête SELECT." },
        { text: "Une vue est plus rapide", explanation: "Les vues ne sont pas nécessairement plus rapides." },
        { text: "Une table ne peut pas être modifiée", explanation: "Les tables peuvent être modifiées, contrairement à certaines vues." }
      ],
      correctIndex: 1,
      category: "Vues",
      difficulty: 3
    },
    {
      id: "h5",
      question: "Qu'est-ce qu'une procédure stockée (STORED PROCEDURE) ?",
      choices: [
        { text: "Une sauvegarde de la base", explanation: "Les procédures stockées ne sont pas des sauvegardes." },
        { text: "Un ensemble de requêtes SQL précompilées et stockées dans la base", explanation: "Parfait ! Les procédures peuvent prendre des paramètres et contenir de la logique." },
        { text: "Un type d'index", explanation: "Les procédures ne sont pas des index." },
        { text: "Une table temporaire", explanation: "Les procédures ne sont pas des tables." }
      ],
      correctIndex: 1,
      category: "Procédures stockées",
      difficulty: 3
    },
    {
      id: "h6",
      question: "Que fait l'instruction EXPLAIN en SQL ?",
      choices: [
        { text: "Commente le code", explanation: "`EXPLAIN` ne crée pas de commentaires." },
        { text: "Affiche le plan d'exécution d'une requête pour l'optimisation", explanation: "Exact ! `EXPLAIN SELECT ...` montre comment MySQL va exécuter la requête (index utilisés, etc.)." },
        { text: "Traduit le SQL en français", explanation: "`EXPLAIN` ne fait pas de traduction." },
        { text: "Corrige les erreurs SQL", explanation: "`EXPLAIN` analyse, ne corrige pas." }
      ],
      correctIndex: 1,
      category: "Optimisation",
      difficulty: 3
    },
    {
      id: "h7",
      question: "Qu'est-ce qu'un deadlock en SQL ?",
      choices: [
        { text: "Une erreur de syntaxe", explanation: "Un deadlock n'est pas une erreur de syntaxe." },
        { text: "Deux transactions qui s'attendent mutuellement, créant un blocage", explanation: "Correct ! Le SGBD doit tuer l'une des transactions pour débloquer la situation." },
        { text: "Une table verrouillée", explanation: "C'est plus complexe qu'un simple verrou." },
        { text: "Une connexion fermée", explanation: "Un deadlock ne concerne pas les connexions." }
      ],
      correctIndex: 1,
      category: "Concurrence",
      difficulty: 3
    },
    {
      id: "h8",
      question: "Quelle est la différence entre UNION et UNION ALL ?",
      choices: [
        { text: "Aucune différence", explanation: "Il y a une différence importante." },
        { text: "UNION élimine les doublons, UNION ALL garde tout", explanation: "Exact ! UNION ALL est plus rapide car il ne vérifie pas les doublons." },
        { text: "UNION ALL trie automatiquement", explanation: "Ni UNION ni UNION ALL ne trient automatiquement." },
        { text: "UNION fonctionne sur plusieurs tables", explanation: "Les deux fonctionnent sur plusieurs requêtes." }
      ],
      correctIndex: 1,
      category: "Unions",
      difficulty: 3
    },
    {
      id: "h9",
      question: "Qu'est-ce que la normalisation de base de données ?",
      choices: [
        { text: "Rendre les données lisibles", explanation: "Ce n'est pas la définition de normalisation." },
        { text: "Organiser les données pour réduire la redondance et les anomalies", explanation: "Parfait ! 1NF, 2NF, 3NF éliminent les dépendances problématiques." },
        { text: "Trier les tables alphabétiquement", explanation: "La normalisation ne concerne pas l'ordre." },
        { text: "Créer des index", explanation: "La normalisation structure les données, pas les index." }
      ],
      correctIndex: 1,
      category: "Conception",
      difficulty: 3
    },
    {
      id: "h10",
      question: "Qu'est-ce qu'une fonction de fenêtre (WINDOW FUNCTION) en SQL ?",
      choices: [
        { text: "Une fonction qui affiche les résultats", explanation: "Ce n'est pas lié à l'affichage." },
        { text: "Une fonction qui calcule sur un ensemble de lignes liées à la ligne courante (ROW_NUMBER, RANK, LAG)", explanation: "Exact ! Les window functions permettent des calculs sans GROUP BY : `ROW_NUMBER() OVER (ORDER BY col)`." },
        { text: "Une fonction qui ferme des connexions", explanation: "Ce n'est pas lié aux connexions." },
        { text: "Une fonction temporaire", explanation: "Les window functions ne sont pas temporaires." }
      ],
      correctIndex: 1,
      category: "Fonctions avancées",
      difficulty: 3
    }
  ]
};

export const DIFFICULTY_META = {
  easy: {
    label: "Facile",
    description: "SELECT, WHERE, INSERT, UPDATE, DELETE et commandes de base",
    color: "from-blue-500 to-cyan-500",
    passingScore: 0.6
  },
  medium: {
    label: "Intermédiaire",
    description: "JOIN, GROUP BY, sous-requêtes et fonctions d'agrégation",
    color: "from-cyan-500 to-sky-500",
    passingScore: 0.7
  },
  hard: {
    label: "Difficile",
    description: "Transactions, triggers, optimisation et concepts avancés",
    color: "from-sky-500 to-indigo-500",
    passingScore: 0.8
  }
};
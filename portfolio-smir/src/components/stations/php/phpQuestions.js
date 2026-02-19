// src/components/stations/php/phpQuestions.js

export const PHP_QUESTIONS = {
  easy: [
    {
      id: "e1",
      question: "En PHP, quel symbole est utilisé pour déclarer une variable ?",
      choices: [
        { text: "#", explanation: "Le # est utilisé pour les commentaires en PHP et dans d'autres langages, mais pas pour les variables." },
        { text: "$", explanation: "Correct ! En PHP, toutes les variables commencent par un signe dollar, par exemple : `$age = 25;`." },
        { text: "@", explanation: "Le @ est utilisé pour supprimer les erreurs en PHP (`@fonction()`), mais pas pour déclarer des variables." },
        { text: "%", explanation: "Le % est l'opérateur modulo en PHP (reste de division), pas un symbole de variable." }
      ],
      correctIndex: 1,
      category: "Syntaxe de base",
      difficulty: 1
    },
    {
      id: "e2",
      question: "Quelle balise permet d'ouvrir un bloc PHP dans un fichier ?",
      choices: [
        { text: "<php>", explanation: "Cette balise n'existe pas en PHP. C'est une confusion avec les balises HTML." },
        { text: "<?php", explanation: "Exact ! On ouvre un bloc PHP avec `<?php` et on le ferme avec `?>` (la fermeture est parfois omise dans des fichiers purement PHP)." },
        { text: "<?=", explanation: "Cette balise courte (`<?= $var ?>`) sert à afficher directement une variable, mais `<?php` reste la balise d'ouverture standard." },
        { text: "<script php>", explanation: "Cette syntaxe n'existe pas. PHP n'utilise pas de balises `<script>` comme JavaScript." }
      ],
      correctIndex: 1,
      category: "Syntaxe de base",
      difficulty: 1
    },
    {
      id: "e3",
      question: "Quel est le bon moyen d'afficher du texte en PHP ?",
      choices: [
        { text: "print('Hello')", explanation: "`print()` existe en PHP mais est moins utilisé que `echo`. De plus, la syntaxe correcte serait `print 'Hello';`." },
        { text: "echo 'Hello';", explanation: "Parfait ! `echo 'Hello';` est l'instruction la plus courante pour afficher du texte en PHP." },
        { text: "console.log('Hello')", explanation: "C'est la syntaxe JavaScript, pas PHP. En PHP, on utilise `echo` ou `print`." },
        { text: "alert('Hello')", explanation: "C'est une fonction JavaScript pour les popups navigateur, pas du PHP." }
      ],
      correctIndex: 1,
      category: "Affichage",
      difficulty: 1
    },
    {
      id: "e4",
      question: "Quel est le bon commentaire sur une seule ligne en PHP ?",
      choices: [
        { text: "/* commentaire */", explanation: "Cette syntaxe fonctionne mais c'est pour les commentaires multi-lignes, pas pour une seule ligne." },
        { text: "// commentaire", explanation: "Correct ! Les commentaires sur une ligne se font avec `//` (ou `#`). Les blocs multi-lignes utilisent `/* ... */`." },
        { text: "<!-- commentaire -->", explanation: "C'est la syntaxe HTML pour les commentaires, pas PHP." },
        { text: "# commentaire HTML", explanation: "Le `#` fonctionne en PHP pour les commentaires, mais ce n'est pas spécifique à HTML." }
      ],
      correctIndex: 1,
      category: "Syntaxe de base",
      difficulty: 1
    },
    {
      id: "e5",
      question: "Quel opérateur sert à concaténer des chaînes en PHP ?",
      choices: [
        { text: "+", explanation: "Le `+` est utilisé pour l'addition en PHP, pas la concaténation (contrairement à JavaScript)." },
        { text: "&", explanation: "Le `&` est utilisé pour les références et les opérations bit à bit, pas pour concaténer." },
        { text: ".", explanation: "Exact ! En PHP, la concaténation se fait avec le point : `$nomComplet = $prenom . ' ' . $nom;`." },
        { text: "||", explanation: "Le `||` est l'opérateur logique OU, pas un opérateur de concaténation." }
      ],
      correctIndex: 2,
      category: "Opérateurs",
      difficulty: 1
    },
    {
      id: "e6",
      question: "Comment doit se terminer une instruction en PHP ?",
      choices: [
        { text: "Par un point", explanation: "Le point est utilisé pour la concaténation, pas pour terminer une instruction." },
        { text: "Par un retour à la ligne", explanation: "Un retour à la ligne améliore la lisibilité mais ne termine pas une instruction en PHP." },
        { text: "Par un `;`", explanation: "Correct ! Les instructions PHP se terminent par un point-virgule : `$age = 25;`." },
        { text: "Ce n'est pas obligatoire", explanation: "C'est faux : le point-virgule est obligatoire en PHP pour terminer chaque instruction." }
      ],
      correctIndex: 2,
      category: "Syntaxe de base",
      difficulty: 1
    },
    {
      id: "e7",
      question: "Quel est le type de la valeur `\"Bonjour\"` en PHP ?",
      choices: [
        { text: "int", explanation: "Un `int` est un nombre entier (ex: 42), pas une chaîne de caractères." },
        { text: "bool", explanation: "Un `bool` est un booléen (`true` ou `false`), pas une chaîne." },
        { text: "string", explanation: "Parfait ! `\"Bonjour\"` est une chaîne de caractères, donc de type `string`." },
        { text: "array", explanation: "Un `array` est un tableau (ex: `[1, 2, 3]`), pas une chaîne simple." }
      ],
      correctIndex: 2,
      category: "Types",
      difficulty: 1
    },
    {
      id: "e8",
      question: "Laquelle de ces valeurs représente un booléen vrai en PHP ?",
      choices: [
        { text: "\"true\"", explanation: "Avec les guillemets, c'est une chaîne de caractères, pas un booléen." },
        { text: "1", explanation: "Le chiffre 1 est converti en `true` dans un contexte booléen, mais ce n'est pas le littéral booléen." },
        { text: "TRUE", explanation: "Exact ! Le littéral booléen s'écrit `true` ou `false` (insensible à la casse) : `TRUE`, `True`, `true`…" },
        { text: "Oui", explanation: "PHP ne reconnaît pas 'Oui' comme un booléen. Il faut utiliser `true` ou `false`." }
      ],
      correctIndex: 2,
      category: "Types",
      difficulty: 1
    },
    {
      id: "e9",
      question: "Quelle superglobale contient les paramètres passés dans l'URL (query string) ?",
      choices: [
        { text: "$_POST", explanation: "`$_POST` contient les données envoyées via un formulaire en méthode POST, pas l'URL." },
        { text: "$_GET", explanation: "Correct ! Les paramètres de l'URL (comme `?page=2&tri=desc`) sont accessibles via `$_GET`." },
        { text: "$_SERVER", explanation: "`$_SERVER` contient des informations sur le serveur et l'environnement, pas les paramètres d'URL." },
        { text: "$_SESSION", explanation: "`$_SESSION` contient les données de session stockées côté serveur, pas les paramètres d'URL." }
      ],
      correctIndex: 1,
      category: "Superglobales",
      difficulty: 1
    },
    {
      id: "e10",
      question: "Lequel de ces exemples est un entier (type int) en PHP ?",
      choices: [
        { text: "\"42\"", explanation: "Avec des guillemets, c'est une chaîne de caractères (`string`), pas un entier." },
        { text: "42", explanation: "Parfait ! `42` sans guillemets est un entier (`int`)." },
        { text: "42.0", explanation: "Avec `.0`, c'est un nombre à virgule flottante (`float`), pas un entier." },
        { text: "'42'", explanation: "Avec des guillemets simples, c'est aussi une chaîne (`string`), pas un entier." }
      ],
      correctIndex: 1,
      category: "Types",
      difficulty: 1
    }
  ],

  medium: [
    {
      id: "m1",
      question: "Que renvoie l'expression `count([1, 2, 3, 4])` en PHP ?",
      choices: [
        { text: "3", explanation: "Non, tu as peut-être compté jusqu'à 3 au lieu de compter tous les éléments." },
        { text: "4", explanation: "Exact ! `count()` renvoie le nombre d'éléments du tableau : ici `4`." },
        { text: "5", explanation: "Il n'y a que 4 éléments dans ce tableau, pas 5." },
        { text: "Erreur", explanation: "`count()` est une fonction valide en PHP et fonctionne parfaitement avec ce tableau." }
      ],
      correctIndex: 1,
      category: "Fonctions de tableau",
      difficulty: 2
    },
    {
      id: "m2",
      question: "Quelle est la bonne façon de tester l'égalité stricte en PHP ?",
      choices: [
        { text: "==", explanation: "`==` teste l'égalité des valeurs mais pas des types : `42 == \"42\"` serait `true`." },
        { text: "===", explanation: "Parfait ! `===` teste l'égalité de la valeur ET du type : `42 === \"42\"` renvoie `false`." },
        { text: "!=", explanation: "`!=` teste la différence (non-égalité), pas l'égalité." },
        { text: "!==", explanation: "`!==` teste la différence stricte (valeur ET type différents), pas l'égalité." }
      ],
      correctIndex: 1,
      category: "Opérateurs",
      difficulty: 2
    },
    {
      id: "m3",
      question: "Que fait `isset($variable)` en PHP ?",
      choices: [
        { text: "Teste si la variable est une chaîne", explanation: "Non, `isset()` ne vérifie pas le type, seulement si la variable existe et n'est pas `null`." },
        { text: "Teste si la variable est définie et non null", explanation: "Correct ! `isset($variable)` renvoie `true` si la variable est définie et différente de `null`." },
        { text: "Crée la variable", explanation: "`isset()` ne crée rien, elle vérifie seulement l'existence d'une variable." },
        { text: "Supprime la variable", explanation: "Pour supprimer une variable, on utilise `unset()`, pas `isset()`." }
      ],
      correctIndex: 1,
      category: "Fonctions utilitaires",
      difficulty: 2
    },
    {
      id: "m4",
      question: "Quel est le résultat de l'expression `\"2\" + 2` en PHP (mode non strict) ?",
      choices: [
        { text: "\"22\"", explanation: "En PHP, contrairement à JavaScript, le `+` ne concatène pas : il force une conversion numérique." },
        { text: "4", explanation: "Exact ! PHP convertit la chaîne `\"2\"` en entier `2`, donc `\"2\" + 2` donne `4`." },
        { text: "Erreur", explanation: "PHP ne génère pas d'erreur ici : il convertit automatiquement les types." },
        { text: "\"4\"", explanation: "Le résultat est un nombre (4), pas une chaîne. PHP privilégie le type numérique avec `+`." }
      ],
      correctIndex: 1,
      category: "Types et conversions",
      difficulty: 2
    },
    {
      id: "m5",
      question: "Quel est le bon exemple de tableau associatif en PHP ?",
      choices: [
        { text: "[\"Alice\", \"Bob\"]", explanation: "Ceci est un tableau indexé (numérique), pas associatif." },
        { text: "['nom' => 'Alice', 'age' => 30]", explanation: "Parfait ! Un tableau associatif associe des clés à des valeurs : `['nom' => 'Alice', 'age' => 30]`." },
        { text: "array(1, 2, 3)", explanation: "Ceci est un tableau indexé créé avec `array()`, pas un tableau associatif." },
        { text: "\"nom\" => \"Alice\"", explanation: "Cette syntaxe seule n'est pas valide : elle doit être dans un tableau avec `[ ... ]`." }
      ],
      correctIndex: 1,
      category: "Tableaux",
      difficulty: 2
    },
    {
      id: "m6",
      question: "Quel est le bon schéma pour parcourir un tableau associatif `$user` en PHP ?",
      choices: [
        { text: "for ($i = 0; $i < $user; $i++) { ... }", explanation: "Cette boucle `for` classique ne fonctionne pas avec les tableaux associatifs qui n'ont pas d'indices numériques séquentiels." },
        { text: "foreach ($user as $valeur) { ... }", explanation: "Cela fonctionne mais tu n'as accès qu'aux valeurs, pas aux clés." },
        { text: "foreach ($user as $cle => $valeur) { ... }", explanation: "Exact ! Pour lire la clé ET la valeur : `foreach ($user as $cle => $valeur) { ... }`." },
        { text: "while ($user) { ... }", explanation: "Cette syntaxe créerait une boucle infinie ou ne fonctionnerait pas du tout pour parcourir le tableau." }
      ],
      correctIndex: 2,
      category: "Boucles",
      difficulty: 2
    },
    {
      id: "m7",
      question: "Quel est le bon prototype de fonction en PHP ?",
      choices: [
        { text: "function($a, $b) = add { ... }", explanation: "Cette syntaxe n'existe pas en PHP. Le nom vient après `function`." },
        { text: "func add($a, $b) { ... }", explanation: "PHP n'utilise pas le mot-clé `func`, mais `function`." },
        { text: "function add($a, $b) { ... }", explanation: "Parfait ! Une fonction se déclare avec `function nom($arg1, $arg2) { ... }`." },
        { text: "add function($a, $b) { ... }", explanation: "L'ordre est incorrect : c'est `function` puis le nom, pas l'inverse." }
      ],
      correctIndex: 2,
      category: "Fonctions",
      difficulty: 2
    },
    {
      id: "m8",
      question: "Comment définir une valeur par défaut pour le paramètre `$name` dans une fonction ?",
      choices: [
        { text: "function hello($name := 'World') { ... }", explanation: "L'opérateur `:=` n'existe pas en PHP pour les valeurs par défaut." },
        { text: "function hello($name = 'World') { ... }", explanation: "Exact ! On définit une valeur par défaut avec `=` : `function hello($name = 'World') { ... }`." },
        { text: "function hello('World' => $name) { ... }", explanation: "Cette syntaxe ressemble aux tableaux associatifs mais n'est pas valide pour les paramètres de fonction." },
        { text: "function hello(default $name = 'World') { ... }", explanation: "Le mot-clé `default` n'est pas utilisé en PHP pour les paramètres de fonction." }
      ],
      correctIndex: 1,
      category: "Fonctions",
      difficulty: 2
    },
    {
      id: "m9",
      question: "Quelle superglobale permet de récupérer les données d'un formulaire envoyé en POST ?",
      choices: [
        { text: "$_GET", explanation: "`$_GET` contient les données de l'URL (query string), pas les données POST." },
        { text: "$_REQUEST", explanation: "`$_REQUEST` peut contenir GET, POST et COOKIE, mais on préfère utiliser `$_POST` directement pour plus de clarté." },
        { text: "$_POST", explanation: "Parfait ! Les données envoyées en méthode `POST` sont accessibles via `$_POST`." },
        { text: "$_FORM", explanation: "Cette superglobale n'existe pas en PHP." }
      ],
      correctIndex: 2,
      category: "Superglobales",
      difficulty: 2
    },
    {
      id: "m10",
      question: "Quelle fonction est la plus adaptée pour vérifier qu'une clé existe dans un tableau associatif ?",
      choices: [
        { text: "in_array('id', $data)", explanation: "`in_array()` vérifie si une **valeur** existe dans le tableau, pas une **clé**." },
        { text: "array_key_exists('id', $data)", explanation: "Parfait ! `array_key_exists('id', $data)` vérifie explicitement que la clé `id` existe, même si sa valeur est `null`." },
        { text: "isset($data['id']) && is_array($data)", explanation: "`isset()` ne détecte pas les clés avec valeur `null`, contrairement à `array_key_exists()`." },
        { text: "exists_key($data, 'id')", explanation: "Cette fonction n'existe pas en PHP. On utilise `array_key_exists()`." }
      ],
      correctIndex: 1,
      category: "Fonctions de tableau",
      difficulty: 2
    }
  ],

  hard: [
    {
      id: "h1",
      question: "Quelle est la différence principale entre `require` et `include` en PHP ?",
      choices: [
        { text: "Aucune différence", explanation: "Il y a une différence importante dans la gestion des erreurs." },
        { text: "`require` provoque une erreur fatale si le fichier est introuvable", explanation: "Exact ! `require` génère une erreur fatale (E_COMPILE_ERROR) et arrête le script, tandis qu'`include` génère seulement un warning (E_WARNING)." },
        { text: "`include` est plus rapide", explanation: "Il n'y a pas de différence de performance significative entre les deux." },
        { text: "`include` ne peut pas charger de fonctions", explanation: "C'est faux : `include` peut charger n'importe quel code PHP, y compris des fonctions." }
      ],
      correctIndex: 1,
      category: "Inclusion de fichiers",
      difficulty: 3
    },
    {
      id: "h2",
      question: "Dans une fonction, comment accéder à une variable définie en global en PHP ?",
      choices: [
        { text: "Avec le mot-clé `global`", explanation: "Correct ! On utilise `global $nomVariable;` dans la fonction. Cependant, c'est une mauvaise pratique : on préfère l'injection de dépendances." },
        { text: "Avec `$this`", explanation: "`$this` est utilisé dans les classes pour accéder aux propriétés de l'objet, pas aux variables globales." },
        { text: "Avec `static`", explanation: "`static` sert à déclarer des variables ou méthodes statiques de classe, pas à accéder aux globales." },
        { text: "Avec `use`", explanation: "`use` est utilisé pour importer des namespaces ou pour les closures, pas pour les variables globales." }
      ],
      correctIndex: 0,
      category: "Portée des variables",
      difficulty: 3
    },
    {
      id: "h3",
      question: "Quel est l'intérêt principal de PDO par rapport à `mysqli` en PHP ?",
      choices: [
        { text: "PDO est toujours plus rapide", explanation: "PDO n'est pas nécessairement plus rapide que mysqli. La performance n'est pas son avantage principal." },
        { text: "PDO est orienté objet et supporte plusieurs SGBD", explanation: "Exact ! PDO fournit une interface orientée objet unifiée pour MySQL, PostgreSQL, SQLite, etc., avec la même API." },
        { text: "PDO fonctionne uniquement avec MySQL", explanation: "C'est faux : PDO supporte justement de nombreux SGBD, contrairement à mysqli qui est spécifique à MySQL." },
        { text: "PDO ne supporte pas les requêtes préparées", explanation: "Au contraire, PDO supporte excellemment les requêtes préparées avec `prepare()` et `execute()`." }
      ],
      correctIndex: 1,
      category: "Bases de données",
      difficulty: 3
    },
    {
      id: "h4",
      question: "Quel est l'intérêt principal des requêtes préparées PDO comme `prepare()` + `execute()` ?",
      choices: [
        { text: "Réduire la taille du code source", explanation: "Ce n'est pas l'objectif principal. Les requêtes préparées peuvent même être plus verbeuses." },
        { text: "Éviter les erreurs de syntaxe SQL", explanation: "Elles ne préviennent pas les erreurs de syntaxe SQL dans la requête elle-même." },
        { text: "Limiter les risques d'injection SQL et optimiser les exécutions répétées", explanation: "Parfait ! Les requêtes préparées séparent la structure SQL des données (via `?` ou `:param`), ce qui bloque les injections SQL et optimise les performances pour les requêtes répétées." },
        { text: "Obliger à utiliser uniquement MySQL", explanation: "C'est faux : les requêtes préparées fonctionnent avec tous les SGBD supportés par PDO." }
      ],
      correctIndex: 2,
      category: "Sécurité et bases de données",
      difficulty: 3
    },
    {
      id: "h5",
      question: "Quel mot-clé PHP permet de gérer des erreurs sous forme d'exceptions ?",
      choices: [
        { text: "`try` / `catch`", explanation: "Exact ! On utilise `try { ... } catch (Exception $e) { ... }` pour capturer les exceptions, et `throw` pour en lever." },
        { text: "`if` / `else`", explanation: "`if`/`else` sont des structures de contrôle conditionnelles, pas un mécanisme de gestion d'exceptions." },
        { text: "`throwError`", explanation: "Ce mot-clé n'existe pas en PHP. On utilise `throw new Exception(...)`." },
        { text: "`exception`", explanation: "`Exception` est une classe, pas un mot-clé de gestion. On utilise `try`/`catch`." }
      ],
      correctIndex: 0,
      category: "Gestion des erreurs",
      difficulty: 3
    },
    {
      id: "h6",
      question: "Dans une classe PHP, que signifie le mot-clé `private` devant une propriété ?",
      choices: [
        { text: "La propriété est accessible partout", explanation: "C'est faux : `private` limite l'accès au maximum. C'est `public` qui rend accessible partout." },
        { text: "La propriété est accessible uniquement dans la classe elle-même", explanation: "Correct ! Une propriété `private` n'est accessible que dans la classe où elle est déclarée, pas dans les classes enfants." },
        { text: "La propriété est accessible dans la classe et ses enfants", explanation: "C'est la définition de `protected`, pas `private`." },
        { text: "La propriété est en lecture seule", explanation: "`private` ne concerne pas la mutabilité mais la visibilité. Pour lecture seule, on peut utiliser `readonly` (PHP 8.1+)." }
      ],
      correctIndex: 1,
      category: "POO",
      difficulty: 3
    },
    {
      id: "h7",
      question: "Que permet la directive `declare(strict_types=1);` en PHP ?",
      choices: [
        { text: "Elle désactive toutes les erreurs", explanation: "Au contraire, elle rend PHP plus strict et génère des erreurs de type si les types ne correspondent pas." },
        { text: "Elle impose la vérification stricte des types pour les arguments et les retours de fonctions", explanation: "Parfait ! Avec `declare(strict_types=1);`, PHP applique strictement les types déclarés dans les signatures de fonctions (type hints)." },
        { text: "Elle accélère l'exécution des scripts", explanation: "Ce n'est pas son objectif. Elle ajoute même un léger overhead de vérification." },
        { text: "Elle force l'utilisation de PDO", explanation: "Cette directive n'a aucun lien avec PDO ou les bases de données." }
      ],
      correctIndex: 1,
      category: "Types stricts",
      difficulty: 3
    },
    {
      id: "h8",
      question: "Quel est l'intérêt principal des `namespaces` en PHP ?",
      choices: [
        { text: "Compresser le code", explanation: "Les namespaces ne compressent rien : ils organisent le code." },
        { text: "Traduire le code dans plusieurs langues", explanation: "Les namespaces n'ont rien à voir avec l'internationalisation." },
        { text: "Éviter les conflits de noms entre classes/fonctions de bibliothèques différentes", explanation: "Exact ! Les namespaces permettent d'organiser le code et d'éviter les collisions : `App\\Controller\\UserController` peut coexister avec `Vendor\\Package\\UserController`." },
        { text: "Optimiser l'utilisation de la mémoire", explanation: "Les namespaces n'ont pas d'impact direct sur l'utilisation mémoire." }
      ],
      correctIndex: 2,
      category: "Namespaces",
      difficulty: 3
    },
    {
      id: "h9",
      question: "Dans un contexte orienté objet moderne, quel pattern est recommandé pour accéder à la base plutôt que d'utiliser des variables globales partout ?",
      choices: [
        { text: "Utiliser `global $pdo` dans toutes les fonctions", explanation: "C'est une mauvaise pratique qui crée un couplage fort et rend le code difficile à tester." },
        { text: "Passer la connexion en dépendance (`dependency injection`)", explanation: "Parfait ! L'injection de dépendances (passer `$pdo` aux constructeurs ou méthodes) rend le code testable, modulaire et maintenable." },
        { text: "Stocker `$pdo` dans une constante", explanation: "Les constantes ne peuvent pas stocker d'objets en PHP (sauf avec `define()` pour les objets, mais ce n'est pas recommandé)." },
        { text: "Créer une variable `$pdo` statique dans chaque méthode", explanation: "Cela créerait du code dupliqué et serait difficile à maintenir." }
      ],
      correctIndex: 1,
      category: "Architecture et patterns",
      difficulty: 3
    },
    {
      id: "h10",
      question: "Quel est l'intérêt d'une méthode `__construct()` dans une classe PHP ?",
      choices: [
        { text: "C'est une fonction obligatoire vide", explanation: "Le constructeur n'est pas obligatoire et n'est jamais vide si on l'utilise." },
        { text: "Elle est appelée automatiquement lors de l'instanciation pour initialiser l'objet", explanation: "Exact ! Le constructeur `__construct()` est appelé automatiquement lors de `new MaClasse(...)` et sert à initialiser l'état de l'objet." },
        { text: "Elle sert uniquement à détruire l'objet", explanation: "C'est le destructeur `__destruct()` qui est appelé lors de la destruction, pas `__construct()`." },
        { text: "Elle remplace toutes les autres méthodes", explanation: "Le constructeur ne remplace rien : il complète les autres méthodes en initialisant l'objet." }
      ],
      correctIndex: 1,
      category: "POO",
      difficulty: 3
    }
  ]
};

// Métadonnées pour chaque niveau
export const DIFFICULTY_META = {
  easy: {
    label: "Facile",
    description: "Syntaxe de base, types, variables et opérateurs simples",
    color: "from-cyan-500 to-blue-500",
    passingScore: 0.6
  },
  medium: {
    label: "Intermédiaire",
    description: "Tableaux, fonctions, superglobales et concepts avancés",
    color: "from-blue-500 to-purple-500",
    passingScore: 0.7
  },
  hard: {
    label: "Difficile",
    description: "POO, PDO, sécurité, patterns et bonnes pratiques",
    color: "from-purple-500 to-pink-500",
    passingScore: 0.8
  }
};
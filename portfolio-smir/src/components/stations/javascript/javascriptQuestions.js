// src/components/stations/javascript/javascriptQuestions.js

export const JAVASCRIPT_QUESTIONS = {
  easy: [
    {
      id: "e1",
      question: "Comment déclarer une variable en JavaScript moderne ?",
      choices: [
        { text: "var x = 5;", explanation: "`var` fonctionne mais est déconseillé. Utilise `let` ou `const`." },
        { text: "let x = 5;", explanation: "Correct ! `let` est la déclaration moderne pour les variables mutables." },
        { text: "variable x = 5;", explanation: "Ce mot-clé n'existe pas en JavaScript." },
        { text: "int x = 5;", explanation: "JavaScript n'a pas de typage explicite comme `int`." }
      ],
      correctIndex: 1,
      category: "Variables",
      difficulty: 1
    },
    {
      id: "e2",
      question: "Comment afficher un message dans la console ?",
      choices: [
        { text: "print('Hello')", explanation: "C'est Python, pas JavaScript." },
        { text: "echo('Hello')", explanation: "C'est PHP, pas JavaScript." },
        { text: "console.log('Hello')", explanation: "Parfait ! `console.log()` affiche dans la console du navigateur." },
        { text: "System.out.println('Hello')", explanation: "C'est Java, pas JavaScript." }
      ],
      correctIndex: 2,
      category: "Affichage",
      difficulty: 1
    },
    {
      id: "e3",
      question: "Quel opérateur teste l'égalité stricte en JavaScript ?",
      choices: [
        { text: "==", explanation: "`==` compare les valeurs mais pas les types : `5 == '5'` est `true`." },
        { text: "===", explanation: "Exact ! `===` compare la valeur ET le type : `5 === '5'` est `false`." },
        { text: "=", explanation: "`=` est l'opérateur d'affectation, pas de comparaison." },
        { text: "equals()", explanation: "Cette fonction n'existe pas en JavaScript natif." }
      ],
      correctIndex: 1,
      category: "Opérateurs",
      difficulty: 1
    },
    {
      id: "e4",
      question: "Comment créer un tableau en JavaScript ?",
      choices: [
        { text: "array = (1, 2, 3)", explanation: "Les parenthèses ne créent pas de tableau, elles groupent des valeurs." },
        { text: "array = [1, 2, 3]", explanation: "Correct ! Les crochets `[]` définissent un tableau (Array)." },
        { text: "array = {1, 2, 3}", explanation: "Les accolades créent un objet, pas un tableau." },
        { text: "array = <1, 2, 3>", explanation: "Cette syntaxe n'existe pas en JavaScript." }
      ],
      correctIndex: 1,
      category: "Tableaux",
      difficulty: 1
    },
    {
      id: "e5",
      question: "Quelle est la bonne syntaxe pour une fonction en JavaScript ?",
      choices: [
        { text: "function add(a, b) { return a + b; }", explanation: "Parfait ! C'est la syntaxe classique de fonction." },
        { text: "def add(a, b): return a + b", explanation: "C'est Python, pas JavaScript." },
        { text: "func add(a, b) { return a + b; }", explanation: "JavaScript utilise `function`, pas `func`." },
        { text: "fn add(a, b) => a + b", explanation: "Cette syntaxe n'existe pas en JavaScript standard." }
      ],
      correctIndex: 0,
      category: "Fonctions",
      difficulty: 1
    },
    {
      id: "e6",
      question: "Comment commenter une ligne en JavaScript ?",
      choices: [
        { text: "# commentaire", explanation: "C'est Python, pas JavaScript." },
        { text: "<!-- commentaire -->", explanation: "C'est HTML, pas JavaScript." },
        { text: "// commentaire", explanation: "Exact ! `//` pour les commentaires sur une ligne." },
        { text: "/* commentaire", explanation: "Il manque `*/` pour fermer le commentaire multi-lignes." }
      ],
      correctIndex: 2,
      category: "Syntaxe de base",
      difficulty: 1
    },
    {
      id: "e7",
      question: "Quel est le type de `'Hello World'` en JavaScript ?",
      choices: [
        { text: "string", explanation: "Correct ! Les chaînes de caractères sont de type `string`." },
        { text: "text", explanation: "Ce type n'existe pas en JavaScript." },
        { text: "char", explanation: "JavaScript n'a pas de type `char`, seulement `string`." },
        { text: "String", explanation: "Le type primitif est `string` (minuscule), `String` est l'objet constructeur." }
      ],
      correctIndex: 0,
      category: "Types",
      difficulty: 1
    },
    {
      id: "e8",
      question: "Comment concaténer deux chaînes en JavaScript ?",
      choices: [
        { text: "str1 . str2", explanation: "Le point est utilisé en PHP, pas en JavaScript." },
        { text: "str1 + str2", explanation: "Parfait ! L'opérateur `+` concatène les chaînes en JavaScript." },
        { text: "str1 & str2", explanation: "`&` est un opérateur bit à bit, pas de concaténation." },
        { text: "concat(str1, str2)", explanation: "La méthode existe (`.concat()`) mais `+` est plus courant." }
      ],
      correctIndex: 1,
      category: "Chaînes de caractères",
      difficulty: 1
    },
    {
      id: "e9",
      question: "Quelle valeur booléenne représente 'vrai' en JavaScript ?",
      choices: [
        { text: "TRUE", explanation: "JavaScript est sensible à la casse : c'est `true`, pas `TRUE`." },
        { text: "true", explanation: "Exact ! Les booléens JavaScript sont `true` et `false` (minuscules)." },
        { text: "1", explanation: "`1` est converti en `true` dans un contexte booléen, mais le littéral est `true`." },
        { text: "True", explanation: "C'est Python. JavaScript utilise `true` (tout en minuscules)." }
      ],
      correctIndex: 1,
      category: "Types",
      difficulty: 1
    },
    {
      id: "e10",
      question: "Comment accéder au premier élément d'un tableau `arr` ?",
      choices: [
        { text: "arr[1]", explanation: "Les indices commencent à 0, pas à 1. `arr[1]` est le 2e élément." },
        { text: "arr[0]", explanation: "Parfait ! Les tableaux JavaScript sont indexés à partir de 0." },
        { text: "arr.first()", explanation: "Cette méthode n'existe pas en JavaScript natif." },
        { text: "arr.get(0)", explanation: "Cette syntaxe n'existe pas pour les tableaux JavaScript." }
      ],
      correctIndex: 1,
      category: "Tableaux",
      difficulty: 1
    }
  ],

  medium: [
    {
      id: "m1",
      question: "Quelle est la différence entre `let` et `const` ?",
      choices: [
        { text: "Aucune différence", explanation: "Il y a une différence fondamentale de mutabilité." },
        { text: "`let` permet la réaffectation, `const` ne le permet pas", explanation: "Exact ! `const` empêche la réaffectation de la variable (mais l'objet peut être modifié)." },
        { text: "`const` est plus rapide", explanation: "Il n'y a pas de différence de performance significative." },
        { text: "`let` est global, `const` est local", explanation: "Les deux ont la même portée de bloc (block scope)." }
      ],
      correctIndex: 1,
      category: "Variables",
      difficulty: 2
    },
    {
      id: "m2",
      question: "Que retourne `typeof null` en JavaScript ?",
      choices: [
        { text: "'null'", explanation: "Non, c'est un bug historique de JavaScript." },
        { text: "'object'", explanation: "Correct ! C'est un bug célèbre : `typeof null` retourne `'object'`." },
        { text: "'undefined'", explanation: "`undefined` est un type différent de `null`." },
        { text: "'number'", explanation: "`null` n'est pas de type `number`." }
      ],
      correctIndex: 1,
      category: "Types",
      difficulty: 2
    },
    {
      id: "m3",
      question: "Que fait la méthode `.map()` sur un tableau ?",
      choices: [
        { text: "Filtre les éléments", explanation: "C'est `.filter()` qui filtre les éléments." },
        { text: "Transforme chaque élément et retourne un nouveau tableau", explanation: "Parfait ! `.map()` applique une fonction à chaque élément et retourne un nouveau tableau." },
        { text: "Trie les éléments", explanation: "C'est `.sort()` qui trie les éléments." },
        { text: "Réduit le tableau à une seule valeur", explanation: "C'est `.reduce()` qui fait ça." }
      ],
      correctIndex: 1,
      category: "Méthodes de tableau",
      difficulty: 2
    },
    {
      id: "m4",
      question: "Quelle est la syntaxe d'une arrow function ?",
      choices: [
        { text: "function => (x) { return x * 2; }", explanation: "L'ordre est incorrect et la syntaxe n'est pas valide." },
        { text: "(x) => x * 2", explanation: "Exact ! Syntaxe moderne : `(params) => expression`." },
        { text: "x -> x * 2", explanation: "C'est la syntaxe Java, pas JavaScript." },
        { text: "lambda x: x * 2", explanation: "C'est Python, pas JavaScript." }
      ],
      correctIndex: 1,
      category: "Fonctions",
      difficulty: 2
    },
    {
      id: "m5",
      question: "Que fait `...` (spread operator) sur un tableau ?",
      choices: [
        { text: "Supprime les éléments", explanation: "Le spread operator ne supprime rien." },
        { text: "Étale les éléments d'un tableau", explanation: "Correct ! `...arr` étale les éléments : `[...arr1, ...arr2]` fusionne les tableaux." },
        { text: "Trie le tableau", explanation: "Le spread operator ne trie pas." },
        { text: "Crée une référence", explanation: "Au contraire, il crée une copie superficielle." }
      ],
      correctIndex: 1,
      category: "ES6+",
      difficulty: 2
    },
    {
      id: "m6",
      question: "Comment créer un objet en JavaScript ?",
      choices: [
        { text: "obj = [name: 'Alice']", explanation: "Les crochets créent des tableaux, pas des objets." },
        { text: "obj = {name: 'Alice'}", explanation: "Parfait ! Les accolades avec `clé: valeur` créent un objet." },
        { text: "obj = (name: 'Alice')", explanation: "Les parenthèses ne créent pas d'objet." },
        { text: "obj = <name: 'Alice'>", explanation: "Cette syntaxe n'existe pas en JavaScript." }
      ],
      correctIndex: 1,
      category: "Objets",
      difficulty: 2
    },
    {
      id: "m7",
      question: "Que retourne `.filter()` sur un tableau ?",
      choices: [
        { text: "Un nouveau tableau avec les éléments qui passent le test", explanation: "Exact ! `.filter()` retourne un tableau contenant uniquement les éléments validés." },
        { text: "Le premier élément trouvé", explanation: "C'est `.find()` qui retourne le premier élément." },
        { text: "true ou false", explanation: "C'est `.some()` ou `.every()` qui retournent un booléen." },
        { text: "Modifie le tableau original", explanation: "`.filter()` ne modifie pas le tableau original, il en crée un nouveau." }
      ],
      correctIndex: 0,
      category: "Méthodes de tableau",
      difficulty: 2
    },
    {
      id: "m8",
      question: "Quelle est la différence entre `==` et `===` ?",
      choices: [
        { text: "`==` compare avec conversion de type, `===` sans conversion", explanation: "Parfait ! `==` fait une coercition de type, `===` compare strictement." },
        { text: "Aucune différence", explanation: "Il y a une différence fondamentale de comportement." },
        { text: "`===` est plus lent", explanation: "La performance n'est pas le critère principal." },
        { text: "`==` est plus strict", explanation: "C'est l'inverse : `===` est plus strict." }
      ],
      correctIndex: 0,
      category: "Opérateurs",
      difficulty: 2
    },
    {
      id: "m9",
      question: "Comment gérer une erreur en JavaScript ?",
      choices: [
        { text: "if (error) { ... }", explanation: "Ce n'est pas le mécanisme d'exception." },
        { text: "try { ... } catch (e) { ... }", explanation: "Exact ! `try/catch` capture les exceptions JavaScript." },
        { text: "error: { ... }", explanation: "Cette syntaxe n'existe pas." },
        { text: "on_error { ... }", explanation: "Ce mot-clé n'existe pas en JavaScript." }
      ],
      correctIndex: 1,
      category: "Gestion d'erreurs",
      difficulty: 2
    },
    {
      id: "m10",
      question: "Que fait `JSON.parse()` ?",
      choices: [
        { text: "Convertit un objet en chaîne JSON", explanation: "C'est `JSON.stringify()` qui fait ça." },
        { text: "Convertit une chaîne JSON en objet JavaScript", explanation: "Correct ! `JSON.parse()` transforme du JSON texte en objet JS." },
        { text: "Valide la syntaxe JSON", explanation: "Il parse et convertit, il ne se limite pas à valider." },
        { text: "Compresse un fichier JSON", explanation: "`JSON.parse()` ne compresse rien." }
      ],
      correctIndex: 1,
      category: "JSON",
      difficulty: 2
    }
  ],

  hard: [
    {
      id: "h1",
      question: "Qu'est-ce qu'une closure en JavaScript ?",
      choices: [
        { text: "Une fonction qui ferme le programme", explanation: "Ce n'est pas ça du tout." },
        { text: "Une fonction qui conserve l'accès à son scope parent", explanation: "Exact ! Une closure permet à une fonction interne d'accéder aux variables de sa fonction parent." },
        { text: "Une fonction anonyme", explanation: "Les closures peuvent être nommées ou anonymes." },
        { text: "Une fonction qui s'exécute immédiatement", explanation: "Ça c'est une IIFE (Immediately Invoked Function Expression)." }
      ],
      correctIndex: 1,
      category: "Closures",
      difficulty: 3
    },
    {
      id: "h2",
      question: "Que signifie `this` dans une arrow function ?",
      choices: [
        { text: "`this` fait référence à la fonction elle-même", explanation: "Non, les arrow functions n'ont pas leur propre `this`." },
        { text: "`this` est hérité du contexte parent", explanation: "Correct ! Les arrow functions héritent du `this` du scope englobant." },
        { text: "`this` est toujours `undefined`", explanation: "Pas toujours, ça dépend du contexte parent." },
        { text: "`this` fait référence à `window`", explanation: "Pas nécessairement, ça dépend du contexte parent." }
      ],
      correctIndex: 1,
      category: "this",
      difficulty: 3
    },
    {
      id: "h3",
      question: "Quelle est la différence entre `Promise.all()` et `Promise.race()` ?",
      choices: [
        { text: "Aucune différence", explanation: "Ils ont des comportements très différents." },
        { text: "`all()` attend toutes les promesses, `race()` la première résolue", explanation: "Parfait ! `all()` attend tout, `race()` retourne dès la première terminée." },
        { text: "`race()` est plus rapide", explanation: "Ce n'est pas une question de vitesse, mais de comportement." },
        { text: "`all()` échoue silencieusement", explanation: "`all()` échoue si une seule promesse est rejetée." }
      ],
      correctIndex: 1,
      category: "Promesses",
      difficulty: 3
    },
    {
      id: "h4",
      question: "Qu'est-ce que l'event loop en JavaScript ?",
      choices: [
        { text: "Une boucle qui écoute les clics", explanation: "Ce n'est pas spécifique aux événements utilisateur." },
        { text: "Le mécanisme qui gère l'exécution asynchrone", explanation: "Exact ! L'event loop gère la queue des tâches et le stack d'exécution." },
        { text: "Un type de boucle `for`", explanation: "Ce n'est pas une structure de contrôle." },
        { text: "Un bug JavaScript", explanation: "C'est au contraire un mécanisme fondamental." }
      ],
      correctIndex: 1,
      category: "Asynchrone",
      difficulty: 3
    },
    {
      id: "h5",
      question: "Que fait `Object.freeze()` ?",
      choices: [
        { text: "Empêche toute modification de l'objet", explanation: "Correct ! `freeze()` rend l'objet immuable (shallow freeze)." },
        { text: "Copie l'objet", explanation: "`freeze()` ne copie pas, il modifie l'objet original." },
        { text: "Supprime l'objet", explanation: "`freeze()` ne supprime rien." },
        { text: "Transforme l'objet en JSON", explanation: "Ce n'est pas le rôle de `freeze()`." }
      ],
      correctIndex: 0,
      category: "Objets",
      difficulty: 3
    },
    {
      id: "h6",
      question: "Quelle est la différence entre `null` et `undefined` ?",
      choices: [
        { text: "Aucune différence", explanation: "Ce sont deux valeurs distinctes." },
        { text: "`undefined` = absence de valeur, `null` = valeur intentionnellement vide", explanation: "Exact ! `undefined` est l'absence, `null` est une valeur explicite de vide." },
        { text: "`null` est un bug", explanation: "`null` est une valeur valide, bien que `typeof null` retourne `'object'` par bug." },
        { text: "`undefined` est obsolète", explanation: "`undefined` est toujours utilisé et utile." }
      ],
      correctIndex: 1,
      category: "Types",
      difficulty: 3
    },
    {
      id: "h7",
      question: "Qu'est-ce que le hoisting en JavaScript ?",
      choices: [
        { text: "L'optimisation du code", explanation: "Ce n'est pas une optimisation." },
        { text: "Le déplacement des déclarations en haut du scope", explanation: "Correct ! Les déclarations (`var`, `function`) sont 'levées' en haut du scope." },
        { text: "Le tri des variables", explanation: "Le hoisting ne trie rien." },
        { text: "Une erreur de syntaxe", explanation: "C'est un comportement normal de JavaScript." }
      ],
      correctIndex: 1,
      category: "Scope",
      difficulty: 3
    },
    {
      id: "h8",
      question: "Que fait `async/await` en JavaScript ?",
      choices: [
        { text: "Exécute du code en parallèle", explanation: "JavaScript reste mono-thread, `async/await` gère l'asynchrone." },
        { text: "Simplifie la syntaxe des Promesses", explanation: "Exact ! `async/await` rend le code asynchrone plus lisible, comme du code synchrone." },
        { text: "Accélère l'exécution", explanation: "Ce n'est pas une question de vitesse." },
        { text: "Remplace les fonctions", explanation: "`async/await` complète les fonctions, ne les remplace pas." }
      ],
      correctIndex: 1,
      category: "Asynchrone",
      difficulty: 3
    },
    {
      id: "h9",
      question: "Qu'est-ce que le destructuring en JavaScript ?",
      choices: [
        { text: "Supprimer des variables", explanation: "Le destructuring n'est pas une suppression." },
        { text: "Extraire des valeurs d'objets ou tableaux", explanation: "Parfait ! `const {name, age} = user` extrait les propriétés." },
        { text: "Détruire un objet", explanation: "Le destructuring n'affecte pas l'objet original." },
        { text: "Un type d'erreur", explanation: "C'est une fonctionnalité ES6, pas une erreur." }
      ],
      correctIndex: 1,
      category: "ES6+",
      difficulty: 3
    },
    {
      id: "h10",
      question: "Que fait `Array.prototype.reduce()` ?",
      choices: [
        { text: "Réduit la taille du tableau", explanation: "Il ne modifie pas la taille physique." },
        { text: "Réduit le tableau à une seule valeur via une fonction", explanation: "Exact ! `reduce()` accumule les valeurs : `arr.reduce((acc, val) => acc + val, 0)`." },
        { text: "Filtre les éléments", explanation: "C'est `.filter()` qui filtre." },
        { text: "Supprime les doublons", explanation: "Il faut utiliser `Set` ou `.filter()` pour ça." }
      ],
      correctIndex: 1,
      category: "Méthodes de tableau",
      difficulty: 3
    }
  ]
};

export const DIFFICULTY_META = {
  easy: {
    label: "Facile",
    description: "Syntaxe de base, variables, types et opérateurs simples",
    color: "from-yellow-500 to-orange-500",
    passingScore: 0.6
  },
  medium: {
    label: "Intermédiaire",
    description: "Tableaux, objets, fonctions modernes et méthodes",
    color: "from-orange-500 to-red-500",
    passingScore: 0.7
  },
  hard: {
    label: "Difficile",
    description: "Closures, promesses, async/await et concepts avancés",
    color: "from-red-500 to-pink-500",
    passingScore: 0.8
  }
};
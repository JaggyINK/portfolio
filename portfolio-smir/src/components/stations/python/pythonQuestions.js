// src/components/stations/python/pythonQuestions.js

export const PYTHON_QUESTIONS = {
  easy: [
    {
      id: "e1",
      question: "Quel mot-clé est utilisé pour définir une fonction en Python ?",
      choices: [
        { text: "function", explanation: "C'est la syntaxe JavaScript, pas Python." },
        { text: "def", explanation: "Correct ! On déclare une fonction avec `def nom_fonction():` en Python." },
        { text: "func", explanation: "Ce mot-clé n'existe pas en Python." },
        { text: "define", explanation: "Python utilise `def`, pas `define`." }
      ],
      correctIndex: 1,
      category: "Syntaxe de base",
      difficulty: 1
    },
    {
      id: "e2",
      question: "Comment afficher du texte en Python ?",
      choices: [
        { text: "echo('Hello')", explanation: "C'est la syntaxe PHP, pas Python." },
        { text: "print('Hello')", explanation: "Parfait ! `print()` est la fonction standard pour afficher du texte en Python." },
        { text: "console.log('Hello')", explanation: "C'est JavaScript, pas Python." },
        { text: "System.out.println('Hello')", explanation: "C'est Java, pas Python." }
      ],
      correctIndex: 1,
      category: "Affichage",
      difficulty: 1
    },
    {
      id: "e3",
      question: "Quel symbole est utilisé pour les commentaires sur une ligne en Python ?",
      choices: [
        { text: "//", explanation: "C'est la syntaxe Java/JavaScript/C++, pas Python." },
        { text: "#", explanation: "Exact ! Les commentaires Python commencent par `#`." },
        { text: "/*", explanation: "Cette syntaxe est pour les commentaires multi-lignes en C/Java, pas Python." },
        { text: "<!--", explanation: "C'est la syntaxe HTML, pas Python." }
      ],
      correctIndex: 1,
      category: "Syntaxe de base",
      difficulty: 1
    },
    {
      id: "e4",
      question: "Quel est le type de la valeur `42` en Python ?",
      choices: [
        { text: "str", explanation: "Un `str` (string) est une chaîne de caractères. 42 sans guillemets est un nombre." },
        { text: "int", explanation: "Correct ! `42` est un entier (integer) en Python." },
        { text: "float", explanation: "Un `float` est un nombre à virgule. `42.0` serait un float, pas `42`." },
        { text: "bool", explanation: "Un `bool` est un booléen (`True` ou `False`), pas un nombre." }
      ],
      correctIndex: 1,
      category: "Types",
      difficulty: 1
    },
    {
      id: "e5",
      question: "Comment créer une liste en Python ?",
      choices: [
        { text: "list = (1, 2, 3)", explanation: "Les parenthèses créent un tuple, pas une liste." },
        { text: "list = [1, 2, 3]", explanation: "Parfait ! Les crochets `[]` définissent une liste en Python." },
        { text: "list = {1, 2, 3}", explanation: "Les accolades créent un set (ensemble), pas une liste." },
        { text: "list = <1, 2, 3>", explanation: "Cette syntaxe n'existe pas en Python." }
      ],
      correctIndex: 1,
      category: "Structures de données",
      difficulty: 1
    },
    {
      id: "e6",
      question: "Quelle est la bonne syntaxe pour une condition en Python ?",
      choices: [
        { text: "if x == 5 {", explanation: "Python n'utilise pas d'accolades pour les blocs." },
        { text: "if x == 5:", explanation: "Correct ! On utilise `:` suivi d'une indentation pour définir un bloc." },
        { text: "if (x == 5)", explanation: "Les parenthèses ne sont pas obligatoires et il manque le `:`." },
        { text: "if x = 5:", explanation: "On utilise `==` pour comparer, `=` sert à l'affectation." }
      ],
      correctIndex: 1,
      category: "Structures de contrôle",
      difficulty: 1
    },
    {
      id: "e7",
      question: "Comment concatener deux chaînes en Python ?",
      choices: [
        { text: "str1 . str2", explanation: "Le point est utilisé en PHP, pas en Python." },
        { text: "str1 + str2", explanation: "Exact ! L'opérateur `+` permet de concaténer des chaînes en Python." },
        { text: "str1 & str2", explanation: "`&` est un opérateur bit à bit, pas de concaténation." },
        { text: "concat(str1, str2)", explanation: "Cette fonction n'existe pas de base en Python." }
      ],
      correctIndex: 1,
      category: "Chaînes de caractères",
      difficulty: 1
    },
    {
      id: "e8",
      question: "Quel mot-clé permet de créer une boucle qui itère sur une séquence ?",
      choices: [
        { text: "foreach", explanation: "Ce mot-clé n'existe pas en Python (c'est PHP/JavaScript)." },
        { text: "for", explanation: "Correct ! On utilise `for element in sequence:` en Python." },
        { text: "loop", explanation: "Ce mot-clé n'existe pas en Python." },
        { text: "each", explanation: "Python n'utilise pas `each`, mais `for`." }
      ],
      correctIndex: 1,
      category: "Boucles",
      difficulty: 1
    },
    {
      id: "e9",
      question: "Comment vérifier le type d'une variable `x` en Python ?",
      choices: [
        { text: "typeof(x)", explanation: "C'est JavaScript, pas Python." },
        { text: "type(x)", explanation: "Parfait ! `type(x)` retourne le type de la variable en Python." },
        { text: "x.type()", explanation: "Cette syntaxe n'existe pas en Python." },
        { text: "gettype(x)", explanation: "C'est PHP, pas Python." }
      ],
      correctIndex: 1,
      category: "Types",
      difficulty: 1
    },
    {
      id: "e10",
      question: "Quelle valeur booléenne représente 'vrai' en Python ?",
      choices: [
        { text: "true", explanation: "En Python, la première lettre doit être majuscule." },
        { text: "True", explanation: "Exact ! Les booléens Python sont `True` et `False` (première lettre majuscule)." },
        { text: "TRUE", explanation: "Python est sensible à la casse : c'est `True`, pas `TRUE`." },
        { text: "1", explanation: "`1` est converti en `True` dans un contexte booléen, mais le littéral booléen est `True`." }
      ],
      correctIndex: 1,
      category: "Types",
      difficulty: 1
    }
  ],

  medium: [
    {
      id: "m1",
      question: "Quelle est la différence entre une liste `[]` et un tuple `()` ?",
      choices: [
        { text: "Aucune différence", explanation: "Il y a une différence fondamentale de mutabilité." },
        { text: "Une liste est mutable, un tuple est immutable", explanation: "Correct ! Les listes peuvent être modifiées, les tuples sont immutables." },
        { text: "Un tuple est plus rapide pour toutes les opérations", explanation: "Les tuples sont légèrement plus rapides pour l'accès, mais ce n'est pas la différence principale." },
        { text: "Les tuples n'acceptent qu'un seul type", explanation: "Faux, les tuples peuvent contenir plusieurs types comme les listes." }
      ],
      correctIndex: 1,
      category: "Structures de données",
      difficulty: 2
    },
    {
      id: "m2",
      question: "Que retourne `len([1, 2, 3, 4, 5])` ?",
      choices: [
        { text: "4", explanation: "Tu as peut-être oublié de compter tous les éléments." },
        { text: "5", explanation: "Parfait ! `len()` retourne le nombre d'éléments : 5." },
        { text: "[1, 2, 3, 4, 5]", explanation: "`len()` retourne un nombre, pas la liste elle-même." },
        { text: "Erreur", explanation: "`len()` fonctionne parfaitement avec les listes." }
      ],
      correctIndex: 1,
      category: "Fonctions intégrées",
      difficulty: 2
    },
    {
      id: "m3",
      question: "Comment créer un dictionnaire en Python ?",
      choices: [
        { text: "dict = ['nom': 'Alice']", explanation: "Les crochets définissent des listes, pas des dictionnaires." },
        { text: "dict = {'nom': 'Alice'}", explanation: "Correct ! Les accolades avec `clé: valeur` créent un dictionnaire." },
        { text: "dict = ('nom': 'Alice')", explanation: "Les parenthèses créent des tuples, pas des dictionnaires." },
        { text: "dict = <'nom': 'Alice'>", explanation: "Cette syntaxe n'existe pas en Python." }
      ],
      correctIndex: 1,
      category: "Structures de données",
      difficulty: 2
    },
    {
      id: "m4",
      question: "Que fait la méthode `.append()` sur une liste ?",
      choices: [
        { text: "Supprime le dernier élément", explanation: "C'est `.pop()` qui supprime le dernier élément." },
        { text: "Ajoute un élément à la fin", explanation: "Exact ! `.append(x)` ajoute `x` à la fin de la liste." },
        { text: "Trie la liste", explanation: "Pour trier, on utilise `.sort()` ou `sorted()`." },
        { text: "Inverse la liste", explanation: "Pour inverser, on utilise `.reverse()` ou `[::-1]`." }
      ],
      correctIndex: 1,
      category: "Méthodes de liste",
      difficulty: 2
    },
    {
      id: "m5",
      question: "Comment accéder au dernier élément d'une liste `ma_liste` ?",
      choices: [
        { text: "ma_liste[length]", explanation: "`length` n'est pas défini. On utiliserait `len(ma_liste)`." },
        { text: "ma_liste[-1]", explanation: "Parfait ! Les indices négatifs comptent depuis la fin : `-1` est le dernier." },
        { text: "ma_liste[last]", explanation: "`last` n'est pas un mot-clé Python." },
        { text: "ma_liste.last()", explanation: "Cette méthode n'existe pas pour les listes Python." }
      ],
      correctIndex: 1,
      category: "Listes",
      difficulty: 2
    },
    {
      id: "m6",
      question: "Quelle est la syntaxe correcte pour une list comprehension ?",
      choices: [
        { text: "[x for x in range(10)]", explanation: "Parfait ! C'est la syntaxe d'une list comprehension." },
        { text: "(x for x in range(10))", explanation: "Les parenthèses créent un générateur, pas une liste." },
        { text: "{x for x in range(10)}", explanation: "Les accolades créent un set, pas une liste." },
        { text: "list(x for x in range(10))", explanation: "Cela fonctionne mais ce n'est pas la syntaxe directe d'une list comprehension." }
      ],
      correctIndex: 0,
      category: "List comprehensions",
      difficulty: 2
    },
    {
      id: "m7",
      question: "Que retourne `'Hello'.upper()` ?",
      choices: [
        { text: "'hello'", explanation: "`.upper()` met en majuscules, pas en minuscules." },
        { text: "'HELLO'", explanation: "Correct ! `.upper()` convertit toute la chaîne en majuscules." },
        { text: "'Hello'", explanation: "La chaîne est modifiée : toutes les lettres deviennent majuscules." },
        { text: "Erreur", explanation: "`.upper()` est une méthode valide des chaînes Python." }
      ],
      correctIndex: 1,
      category: "Méthodes de chaînes",
      difficulty: 2
    },
    {
      id: "m8",
      question: "Comment gérer une exception en Python ?",
      choices: [
        { text: "catch Exception:", explanation: "Python utilise `except`, pas `catch`." },
        { text: "try: ... except Exception:", explanation: "Parfait ! On utilise `try:` suivi de `except Exception:` pour capturer les erreurs." },
        { text: "try { ... } catch (e) { ... }", explanation: "C'est la syntaxe JavaScript, pas Python." },
        { text: "error { ... }", explanation: "Cette syntaxe n'existe pas en Python." }
      ],
      correctIndex: 1,
      category: "Gestion d'erreurs",
      difficulty: 2
    },
    {
      id: "m9",
      question: "Quelle fonction permet d'ouvrir un fichier en Python ?",
      choices: [
        { text: "read()", explanation: "`.read()` lit le contenu d'un fichier déjà ouvert, mais ne l'ouvre pas." },
        { text: "open()", explanation: "Correct ! `open('fichier.txt', 'r')` ouvre un fichier en lecture." },
        { text: "file()", explanation: "`file()` existait en Python 2 mais n'est plus utilisé en Python 3." },
        { text: "load()", explanation: "Cette fonction n'est pas utilisée pour ouvrir des fichiers texte basiques." }
      ],
      correctIndex: 1,
      category: "Fichiers",
      difficulty: 2
    },
    {
      id: "m10",
      question: "Comment importer le module `math` en Python ?",
      choices: [
        { text: "include math", explanation: "C'est PHP, pas Python." },
        { text: "import math", explanation: "Parfait ! `import math` importe le module entier." },
        { text: "require('math')", explanation: "C'est Node.js, pas Python." },
        { text: "using math", explanation: "Cette syntaxe n'existe pas en Python (c'est C#)." }
      ],
      correctIndex: 1,
      category: "Modules",
      difficulty: 2
    }
  ],

  hard: [
    {
      id: "h1",
      question: "Quelle est la différence entre `==` et `is` en Python ?",
      choices: [
        { text: "Aucune différence", explanation: "Il y a une différence fondamentale." },
        { text: "`==` compare les valeurs, `is` compare l'identité (même objet en mémoire)", explanation: "Exact ! `is` vérifie si deux variables pointent vers le même objet." },
        { text: "`is` est plus rapide", explanation: "Ce n'est pas la différence principale, même si `is` peut être légèrement plus rapide." },
        { text: "`==` fonctionne uniquement avec les nombres", explanation: "Faux, `==` fonctionne avec tous les types." }
      ],
      correctIndex: 1,
      category: "Comparaison",
      difficulty: 3
    },
    {
      id: "h2",
      question: "Qu'est-ce qu'un décorateur en Python ?",
      choices: [
        { text: "Un commentaire spécial", explanation: "Les décorateurs ne sont pas des commentaires." },
        { text: "Une fonction qui modifie ou enrichit une autre fonction", explanation: "Correct ! Les décorateurs (avec `@`) permettent de modifier le comportement d'une fonction." },
        { text: "Une variable globale", explanation: "Les décorateurs ne sont pas des variables." },
        { text: "Un type de classe", explanation: "Les décorateurs ne sont pas des classes, mais peuvent être appliqués aux méthodes." }
      ],
      correctIndex: 1,
      category: "Décorateurs",
      difficulty: 3
    },
    {
      id: "h3",
      question: "Que retourne un générateur Python ?",
      choices: [
        { text: "Une liste complète", explanation: "Les générateurs ne créent pas de liste en mémoire." },
        { text: "Un itérateur qui génère des valeurs à la demande", explanation: "Parfait ! Les générateurs (avec `yield`) produisent des valeurs une par une." },
        { text: "Un tuple", explanation: "Les générateurs ne retournent pas de tuples." },
        { text: "Rien", explanation: "Les générateurs retournent un objet itérateur." }
      ],
      correctIndex: 1,
      category: "Générateurs",
      difficulty: 3
    },
    {
      id: "h4",
      question: "À quoi sert le mot-clé `with` en Python ?",
      choices: [
        { text: "À créer une boucle", explanation: "`with` ne crée pas de boucle." },
        { text: "À gérer automatiquement les ressources (context manager)", explanation: "Exact ! `with` garantit la fermeture automatique des ressources (fichiers, connexions, etc.)." },
        { text: "À importer des modules", explanation: "`import` sert à importer, pas `with`." },
        { text: "À déclarer une classe", explanation: "On utilise `class`, pas `with`." }
      ],
      correctIndex: 1,
      category: "Context managers",
      difficulty: 3
    },
    {
      id: "h5",
      question: "Quelle méthode spéciale définit le constructeur d'une classe ?",
      choices: [
        { text: "__new__()", explanation: "`__new__()` crée l'objet, mais ce n'est pas le constructeur typique." },
        { text: "__init__()", explanation: "Correct ! `__init__()` initialise une nouvelle instance de classe." },
        { text: "__create__()", explanation: "Cette méthode n'existe pas en Python." },
        { text: "__construct__()", explanation: "C'est PHP, pas Python." }
      ],
      correctIndex: 1,
      category: "POO",
      difficulty: 3
    },
    {
      id: "h6",
      question: "Qu'est-ce que le GIL (Global Interpreter Lock) en Python ?",
      choices: [
        { text: "Un système de gestion de mémoire", explanation: "Ce n'est pas sa fonction principale." },
        { text: "Un verrou qui empêche l'exécution parallèle de threads Python", explanation: "Exact ! Le GIL limite le multithreading en Python (mais pas le multiprocessing)." },
        { text: "Un outil de débogage", explanation: "Le GIL n'est pas un outil de débogage." },
        { text: "Un gestionnaire de packages", explanation: "pip gère les packages, pas le GIL." }
      ],
      correctIndex: 1,
      category: "Avancé",
      difficulty: 3
    },
    {
      id: "h7",
      question: "Que signifie `*args` dans une signature de fonction ?",
      choices: [
        { text: "Multiplication des arguments", explanation: "`*` ne multiplie pas les arguments." },
        { text: "Accepte un nombre variable d'arguments positionnels", explanation: "Parfait ! `*args` permet de passer un nombre variable d'arguments sous forme de tuple." },
        { text: "Déclare un argument obligatoire", explanation: "`*args` rend les arguments optionnels, pas obligatoires." },
        { text: "C'est une erreur de syntaxe", explanation: "`*args` est une syntaxe valide et courante." }
      ],
      correctIndex: 1,
      category: "Fonctions avancées",
      difficulty: 3
    },
    {
      id: "h8",
      question: "Quelle est la différence entre `.copy()` et l'assignation simple d'une liste ?",
      choices: [
        { text: "Aucune différence", explanation: "Il y a une différence importante." },
        { text: "`.copy()` crée une copie superficielle, l'assignation crée une référence", explanation: "Exact ! `a = b` crée une référence, `a = b.copy()` crée une nouvelle liste." },
        { text: "`.copy()` est plus lent", explanation: "Ce n'est pas la différence fonctionnelle principale." },
        { text: "L'assignation crée toujours une copie profonde", explanation: "Faux, l'assignation ne copie pas, elle référence." }
      ],
      correctIndex: 1,
      category: "Références et copies",
      difficulty: 3
    },
    {
      id: "h9",
      question: "Que fait `lambda x: x * 2` ?",
      choices: [
        { text: "Crée une erreur", explanation: "`lambda` est une syntaxe valide." },
        { text: "Crée une fonction anonyme qui double son argument", explanation: "Correct ! `lambda` crée une fonction anonyme en une ligne." },
        { text: "Double toutes les variables x", explanation: "`lambda` crée une fonction, elle ne s'exécute pas automatiquement." },
        { text: "Déclare une variable", explanation: "`lambda` crée une fonction, pas une variable simple." }
      ],
      correctIndex: 1,
      category: "Fonctions lambda",
      difficulty: 3
    },
    {
      id: "h10",
      question: "Comment créer une classe qui hérite de `Parent` en Python ?",
      choices: [
        { text: "class Enfant extends Parent:", explanation: "C'est JavaScript, pas Python." },
        { text: "class Enfant(Parent):", explanation: "Parfait ! On met la classe parent entre parenthèses." },
        { text: "class Enfant inherits Parent:", explanation: "Cette syntaxe n'existe pas en Python." },
        { text: "class Enfant < Parent:", explanation: "Cette syntaxe n'est pas Python (c'est Ruby)." }
      ],
      correctIndex: 1,
      category: "POO",
      difficulty: 3
    }
  ]
};

export const DIFFICULTY_META = {
  easy: {
    label: "Facile",
    description: "Syntaxe de base, types, variables et structures simples",
    color: "from-green-500 to-emerald-500",
    passingScore: 0.6
  },
  medium: {
    label: "Intermédiaire",
    description: "Listes, dictionnaires, fonctions et gestion d'erreurs",
    color: "from-blue-500 to-cyan-500",
    passingScore: 0.7
  },
  hard: {
    label: "Difficile",
    description: "POO, décorateurs, générateurs et concepts avancés",
    color: "from-purple-500 to-pink-500",
    passingScore: 0.8
  }
};
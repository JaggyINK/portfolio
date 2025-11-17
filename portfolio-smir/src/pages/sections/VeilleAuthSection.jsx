// src/pages/sections/VeilleAuthSection.jsx
import React, { useMemo, useState } from "react";

/* ============ Système φ (nombre d’or) ============ */
const PHI = 1.618;
const INV = 1 / PHI;
const INV2 = INV * INV;

/* ============ Thème sobre & pro ============ */
const THEME = {
  bg: "#0b1020",
  card: "rgba(11,16,32,0.78)",
  border: "rgba(255,215,0,0.12)",
  text: "#E6ECF8",
  sub: "#9AA7BF",
  brandFrom: "#22d3ee",
  brandTo: "#a855f7",
  line:
    "linear-gradient(90deg, rgba(56,189,248,.0) 0%, rgba(56,189,248,.45) 24%, rgba(212,175,55,.85) 50%, rgba(147,51,234,.55) 76%, rgba(56,189,248,.0) 100%)",
};

/* ============ Primitives UI ============ */
function Pill({ children }) {
  return (
    <span
      className="px-3 py-[0.38rem] text-[0.82rem] rounded-full border"
      style={{ color: THEME.text, borderColor: "rgba(255,255,255,.12)", background: "rgba(255,255,255,.05)" }}
    >
      {children}
    </span>
  );
}

function Panel({ title, subtitle, right, children, bodyClass = "" }) {
  return (
    <section
      className="relative h-full flex flex-col rounded-[1.0rem] overflow-hidden border shadow-xl backdrop-blur-xl"
      style={{ borderColor: THEME.border, background: THEME.card, boxShadow: "0 0.618rem 1.618rem rgba(0,0,0,.35)" }}
    >
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          maskImage: "radial-gradient(140% 100% at 0% 0%, transparent 0%, black 50%, black 100%)",
          background: `conic-gradient(from 0deg, ${THEME.brandFrom}, ${THEME.brandTo}, ${THEME.brandFrom})`,
          opacity: 0.06,
          animation: "spin-slow 18s linear infinite",
        }}
      />
      <header
        className="relative border-b border-white/10"
        style={{ padding: `${0.618 * PHI}rem ${1.0 * PHI}rem` }}
      >
        <div className="flex items-end justify-between gap-[0.618rem]">
          <div>
            <h3
              className="font-extrabold tracking-tight"
              style={{
                fontFamily: "OrbitronLocal, Orbitron, system-ui, sans-serif",
                fontSize: `clamp(1.15rem, ${1.0 * PHI}rem, 1.75rem)`,
                lineHeight: 1.0 + INV2,
                color: THEME.text,
              }}
            >
              {title}
            </h3>
            {subtitle && (
              <p className="mt-[0.382rem]" style={{ color: THEME.sub, fontSize: `${0.95}rem` }}>
                {subtitle}
              </p>
            )}
          </div>
          {right}
        </div>
      </header>
      <div
        className={`relative flex-1 ${bodyClass}`}
        style={{ padding: `${0.618 * PHI}rem ${1.0 * PHI}rem` }}
      >
        {children}
      </div>
      <div className="h-[0.236rem] w-full" style={{ background: THEME.line }} />
    </section>
  );
}

/* ============ Section principale ============ */
export default function VeilleAuthSection() {
  const [focus, setFocus] = useState("backend");

  const tabs = useMemo(
    () => [
      { key: "backend", label: "API Laravel" },
      { key: "frontend", label: "Front React" },
    ],
    []
  );

  return (
    <section
      id="veille-auth"
      className="min-h-[100svh] snap-center text-slate-100"
      style={{
        background:
          "radial-gradient(60% 60% at 50% 0%, rgba(212,175,55,.05), transparent 62%)," +
          "radial-gradient(40% 40% at 80% 80%, rgba(147,51,234,.04), transparent 62%), rgba(8,12,24,0.25)",
        backdropFilter: "blur(2px)",
        borderTop: "1px solid rgba(255,255,255,0.05)",
        padding: `${(INV * PHI) * PHI}rem ${1.0 * PHI}rem`,
      }}
    >
      <style>{`
        @keyframes spin-slow { to { transform: rotate(360deg); } }
      `}</style>

      <div className="w-full mx-auto" style={{ maxWidth: `${56 * PHI}rem` }}>
        {/* INTRO : thème + problématique */}
        <header className="mb-[1.0rem] text-center">
          <h2
            className="font-extrabold tracking-tight"
            style={{
              fontFamily: "OrbitronLocal, Orbitron, system-ui, sans-serif",
              fontSize: `clamp(1.8rem, ${1.618 * PHI}rem, 3rem)`,
              lineHeight: 1.0 + INV,
            }}
          >
            Veille technologique : Sécurité de l’authentification en entreprise
          </h2>
          <p
            className="mx-auto mt-[0.382rem] max-w-3xl text-[0.95rem]"
            style={{ color: THEME.sub }}
          >
            Sujet choisi dans le cadre de mon <strong>BTS SIO option SLAM</strong> :
            <br />
            <strong>
              «&nbsp;Comment sécuriser l’authentification d’une application web moderne
              tout en garantissant son intégration avec les services d’identité de l’entreprise
              (Active Directory) ?&nbsp;»
            </strong>
            <br />
            Ce sujet est au cœur de l’actualité : généralisation des applications web,
            multiplication des cyberattaques et besoin de SSO (Single Sign-On) dans les entreprises.
          </p>
        </header>

        {/* Ligne 1 : Thème SLAM & démarche de veille */}
        <div className="grid grid-cols-1 gap-[1.0rem] lg:grid-cols-2 auto-rows-fr">
          <Panel
            title="Angle SLAM : côté développement"
            subtitle="Ce que j’ai ciblé dans ma veille"
            right={<Pill>Dev</Pill>}
          >
            <ul className="space-y-[0.38rem]" style={{ color: THEME.text, fontSize: `${0.95}rem` }}>
              <li>
                • Conception d’une <strong>API REST d’authentification</strong> (Laravel) consommée par un front
                <strong> SPA</strong> (React / Vue).
              </li>
              <li>
                • Utilisation de <strong>standards modernes</strong> : JWT, OpenID Connect, OAuth2 pour déléguer
                l’authentification.
              </li>
              <li>
                • Gestion des <strong>rôles</strong> et <strong>permissions</strong> côté back (middleware, politiques d’accès).
              </li>
              <li>
                • Sécurisation du code : <strong>validation des entrées</strong>, gestion des erreurs,
                logs, rate limiting, protection contre l’OWASP Top 10.
              </li>
              <li>
                • Intégration possible avec un <strong>fournisseur d’identité</strong> (basé sur AD) via une API OIDC,
                sans gérer directement les mots de passe en clair.
              </li>
            </ul>
            <p
              className="mt-[0.5rem]"
              style={{ color: THEME.sub, fontSize: "0.9rem" }}
            >
              <strong>SPA (Single Page Application)</strong> : application web en une seule page
              qui se met à jour côté navigateur avec JavaScript (par exemple Gmail, Trello, certaines
              interfaces d’intranet). Elle consomme généralement une API REST.<br />
              <strong>OWASP (Open Web Application Security Project)</strong> : organisation
              internationale qui publie des bonnes pratiques de sécurité, dont le «&nbsp;OWASP Top 10&nbsp;»
              qui liste les principales failles des applications web.
            </p>
          </Panel>

          <Panel
            title="Démarche de veille"
            subtitle="Organisation (BTS SIO)"
            right={<Pill>Veille</Pill>}
          >
            <ul className="space-y-[0.38rem]" style={{ color: THEME.text, fontSize: `${0.95}rem` }}>
              <li>
                <strong>Outils</strong> :
                <ul className="ml-4 list-disc">
                  <li>Docs officielles : Laravel, OpenID, Microsoft Identity, OWASP.</li>
                  <li>Blogs techniques (Auth0 Blog, Medium, dev.to, Stack Overflow).</li>
                  <li>Alertes Google : “Laravel JWT security”, “SPA authentication best practices”.</li>
                </ul>
              </li>
              <li>
                <strong>Classement</strong> : protocoles (OIDC / JWT), patterns d’architecture (SPA + API),
                bonnes pratiques de code (validation, erreurs, tests).
              </li>
              <li>
                <strong>Fréquence</strong> : veille mise à jour mensuellement, avec tests dans des projets
                d’entraînement.
              </li>
              <li>
                <strong>Objectif</strong> : être capable de <em>concevoir</em> et <em>expliquer</em>
                une architecture d’authentification sécurisée en tant que développeur.
              </li>
            </ul>
          </Panel>
        </div>

        {/* Ligne 2 : Standards & menaces côté dev */}
        <div className="mt-[1.0rem] grid grid-cols-1 lg:grid-cols-2 gap-[1.0rem] auto-rows-fr">
          <Panel
            title="Standards & formats côté développeur"
            subtitle="OIDC, JWT, sessions"
            right={<Pill>Standards</Pill>}
          >
            <ul className="space-y-[0.38rem]" style={{ color: THEME.text, fontSize: `${0.95}rem` }}>
              <li>
                • <strong>OpenID Connect (OIDC)</strong> :
                protocole moderne d’authentification basé sur OAuth2. Il permet de déléguer
                la connexion à un <strong>IdP (Identity Provider)</strong> comme Google, Microsoft
                ou un serveur interne : l’API reçoit un token, pas le mot de passe.
              </li>
              <li>
                • <strong>JWT (JSON Web Token)</strong> :
                format de token signé (header + payload + signature) contenant des
                <em> claims</em> (id utilisateur, rôles, date d’expiration…).
              </li>
              <li>
                • <strong>Sessions Laravel</strong> :
                gestion classique par cookie, pratique pour les applications server-side.
              </li>
              <li>
                • <strong>API stateless</strong> :
                utilisation de tokens (Bearer) dans l’en-tête <code>Authorization</code> pour chaque requête.
              </li>
              <li>
                • <strong>Scopes / rôles</strong> :
                limiter ce qu’un token peut faire (lecture seule, écriture, administration, etc.).
              </li>
            </ul>
          </Panel>

          <Panel
            title="Menaces & bonnes pratiques côté code"
            subtitle="Synthèse orientée dev"
            right={<Pill>OWASP</Pill>}
          >
            <ul className="space-y-[0.38rem]" style={{ color: THEME.text, fontSize: `${0.95}rem` }}>
              <li>
                • <strong>Brute-force sur /login</strong> → throttle (<code>throttle:5,1</code>), délais,
                verrouillage après plusieurs tentatives.
              </li>
              <li>
                • <strong>Vol de tokens</strong> → durée de vie courte, rafraîchissement contrôlé,
                pas de stockage en clair dans le <code>localStorage</code>.
              </li>
              <li>
                • <strong>Injection (SQL, XSS)</strong> → validation Laravel (<code>FormRequest</code>),
                échappement systématique, requêtes préparées.
              </li>
              <li>
                • <strong>Mauvaise gestion des erreurs</strong> → messages génériques (“Identifiants invalides”),
                logs détaillés côté serveur uniquement.
              </li>
              <li>
                • <strong>Fuite de secrets</strong> → variables d’environnement (<code>.env</code>),
                pas de clés dans le code source Git.
              </li>
            </ul>
          </Panel>
        </div>

        {/* Ligne 3 : Focus technique tabs API Laravel / Front React */}
        <div className="mt-[1.0rem] grid grid-cols-1 gap-[1.0rem] auto-rows-fr">
          <Panel
            title="Exemples techniques (illustratifs)"
            subtitle="Architecture SPA + API Laravel"
            right={
              <div className="flex gap-[0.382rem]">
                {tabs.map((t) => (
                  <button
                    key={t.key}
                    className={`px-2 py-[0.35rem] rounded-md border border-white/10 hover:bg-white/10 ${
                      focus === t.key ? "bg-white/10" : ""
                    }`}
                    onClick={() => setFocus(t.key)}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            }
          >
            {focus === "backend" && (
              <pre className="overflow-x-auto text-xs" style={{ color: THEME.sub }}>
{`// Exemple simplifié de route d'authentification (Laravel)

// routes/api.php
Route::post('/login', [AuthController::class, 'login'])
    ->middleware('throttle:5,1'); // max 5 tentatives / minute / IP

// app/Http/Controllers/AuthController.php
public function login(LoginRequest $request)
{
    // 1. Validation des données (LoginRequest gère les règles)
    $credentials = $request->only('email', 'password');

    // 2. Vérification des identifiants (ex : via un IdP OIDC ou la base locale)
    if (! Auth::attempt($credentials)) {
        return response()->json(['message' => 'Identifiants invalides'], 401);
    }

    $user = $request->user();

    // 3. Génération d'un token (ex : Laravel Sanctum ou JWT)
    $token = $user->createToken('access')->plainTextToken;

    // 4. Retour des infos minimales + token
    return response()->json([
        'user'  => ['id' => $user->id, 'name' => $user->name],
        'token' => $token,
    ]);
}`}
              </pre>
            )}
            {focus === "frontend" && (
              <pre className="overflow-x-auto text-xs" style={{ color: THEME.sub }}>
{`// Exemple simplifié d'appel depuis un front React

async function login(email, password) {
  const response = await fetch('/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error('Identifiants invalides');
  }

  const data = await response.json();

  // Le token est ensuite géré de manière sécurisée :
  // par exemple via un cookie HttpOnly côté back,
  // ou en mémoire côté front selon l’architecture retenue.
  return data;
}

// Exemple d'utilisation dans un composant React
// (pseudo-code)
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const { user, token } = await login(email, password);
    // setUser(user); setAuthToken(token); etc.
  } catch (e) {
    setError(e.message);
  }
};`}
              </pre>
            )}
          </Panel>
        </div>

        {/* Ligne 4 : Bilan & compétences BTS SLAM */}
        <div className="mt-[1.0rem] grid grid-cols-1 lg:grid-cols-2 gap-[1.0rem] auto-rows-fr">
          <Panel
            title="Bilan de la veille"
            subtitle="Points forts / limites"
            right={<Pill>Analyse</Pill>}
          >
            <ul className="space-y-[0.38rem]" style={{ color: THEME.text, fontSize: "0.95rem" }}>
              <li>
                • Thème directement lié au développement d’applications web sécurisées
                (API Laravel + front SPA).
              </li>
              <li>
                • Vision globale : interface utilisateur (<strong>SPA</strong>),
                API REST, et service d’identité (<strong>IdP</strong> + tokens <strong>JWT</strong>).
              </li>
              <li>
                • Sources techniques et récentes :
                documentation officielle (Laravel, OpenID), ressources de l’<strong>OWASP</strong>
                et blogs de développeurs.
              </li>
              <li>
                • Certains aspects restent complexes (flux OIDC complets, approches Zero-Trust),
                mais cette veille m’a permis d’en comprendre les bases et le vocabulaire.
              </li>
            </ul>
          </Panel>

          <Panel
            title="Compétences BTS SIO (SLAM)"
            subtitle="Ce que cette veille met en valeur"
            right={<Pill>E4 / E5</Pill>}
          >
            <ul className="space-y-[0.38rem]" style={{ color: THEME.text, fontSize: `${0.95}rem` }}>
              <li>• <strong>C1.1 / C1.2</strong> : réaliser une veille technologique et en faire la synthèse.</li>
              <li>• <strong>C2.x</strong> : concevoir et développer une application en intégrant la sécurité.</li>
              <li>• <strong>C3.x</strong> : prendre en compte les contraintes d’un SI existant (annuaire, IdP).</li>
              <li>• <strong>Communication</strong> : capacité à vulgariser un sujet complexe auprès d’un jury.</li>
            </ul>
          </Panel>
        </div>

        {/* Bandeau final */}
        <div className="mt-[1.0rem] text-center" style={{ color: THEME.sub, fontSize: `${0.95}rem` }}>
          Veille maintenue mensuellement — dernière mise à jour : <strong>novembre 2025</strong>.
          <br />
          Questions ou retours ?{" "}
          <a href="#contact" className="underline hover:no-underline">
            Contactez-moi
          </a>.
        </div>
      </div>
    </section>
  );
}

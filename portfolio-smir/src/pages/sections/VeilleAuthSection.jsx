import React, { useState, useMemo } from "react";
import useReveal from "../../hooks/useReveal";
import { ScrollDownHint } from "../../components/ScrollHint";

/* ============ Système φ ============ */
const PHI = 1.618;
const INV = 1 / PHI;

const THEME = {
  card: "rgba(11,16,32,0.62)",
  border: "rgba(255,215,0,0.12)",
  text: "#E6ECF8",
  sub: "#C5D3E8",
  brandFrom: "#22d3ee",
  brandTo: "#a855f7",
  line:
    "linear-gradient(90deg, rgba(56,189,248,.0) 0%, rgba(56,189,248,.45) 24%, rgba(212,175,55,.85) 50%, rgba(147,51,234,.55) 76%, rgba(56,189,248,.0) 100%)",
};

/* ============ Architecture flow ============ */
const FLOW_STEPS = [
  { icon: "👤", label: "Utilisateur", sub: "Poste Windows / AD", color: "#60a5fa" },
  { icon: "⚛️", label: "React SPA", sub: "Interface web", color: "#22d3ee" },
  { icon: "⚙️", label: "API Laravel", sub: "Sanctum + LDAP", color: "#a855f7" },
  { icon: "🗂️", label: "Active Directory", sub: "LDAP Bind / ODBC", color: "#f59e0b" },
];

/* ============ Solutions testées ============ */
const SOLUTIONS = [
  {
    name: "LDAP Bind",
    icon: "🔐",
    color: "#22d3ee",
    what: "Vérifie le mot de passe directement auprès d'AD",
    how: "AD confirme ou refuse — aucun mot de passe stocké localement",
    verdict: "Méthode standard et sécurisée",
  },
  {
    name: "ODBC",
    icon: "🔌",
    color: "#a855f7",
    what: "Lit les infos utilisateur depuis AD (nom, email, état)",
    how: "Connecteur natif PHP — pas besoin de Java ni serveur additionnel",
    verdict: "Simple et léger pour Laravel",
  },
  {
    name: "JWT (Sanctum)",
    icon: "🎫",
    color: "#f59e0b",
    what: "Token d'accès signé après authentification AD",
    how: "Le front utilise ce token pour chaque requête API",
    verdict: "Idéal pour architecture SPA + API REST",
  },
];

/* ============ Comparatif ============ */
const COMPARE = [
  { name: "Laravel Sanctum", score: 5, pros: "Simple, gratuit, intégré", cons: "Pas d'OAuth complet", best: "SPA + API interne" },
  { name: "Laravel Passport", score: 3, pros: "OAuth 2.0, scopes avancés", cons: "Plus complexe", best: "API publique" },
  { name: "Auth0 / Okta", score: 3, pros: "Clé en main, MFA intégré", cons: "Coût élevé, SaaS", best: "Grandes entreprises" },
  { name: "Keycloak", score: 4, pros: "Open-source, OIDC/SAML", cons: "Admin complexe", best: "SSO on-premise" },
];

/* ============ Bonnes pratiques ============ */
const PRACTICES = [
  { icon: "🔒", title: "Hashage", desc: "bcrypt (cost 12+) ou Argon2id — jamais MD5/SHA-1" },
  { icon: "🛡️", title: "Rate limiting", desc: "5 tentatives/min max, temporisation progressive" },
  { icon: "📋", title: "Audit trail", desc: "Logger chaque action sensible (qui, quand, IP)" },
  { icon: "🍪", title: "Tokens", desc: "JWT courte durée + cookies HttpOnly/Secure/SameSite" },
  { icon: "🧱", title: "OWASP 2025", desc: "A07: Authentication Failures, A01: Broken Access Control, CSP headers, CORS strict" },
  { icon: "🔑", title: "Mots de passe", desc: "12+ caractères, NIST SP 800-63B, pas de rotation forcée" },
];

/* ============ Veille méthodo ============ */
const VEILLE_STEPS = [
  { num: "01", title: "Collecter", desc: "HN, GitHub, BleepingComputer, Laravel News", icon: "📡", color: "#22d3ee" },
  { num: "02", title: "Trier", desc: "Protocoles, bonnes pratiques, cas d'usage", icon: "📂", color: "#a855f7" },
  { num: "03", title: "Tester", desc: "Sandbox LDAP, API Laravel, intégration AD", icon: "🧪", color: "#f59e0b" },
  { num: "04", title: "Documenter", desc: "Portfolio, Discord privé, synthèse mensuelle", icon: "📝", color: "#10b981" },
];

/* ============ Code tabs ============ */
const CODE_TABS = [
  { key: "backend", label: "API Laravel" },
  { key: "frontend", label: "Front React" },
];

const BACKEND_CODE = `// routes/api.php
Route::post('/login', [AuthController::class, 'login'])
    ->middleware('throttle:5,1');

// AuthController.php
public function login(LoginRequest $request): JsonResponse
{
    // 1. Anti brute-force par IP+email
    $key = 'login:' . $request->ip() . ':' . $request->email;
    if (RateLimiter::tooManyAttempts($key, 5)) {
        return response()->json(['message' => 'Trop de tentatives'], 429);
    }

    // 2. Auth via Laravel (bcrypt compare)
    if (!Auth::attempt($request->only('email', 'password'))) {
        RateLimiter::hit($key, 60);
        return response()->json(['message' => 'Identifiants invalides'], 401);
    }

    // 3. Token Sanctum (expire 24h)
    $token = Auth::user()->createToken('access', ['*'], now()->addDay())
        ->plainTextToken;

    // 4. Audit log
    Log::info('Login', ['user' => Auth::id(), 'ip' => $request->ip()]);

    return response()->json([
        'user'  => Auth::user()->only('id', 'name', 'email'),
        'token' => $token,
    ]);
}`;

const FRONTEND_CODE = `// auth.js — Service d'authentification React
async function login(email, password) {
  const res = await fetch('/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    const err = { 401: 'Identifiants invalides', 429: 'Trop de tentatives' };
    throw new Error(err[res.status] || 'Erreur connexion');
  }

  const data = await res.json();
  window.__authToken = data.token; // Mémoire (pas localStorage = XSS safe)
  return data;
}

async function authFetch(url, opts = {}) {
  const token = window.__authToken;
  if (!token) throw new Error('Non authentifié');

  const res = await fetch(url, {
    ...opts,
    headers: { ...opts.headers, Authorization: \`Bearer \${token}\` },
  });

  if (res.status === 401) { delete window.__authToken; throw new Error('Session expirée'); }
  return res;
}`;

/* ============ Components ============ */

function FlowDiagram() {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-0 py-6">
      {FLOW_STEPS.map((step, i) => (
        <div key={step.label} className="flex items-center">
          <div
            className="flex flex-col items-center text-center px-4 py-3 rounded-xl border transition-all hover:scale-105"
            style={{
              background: `${step.color}08`,
              borderColor: `${step.color}30`,
              minWidth: "7rem",
              animation: `fadeSlideUp 0.5s ease-out ${i * 0.15}s both`,
            }}
          >
            <span className="text-2xl mb-1">{step.icon}</span>
            <span className="text-[0.8rem] font-bold" style={{ color: step.color }}>{step.label}</span>
            <span className="text-[0.65rem] mt-0.5" style={{ color: THEME.sub }}>{step.sub}</span>
          </div>
          {i < FLOW_STEPS.length - 1 && (
            <div className="hidden sm:flex items-center mx-1">
              <div className="flex items-center gap-0.5">
                {[0, 1, 2].map((d) => (
                  <span
                    key={d}
                    className="block w-1.5 h-1.5 rounded-full"
                    style={{
                      background: THEME.brandFrom,
                      opacity: 0.4,
                      animation: `pulse-dot 1.2s ease-in-out ${d * 0.2}s infinite`,
                    }}
                  />
                ))}
                <span style={{ color: THEME.brandFrom, fontSize: "0.9rem" }}>→</span>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function VeilleTimeline() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {VEILLE_STEPS.map((s, i) => (
        <div
          key={s.num}
          className="relative rounded-xl border px-4 py-4 text-center transition-all hover:scale-[1.03]"
          style={{
            background: `${s.color}06`,
            borderColor: `${s.color}25`,
            animation: `fadeSlideUp 0.5s ease-out ${i * 0.1}s both`,
          }}
        >
          <div
            className="absolute -top-3 left-1/2 -translate-x-1/2 px-2 py-0.5 text-[0.6rem] font-bold rounded-full"
            style={{ background: `${s.color}20`, color: s.color, border: `1px solid ${s.color}40` }}
          >
            {s.num}
          </div>
          <span className="text-xl block mb-1.5">{s.icon}</span>
          <span className="text-[0.82rem] font-bold block" style={{ color: s.color }}>{s.title}</span>
          <span className="text-[0.7rem] block mt-1 leading-snug" style={{ color: THEME.sub }}>{s.desc}</span>
        </div>
      ))}
    </div>
  );
}

/* ============ Main ============ */
export default function VeilleAuthSection() {
  const [codeTab, setCodeTab] = useState("backend");
  const [showCode, setShowCode] = useState(false);
  const { ref, revealed } = useReveal();

  const tabs = useMemo(() => CODE_TABS, []);

  return (
    <section
      ref={ref}
      id="veille-auth"
      className={`min-h-[100svh] snap-start text-slate-100 section-reveal${revealed ? " revealed" : ""}`}
      style={{
        background:
          "radial-gradient(60% 60% at 50% 0%, rgba(212,175,55,.05), transparent 62%)," +
          "radial-gradient(40% 40% at 80% 80%, rgba(147,51,234,.04), transparent 62%), rgba(8,12,24,0.25)",
        backdropFilter: "blur(2px)",
        borderTop: "1px solid rgba(255,255,255,0.05)",
        padding: `${INV * PHI * PHI}rem ${1.0 * PHI}rem`,
      }}
    >
      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse-dot {
          0%, 100% { opacity: 0.2; transform: scale(0.8); }
          50% { opacity: 0.8; transform: scale(1.2); }
        }
      `}</style>

      <div className="w-full mx-auto" style={{ maxWidth: `${48 * PHI}rem` }}>

        {/* ── HEADER ── */}
        <header className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-3">
            <span
              className="px-3 py-1 text-[0.7rem] font-bold tracking-widest uppercase rounded-full"
              style={{ background: "rgba(34,211,238,0.1)", color: THEME.brandFrom, border: "1px solid rgba(34,211,238,0.25)" }}
            >
              BTS SIO SLAM
            </span>
            <span
              className="px-3 py-1 text-[0.7rem] font-bold tracking-widest uppercase rounded-full"
              style={{ background: "rgba(168,85,247,0.1)", color: THEME.brandTo, border: "1px solid rgba(168,85,247,0.25)" }}
            >
              Veille
            </span>
          </div>
          <h2
            className="font-extrabold tracking-tight"
            style={{
              fontFamily: "OrbitronLocal, Orbitron, system-ui, sans-serif",
              fontSize: `clamp(1.3rem, ${1.2 * PHI}rem, 2rem)`,
              lineHeight: 1.0 + INV,
              color: THEME.text,
            }}
          >
            Sécurité de l&apos;authentification en entreprise
          </h2>
          <p className="mt-2 text-[0.88rem] max-w-2xl mx-auto leading-relaxed" style={{ color: THEME.sub }}>
            Comment sécuriser l&apos;authentification d&apos;une application web
            tout en l&apos;intégrant avec Active Directory ?
          </p>
          <div className="mx-auto mt-4 h-[2px] w-32" style={{ background: THEME.line }} />
        </header>

        {/* ── CONTEXTE JURY ── */}
        <div
          className="mb-8 rounded-xl border px-5 py-4"
          style={{
            background: "linear-gradient(135deg, rgba(212,175,55,0.04), rgba(168,85,247,0.04))",
            borderColor: "rgba(212,175,55,0.15)",
          }}
        >
          <h3 className="text-[0.72rem] font-bold tracking-[0.18em] uppercase mb-2" style={{ color: THEME.sub }}>
            Contexte &amp; Enjeux
          </h3>
          <p className="text-[0.82rem] leading-relaxed" style={{ color: THEME.sub }}>
            Dans le cadre de mon alternance chez <strong style={{ color: THEME.text }}>CPMS</strong>,
            j&apos;ai conçu un intranet (Laravel + React) connecté à <strong style={{ color: THEME.text }}>Active Directory</strong>.
            L&apos;enjeu : authentifier les employés de manière sécurisée sans dupliquer les mots de passe,
            tout en respectant les recommandations <strong style={{ color: THEME.text }}>OWASP Top 10:2025</strong> (A07 — Authentication Failures)
            et les guidelines <strong style={{ color: THEME.text }}>NIST SP 800-63B</strong>.
          </p>
        </div>

        {/* ── ARCHITECTURE FLOW ── */}
        <div className="mb-8">
          <h3 className="text-center text-[0.72rem] font-bold tracking-[0.18em] uppercase mb-2" style={{ color: THEME.sub }}>
            Architecture
          </h3>
          <FlowDiagram />
        </div>

        {/* ── SOLUTIONS TESTÉES ── */}
        <div className="mb-8">
          <h3 className="text-center text-[0.72rem] font-bold tracking-[0.18em] uppercase mb-4" style={{ color: THEME.sub }}>
            Solutions testées
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {SOLUTIONS.map((s, i) => (
              <div
                key={s.name}
                className="rounded-xl border p-4 transition-all hover:scale-[1.02]"
                style={{
                  background: THEME.card,
                  borderColor: `${s.color}25`,
                  animation: `fadeSlideUp 0.5s ease-out ${i * 0.1}s both`,
                }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xl">{s.icon}</span>
                  <span className="text-[0.9rem] font-bold" style={{ color: s.color }}>{s.name}</span>
                </div>
                <div className="space-y-2 text-[0.78rem]" style={{ color: THEME.sub }}>
                  <p><strong style={{ color: THEME.text }}>Quoi :</strong> {s.what}</p>
                  <p><strong style={{ color: THEME.text }}>Comment :</strong> {s.how}</p>
                </div>
                <div
                  className="mt-3 px-2.5 py-1 rounded-lg text-[0.72rem] font-medium inline-block"
                  style={{ background: `${s.color}10`, color: s.color, border: `1px solid ${s.color}20` }}
                >
                  ✓ {s.verdict}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── BONNES PRATIQUES ── */}
        <div className="mb-8">
          <h3 className="text-center text-[0.72rem] font-bold tracking-[0.18em] uppercase mb-4" style={{ color: THEME.sub }}>
            Bonnes pratiques (OWASP Top 10 : 2025)
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {PRACTICES.map((p, i) => (
              <div
                key={p.title}
                className="rounded-xl border px-3.5 py-3 transition-all hover:bg-white/[0.02]"
                style={{
                  background: THEME.card,
                  borderColor: "rgba(255,255,255,0.06)",
                  animation: `fadeSlideUp 0.4s ease-out ${i * 0.07}s both`,
                }}
              >
                <span className="text-lg block mb-1">{p.icon}</span>
                <span className="text-[0.8rem] font-bold block" style={{ color: THEME.text }}>{p.title}</span>
                <span className="text-[0.72rem] block mt-0.5 leading-snug" style={{ color: THEME.sub }}>{p.desc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── COMPARATIF ── */}
        <div className="mb-8">
          <h3 className="text-center text-[0.72rem] font-bold tracking-[0.18em] uppercase mb-4" style={{ color: THEME.sub }}>
            Comparatif des solutions
          </h3>
          <div className="rounded-xl border overflow-hidden" style={{ background: THEME.card, borderColor: THEME.border }}>
            <div className="overflow-x-auto">
              <table className="w-full text-[0.8rem]">
                <thead>
                  <tr style={{ borderBottom: `1px solid ${THEME.border}` }}>
                    <th className="px-4 py-2.5 text-left font-bold" style={{ color: THEME.brandFrom }}>Solution</th>
                    <th className="px-4 py-2.5 text-left font-bold" style={{ color: THEME.brandFrom }}>Avantages</th>
                    <th className="px-4 py-2.5 text-left font-bold" style={{ color: THEME.brandFrom }}>Limites</th>
                    <th className="px-4 py-2.5 text-left font-bold" style={{ color: THEME.brandFrom }}>Cas d&apos;usage</th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARE.map((c, i) => (
                    <tr
                      key={c.name}
                      style={{
                        borderBottom: i < COMPARE.length - 1 ? `1px solid rgba(255,255,255,0.04)` : "none",
                        background: c.score === 5 ? "rgba(34,211,238,0.04)" : "transparent",
                      }}
                    >
                      <td className="px-4 py-2.5 font-semibold" style={{ color: THEME.text }}>
                        {c.name}
                        {c.score === 5 && (
                          <span className="ml-1.5 text-[0.6rem] px-1.5 py-0.5 rounded-full" style={{ background: "rgba(34,211,238,0.15)", color: THEME.brandFrom }}>
                            Mon choix
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-2.5" style={{ color: "#6ee7b7" }}>{c.pros}</td>
                      <td className="px-4 py-2.5" style={{ color: "#fda4af" }}>{c.cons}</td>
                      <td className="px-4 py-2.5" style={{ color: THEME.sub }}>{c.best}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* ── MA DÉMARCHE ── */}
        <div className="mb-8">
          <h3 className="text-center text-[0.72rem] font-bold tracking-[0.18em] uppercase mb-4" style={{ color: THEME.sub }}>
            Ma démarche de veille
          </h3>
          <VeilleTimeline />
        </div>

        {/* ── CODE EXEMPLES ── */}
        <div className="mb-8">
          <button
            onClick={() => setShowCode(!showCode)}
            className="w-full flex items-center justify-between px-5 py-3.5 rounded-xl border transition-all hover:bg-white/[0.02]"
            style={{
              background: THEME.card,
              borderColor: showCode ? "rgba(34,211,238,0.3)" : "rgba(255,255,255,0.06)",
            }}
          >
            <div className="flex items-center gap-2.5">
              <span className="text-lg">💻</span>
              <span className="text-[0.88rem] font-bold" style={{ color: THEME.text }}>Exemples d&apos;implémentation</span>
              <span className="text-[0.68rem] px-2 py-0.5 rounded-full" style={{ background: "rgba(255,255,255,0.05)", color: THEME.sub }}>
                Laravel + React
              </span>
            </div>
            <span
              className="text-sm transition-transform duration-300"
              style={{ color: THEME.brandFrom, transform: showCode ? "rotate(180deg)" : "rotate(0)" }}
            >
              ▼
            </span>
          </button>

          <div
            className="overflow-hidden transition-all duration-500"
            style={{ maxHeight: showCode ? "2000px" : "0", opacity: showCode ? 1 : 0 }}
          >
            <div className="mt-3 rounded-xl border overflow-hidden" style={{ background: THEME.card, borderColor: THEME.border }}>
              {/* Tabs */}
              <div className="flex gap-1 px-4 py-2.5 border-b border-white/8">
                {tabs.map((t) => (
                  <button
                    key={t.key}
                    onClick={() => setCodeTab(t.key)}
                    className="px-3 py-1 text-[0.75rem] font-medium rounded-lg border transition-all"
                    style={{
                      background: codeTab === t.key ? "rgba(255,255,255,0.08)" : "transparent",
                      borderColor: codeTab === t.key ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.06)",
                      color: codeTab === t.key ? THEME.text : THEME.sub,
                    }}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
              <pre
                className="p-4 overflow-x-auto text-[0.72rem] leading-relaxed"
                style={{ color: THEME.sub, maxHeight: "24rem" }}
              >
                {codeTab === "backend" ? BACKEND_CODE : FRONTEND_CODE}
              </pre>
            </div>
          </div>
        </div>

        {/* ── CONCLUSION ── */}
        <div
          className="rounded-xl border px-5 py-4 text-center"
          style={{
            background: "linear-gradient(135deg, rgba(34,211,238,0.04), rgba(168,85,247,0.04))",
            borderColor: "rgba(34,211,238,0.15)",
          }}
        >
          <h3 className="text-[0.72rem] font-bold tracking-[0.18em] uppercase mb-3" style={{ color: THEME.sub }}>
            Choix final retenu
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-2 mb-3">
            {["ODBC", "LDAP Bind", "JWT Sanctum", "Laravel 12", "React"].map((t) => (
              <span
                key={t}
                className="px-2.5 py-1 text-[0.75rem] font-semibold rounded-lg"
                style={{ background: "rgba(34,211,238,0.1)", color: THEME.brandFrom, border: "1px solid rgba(34,211,238,0.2)" }}
              >
                {t}
              </span>
            ))}
          </div>
          <p className="text-[0.82rem] leading-relaxed max-w-xl mx-auto" style={{ color: THEME.sub }}>
            Interroger AD via ODBC, authentifier via LDAP Bind sans stocker de mots de passe,
            et sécuriser l&apos;API avec des tokens JWT Sanctum — en conformité avec OWASP Top 10:2025.
          </p>
        </div>

        {/* ── SOURCES ── */}
        <div className="mt-5 text-center space-y-1">
          <p className="text-[0.72rem]" style={{ color: THEME.sub }}>
            Veille maintenue mensuellement — mise à jour : <strong>mars 2026</strong>
          </p>
          <p className="text-[0.65rem]" style={{ color: THEME.sub, opacity: 0.7 }}>
            Sources : OWASP Top 10:2025 · NIST SP 800-63B · Laravel Security · HackerNews · BleepingComputer
          </p>
        </div>

        <ScrollDownHint targetId="ecole" />
      </div>
    </section>
  );
}

// src/pages/sections/VeilleSection.jsx
import React, { useEffect, useState, useCallback, useMemo, useRef } from "react";
import useReveal from "../../hooks/useReveal";
import { ScrollDownHint } from "../../components/ScrollHint";

/* ============================
   Golden Ratio + Thème
   ============================ */
const PHI = 1.618;
const INV = 1 / PHI;

const THEME = {
  bg: "#0b1020",
  card: "rgba(11,16,32,0.62)",
  border: "rgba(255,215,0,0.12)",
  text: "#E6ECF8",
  sub: "#C5D3E8",
  brandFrom: "#22d3ee",
  brandTo: "#a855f7",
  line:
    "linear-gradient(90deg, rgba(56,189,248,.0) 0%, rgba(56,189,248,.45) 24%, rgba(212,175,55,.85) 50%, rgba(147,51,234,.55) 76%, rgba(56,189,248,.0) 100%)",
};

/* ============================
   Sites de référence (essentiel)
   ============================ */
const TOP_SITES = [
  { name: "Ars Technica", url: "https://arstechnica.com", tag: "deep-tech", desc: "Analyses longues, hardware, politique tech." },
  { name: "The Verge", url: "https://www.theverge.com", tag: "general", desc: "News produits, reviews, culture numérique." },
  { name: "TechCrunch", url: "https://techcrunch.com", tag: "startups", desc: "Actu startups, levées de fonds, interviews." },
  { name: "MIT Tech Review", url: "https://www.technologyreview.com", tag: "research", desc: "IA, biotech, énergie, listes « 10 breakthrough »." },
  { name: "BleepingComputer", url: "https://www.bleepingcomputer.com", tag: "security", desc: "Brèches, rançongiciels, vulnérabilités." },
  { name: "Krebs on Security", url: "https://krebsonsecurity.com", tag: "security", desc: "Enquêtes approfondies, leaks, dark web." },
  { name: "Cloudflare Blog", url: "https://blog.cloudflare.com", tag: "cloud", desc: "Workers, DNS, DDoS, WAF, edge computing." },
  { name: "OpenAI Blog", url: "https://openai.com/blog", tag: "AI", desc: "GPT, DALL·E, API, papers de recherche." },
  { name: "Anthropic News", url: "https://www.anthropic.com/news", tag: "AI", desc: "Claude, Constitutional AI, alignment." },
  { name: "Hugging Face Blog", url: "https://huggingface.co/blog", tag: "AI", desc: "Modèles, datasets, papers, courses." },
  { name: "React Blog", url: "https://react.dev/blog", tag: "frontend", desc: "Server Components, hooks, Compiler." },
  { name: "Node.js Blog", url: "https://nodejs.org/en/blog", tag: "backend", desc: "Release LTS, security, performance." },
  { name: "Numerama", url: "https://www.numerama.com", tag: "FR", desc: "Pop-culture tech, politique numérique." },
  { name: "Le Monde Informatique", url: "https://www.lemondeinformatique.fr", tag: "FR", desc: "Dossiers, cloud souverain, marché IT." },
];

/* ============================
   Outils IA dev (essentiel)
   ============================ */
const AI_TOOLS = [
  { name: "GitHub Copilot", price: "Payant", url: "https://github.com/features/copilot", cat: "codegen", desc: "Autocomplétion GPT-4, 30+ langages, VS Code / JetBrains." },
  { name: "Cursor IDE", price: "Freemium", url: "https://cursor.sh/", cat: "codegen", desc: "Fork VS Code + Ctrl-K, agent auto-debug, GPT-4 & Claude." },
  { name: "Codeium", price: "Gratuit", url: "https://codeium.com/", cat: "codegen", desc: "Inférence < 100 ms, 70 B params, VS Code / JetBrains / Jupyter." },
  { name: "Supermaven", price: "Freemium", url: "https://supermaven.com/", cat: "codegen", desc: "256 k ctx, 70 ms latency, spécialiste gros fichiers." },
  { name: "Continue.dev", price: "Gratuit", url: "https://continue.dev/", cat: "codegen", desc: "Copilote 100 % OSS, connecte Ollama, OpenAI, Anthropic." },
  { name: "v0 by Vercel", price: "Freemium", url: "https://v0.dev/", cat: "agent", desc: "Génération UI React + Tailwind par prompts itératifs." },
  { name: "bolt.new", price: "Gratuit", url: "https://bolt.new/", cat: "agent", desc: "Boot full-stack (Node, Vite, DB) dans le navigateur." },
  { name: "Claude Code", price: "Payant", url: "https://claude.ai/code", cat: "agent", desc: "Agent CLI Anthropic, édite fichiers, git-aware, multi-modèle." },
  { name: "Devin", price: "Payant", url: "https://www.cognition.ai/", cat: "agent", desc: "Ingé IA autonome : planifie, code, debug, déploie." },
  { name: "CodiumAI", price: "Freemium", url: "https://www.codium.ai/", cat: "test", desc: "Génère tests unitaires, edge-cases, analyse couverture." },
  { name: "CodeRabbit", price: "Freemium", url: "https://coderabbit.ai/", cat: "test", desc: "Reviews automatiques de PR, détection bugs & sécu." },
  { name: "Ollama", price: "Gratuit", url: "https://ollama.ai/", cat: "infra", desc: "LLM locaux en 1 commande (Llama, Mistral, Gemma)." },
  { name: "LangChain", price: "Gratuit", url: "https://langchain.com/", cat: "infra", desc: "Framework standard pour chaîner LLM, tools, memory." },
  { name: "OpenRouter", price: "Freemium", url: "https://openrouter.ai/", cat: "infra", desc: "Passerelle multi-LLM : GPT-4, Claude, Llama, Gemini." },
];

const AI_CATEGORIES = [
  { key: "codegen", label: "Code Gen", icon: "⚡" },
  { key: "agent", label: "Agents", icon: "🤖" },
  { key: "test", label: "Tests & Review", icon: "🧪" },
  { key: "infra", label: "Infra & LLM", icon: "🔧" },
];

const PRICE_COLORS = {
  Gratuit: { bg: "rgba(16,185,129,0.12)", color: "#6ee7b7", border: "rgba(16,185,129,0.25)" },
  Freemium: { bg: "rgba(245,158,11,0.12)", color: "#fcd34d", border: "rgba(245,158,11,0.25)" },
  Payant: { bg: "rgba(244,63,94,0.12)", color: "#fda4af", border: "rgba(244,63,94,0.25)" },
};

const TAG_COLORS = {
  "deep-tech": "#60a5fa", general: "#a78bfa", startups: "#34d399", research: "#f472b6",
  security: "#f87171", cloud: "#38bdf8", AI: "#c084fc", frontend: "#22d3ee",
  backend: "#4ade80", FR: "#fbbf24",
};

/* ============================
   Fetch helpers (cached + timeout)
   ============================ */
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes
const fetchCache = new Map();

async function jfetch(url, timeoutMs = 8000) {
  const cached = fetchCache.get(url);
  if (cached && Date.now() - cached.t < CACHE_TTL) return cached.d;

  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    const res = await fetch(url, { signal: ctrl.signal });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    fetchCache.set(url, { d: data, t: Date.now() });
    return data;
  } finally {
    clearTimeout(timer);
  }
}

async function fetchHNTop(limit = 20) {
  const ids = await jfetch("https://hacker-news.firebaseio.com/v0/topstories.json");
  return Promise.all(
    ids.slice(0, limit).map((id) => jfetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`))
  ).then((items) => items.filter(Boolean));
}

async function fetchGitHubTrending(limit = 20) {
  const d = new Date();
  d.setDate(d.getDate() - 7);
  const since = d.toISOString().slice(0, 10);

  const cacheKey = `gh-trending-${since}`;
  const cached = fetchCache.get(cacheKey);
  if (cached && Date.now() - cached.t < CACHE_TTL) return cached.d;

  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 8000);
  try {
    const res = await fetch(
      `https://api.github.com/search/repositories?q=created:>${since}&sort=stars&order=desc&per_page=${Math.min(limit, 30)}`,
      { headers: { Accept: "application/vnd.github+json" }, signal: ctrl.signal }
    );
    if (res.status === 403) throw new Error("Rate limit GitHub (60 req/h).");
    if (!res.ok) throw new Error(`GitHub HTTP ${res.status}`);
    const data = await res.json();
    const items = data.items || [];
    fetchCache.set(cacheKey, { d: items, t: Date.now() });
    return items;
  } finally {
    clearTimeout(timer);
  }
}

/* ============================
   UI Primitives
   ============================ */
function ErrorBanner({ msg, onRetry }) {
  return (
    <div
      className="flex items-start gap-2.5 p-3 mb-3 rounded-lg border"
      style={{ background: "rgba(239,68,68,0.08)", borderColor: "rgba(239,68,68,0.25)" }}
    >
      <span className="text-red-400 text-sm flex-shrink-0 mt-0.5">!</span>
      <div className="flex-1 min-w-0">
        <p className="text-[0.78rem] text-red-300">{msg}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="mt-1 text-[0.68rem] font-medium text-red-200 hover:text-white underline transition-colors"
          >
            Réessayer
          </button>
        )}
      </div>
    </div>
  );
}

const Panel = React.memo(function Panel({ title, badge, onRefresh, loading, children }) {
  return (
    <div
      className="relative flex flex-col rounded-2xl border overflow-hidden backdrop-blur-xl"
      style={{
        borderColor: THEME.border,
        background: THEME.card,
        boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
      }}
    >
      {/* Halo */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `conic-gradient(from 0deg, ${THEME.brandFrom}, ${THEME.brandTo}, ${THEME.brandFrom})`,
          opacity: 0.04,
          animation: "spin-slow 18s linear infinite",
        }}
      />

      {/* Header */}
      <div className="relative flex items-center justify-between px-4 py-3 border-b border-white/8">
        <div className="flex items-center gap-2.5">
          <h3
            className="text-[0.95rem] font-extrabold tracking-tight"
            style={{
              fontFamily: "OrbitronLocal, Orbitron, system-ui, sans-serif",
              color: THEME.text,
            }}
          >
            {title}
          </h3>
          {badge && (
            <span
              className="px-2 py-0.5 text-[0.65rem] font-bold tracking-wider uppercase rounded-full"
              style={{
                background: "rgba(34,211,238,0.1)",
                color: THEME.brandFrom,
                border: "1px solid rgba(34,211,238,0.2)",
              }}
            >
              {badge}
            </span>
          )}
        </div>
        {onRefresh && (
          <button
            onClick={onRefresh}
            disabled={loading}
            className="px-2.5 py-1 text-[0.72rem] font-medium border rounded-lg border-white/10 hover:bg-white/5 transition-all"
            style={{ color: THEME.sub }}
          >
            {loading ? "..." : "↻"}
          </button>
        )}
      </div>

      {/* Body */}
      <div className="relative flex-1 overflow-y-auto p-4" style={{ maxHeight: "26rem" }}>
        {children}
      </div>

      {/* Bottom line */}
      <div className="h-[2px] w-full flex-shrink-0" style={{ background: THEME.line }} />
    </div>
  );
});

/* ============================
   Widgets
   ============================ */
function HNWidget() {
  const [items, setItems] = useState([]);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(true);
  const mounted = useRef(true);

  const load = useCallback(() => {
    setLoading(true);
    setErr("");
    fetchHNTop(25)
      .then((d) => { if (mounted.current) setItems(d); })
      .catch((e) => { if (mounted.current) setErr(e.message); })
      .finally(() => { if (mounted.current) setLoading(false); });
  }, []);

  useEffect(() => { mounted.current = true; load(); return () => { mounted.current = false; }; }, [load]);

  return (
    <Panel title="Hacker News" badge="live" onRefresh={load} loading={loading}>
      {err && <ErrorBanner msg={err} onRetry={load} />}
      {loading ? (
        <div className="space-y-2">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-9 rounded-lg bg-white/5 animate-pulse" />
          ))}
        </div>
      ) : (
        <ul className="space-y-1.5">
          {items.map((it, i) => (
            <li key={it.id}>
              <a
                href={it.url || `https://news.ycombinator.com/item?id=${it.id}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-start gap-2.5 px-3 py-2 rounded-lg border border-transparent hover:border-white/8 hover:bg-white/[0.03] transition-all group"
              >
                <span
                  className="flex-shrink-0 w-6 text-right text-[0.7rem] font-bold mt-0.5"
                  style={{ color: THEME.brandFrom, opacity: 0.5 }}
                >
                  {i + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <p
                    className="text-[0.82rem] font-medium leading-snug line-clamp-2 group-hover:underline"
                    style={{ color: THEME.text }}
                  >
                    {it.title}
                  </p>
                  <div className="flex items-center gap-2.5 mt-1 text-[0.68rem]" style={{ color: THEME.sub }}>
                    <span>▲ {it.score}</span>
                    <span>{it.by}</span>
                    <span>{Math.max(1, Math.round((Date.now() / 1000 - it.time) / 3600))}h</span>
                  </div>
                </div>
              </a>
            </li>
          ))}
        </ul>
      )}
    </Panel>
  );
}

function GitHubWidget() {
  const [repos, setRepos] = useState([]);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(true);
  const mounted = useRef(true);

  const load = useCallback(() => {
    setLoading(true);
    setErr("");
    fetchGitHubTrending(25)
      .then((d) => { if (mounted.current) setRepos(d); })
      .catch((e) => { if (mounted.current) setErr(e.message); })
      .finally(() => { if (mounted.current) setLoading(false); });
  }, []);

  useEffect(() => { mounted.current = true; load(); return () => { mounted.current = false; }; }, [load]);

  return (
    <Panel title="Tendances GitHub" badge="7j" onRefresh={load} loading={loading}>
      {err && <ErrorBanner msg={err} onRetry={load} />}
      {loading ? (
        <div className="space-y-2">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-9 rounded-lg bg-white/5 animate-pulse" />
          ))}
        </div>
      ) : (
        <ul className="space-y-1.5">
          {repos.map((r) => (
            <li key={r.id}>
              <a
                href={r.html_url}
                target="_blank"
                rel="noreferrer"
                className="block px-3 py-2 rounded-lg border border-transparent hover:border-white/8 hover:bg-white/[0.03] transition-all group"
              >
                <div className="flex items-center gap-2">
                  <p
                    className="text-[0.82rem] font-semibold truncate group-hover:underline"
                    style={{ color: THEME.text }}
                  >
                    {r.full_name}
                  </p>
                  <span
                    className="flex-shrink-0 text-[0.7rem] font-bold"
                    style={{ color: "#fbbf24" }}
                  >
                    ⭐ {r.stargazers_count.toLocaleString()}
                  </span>
                </div>
                <p
                  className="mt-0.5 text-[0.72rem] line-clamp-1"
                  style={{ color: THEME.sub }}
                >
                  {r.description || "No description"}
                </p>
                {r.language && (
                  <span
                    className="inline-block mt-1 px-1.5 py-0.5 text-[0.62rem] rounded border border-white/8"
                    style={{ color: THEME.sub }}
                  >
                    {r.language}
                  </span>
                )}
              </a>
            </li>
          ))}
        </ul>
      )}
    </Panel>
  );
}

function AIToolsWidget() {
  const [activeCat, setActiveCat] = useState("all");

  const filtered = useMemo(
    () => activeCat === "all" ? AI_TOOLS : AI_TOOLS.filter((t) => t.cat === activeCat),
    [activeCat]
  );

  return (
    <Panel title="Outils IA dev">
      {/* Filtres catégorie */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        <button
          onClick={() => setActiveCat("all")}
          className="px-2.5 py-1 text-[0.72rem] font-medium rounded-lg border transition-all"
          style={{
            background: activeCat === "all" ? "rgba(255,255,255,0.08)" : "transparent",
            borderColor: activeCat === "all" ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.06)",
            color: activeCat === "all" ? THEME.text : THEME.sub,
          }}
        >
          Tous ({AI_TOOLS.length})
        </button>
        {AI_CATEGORIES.map((c) => {
          const count = AI_TOOLS.filter((t) => t.cat === c.key).length;
          const active = activeCat === c.key;
          return (
            <button
              key={c.key}
              onClick={() => setActiveCat(c.key)}
              className="px-2.5 py-1 text-[0.72rem] font-medium rounded-lg border transition-all"
              style={{
                background: active ? "rgba(255,255,255,0.08)" : "transparent",
                borderColor: active ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.06)",
                color: active ? THEME.text : THEME.sub,
              }}
            >
              {c.icon} {c.label} ({count})
            </button>
          );
        })}
      </div>

      {/* Liste */}
      <ul className="space-y-2">
        {filtered.map((t) => {
          const pc = PRICE_COLORS[t.price] || PRICE_COLORS.Freemium;
          return (
            <li key={t.name}>
              <a
                href={t.url}
                target="_blank"
                rel="noreferrer"
                className="block px-3.5 py-3 rounded-xl border border-white/6 hover:border-white/12 hover:bg-white/[0.03] transition-all group"
              >
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className="text-[0.88rem] font-semibold group-hover:underline"
                    style={{ color: THEME.text }}
                  >
                    {t.name}
                  </span>
                  <span
                    className="px-1.5 py-0.5 text-[0.62rem] font-bold rounded-md"
                    style={{ background: pc.bg, color: pc.color, border: `1px solid ${pc.border}` }}
                  >
                    {t.price}
                  </span>
                  <span className="ml-auto text-[0.68rem] opacity-0 group-hover:opacity-60 transition-opacity">↗</span>
                </div>
                <p className="text-[0.76rem] leading-relaxed" style={{ color: THEME.sub }}>
                  {t.desc}
                </p>
              </a>
            </li>
          );
        })}
      </ul>
    </Panel>
  );
}

function SitesWidget() {
  return (
    <Panel title="Sites de référence" badge={`${TOP_SITES.length}`}>
      <ul className="space-y-1.5">
        {TOP_SITES.map((s) => {
          const tagColor = TAG_COLORS[s.tag] || THEME.sub;
          return (
            <li key={s.url}>
              <a
                href={s.url}
                target="_blank"
                rel="noreferrer"
                className="flex items-start gap-3 px-3 py-2.5 rounded-lg border border-transparent hover:border-white/8 hover:bg-white/[0.03] transition-all group"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span
                      className="text-[0.84rem] font-semibold group-hover:underline"
                      style={{ color: THEME.text }}
                    >
                      {s.name}
                    </span>
                    <span
                      className="px-1.5 py-0.5 text-[0.6rem] font-medium rounded"
                      style={{
                        background: `${tagColor}15`,
                        color: tagColor,
                        border: `1px solid ${tagColor}30`,
                      }}
                    >
                      {s.tag}
                    </span>
                  </div>
                  <p className="mt-0.5 text-[0.74rem]" style={{ color: THEME.sub }}>
                    {s.desc}
                  </p>
                </div>
                <span
                  className="flex-shrink-0 mt-1 text-[0.68rem] opacity-0 group-hover:opacity-60 transition-opacity"
                  style={{ color: THEME.brandFrom }}
                >
                  ↗
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </Panel>
  );
}

/* ============================
   Section principale
   ============================ */
export default function VeilleSection() {
  const { ref, revealed } = useReveal();
  return (
    <section
      ref={ref}
      id="veille"
      className={`min-h-screen snap-start text-slate-100 section-reveal${revealed ? " revealed" : ""}`}
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
        @keyframes spin-slow { to { transform: rotate(360deg); } }
        #veille ::-webkit-scrollbar { width: 6px; }
        #veille ::-webkit-scrollbar-thumb { background: rgba(148,163,184,.25); border-radius: 999px; }
        #veille ::-webkit-scrollbar-track { background: transparent; }
      `}</style>

      <div className="w-full mx-auto" style={{ maxWidth: `${48 * PHI}rem` }}>
        {/* Header */}
        <header className="mb-6 text-center">
          <h2
            className="font-extrabold tracking-tight"
            style={{
              fontFamily: "OrbitronLocal, Orbitron, system-ui, sans-serif",
              fontSize: `clamp(1.5rem, ${1.4 * PHI}rem, 2.35rem)`,
              lineHeight: 1.0 + INV,
              color: THEME.text,
            }}
          >
            Veille technologique
          </h2>
          <p className="mt-1.5 text-[0.9rem]" style={{ color: THEME.sub }}>
            Dashboard live — dev, sécurité, IA
          </p>
          <div className="mx-auto mt-3 h-[2px] w-32" style={{ background: THEME.line }} />
        </header>

        {/* Grid 2x2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <HNWidget />
          <GitHubWidget />
          <AIToolsWidget />
          <SitesWidget />
        </div>

        <p className="mt-5 text-center text-[0.75rem]" style={{ color: THEME.sub }}>
          Données récupérées en temps réel via APIs publiques (HN Firebase, GitHub Search).
        </p>

        <ScrollDownHint targetId="veille-auth" />
      </div>
    </section>
  );
}

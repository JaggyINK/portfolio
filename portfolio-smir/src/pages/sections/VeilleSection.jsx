// src/pages/sections/VeilleSection.jsx
import React, { useEffect, useMemo, useState, useCallback } from "react";

/* ============================
   Golden Ratio + Thème
   ============================ */
const PHI = 1.618;
const INV = 1 / PHI;
const INV2 = INV * INV;

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

/* ============================
   Feature flags via Vite
   ============================ */
const CG_KEY = import.meta?.env?.VITE_COINGECKO_KEY || "";

/* ============================
   Sources & People
   ============================ */
const TOP_SITES = [
  /* ================  GENERAL / NEWS  ================ */
  { name: "Ars Technica", url: "https://arstechnica.com", tags: ["general", "deep-tech"], desc: "Analyses longues, hardware, politique tech, droit." },
  { name: "The Verge", url: "https://www.theverge.com", tags: ["general", "product", "culture"], desc: "News produits, reviews, culture numérique." },
  { name: "TechCrunch", url: "https://techcrunch.com", tags: ["general", "startups"], desc: "Actu startups, levées de fonds, interviews fondateurs." },
  { name: "Wired", url: "https://www.wired.com", tags: ["general", "sci-fi", "culture"], desc: "Tech + société + futur. Rédaction longue forme." },
  { name: "MIT Technology Review", url: "https://www.technologyreview.com", tags: ["general", "deep-tech"], desc: "MIT – IA, biotech, énergie, listes « 10 breakthrough »." },
  { name: "IEEE Spectrum", url: "https://spectrum.ieee.org", tags: ["general", "hardware", "robotics"], desc: "IEEE – robotique, semi-conducteurs, normes." },
  { name: "The Register", url: "https://www.theregister.com", tags: ["general", "datacenter", "UK"], desc: "Angleterre – humour acide, infra, breaches, cloud." },
  { name: "Hackaday", url: "https://hackaday.com", tags: ["hardware", "DIY", "maker"], desc: "Projets hardware open-source, tutos, concours." },

  /* ================  AI / ML  ================ */
  { name: "OpenAI Blog", url: "https://openai.com/blog", tags: ["AI", "research"], desc: "Communiqués officiels, papiers, GPT, DALL·E, API." },
  { name: "Google AI Blog", url: "https://ai.googleblog.com", tags: ["AI", "research"], desc: "Travaux Google Research – PaLM, Gemini, Imagen, TPUs." },
  { name: "Meta AI", url: "https://ai.meta.com/blog/", tags: ["AI", "research"], desc: "LLaMA, SAM, FAIR papers, diffusion models, PyTorch." },
  { name: "Anthropic News", url: "https://www.anthropic.com/news", tags: ["AI", "safety", "Claude"], desc: "Claude 3, Constitutional AI, alignment, papers." },
  { name: "Hugging Face Blog", url: "https://huggingface.co/blog", tags: ["AI", "OSS", "models"], desc: "Nouveaux modèles, datasets, papers, events, courses." },
  { name: "DeepMind Blog", url: "https://deepmind.google/discover/blog/", tags: ["AI", "research"], desc: "AlphaFold, Gemini, Gato, généralité, santé, jeux." },
  { name: "Apple Machine Learning", url: "https://machinelearning.apple.com", tags: ["AI", "on-device", "CoreML"], desc: "ML on-device, ANE, Core ML, papers, MLX framework." },

  /* ================  SECURITY  ================ */
  { name: "BleepingComputer", url: "https://www.bleepingcomputer.com", tags: ["security", "malware"], desc: "Brèches, rançongiciels, vuln, tutos removal." },
  { name: "The Record", url: "https://therecord.media", tags: ["security", "gov"], desc: "Cyber-guérilla, APT, lois, interviews CISO." },
  { name: "Krebs on Security", url: "https://krebsonsecurity.com", tags: ["security", "investigation"], desc: "Enquêtes approfondies, leaks, dark web, carte bancaire." },
  { name: "Dark Reading", url: "https://www.darkreading.com", tags: ["security", "enterprise"], desc: "Stratégies sécurité, Zero-Trust, budgets, salons." },

  /* ================  CLOUD / INFRA  ================ */
  { name: "AWS News", url: "https://aws.amazon.com/about-aws/whats-new/recent/", tags: ["cloud", "AWS"], desc: "Toutes les nouveautés services, releases, regions." },
  { name: "Google Cloud Blog", url: "https://cloud.google.com/blog", tags: ["cloud", "GCP"], desc: "BigQuery, Vertex, GKE, TPU, reductions prix." },
  { name: "Azure Updates", url: "https://azure.microsoft.com/updates/", tags: ["cloud", "Azure"], desc: "Release notes, roadmap, previews." },
  { name: "Cloudflare Blog", url: "https://blog.cloudflare.com", tags: ["cloud", "edge", "workers"], desc: "Workers, R2, DNS, DDoS, QUIC, privacy, WAF." },
  { name: "HashiCorp Blog", url: "https://www.hashicorp.com/blog", tags: ["cloud", "IaC", "Terraform"], desc: "Terraform, Vault, Consul, Nomad, boundary." },

  /* ================  DEV / LANG / FRAME  ================ */
  { name: "Android Developers", url: "https://developer.android.com", tags: ["dev", "mobile", "Kotlin"], desc: "Docs, samples, Android Studio, Jetpack Compose." },
  { name: "Apple Developer", url: "https://developer.apple.com", tags: ["dev", "mobile", "Swift"], desc: "WWDC videos, SwiftUI, ARKit, TestFlight." },
  { name: "Mozilla Hacks", url: "https://hacks.mozilla.org", tags: ["dev", "web", "Rust"], desc: "Firefox, WASM, Rust, MDN updates, privacy." },
  { name: "Node.js Blog", url: "https://nodejs.org/en/blog", tags: ["dev", "js", "backend"], desc: "Release LTS, security, performance, N-API." },
  { name: "React Blog", url: "https://react.dev/blog", tags: ["dev", "frontend", "React"], desc: "React Compiler, Server Components, hooks, conferences." },
  { name: "Rust Blog", url: "https://blog.rust-lang.org", tags: ["dev", "systems", "Rust"], desc: "Editions, RFC, crates, performance, memory safety." },

  /* ================  HARDWARE / SEMI  ================ */
  { name: "AnandTech", url: "https://www.anandtech.com", tags: ["hardware", "CPU", "GPU"], desc: "Benchmarks détaillés, architectures, reviews." },
  { name: "Tom's Hardware", url: "https://www.tomshardware.com", tags: ["hardware", " DIY"], desc: "Composants, overclock, guides montage, firmware." },
  { name: "SemiWiki", url: "https://www.semiwiki.com", tags: ["hardware", "semi", "foundry"], desc: "TSMC, Samsung, ASML, EDA, nodes, GAA." },

  /* ================  FRENCH  ================ */
  { name: "Numerama", url: "https://www.numerama.com", tags: ["FR", "general"], desc: "Pop-culture tech, politique numérique, vidéos." },
  { name: "L'Usine Digitale", url: "https://www.usine-digitale.fr", tags: ["FR", "industry", "cloud"], desc: "Transformation digitale, interviews CTO, salons." },
  { name: "ZDNet FR", url: "https://www.zdnet.fr", tags: ["FR", "enterprise"], desc: "SaaS, cybersécurité, budgets IT, comparatifs." },
  { name: "Le Monde Informatique", url: "https://www.lemondeinformatique.fr", tags: ["FR", "enterprise"], desc: "Dossiers, enquêtes, marché, cloud souverain." },
];

const PEOPLE = [
  { name: "Guillermo Rauch", handle: "@rauchg", role: "CEO", company: "Vercel", url: "https://x.com/rauchg", logo: "▲", color: "#000000" },
  { name: "Dan Abramov", handle: "@dan_abramov", role: "Core", company: "React", url: "https://x.com/dan_abramov", logo: "⚛️", color: "#61DAFB" },
  { name: "Mitchell Hashimoto", handle: "@mitchellh", role: "Co-founder", company: "HashiCorp", url: "https://x.com/mitchellh", logo: "🔷", color: "#7B42BC" },
  { name: "Bret Taylor", handle: "@btaylor", role: "Chairman", company: "OpenAI", url: "https://x.com/btaylor", logo: "🤖", color: "#10A37F" },
  { name: "Troy Hunt", handle: "@troyhunt", role: "Security Researcher", company: "Have I Been Pwned", url: "https://x.com/troyhunt", logo: "🔐", color: "#E74C3C" },
  { name: "Katie Moussouris", handle: "@k8em0", role: "CEO", company: "Luta Security", url: "https://x.com/k8em0", logo: "🛡️", color: "#3498DB" },
  { name: "Thomas Kurian", handle: "@thomaskurian", role: "CEO", company: "Google Cloud", url: "https://x.com/thomaskurian", logo: "☁️", color: "#4285F4" },
  { name: "Patrick Collison", handle: "@patrickc", role: "CEO", company: "Stripe", url: "https://x.com/patrickc", logo: "💳", color: "#635BFF" },
  { name: "Sundar Pichai", handle: "@sundarpichai", role: "CEO", company: "Google", url: "https://x.com/sundarpichai", logo: "🔍", color: "#EA4335" },
  { name: "Satya Nadella", handle: "@satyanadella", role: "CEO", company: "Microsoft", url: "https://x.com/satyanadella", logo: "🪟", color: "#00A4EF" },
  { name: "Jensen Huang", handle: "", role: "CEO", company: "NVIDIA", url: "https://www.nvidia.com", logo: "🎮", color: "#76B900" },
  { name: "Linus Torvalds", handle: "", role: "Creator", company: "Linux", url: "https://www.kernel.org", logo: "🐧", color: "#FCC624" },
  { name: "Nat Friedman", handle: "@natfriedman", role: "Ex-CEO", company: "GitHub", url: "https://x.com/natfriedman", logo: "🐙", color: "#181717" },
  { name: "Lea Verou", handle: "@LeaVerou", role: "W3C", company: "CSS/Standards", url: "https://x.com/LeaVerou", logo: "🎨", color: "#E34C26" },
  { name: "Corey Quinn", handle: "@QuinnyPig", role: "Analyst", company: "Duckbill Group", url: "https://x.com/QuinnyPig", logo: "🦆", color: "#FF9900" },
  { name: "Ian Coldwater", handle: "@IanColdwater", role: "Security", company: "Kubernetes", url: "https://x.com/IanColdwater", logo: "⎈", color: "#326CE5" },
  { name: "Tanel Poder", handle: "@tanelpoder", role: "Perf Eng", company: "Databases", url: "https://x.com/tanelpoder", logo: "💾", color: "#336791" },
  { name: "Andrej Karpathy", handle: "@karpathy", role: "AI Research", company: "Independent", url: "https://x.com/karpathy", logo: "🧠", color: "#8E44AD" },
  { name: "François Chollet", handle: "@fchollet", role: "AI Research", company: "Google", url: "https://x.com/fchollet", logo: "🤖", color: "#EA4335" },
  { name: "Lex Fridman", handle: "@lexfridman", role: "Researcher", company: "MIT", url: "https://x.com/lexfridman", logo: "🎙️", color: "#A31F34" },
];

/* ============================
   Fetch helpers
   ============================ */
async function jfetch(url, headers = {}) {
  const res = await fetch(url, { headers });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

/* --- Hacker News --- */
async function fetchHNTop(limit = 20) {
  const ids = await jfetch("https://hacker-news.firebaseio.com/v0/topstories.json");
  const top = ids.slice(0, limit);
  const items = await Promise.all(
    top.map((id) => jfetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`))
  );
  return items.filter(Boolean);
}

/* --- GitHub Trending-like --- */
function isoDaysAgo(n) {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d.toISOString().slice(0, 10);
}
async function fetchGitHubTrending(limit = 20) {
  const since = isoDaysAgo(7);
  const url =
    `https://api.github.com/search/repositories` +
    `?q=created:>${since}&sort=stars&order=desc&per_page=${Math.min(limit, 30)}`;
  const res = await fetch(url, { headers: { Accept: "application/vnd.github+json" } });
  if (res.status === 403) throw new Error("Rate limit GitHub. Réessaie plus tard.");
  if (!res.ok) throw new Error(`GitHub HTTP ${res.status}`);
  const data = await res.json();
  return data.items || [];
}

/* --- CoinGecko (spot) --- */
async function fetchCoinGeckoPrices(ids, vs = "usd") {
  const url =
    `https://api.coingecko.com/api/v3/simple/price?ids=${ids.join(",")}&vs_currencies=${vs}`;
  const headers = CG_KEY ? { "x-cg-demo-api-key": CG_KEY } : {};
  return jfetch(url, headers);
}

/* ============================
   Primitives UI
   ============================ */
function SectionHeader({ title, subtitle, tip }) {
  return (
    <div className="mb-[1.0rem] flex flex-col md:flex-row md:items-end md:justify-between gap-[0.618rem]">
      <div>
        <h2
          className="font-extrabold tracking-tight"
          style={{
            fontFamily: "OrbitronLocal, Orbitron, system-ui, sans-serif",
            fontSize: `clamp(1.8rem, ${1.618 * PHI}rem, 3rem)`,
            lineHeight: 1.0 + INV,
            color: THEME.text,
          }}
        >
          {title}
        </h2>
        {subtitle && <p className="text-[0.95rem]" style={{ color: THEME.sub }}>{subtitle}</p>}
      </div>
      {tip && <div className="text-xs" style={{ color: THEME.sub }}>{tip}</div>}
    </div>
  );
}

function Pill({ children }) {
  return (
    <span
      className="px-2 py-1 text-xs border rounded-full"
      style={{
        background: "rgba(255,255,255,0.05)",
        borderColor: "rgba(255,255,255,0.1)",
        color: THEME.text,
      }}
    >
      {children}
    </span>
  );
}

function Panel({ title, children, right, bodyClass = "" }) {
  return (
    <section
      className="relative rounded-[1.0rem] border backdrop-blur-xl shadow-xl overflow-hidden flex flex-col"
      style={{
        borderColor: THEME.border,
        background: THEME.card,
        boxShadow: "0 0.618rem 1.618rem rgba(0,0,0,.35)",
        height: "calc(24rem + 4rem + 3.5rem)", // body + padding + header + footer
      }}
    >
      {/* halo très discret animé */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          maskImage:
            "radial-gradient(140% 100% at 0% 0%, transparent 0%, black 50%, black 100%)",
          background:
            `conic-gradient(from 0deg, ${THEME.brandFrom}, ${THEME.brandTo}, ${THEME.brandFrom})`,
          opacity: 0.06,
          animation: "spin-slow 18s linear infinite",
        }}
      />
      <header
        className="relative flex items-center justify-between flex-shrink-0 px-4 py-3 border-b border-white/10"
        style={{ gap: `${0.382 * PHI}rem` }}
      >
        <h3
          className="font-extrabold tracking-tight"
          style={{
            fontFamily: "OrbitronLocal, Orbitron, system-ui, sans-serif",
            fontSize: `${1.0 * PHI}rem`,
            color: THEME.text,
          }}
        >
          {title}
        </h3>
        {right}
      </header>
      <div className={`relative p-4 flex-1 ${bodyClass}`}>{children}</div>
      <div className="h-[0.236rem] w-full flex-shrink-0" style={{ background: THEME.line }} />
    </section>
  );
}

/* ============================
   Widgets
   ============================ */

/* --- HN (liste scrollable) --- */
function HNWidget() {
  const [items, setItems] = useState([]);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(true);

  const load = useCallback(() => {
    setLoading(true);
    fetchHNTop(30)
      .then((data) => setItems(data))
      .catch((e) => setErr(e.message || "Erreur HN"))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => { load(); }, [load]);

  return (
    <Panel
      title="Actus dev — Hacker News"
      right={
        <div className="flex items-center gap-2">
          <Pill>live</Pill>
          <button
            className="px-2 py-1 text-xs border rounded-md border-white/10 hover:bg-white/10"
            onClick={load}
            title="Rafraîchir"
          >
            ↻ Refresh
          </button>
        </div>
      }
      bodyClass="overflow-y-auto pr-1"
    >
      {err && <div className="mb-2 text-sm text-rose-300">⚠ {err}</div>}
      {loading ? (
        <div className="space-y-2">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="h-10 rounded-md bg-white/5 animate-pulse" />
          ))}
        </div>
      ) : (
        <ul className="space-y-2">
          {items.map((it) => (
            <li key={it.id} className="transition border rounded-md group border-white/10 hover:bg-white/5" style={{ background: THEME.card }}>
              <a
                href={it.url || `https://news.ycombinator.com/item?id=${it.id}`}
                target="_blank"
                rel="noreferrer"
                className="block px-3 pt-2 font-semibold group-hover:underline line-clamp-2"
                style={{ color: THEME.text }}
                title={it.title}
              >
                {it.title}
              </a>
              <div className="flex items-center gap-3 px-3 pb-2 text-xs" style={{ color: THEME.sub }}>
                <span>▲ {it.score}</span>
                <span>by {it.by}</span>
                <span>{Math.max(1, Math.round((Date.now()/1000 - it.time) / 3600))}h</span>
                <a
                  className="ml-auto underline hover:no-underline"
                  href={`https://news.ycombinator.com/item?id=${it.id}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  💬 Fil HN
                </a>
              </div>
            </li>
          ))}
        </ul>
      )}
    </Panel>
  );
}

/* --- GitHub (liste scrollable) --- */
function GitHubWidget() {
  const [repos, setRepos] = useState([]);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(true);

  const load = useCallback(() => {
    setLoading(true);
    fetchGitHubTrending(30)
      .then((data) => setRepos(data))
      .catch((e) => setErr(e.message || "Erreur GitHub"))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => { load(); }, [load]);

  return (
    <Panel
      title="Tendances GitHub (7 jours)"
      right={
        <div className="flex items-center gap-2">
          <Pill>live</Pill>
          <button
            className="px-2 py-1 text-xs border rounded-md border-white/10 hover:bg-white/10"
            onClick={load}
            title="Rafraîchir"
          >
            ↻ Refresh
          </button>
        </div>
      }
      bodyClass="overflow-y-auto pr-1"
    >
      {err && <div className="mb-2 text-sm text-rose-300">⚠ {err}</div>}
      {loading ? (
        <div className="space-y-2">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="h-10 rounded-md bg-white/5 animate-pulse" />
          ))}
        </div>
      ) : (
        <ul className="space-y-2">
          {repos.map((r) => (
            <li key={r.id} className="transition border rounded-md group border-white/10 hover:bg-white/5" style={{ background: THEME.card }}>
              <a
                href={r.html_url}
                target="_blank"
                rel="noreferrer"
                className="block px-3 pt-2 font-semibold group-hover:underline line-clamp-1"
                style={{ color: THEME.text }}
                title={r.full_name}
              >
                {r.full_name}
              </a>
              <div className="flex items-center gap-3 px-3 pb-2 text-xs" style={{ color: THEME.sub }}>
                <span>⭐ {r.stargazers_count}</span>
                {r.language && <span>{r.language}</span>}
                <span>upd: {new Date(r.updated_at).toLocaleDateString()}</span>
                <span className="truncate">{r.description}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </Panel>
  );
}

/* --- People (liste scrollable enrichie) --- */
function PeopleWidget() {
  return (
    <Panel title="People à suivre" 
    right={
        <div className="flex items-center gap-2">
          <Pill>{PEOPLE.length} experts</Pill>
        </div>
      }
      bodyClass="overflow-y-auto pr-1">
      <ul className="space-y-2.5">
        {PEOPLE.map((p) => {
          return (
            <li key={p.name} className="flex items-center gap-3 p-2.5 border rounded-md border-white/10 transition-all hover:bg-white/5" style={{ background: THEME.card }}>
              <div
                className="flex items-center justify-center flex-shrink-0 text-xl font-bold rounded-full w-11 h-11"
                style={{
                  background: `${p.color}15`,
                  border: `2px solid ${p.color}40`,
                }}
                aria-hidden
              >
                {p.logo}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold leading-tight" style={{ color: THEME.text }}>
                  {p.name}
                </div>
                <div className="text-[11px] mt-0.5" style={{ color: THEME.sub }}>
                  {p.handle && <span className="font-mono">{p.handle}</span>}
                  {p.handle && " • "}
                  {p.role} @ {p.company}
                </div>
              </div>
              <a
                href={p.url}
                target="_blank"
                rel="noreferrer"
                className="px-2.5 py-1.5 text-xs font-semibold border rounded-md border-white/10 hover:bg-white/10 transition-all flex-shrink-0"
                title="Ouvrir le profil"
                style={{ color: THEME.text }}
              >
                ↗
              </a>
            </li>
          );
        })}
      </ul>
    </Panel>
  );
}

/* --- Sites (liste scrollable) --- */
function SitesWidget() {
  const [filter, setFilter] = useState("all");

  const filters = ["all", "general", "AI", "security", "cloud", "hardware", "dev", "FR"];

  const filtered = filter === "all" ? TOP_SITES : TOP_SITES.filter((s) => s.tags.includes(filter));

  return (
    <Panel
      title="Sites de référence"
      right={
        <div className="flex items-center gap-2">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-2 py-1 text-xs border rounded-md transition ${
                filter === f ? "bg-white/10 border-white/20" : "border-white/10 hover:bg-white/5"
              }`}
            >
              {f === "all" ? "Tous" : f}
            </button>
          ))}
        </div>
      }
      bodyClass="overflow-y-auto pr-1"
    >
      {filtered.length === 0 && (
        <div className="text-sm" style={{ color: THEME.sub }}>Aucun site pour ce filtre.</div>
      )}
      <ul className="space-y-2">
        {filtered.map((x) => (
          <li key={x.url} className="transition border rounded-md group border-white/10 hover:bg-white/5" style={{ background: THEME.card }}>
            <a href={x.url} target="_blank" rel="noreferrer" className="block px-3 py-2 text-sm group-hover:underline" style={{ color: THEME.text }}>
              <div className="font-semibold">{x.name}</div>
              <div className="mt-1 text-xs" style={{ color: THEME.sub }}>{x.desc}</div>
              <div className="flex items-center gap-2 mt-1">
                {x.tags.map((t) => (
                  <span key={t} className="text-[0.7rem] px-2 py-0.5 rounded-full border border-white/10" style={{ color: THEME.sub }}>
                    #{t}
                  </span>
                ))}
              </div>
            </a>
          </li>
        ))}
      </ul>
    </Panel>
  );
}

/* ----------  Outils IA ultra-complets + perf  ---------- */
const AI_TOOLS = [
  /* ================  CODE GEN / PAIR PROGRAMMING  ================ */
  { name: "GitHub Copilot", price: "Payant", url: "https://github.com/features/copilot", tags: ["codegen", "IDE", "GPT-4"], desc: "Autocomplétion contextuelle basée sur GPT-4. Supporte 30+ langages, intègre VS Code, JetBrains, Vim, Neovim. Cache local pour offline." },
  { name: "Amazon CodeWhisperer", price: "Freemium", url: "https://aws.amazon.com/codewhisperer/", tags: ["codegen", "AWS", "security-scan"], desc: "Suggestions temps-réel + scan de vulnérabilités (OWASP). Gratuit pour individuels, intégration Cloud9, IntelliJ, VS Code." },
  { name: "JetBrains AI Assistant", price: "Payant", url: "https://www.jetbrains.com/ai/", tags: ["IDE", "refactor", "chat"], desc: "Chat natif + refactorings intelligents (extraire classe, méthode, etc.) dans l'écosystème JetBrains. Modèle propriétaire + GPT-4." },
  { name: "Tabnine", price: "Freemium", url: "https://www.tabnine.com/", tags: ["codegen", "on-prem", "privacy"], desc: "Modèles propriétaires et open-source (DeepMind Codey). Possibilité d'héberger sur VPC ou on-prem. Supporte 80+ langages." },
  { name: "Codeium", price: "Gratuit", url: "https://codeium.com/", tags: ["codegen", "IDE", "ultra-fast"], desc: "Inférence < 100 ms, modèle fine-tuned 70 B. Chat + autocomplete. Extension VS Code, JetBrains, Eclipse, Jupyter." },
  { name: "Cody (Sourcegraph)", price: "Freemium", url: "https://sourcegraph.com/cody", tags: ["context", "embeddings", "monorepo"], desc: "Contexte repo entier via embeddings. Réponses précises sur codebase multi-dépôts. Supporte GPT-4 et Claude 3." },
  { name: "Supermaven", price: "Freemium", url: "https://supermaven.com/", tags: ["speed", "256k-ctx"], desc: "Modèle Baba-200, 256 k ctx, 70 ms latency. Autocomplétion agressive, spécialiste gros fichiers." },
  { name: "Cursor IDE", price: "Freemium", url: "https://cursor.sh/", tags: ["IDE", "Ctrl-K", "agent"], desc: "Fork VS Code avec Ctrl-K (édit structuré), agent auto-debug, chat multimodal. Utilise GPT-4 + Claude 3.5 Sonnet." },
  { name: "Phind", price: "Freemium", url: "https://www.phind.com/", tags: ["search", "web", "codegen"], desc: "Moteur de recherche dev + génération. Accès web temps-réel, citations sources. Modèle Phind-70B fine-tuned sur StackOverflow + docs." },
  { name: "Aider", price: "Gratuit", url: "https://aider.chat/", tags: ["CLI", "git-aware", "refactor"], desc: "Assistant CLI qui édite directement les fichiers, git-diff propre. Supporte GPT-4, Claude 3, Llama 3." },
  { name: "Continue.dev", price: "Gratuit", url: "https://continue.dev/", tags: ["IDE", "open-source", "BYO-model"], desc: "Copilote 100 % OSS. Connecte n'importe quel modèle local (Ollama) ou distant (OpenAI, Anthropic, Mistral)." },
  { name: "Replit Ghostwriter", price: "Payant", url: "https://replit.com/site/ghostwriter", tags: ["fullstack", "container", "pair"], desc: "Code, debug, explique, écrit des tests dans l'IDE Replit. Déploiement one-click." },

  /* ================  AGENTS / APP GENERATORS  ================ */
  { name: "v0 by Vercel", price: "Freemium", url: "https://v0.dev/", tags: ["UI", "React", "Tailwind"], desc: "Génération d'interfaces React + Tailwind à partir de prompts itératifs. Export clean, supporte shadcn/ui." },
  { name: "bolt.new", price: "Gratuit", url: "https://bolt.new/", tags: ["fullstack", "vite", "container"], desc: "Boot full-stack (Node, Vite, DB) dans le navigateur. Stackblitz WebContainers, zero config." },
  { name: "GPT Pilot", price: "Gratuit", url: "https://github.com/Pythagora-io/gpt-pilot", tags: ["agent", "scaffold", "open-source"], desc: "Agent qui crée l'arborescence complète, pose des questions, écrit les tests, rollback si erreur. Compatible VS Code extension." },
  { name: "Devin (Cognition)", price: "Payant", url: "https://www.cognition.ai/", tags: ["agent", "SWE-Bench", "end-to-end"], desc: "Premier ingé IA full-autonome sur SWE-Bench 13 % accuracy. Planifie, code, debug, déploie. Accès waitlist." },
  { name: "AutoGPT", price: "Gratuit", url: "https://github.com/Significant-Gravitas/AutoGPT", tags: ["agent", "autonomous", "plugin"], desc: "Agent boucle autonome : recherche web, écrit code, exécute, corrige. Plugins Docker, Git, Slack, etc." },
  { name: "MetaGPT", price: "Gratuit", url: "https://github.com/geekan/MetaGPT", tags: ["agent", "multi-role", "SDLC"], desc: "Simule une équipe complète : PM, architecte, ingé, QA. Sort Product-Req, flowcharts, code, tests." },

  /* ================  TESTS / REVIEW / QA  ================ */
  { name: "CodiumAI", price: "Freemium", url: "https://www.codium.ai/", tags: ["tests", "TDD", "review"], desc: "Génère tests unitaires, d'intégration, edge-cases. Analyse mutation, couverture. Plug VS Code / JetBrains." },
  { name: "Sourcery", price: "Freemium", url: "https://sourcery.ai/", tags: ["refactor", "python", "AST"], desc: "Refactorings AST-safe : extract method, inline var, replace conditional by polymorphism. Python & JS." },
  { name: "CodeRabbit", price: "Freemium", url: "https://coderabbit.ai/", tags: ["PR", "review", "GitHub"], desc: "Reviews automatiques de PR avec suggestions de code, détection de bugs, performance, sécurité. Intègre GH / GL." },
  { name: "Diffblue Cover", price: "Payant", url: "https://www.diffblue.com/", tags: ["java", "unit", "CI"], desc: "Écrit tests unitaires Java sans mocks 100 % automatiques via reinforcement learning. Plug Maven / Gradle." },

  /* ================  DOCS / RAG / KNOWLEDGE  ================ */
  { name: "Mintlify", price: "Freemium", url: "https://mintlify.com/", tags: ["docs", "RAG", "API"], desc: "Génération de docs élégantes à partir de commentaires. Search sémantique, analytics, changelog auto." },
  { name: "Danswer", price: "Gratuit", url: "https://github.com/danswer-ai/danswer", tags: ["RAG", "slack", "self-host"], desc: "Chat entreprise connecté à Slack, GDrive, Confluence, GitHub. Indexation embeddings, permissions respectées." },
  { name: "Readme.com AI", price: "Payant", url: "https://readme.com", tags: ["API", "support", "QA"], desc: "Portail API avec chatbot répondant aux devs, génère snippets, détecte breaking-changes." },

  /* ================  LLM TOOLING / GATEWAYS  ================ */
  { name: "LangChain", price: "Gratuit", url: "https://langchain.com/", tags: ["framework", "chain", "agents"], desc: "Standard de-facto pour chaîner LLM, tools, memory. 500+ intégrations (PDF, SQL, APIs)." },
  { name: "LlamaIndex", price: "Freemium", url: "https://www.llamaindex.ai/", tags: ["RAG", "ingestion", "index"], desc: "Pipelines RAG avancés : tree, keyword, hybrid retrievers. Supporte multimodal, agents réactifs." },
  { name: "OpenRouter", price: "Freemium", url: "https://openrouter.ai/", tags: ["gateway", "multi-LLM", "fallback"], desc: "Passerelle unique : GPT-4, Claude 3, Llama 3, Gemini. Fallback auto, unified billing, per-token." },
  { name: "Hugging Face Inference Endpoints", price: "Payant", url: "https://huggingface.co/inference-endpoints", tags: ["hosting", "GPU", "auto-scale"], desc: "Déploie n'importe quel modèle HF en 1 clic. Autoscaling, sécurité VPC, A100 / H100 disponibles." },
  { name: "Ollama", price: "Gratuit", url: "https://ollama.ai/", tags: ["local", "docker", "Llama"], desc: "LLM locaux en 1 commande (Llama 3, Mistral, Gemma). API OpenAI-compatible, GPU / MPS / CPU." },
  { name: "vLLM", price: "Gratuit", url: "https://github.com/vllm-project/vllm", tags: ["serving", "paged-attn", "throughput"], desc: "Serveur haute perf (PagedAttention). 10x throughput vs HF transformers. OpenAI-compatible API." },

  /* ================  SECURITY / GOV / PROMPT-GUARD  ================ */
  { name: "Lakera Guard", price: "Freemium", url: "https://www.lakera.ai/guard", tags: ["prompt-inject", "PII", "filter"], desc: "Blocage injections, PII, biais en 20 ms. Plug-and-play via API. Dataset Gandalf 1 M+ prompts." },
  { name: "Protect AI", price: "Freemium", url: "https://protectai.com/", tags: ["MLSecOps", "SBOM", "scan"], desc: "Scan modèles et datasets : backdoors, data-poison, sécurité supply-chain. Intègre Jenkins, GitLab." },
  { name: "Prompt Armor", price: "Payant", url: "https://promptarmor.com/", tags: ["enterprise", "policy", "audit"], desc: "Gate LLM enterprise : quarantaine prompts, audit trails, RBAC, DLP." },

  /* ================  MODELS / OSS / SPECIALIZED  ================ */
  { name: "StarCoder2 (BigCode)", price: "Gratuit", url: "https://huggingface.co/bigcode", tags: ["code", "open-source", "3.3 T"], desc: "Entraîné sur 3.3 T tokens (600+ langages). Contexte 16 k, infilling FIM. Licence Open-Responsible." },
  { name: "Code Llama (Meta)", price: "Gratuit", url: "https://ai.meta.com/research/publications/code-llama/", tags: ["infilling", "python", "70 B"], desc: "Variantes 7-70 B, infilling, instruction, Python. Benchmark HumanEval 67 % (70 B)." },
  { name: "Codestral (Mistral)", price: "Freemium", url: "https://mistral.ai/news/codestral/", tags: ["fill-in-middle", "32 k", "Mamba"], desc: "Modèle 32 k ctx, architecture Mamba + Sliding Window. SOTA sur HumanEval FIM." },
  { name: "DeepSeek-Coder", price: "Gratuit", url: "https://github.com/deepseek-ai/DeepSeek-Coder", tags: ["16 B", "open-source", "MTLP"], desc: "16 B params, 2 T tokens, pré-entraînement multi-tâche. Surpasse CodeLlama 34 B." },
  { name: "Kimi / Moonshot AI", price: "Freemium", url: "https://kimi.moonshot.cn/", tags: ["200 k", "chinese", "chat"], desc: "Contexte 200 k tokens, SOTA long-text QA. Supporte anglais + chinois. API dispo." },

  /* ================  LOW-CODE / INTEGRATION  ================ */
  { name: "Dify", price: "Gratuit", url: "https://dify.ai/", tags: ["low-code", "RAG", "workflow"], desc: "Studio visuel : créer apps LLM, RAG, agents sans code. Export OpenAPI, intègre 50+ APIs." },
  { name: "FlowiseAI", price: "Gratuit", url: "https://flowiseai.com/", tags: ["drag-drop", "LangChain", "docker"], desc: "Interface no-code pour LangChain & LlamaIndex. Build agents, chatbots, flows API. 100 % OSS." },
  { name: "Stack-AI", price: "Freemium", url: "https://www.stack-ai.com/", tags: ["embed", "Notion", "zendesk"], desc: "Connecte Notion, Zendesk, Postgres en 1 clic. Templates support, déploiement cloud ou VPC." },

  /* ================  DEVOPS / MLOPS  ================ */
  { name: "BentoML", price: "Gratuit", url: "https://www.bentoml.com/", tags: ["serving", "GPU", "canary"], desc: "Packaging + serving modèles avec canary, A/B, autoscaling. Supporte Torch, TF, ONNX, JAX." },
  { name: "Cog", price: "Gratuit", url: "https://github.com/replicate/cog", tags: ["container", "replicate", "cog.yml"], desc: "Containerise modèles ML en 1 commande. Génère image Docker optimisée CUDA. Push vers Replicate." },
  { name: "KServe", price: "Gratuit", url: "https://kserve.github.io/website/", tags: ["kubernetes", "serverless", "scale-to-zero"], desc: "Serverless inference sur K8s (Knative). A/B, explainability, batch. Compatible TensorRT, Triton." },
];

/* ----------  Badge colors  ---------- */
const PRICE_BADGE = {
  Gratuit:  { cls: "bg-emerald-500/15 text-emerald-300 border-emerald-400/25" },
  Freemium: { cls: "bg-amber-500/15 text-amber-300 border-amber-400/25" },
  Payant:   { cls: "bg-rose-500/15 text-rose-300 border-rose-400/25" },
};

/* ----------  Widget  ---------- */
function AIToolsWidget() {
  const [filter, setFilter] = useState("all");
  const SECTIONS = [
    { title: "🧑‍💻 Code Gen / Pair Programming", tools: AI_TOOLS.filter((t) => t.tags.includes("codegen")) },
    { title: "🤖 Agents / App Generators", tools: AI_TOOLS.filter((t) => t.tags.includes("agent") || t.tags.includes("UI")) },
    { title: "🧪 Tests / Review / QA", tools: AI_TOOLS.filter((t) => t.tags.includes("tests") || t.tags.includes("review")) },
    { title: "📚 Docs / RAG / Knowledge", tools: AI_TOOLS.filter((t) => t.tags.includes("docs") || t.tags.includes("RAG")) },
    { title: "🔌 LLM Tooling / Gateways", tools: AI_TOOLS.filter((t) => t.tags.includes("framework") || t.tags.includes("gateway") || t.tags.includes("serving")) },
    { title: "🔐 Security / Gov / Prompt-Guard", tools: AI_TOOLS.filter((t) => t.tags.includes("security") || t.tags.includes("prompt-inject")) },
    { title: "🧠 Models / OSS / Specialized", tools: AI_TOOLS.filter((t) => t.tags.includes("model") || t.tags.includes("open-source")) },
    { title: "🧩 Low-Code / Integration", tools: AI_TOOLS.filter((t) => t.tags.includes("low-code") || t.tags.includes("drag-drop")) },
    { title: "⚙️ DevOps / MLOps", tools: AI_TOOLS.filter((t) => t.tags.includes("serving") || t.tags.includes("kubernetes") || t.tags.includes("container")) },
  ];

  return (
    <Panel
      title="Outils IA pour développeurs"
      right={
        <div className="flex items-center gap-2">
          {/* Filtres prix */}
          {["all", "Gratuit", "Freemium", "Payant"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-2 py-1 text-xs border rounded-md transition ${
                filter === f ? "bg-white/10 border-white/20" : "border-white/10 hover:bg-white/5"
              }`}
            >
              {f === "all" ? "Tous" : f}
            </button>
          ))}
        </div>
      }
      bodyClass="overflow-y-auto pr-1"
    >
      {SECTIONS.map(
        (sec) =>
          sec.tools.filter((t) => filter === "all" || t.price === filter).length > 0 && (
            <div key={sec.title} className="mb-6">
              {/* Séparation visuelle par usage */}
              <div className="flex items-center gap-3 mb-3">
                <div className="flex-1 h-px bg-white/10" />
                <h4 className="text-sm font-semibold" style={{ color: THEME.text }}>{sec.title}</h4>
                <div className="flex-1 h-px bg-white/10" />
              </div>

              <ul className="space-y-2">
                {sec.tools
                  .filter((t) => filter === "all" || t.price === filter)
                  .map((t) => {
                    const badge = PRICE_BADGE[t.price] || PRICE_BADGE.Freemium;
                    return (
                      <li
                        key={t.name}
                        className="p-3 transition border rounded-md border-white/10 hover:bg-white/5"
                        style={{ background: THEME.card }}
                      >
                        <div className="flex items-center gap-2">
                          <div className="font-semibold" style={{ color: THEME.text }}>{t.name}</div>
                          <span className={`text-[0.7rem] px-2 py-0.5 rounded-full border ${badge.cls}`}>{t.price}</span>
                          <div className="flex items-center gap-2 ml-auto">
                            {t.tags.slice(0, 3).map((tag) => (
                              <span key={tag} className="text-[0.7rem] px-2 py-0.5 rounded-full border border-white/10" style={{ color: THEME.sub }}>
                                #{tag}
                              </span>
                            ))}
                            <a
                              href={t.url}
                              target="_blank"
                              rel="noreferrer"
                              className="px-2 py-1 text-xs border rounded-md border-white/10 hover:bg-white/10"
                              title="Ouvrir"
                            >
                              ↗ Lien
                            </a>
                          </div>
                        </div>
                        <p className="mt-1 text-xs" style={{ color: THEME.sub }}>{t.desc}</p>
                      </li>
                    );
                  })}
              </ul>
            </div>
          )
      )}
    </Panel>
  );
}

/* --- Crypto (beaucoup de coins, scrollable) --- */
const COIN_LIST = [
  { id: "bitcoin", symbol: "BTC", logo: "₿", color: "#F7931A" },
  { id: "ethereum", symbol: "ETH", logo: "Ξ", color: "#627EEA" },
  { id: "solana", symbol: "SOL", logo: "◎", color: "#14F195" },
  { id: "binancecoin", symbol: "BNB", logo: "💛", color: "#F3BA2F" },
  { id: "ripple", symbol: "XRP", logo: "💧", color: "#23292F" },
  { id: "cardano", symbol: "ADA", logo: "🔷", color: "#0033AD" },
  { id: "avalanche-2", symbol: "AVAX", logo: "🔺", color: "#E84142" },
  { id: "dogecoin", symbol: "DOGE", logo: "🐕", color: "#C2A633" },
  { id: "polygon-pos", symbol: "MATIC", logo: "⬡", color: "#8247E5" },
  { id: "polkadot", symbol: "DOT", logo: "●", color: "#E6007A" },
  { id: "chainlink", symbol: "LINK", logo: "🔗", color: "#2A5ADA" },
  { id: "litecoin", symbol: "LTC", logo: "Ł", color: "#345D9D" },
  { id: "tron", symbol: "TRX", logo: "⚡", color: "#EC0623" },
  { id: "stellar", symbol: "XLM", logo: "✦", color: "#14B6E7" },
  { id: "cosmos", symbol: "ATOM", logo: "⚛", color: "#2E3148" },
  { id: "uniswap", symbol: "UNI", logo: "🦄", color: "#FF007A" },
  { id: "near", symbol: "NEAR", logo: "🌐", color: "#00C08B" },
  { id: "arbitrum", symbol: "ARB", logo: "🔵", color: "#28A0F0" },
  { id: "optimism", symbol: "OP", logo: "🔴", color: "#FF0420" },
  { id: "filecoin", symbol: "FIL", logo: "📁", color: "#0090FF" },
  { id: "algorand", symbol: "ALGO", logo: "△", color: "#000000" },
  { id: "vechain", symbol: "VET", logo: "✓", color: "#15BDFF" },
  { id: "aptos", symbol: "APT", logo: "🌊", color: "#00D4AA" },
  { id: "the-graph", symbol: "GRT", logo: "📊", color: "#6747ED" },
  { id: "render-token", symbol: "RNDR", logo: "🎬", color: "#000000" },
  { id: "internet-computer", symbol: "ICP", logo: "∞", color: "#29ABE2" },
  { id: "hedera-hashgraph", symbol: "HBAR", logo: "ℏ", color: "#222222" },
  { id: "fantom", symbol: "FTM", logo: "👻", color: "#1969FF" },
];

function coinExternalUrl(id) {
  return `https://www.coingecko.com/en/coins/${id}`;
}

function CryptoWidget() {
  const [prices, setPrices] = useState({});
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(true);

  const load = useCallback(() => {
    setLoading(true);
    setErr("");
    const ids = COIN_LIST.map((c) => c.id);
    fetchCoinGeckoPrices(ids, "usd")
      .then((d) => setPrices(d))
      .catch((e) => setErr(e.message || "Erreur crypto"))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => { load(); }, [load]);

  return (
    <Panel
      title="Crypto — Spot (tech majors)"
      right={
        <div className="flex items-center gap-2">
          <Pill>live</Pill>
          <button
            className="px-2 py-1 text-xs border rounded-md border-white/10 hover:bg-white/10"
            onClick={load}
            title="Rafraîchir"
            disabled={loading}
          >
            {loading ? "…" : "↻ Refresh"}
          </button>
        </div>
      }
      bodyClass="overflow-y-auto pr-1"
    >
      {err && <div className="mb-2 text-sm text-rose-300">⚠ {err}</div>}

      {loading ? (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="h-20 rounded-md border border-white/10 bg-white/[.06] animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {COIN_LIST.map((c) => {
            const val = prices?.[c.id]?.usd;
            return (
              <a
                key={c.id}
                href={coinExternalUrl(c.id)}
                target="_blank"
                rel="noreferrer"
                className="p-3 transition border rounded-md border-white/10 hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-cyan-400/40 group"
                style={{ background: THEME.card }}
                title={`Ouvrir ${c.symbol} sur CoinGecko`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div
                    className="flex items-center justify-center w-8 h-8 text-lg rounded-full"
                    style={{
                      background: `${c.color}15`,
                      border: `2px solid ${c.color}40`,
                      color: c.color,
                    }}
                  >
                    {c.logo}
                  </div>
                  <span className="text-xs transition-opacity opacity-50 group-hover:opacity-100">↗</span>
                </div>
                <div className="mb-1 text-xs font-semibold" style={{ color: THEME.sub }}>
                  {c.symbol}
                </div>
                <div className="text-base font-bold" style={{ color: THEME.text }}>
                  {val != null ? `$${Number(val).toLocaleString()}` : "—"}
                </div>
              </a>
            );
          })}
        </div>
      )}
    </Panel>
  );
}


/* ============================
   Section principale
   ============================ */
export default function VeilleSection() {
  return (
    <section
      id="veille"
      className="min-h-screen snap-center text-slate-100"
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
        /* scrollbars subtils */
        #veille ::-webkit-scrollbar { width: 8px; height: 8px; }
        #veille ::-webkit-scrollbar-thumb { background: rgba(148,163,184,.35); border-radius: 999px; }
        #veille ::-webkit-scrollbar-track { background: transparent; }
      `}</style>

      <div
        className="w-full mx-auto"
        style={{
          maxWidth: `${56 * PHI}rem`,
        }}
      >
        <SectionHeader
          title="Veille technologique"
          subtitle="Dashboard live : dev, sécurité, IA — disposition claire, sobre, et scroll interne."
        />

        {/* GRID : 3 colonnes desktop, 1 mobile */}
        <div className="grid grid-cols-1 gap-[1.0rem] lg:grid-cols-3">
          {/* Col 1 */}
          <div className="space-y-[1.0rem]">
            <HNWidget />
            <SitesWidget />
          </div>

          {/* Col 2 */}
          <div className="space-y-[1.0rem]">
            <GitHubWidget />
            <PeopleWidget />
          </div>

          {/* Col 3 */}
          <div className="space-y-[1.0rem]">
            <AIToolsWidget />
            <CryptoWidget />
          </div>
        </div>

        <div className="mt-[1.0rem] text-center text-[0.8rem]" style={{ color: THEME.sub }}>
          Ceci est une veille technologique personnelle, composé d'outils et de ressources pour développeurs. Les données sont récupérées en temps réel via des APIs publiques.
        </div>
      </div>
    </section>
  );
}
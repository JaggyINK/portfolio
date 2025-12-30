// src/pages/sections/AboutSection.jsx
import React from "react";
import { Link } from "react-router-dom";
import CodeFlipCard from "../../components/CodeFlipCard";
import { TECH_DATA } from "../../components/TechData";
import "./AboutSection.css";

const THEME = {
  text: "#E6ECF8",
  sub: "#9AA7BF",
  brandFrom: "#22d3ee",
  brandTo: "#a855f7",
};

function TechBadge({ name, color }) {
  const data = TECH_DATA[name];

  return (
    <div className="tech-badge-wrapper">
      <span
        className="tech-badge"
        style={{
          color: THEME.text,
          borderColor: `${color}40`,
          background: `${color}15`,
        }}
      >
        {name}
      </span>

      {data && (
        <div className="tech-tooltip" style={{ borderColor: `${color}60` }}>
          <h4 className="tech-tooltip-title" style={{ color }}>
            {name}
          </h4>
          <p className="tech-tooltip-description">{data.description}</p>
          {data.projects && data.projects.length > 0 && (
            <div className="tech-tooltip-projects">
              <p className="tech-tooltip-projects-title" style={{ color: THEME.brandTo }}>
                🚀 Projets :
              </p>
              <div className="tech-tooltip-projects-list">
                {data.projects.map((project, i) => (
                  <span
                    key={i}
                    className="tech-tooltip-project-tag"
                    style={{ background: `${color}20`, color: THEME.text }}
                  >
                    {project}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function AboutSection() {
  return (
    <section id="about" className="about-section">
      <div className="about-container">
        
        {/* CONTENU PRINCIPAL EN HAUT */}
        <div className="about-content">
          <h2 className="about-title">
            Développeur Fullstack
          </h2>

          <p className="about-subtitle" style={{ color: THEME.brandFrom }}>
            Python • JavaScript • React | Alternance CPMS
          </p>

          <div className="about-description">
            <p>
              Développeur fullstack en alternance chez CPMS, je conçois et maintiens 
              un <strong style={{color: THEME.brandFrom}}>intranet d&apos;entreprise utilisé quotidiennement par 180+ collaborateurs</strong>. 
              Expérience concrète en automatisation, intégrations d&apos;APIs tierces (Jira, SSO, géolocalisation), 
              chatbots intelligents et e-commerce sur mesure.
            </p>
          </div>

          {/* DOMAINES D'EXPERTISE */}
          <div className="about-expertise">
            <h3 className="about-expertise-title" style={{ color: THEME.brandTo }}>
              Domaines d&apos;expertise
            </h3>
            <ul className="about-expertise-list">
              <li>
                <strong style={{ color: THEME.brandFrom }}>• Développement fullstack d&apos;applications web</strong>
                <br />
                <span>
                  Conception d&apos;interfaces modernes (React, Vue.js), développement backend (Python, PHP), logique métier, APIs REST, authentification
                </span>
              </li>
              <li>
                <strong style={{ color: THEME.brandFrom }}>• Applications orientées usage réel</strong>
                <br />
                <span>
                  Intranet d&apos;entreprise (180+ users), plateformes fonctionnelles, e-commerce custom, outils internes documentés
                </span>
              </li>
              <li>
                <strong style={{ color: THEME.brandFrom }}>• Sécurité & bonnes pratiques</strong>
                <br />
                <span>
                  Mise en œuvre OWASP (authentification, contrôle d&apos;accès, prévention injection), audits, documentation
                </span>
              </li>
              <li>
                <strong style={{ color: THEME.brandFrom }}>• Automatisation & veille</strong>
                <br />
                <span>
                  Scripts Python, bots Discord, collecte automatisée (OWASP, CERT-FR, MSRC), diffusion d&apos;informations
                </span>
              </li>
            </ul>
          </div>

          <p className="about-school">
            BTS SIO SLAM • Digital School of Paris • Diplôme juin 2026
          </p>
        </div>

        {/* TECH BADGES */}
        <div className="about-tech-badges">
          <TechBadge name="Python" color="#3776AB" />
          <TechBadge name="React" color="#61DAFB" />
          <TechBadge name="Vue.js" color="#42B883" />
          <TechBadge name="PHP" color="#777BB4" />
          <TechBadge name="Laravel" color="#FF2D20" />
          <TechBadge name="Shopify" color="#95BF46" />
          <TechBadge name="APIs REST" color="#E10098" />
          <TechBadge name="MySQL" color="#4479A1" />
          <TechBadge name="Docker" color="#2496ED" />
          <TechBadge name="OWASP" color="#E34F26" />
        </div>

        {/* BOUTONS CTA */}
        <div className="about-cta">
          <a href="/cv.pdf" className="about-cta-btn about-cta-btn-primary">
            📄 CV
          </a>
          <Link to="/Contact" className="about-cta-btn about-cta-btn-secondary">
            ✉️ Contact
          </Link>
          
          <a href="https://www.linkedin.com/in/mir-sagar/"
            target="_blank"
            rel="noopener noreferrer"
            className="about-cta-btn about-cta-btn-tertiary"
          >
            💼 LinkedIn
          </a>
          
          <a href="https://github.com/smir75"
            target="_blank"
            rel="noopener noreferrer"
            className="about-cta-btn about-cta-btn-tertiary"
          >
            <svg className="about-cta-icon" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
            </svg>
            GitHub
          </a>
        </div>

        {/* FLIPCARD EN BAS (avant la section suivante) */}
        <div className="about-flipcard">
          <CodeFlipCard />
        </div>

      </div>
    </section>
  );
}
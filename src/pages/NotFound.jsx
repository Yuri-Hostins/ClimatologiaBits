import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import QuoteStrip from "../components/common/QuoteStrip";
import "../styles/pages/notfound.css";

// === Toggle de tema (claro/escuro) com persistência ===
const THEME_KEY = "cb:theme";

function applyTheme(theme) {
  const root = document.documentElement;
  root.setAttribute("data-theme", theme);
}

function ThemeToggle() {
  const [theme, setTheme] = useState(() => {
    // tenta restaurar; se não houver, assume 'light'
    try {
      return localStorage.getItem(THEME_KEY) || "light";
    } catch {
      return "light";
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch {}
    applyTheme(theme);
  }, [theme]);

  const toggle = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  const isDark = theme === "dark";
  const label = isDark ? "Ativar tema claro" : "Ativar tema escuro";

  return (
    <button
      type="button"
      className={`nf-toggle ${isDark ? "is-dark" : "is-light"}`}
      onClick={toggle}
      aria-label={label}
      title={label}
    >
      <span className="nf-toggle-ico" aria-hidden="true">
        {isDark ? "🌙" : "☀️"}
      </span>
    </button>
  );
}

// === helper já existente para rolagem/links ===
function goToSection(id, closeMenu) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    if (typeof closeMenu === "function") closeMenu();
    return;
  }
  const base = `${window.location.origin}/`;
  const url = `${base}?to=${encodeURIComponent(id)}`;
  window.location.assign(url);
}

export default function NotFound() {
  useEffect(() => {
    document.title = "Erro 404 | ClimatologiaBits";
    // garante aplicação do tema salvo ao entrar direto no 404
    try {
      const saved = localStorage.getItem(THEME_KEY);
      if (saved) applyTheme(saved);
    } catch {}
  }, []);

  return (
    <section className="nf-hero" aria-labelledby="nf-title">
      {/* Botão de tema flutuante */}
      <ThemeToggle />

      {/* Fundo de cena */}
      <div className="nf-bg" aria-hidden="true">
        <div className="nf-sky">
          <span className="nf-cloud" />
          <span className="nf-cloud is-2" />
          <span className="nf-bubble" />
        </div>
      </div>

      {/* Card central */}
      <div className="nf-card">
        <div className="nf-code" aria-hidden="true">
          <span>4</span>
          <span>0</span>
          <span>4</span>
        </div>

        <h1 id="nf-title" className="nf-title">
          Opa! Não encontramos a página que você tentou acessar.
        </h1>

        <p className="nf-text">
          Talvez o link tenha mudado ou nunca existiu. Você pode voltar para a
          página inicial ou explorar nossos conteúdos.
        </p>

        <div className="nf-actions">
          <Link to="/" className="nf-btn nf-primary">Voltar ao início</Link>
          <Link
            to="/"
            className="nf-btn nf-ghost"
            onClick={(e) => {
              e.preventDefault();
              goToSection("conteudos");
            }}
          >
            Explorar conteúdos
          </Link>
        </div>
        <QuoteStrip />
      </div>
    </section>
  );
}

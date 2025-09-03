import React, { useEffect, useState } from "react";
import "../../styles/layout/navbar.css";

const logoUrl = `${process.env.PUBLIC_URL}/assets/img/logo.svg`;

// ===== Helpers para hora do Brasil (São Paulo) =====
const THEME_KEY = "cb_theme_pref"; // valores possíveis: "auto" | "light" | "dark"

function goToSection(id, closeMenu) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    if (typeof closeMenu === "function") closeMenu();
    return;
  }
  // fora da home: navega sem hash
  const base = `${window.location.origin}/`;
  const url = `${base}?to=${encodeURIComponent(id)}`;
  window.location.assign(url);
}

function getBrazilHour() {
  try {
    const parts = new Intl.DateTimeFormat("en-GB", {
      timeZone: "America/Sao_Paulo",
      hour: "numeric",
      hour12: false,
    }).formatToParts(new Date());
    const hh = parseInt(parts.find((p) => p.type === "hour")?.value ?? "12", 10);
    return Number.isFinite(hh) ? hh : new Date().getHours();
  } catch {
    return new Date().getHours();
  }
}
function isDayInBrazil() {
  const h = getBrazilHour();
  // Dia considerado entre 06:00 e 18:59
  return h >= 6 && h < 19;
}

export default function NavbarClima() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // ===== Tema (auto por padrão; persiste escolha manual) =====
  const [theme, setTheme] = useState("light");
  const [isAuto, setIsAuto] = useState(true);

  // aplica atributo no <html> para CSS: [data-theme="light"|"dark"]
  const applyTheme = (t) => {
    document.documentElement.setAttribute("data-theme", t);
  };

  // bootstrap do tema
  useEffect(() => {
    let saved = null;
    try { saved = localStorage.getItem(THEME_KEY); } catch { }
    if (saved === "light" || saved === "dark") {
      setIsAuto(false);
      setTheme(saved);
      applyTheme(saved);
    } else {
      // modo auto
      const start = isDayInBrazil() ? "light" : "dark";
      setIsAuto(true);
      setTheme(start);
      applyTheme(start);
      try { localStorage.setItem(THEME_KEY, "auto"); } catch { }
    }
  }, []);

  // se estiver em auto, verifica a cada minuto se virou dia/noite no Brasil
  useEffect(() => {
    if (!isAuto) return;
    const check = () => {
      const target = isDayInBrazil() ? "light" : "dark";
      setTheme((prev) => {
        if (prev !== target) {
          applyTheme(target);
          return target;
        }
        return prev;
      });
    };
    check();
    const id = setInterval(check, 60 * 1000);
    return () => clearInterval(id);
  }, [isAuto]);

  // click no botão alterna e grava preferência (desativa auto)
  const toggleTheme = () => {
    setIsAuto(false);
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    applyTheme(next);
    try { localStorage.setItem(THEME_KEY, next); } catch { }
  };

  const closeMenu = () => setOpen(false);

  // esc/v-scroll/responsivo
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 900) setOpen(false); };
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("resize", onResize);
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <header className={`cb-navbar ${scrolled ? "is-scrolled" : ""}`}>
      <div className="cb-inner">
        <div className="cb-brand">
          <a href="/" className="cb-logoLink" aria-label="ClimatologiaBits — Início"
             onClick={(e) => { e.preventDefault(); goToSection("inicio"); }}>
            <img className="cb-logo" src={logoUrl} alt="ClimatologiaBits" width="36" height="36" loading="eager" />
          </a>
          <strong className="cb-brand-text">ClimatologiaBits</strong>
        </div>

        {/* Links centro (sem #, com onClick) */}
        <nav className="cb-links" aria-label="Seções do site">
          <a href="/" onClick={(e)=>{e.preventDefault(); goToSection("inicio");}}>Início</a>
          <a href="/" onClick={(e)=>{e.preventDefault(); goToSection("sobre");}}>Sobre</a>
          <a href="/" onClick={(e)=>{e.preventDefault(); goToSection("conteudos");}}>Conteúdos</a>
          <a href="/" onClick={(e)=>{e.preventDefault(); goToSection("integrantes");}}>Integrantes</a>
          <a href="/" onClick={(e)=>{e.preventDefault(); goToSection("contato");}}>Contato</a>
        </nav>

        {/* Ações direita */}
        <div className="cb-actions">
          <button
            className="cb-ghost"
            onClick={toggleTheme}
            aria-label={theme === "dark" ? "Ativar tema claro" : "Ativar tema escuro"}
            title={isAuto ? "Tema automático (Brasil). Clique para escolher manualmente." : "Clique para alternar tema."}
          >
            {theme === "dark" ? "🌙" : "☀️"}
          </button>

          <button
            className={`cb-burger ${open ? "is-open" : ""}`}
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-controls="cb-mobile-panel"
            aria-expanded={open}
            onClick={() => setOpen(v => !v)}
          >
            <span className="line" />
            <span className="line" />
            <span className="line" />
          </button>
        </div>
      </div>

      {/* Painel mobile */}
      <div id="cb-mobile-panel" className={`cb-panel ${open ? "is-open" : ""}`}>
        <div className="cb-panel-inner">
          <nav className="cb-panel-links" aria-label="Menu mobile">
            <a href="/" onClick={(e)=>{e.preventDefault(); goToSection("inicio", closeMenu);}}>Início</a>
            <a href="/" onClick={(e)=>{e.preventDefault(); goToSection("sobre", closeMenu);}}>Sobre</a>
            <a href="/" onClick={(e)=>{e.preventDefault(); goToSection("conteudos", closeMenu);}}>Conteúdos</a>
            <a href="/" onClick={(e)=>{e.preventDefault(); goToSection("contato", closeMenu);}}>Contato</a>
          </nav>
        </div>
        <button className="cb-overlay" aria-label="Fechar menu" onClick={closeMenu} />
      </div>
    </header>
  );
}

import "../../styles/layout/navbar.css";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import ThemeToggle, { useClimaTheme } from "./ThemeToggle";


const logoUrl = `${process.env.PUBLIC_URL}/assets/img/logo.svg`;
const THEME_KEY = "cb_theme_pref";

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

export default function NavbarClima() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState("light"); // light | dark

  // timer para próxima virada (06h/18h em America/Sao_Paulo)
  const boundaryTimer = useRef(null);

  const closeMenu = () => setOpen(false);

  // ===== Utilitários de tema (Brasil - São Paulo) =====

  // aplica no <html data-theme="...">
  const applyTheme = (mode) => {
    const v = mode === "dark" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", v);
  };

  // hora em São Paulo (parece complicado, mas é preciso para respeitar o horário BR)
  const nowSP = () => {
    const parts = new Intl.DateTimeFormat("en-US", {
      timeZone: "America/Sao_Paulo",
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })
      .formatToParts(new Date())
      .reduce((acc, x) => ((acc[x.type] = x.value), acc), {});
    return {
      h: Number(parts.hour || 0),
      m: Number(parts.minute || 0),
      s: Number(parts.second || 0),
    };
  };

  // está de DIA em SP? (06:00–17:59)
  const isDaySP = () => {
    const { h } = nowSP();
    return h >= 6 && h < 18;
  };

  // ms até a próxima virada (06:00 ou 18:00) + qual será o próximo tema
  const untilNextBoundary = () => {
    const { h, m, s } = nowSP();
    const dayNow = h >= 6 && h < 18; // true = dia, false = noite
    const targetH = dayNow ? 18 : 6;
    let dH = targetH - h;
    if (dH <= 0) dH += 24;
    const ms = ((dH * 60 - m) * 60 - s) * 1000;
    return { ms, nextTheme: dayNow ? "dark" : "light" };
  };

  // agenda a troca automática do tema na próxima virada (e salva no storage)
  const scheduleBoundary = () => {
    clearTimeout(boundaryTimer.current);
    const { ms, nextTheme } = untilNextBoundary();
    boundaryTimer.current = setTimeout(() => {
      setTheme(nextTheme);
      applyTheme(nextTheme);
      try {
        localStorage.setItem(THEME_KEY, nextTheme); // sobrescreve a escolha do usuário, como você pediu
      } catch {}
      scheduleBoundary(); // agenda a virada seguinte
    }, Math.max(500, ms + 250)); // um pequeno buffer para evitar drift
  };

  // ===== Inicialização do tema =====
  useLayoutEffect(() => {
    let initial = "light";
    try {
      const saved = localStorage.getItem(THEME_KEY);
      if (saved === "light" || saved === "dark") {
        initial = saved; // preferência do usuário
      } else {
        // sem preferência: aplica pelo horário do Brasil e salva
        initial = isDaySP() ? "light" : "dark";
        localStorage.setItem(THEME_KEY, initial);
      }
    } catch {
      initial = isDaySP() ? "light" : "dark";
    }
    setTheme(initial);
    applyTheme(initial);
    scheduleBoundary();
    return () => clearTimeout(boundaryTimer.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ===== Eventos gerais (teclado/scroll/resize) =====
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 900) setOpen(false);
    };
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("resize", onResize);
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // ===== Alternar tema manualmente =====
  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    applyTheme(next);
    try {
      localStorage.setItem(THEME_KEY, next);
    } catch {}
    // importante: NÃO cancelar o timer — na virada (06/18h) o sistema ainda vai sobrepor
  };

  return (
    <header className={`cb-navbar ${scrolled ? "is-scrolled" : ""}`}>
      <div className="cb-inner">
        {/* Marca */}
        <div className="cb-brand">
          <a href="/" className="cb-logoLink" aria-label="ClimatologiaBits — Início">
            <img className="cb-logo" src={logoUrl} alt="ClimatologiaBits" width="36" height="36" loading="eager" />
          </a>
          <strong className="cb-brand-text">ClimatologiaBits</strong>
        </div>

        {/* Links principais (ajuste os hrefs conforme sua navegação) */}
         <nav className="cb-links" aria-label="Seções do site">
          <a href="/" onClick={(e)=>{e.preventDefault(); goToSection("inicio");}}>Início</a>
          <a href="/" onClick={(e)=>{e.preventDefault(); goToSection("sobre");}}>Sobre</a>
          <a href="/" onClick={(e)=>{e.preventDefault(); goToSection("conteudos");}}>Conteúdos</a>
          <a href="/" onClick={(e)=>{e.preventDefault(); goToSection("integrantes");}}>Integrantes</a>
          <a href="/" onClick={(e)=>{e.preventDefault(); goToSection("contato");}}>Contato</a>
        </nav>

        {/* Ações (tema + burger) */}
        <div className="cb-actions">
          <button className="cb-ghost" aria-label="Alternar tema" onClick={toggleTheme}>
            {theme === "dark" ? "🌙" : "☀️"}
          </button>

          <button
            className={`cb-burger ${open ? "is-open" : ""}`}
            aria-label="Abrir menu"
            aria-controls="cb-mobile-panel"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
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
            <a href="/" style={{ marginTop: "1.25rem" }} onClick={(e)=>{e.preventDefault(); goToSection("inicio", closeMenu);}}>Início</a>
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

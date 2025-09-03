import React, { useEffect, useMemo, useRef, useState } from "react";

/* ---------- utils ---------- */
const rnd = (min, max) => min + Math.random() * (max - min);
const uid = () => Math.random().toString(36).slice(2) + Date.now().toString(36);

function makeCloud({ midFlight = false } = {}) {
  const duration = rnd(38, 64);
  const topVH = rnd(8, 18);
  const scale = rnd(0.8, 1.35);
  const delay = midFlight ? -rnd(0, duration * 0.8) : 0;
  return { id: uid(), duration, topVH, scale, delay };
}

/* Lê o tema atual do <html data-theme="..."> e mapeia p/ clima */
function themeToClima() {
  const t = document.documentElement.getAttribute("data-theme");
  return t === "dark" ? "noite" : "dia";
}

/* Scroll até seção, sem # na URL (igual navbar) */
function goToSection(id) {
  const el = document.getElementById(id);
  if (el) { el.scrollIntoView({ behavior: "smooth", block: "start" }); return; }
  const base = `${window.location.origin}/`;
  const url = `${base}?to=${encodeURIComponent(id)}`;
  window.location.assign(url);
}

export default function Banner() {
  /* ---------- nuvens ---------- */
  const [clouds, setClouds] = useState(() =>
    Array.from({ length: 5 }, () => makeCloud({ midFlight: true }))
  );
  const recycle = (id) =>
    setClouds((prev) => prev.map((c) => (c.id === id ? makeCloud() : c)));

  /* ---------- parallax ---------- */
  useEffect(() => {
    const prefersReduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduce) return;
    const onScroll = () => {
      const y = window.scrollY || window.pageYOffset || 0;
      document.documentElement.style.setProperty("--parallax", String(y));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ---------- Clima ↔ Tema (só dia/noite) ---------- */
  const [clima, setClima] = useState(themeToClima());

  // Observa mudanças de data-theme no <html> (usuário alterna / AUTO muda)
  useEffect(() => {
    const obs = new MutationObserver((muts) => {
      for (const m of muts) {
        if (m.type === "attributes" && m.attributeName === "data-theme") {
          setClima(themeToClima());
        }
      }
    });
    obs.observe(document.documentElement, { attributes: true });
    // estado inicial garantido
    setClima(themeToClima());
    return () => obs.disconnect();
  }, []);

  // Perfil de nuvens por clima (apenas dois perfis)
  const cloudProfile = useMemo(() => {
    return clima === "noite"
      ? { speed: 1.4, tint: "night", opacity: 0.8, count: 5 }
      : { speed: 1.0, tint: "light", opacity: 0.95, count: 5 }; // dia
  }, [clima]);

  const hero = useMemo(() => ({
    title: "Bem-vindo ao ClimatologiaBits",
    subtitle:
      clima === "noite"
        ? "Boa noite 🌙 — um site feito para você aprender climatologia"
        : "Bom dia, Brasil ☀️ — um site feito para você aprender climatologia",
    ctaLabel: "Explorar conteúdos",
    ctaHref: "/",
  }), [clima]);


  return (
    <section id="inicio" className={`gb-banner wx-${clima}`}>
      {/* CÉU + COLINAS */}
      <div className="gb-scene" aria-hidden="true">
        <svg className="gb-scene-svg" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" style={{ stopColor: "var(--sky-top)" }} />
              <stop offset="65%" style={{ stopColor: "var(--sky-mid)" }} />
              <stop offset="100%" style={{ stopColor: "var(--sky-bottom)" }} />
            </linearGradient>
            <linearGradient id="hillA" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" style={{ stopColor: "var(--hillA-1)" }} />
              <stop offset="100%" style={{ stopColor: "var(--hillA-2)" }} />
            </linearGradient>
            <linearGradient id="hillB" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" style={{ stopColor: "var(--hillB-1)" }} />
              <stop offset="100%" style={{ stopColor: "var(--hillB-2)" }} />
            </linearGradient>
          </defs>

          <rect x="0" y="0" width="1440" height="900" fill="url(#sky)" />
          <path className="hillA" d="M0 640 C 260 600 560 680 820 640 C 1080 600 1250 660 1440 620 L1440 900 L0 900 Z" fill="url(#hillA)" />
          <path className="hillB" d="M0 700 C 300 660 560 730 820 700 C 1100 660 1240 710 1440 680 L1440 900 L0 900 Z" fill="url(#hillB)" />
        </svg>
      </div>

      {/* NUVENS */}
      <div className={`gb-cloud-layer cloud-${cloudProfile.tint}`} aria-hidden="true">
        {clouds.slice(0, cloudProfile.count).map((c) => {
          const depth = Math.min(Math.max((c.topVH - 8) / 10, 0), 1);
          const alpha = cloudProfile.opacity - depth * 0.25;
          const dur = c.duration * cloudProfile.speed;
          return (
            <div
              key={c.id}
              className="cloud-js"
              style={{
                top: `calc(${c.topVH}vh)`,
                animationDuration: `${dur}s`,
                animationDelay: `${c.delay}s`,
                transform: `scale(${c.scale})`,
                opacity: alpha,
              }}
              onAnimationEnd={() => recycle(c.id)}
            >
              <div className="puff p1" />
              <div className="puff p2" />
              <div className="puff p3" />
            </div>
          );
        })}
      </div>

      {/* NOITE – lua + estrelas */}
      {clima === "noite" && (
        <div className="wx-night" aria-hidden="true">
          <span className="moon" />
          <div className="stars">
            {Array.from({ length: 80 }).map((_, i) => (
              <span key={i} style={{ "--x": `${(i * 127) % 100}%`, "--y": `${(i * 79) % 100}%` }} />
            ))}
          </div>
        </div>
      )}

      {/* CARD */}
      <div className="gb-hero-card">
        <h1>{hero.title}</h1>
        <p>{hero.subtitle}</p>
        <a
          className="gb-cta"
          href={hero.ctaHref}
          onClick={(e) => { e.preventDefault(); goToSection("conteudos"); }}
        >
          {hero.ctaLabel}
        </a>
      </div>
    </section>
  );
}

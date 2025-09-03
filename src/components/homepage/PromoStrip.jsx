import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

export default function PromoStrip({
  title = "Conheça a HRTech",
  subtitle = "Uma das empresas mais promissoras da região!",
  googleUrl = "https://www.google.com/search?sca_esv=7fc613d9cd9ef286&sxsrf=AE3TifPSFjP01Ax0WCCfMiNAgvvoerFq6g:1756848769715&q=HRTech+Solutions+Blumenau&si=AMgyJEtkdv0bUy3jSIkW9mWntMhFklqBoU8Pv9aKe-yCHl3vFq_GB6b3J_wlfbAWoQUEbEYJ7e4nbmWMNoUv27mWgzqZwvWEEM9C6FTssJF3JXObOFOXyrm1F0GYsRsTFCF9sFIUZJtE9q-OMxvrZGGQ45tAJgbuc30fabotvCRcLfG7iE0Q7cjMTS5pwZEXWoVVgSWP1ZUkb0ugmg-4jPe_VofJzQCwVEnr9kPVtW7iP2jUZuBE3us%3D&sa=X&ved=2ahUKEwjK-d7Wg7uPAxWQE7kGHfXxJAgQ6RN6BAgGEAE&biw=1920&bih=919&dpr=1",
  websiteUrl = "https://hrtechsolutions.netlify.app/",
  youtubeUrl = "https://www.youtube.com/@HRTech-Solutions",
  whatsappUrl = "https://api.whatsapp.com/send/?phone=554797588370&text&type=phone_number&app_absent=0",
  instagramUrl = "https://www.instagram.com/hrtechsolutions_/",
}) {
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState({ top: 0, left: 0 }); // posição do popover (viewport)
  const fabRef = useRef(null);
  const popRef = useRef(null);

  const items = [
    { href: googleUrl,   label: "Google",   icon: "google" },
    { href: websiteUrl,  label: "Website",  icon: "website" },
    { href: youtubeUrl,  label: "YouTube",  icon: "youtube" },
    { href: whatsappUrl, label: "WhatsApp", icon: "whatsapp" },
    { href: instagramUrl,label: "Instagram",icon: "instagram" },
  ].filter(i => i.href);

  const toggle = () => setOpen(v => !v);
  const close  = () => setOpen(false);

  // calcula e atualiza a posição do popover (à ESQUERDA do +)
  const updatePosition = () => {
    const el = fabRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const GAP = 12; // distância entre o balão e o botão
    setPos({
      top: r.top + r.height / 2,
      left: r.left - GAP, // usamos translateX(-100%) no CSS
    });
  };

  // abre/fecha: posiciona e escuta resize/scroll
  useEffect(() => {
    if (!open) return;
    updatePosition();
    const onScroll = () => updatePosition();
    const onResize = () => updatePosition();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  // ESC fecha
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // clique fora fecha
  useEffect(() => {
    if (!open) return;
    const onDown = (e) => {
      if (!popRef.current || !fabRef.current) return;
      if (popRef.current.contains(e.target) || fabRef.current.contains(e.target)) return;
      setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);

  return (
    <section className="gb-promo v2" aria-label="Destaque do site">
      {/* decor */}
      <span className="gb-promo-rings" aria-hidden="true" />
      <svg className="gb-promo-anim" viewBox="0 0 1000 300" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <path id="promo-arc" d="M 0 220 Q 420 40 1000 200" />
          <filter id="ballShadow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="3" stdDeviation="3" floodOpacity=".28" />
          </filter>
        </defs>
        <use href="#promo-arc" stroke="rgba(82,107,124,.15)" strokeWidth="3" fill="none" />
        <g filter="url(#ballShadow)">
          <circle r="9" fill="#fff" stroke="#2b2c5a" strokeWidth="2">
            <animateMotion dur="9s" repeatCount="indefinite" rotate="auto">
              <mpath href="#promo-arc" />
            </animateMotion>
          </circle>
        </g>
      </svg>

      {/* conteúdo */}
      <div className="gb-promo-inner">
        <div className="gb-promo-text">
          <span className="gb-promo-eyebrow">Destaque</span>
          <h2>{title}</h2>
          <p>{subtitle}</p>
        </div>
        <div />
      </div>

      {/* FAB à direita (centro vertical) */}
      <div className="promo-fab-wrap right">
        <button
          ref={fabRef}
          className={`promo-fab ${open ? "is-open" : ""}`}
          aria-expanded={open}
          aria-controls="promo-popover-floating"
          aria-label={open ? "Fechar links" : "Abrir links"}
          onClick={() => { toggle(); requestAnimationFrame(updatePosition); }}
          type="button"
        >
          <span className="bar b1" />
          <span className="bar b2" />
        </button>
      </div>

      {/* Popover portado para <body>, fora do overflow da faixa */}
      {open &&
        createPortal(
          <div
            id="promo-popover-floating"
            ref={popRef}
            className="promo-popover-fixed is-open"
            role="menu"
            style={{ top: `${pos.top}px`, left: `${pos.left}px` }}
          >
            {items.map(({ href, label, icon }) => (
              <a
                key={label}
                className="promo-item"
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                role="menuitem"
                onClick={close}
              >
                <span className={`pi ${icon}`} aria-hidden="true">
                  {icon === "google" && (
                    <svg viewBox="0 0 24 24" width="18" height="18">
                      <path fill="#EA4335" d="M12 11.99v3.84h5.42c-.24 1.38-1.64 4.05-5.42 4.05a6.25 6.25 0 1 1 0-12.5 5.48 5.48 0 0 1 3.87 1.54l2.64-2.55A9.05 9.05 0 0 0 12 3.5C6.74 3.5 2.5 7.74 2.5 13S6.74 22.5 12 22.5c5.86 0 9.7-4.11 9.7-9.9 0-.66-.07-1.16-.16-1.61H12Z"/>
                    </svg>
                  )}
                  {icon === "website" && (
                    <svg viewBox="0 0 24 24" width="18" height="18">
                      <path d="M3 5h18v14H3z" fill="none" stroke="currentColor" strokeWidth="2"/>
                      <path d="M3 9h18" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                  )}
                  {icon === "youtube" && (
                    <svg viewBox="0 0 24 24" width="18" height="18">
                      <path fill="currentColor" d="M23 12s0-3.5-.45-5.03a3.1 3.1 0 0 0-2.2-2.2C18.82 4.3 12 4.3 12 4.3s-6.82 0-8.35.47a3.1 3.1 0 0 0-2.2 2.2C1 8.5 1 12 1 12s0 3.5.45 5.03a3.1 3.1 0 0 0 2.2 2.2C5.18 19.7 12 19.7 12 19.7s6.82 0 8.35-.47a3.1 3.1 0 0 0 2.2-2.2C23 15.5 23 12 23 12Zm-13 3.4V8.6l6.2 3.4L10 15.4Z"/>
                    </svg>
                  )}
                  {icon === "whatsapp" && (
                    <svg viewBox="0 0 24 24" width="18" height="18">
                      <path d="M20.5 12a8.5 8.5 0 1 1-12 7.6L4 21l1.4-4.3A8.5 8.5 0 1 1 20.5 12Z" fill="none" stroke="currentColor" strokeWidth="2"/>
                      <path d="M8.8 9.9c.2-.6.5-.7.8-.7.2 0 .4 0 .6.1.2.1.5.7.6.9.1.2.1.3 0 .4-.1.2-.3.4-.4.5-.1.1-.2.2-.1.4.1.3.6 1 1.4 1.6.9.6 1.6.8 1.9.9.1 0 .3 0 .4-.1.1-.1.5-.6.6-.7.1-.1.2-.1.4 0 .2.1 1.2.6 1.4.7.2.1.3.1.4.2 0 .1 0 .8-.3 1.2-.3.4-1 .8-1.4.8-.3 0-2.6-.4-4.4-1.7-1.9-1.4-2.8-3.3-3-3.6-.2-.3-.6-1.1-.6-1.8 0-.6.3-1 .4-1.1Z" fill="currentColor"/>
                    </svg>
                  )}
                  {icon === "instagram" && (
                    <svg viewBox="0 0 24 24" width="18" height="18">
                      <rect x="4" y="4" width="16" height="16" rx="4" stroke="currentColor" strokeWidth="2" fill="none"/>
                      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" fill="none"/>
                      <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor"/>
                    </svg>
                  )}
                </span>
                <span className="pl">{label}</span>
              </a>
            ))}
          </div>,
          document.body
        )}
    </section>
  );
}

import React, { useMemo, useState, useCallback, useEffect } from "react";
const DEFAULT_MEMBERS = [

  {
    id: "cleber",
    nome: "Cleverson Barbosa Matias",
    funcao: "Conteúdo",
    foto: `${process.env.PUBLIC_URL}/assets/img/team/cleber.jpg`,
    thumb: `${process.env.PUBLIC_URL}/assets/img/team/cleber.jpg`,
    bio: "Produção de textos, revisão e apoio na elaboração das seções didáticas de climatologia.",
    links: {
      instagram: "https://instagram.com/cleber.mnz",
      whatsapp: "https://wa.me/554799504892?text=Ol%C3%A1,%20Cleverson%20Barbosa%20Matias,%20encontrei%20seu%20contato%20no%20site%20ClimatologiaBits%20e%20gostaria%20de%20falar%20com%20voc%C3%AA",
    },
  },
  {
    id: "joao",
    nome: "João Gabriel Lopes tenfen",
    funcao: "Dados / Pesquisa",
    foto: `${process.env.PUBLIC_URL}/assets/img/team/joao.jpg`,
    thumb: `${process.env.PUBLIC_URL}/assets/img/team/joao.jpg`,
    bio: "Pesquisa de fontes, coleta de dados e curadoria de materiais para visualizações e mapas.",
    links: {
      instagram: "https://instagram.com/gab_tenf",
      linkedin: "https://www.linkedin.com/in/joao-gabriel-lopes-tenfen-5b37962ab/",
      whatsapp: "https://wa.me/554791606832?text=Ol%C3%A1,%20Jo%C3%A3o%20Gabriel%20Lopes%20tenfen,%20encontrei%20seu%20contato%20no%20site%20ClimatologiaBits%20e%20gostaria%20de%20falar%20com%20voc%C3%AA",
    },
  },
  {
    id: "lucas",
    nome: "Lucas Roberto Tay",
    funcao: "Dados / Pesquisa",
    foto: `${process.env.PUBLIC_URL}/assets/img/team/lucas.jpg`,
    thumb: `${process.env.PUBLIC_URL}/assets/img/team/lucas.jpg`, //lucas_thumb.jpg
    bio: "Pesquisa de fontes, coleta de dados e curadoria de materiais para visualizações e mapas.",
    links: {
      instagram: "https://instagram.com/llucas_rt",
      linkedin: "https://br.linkedin.com/in/lucas-roberto-tay-63495a261",
      whatsapp: "https://wa.me/554796198344?text=Ol%C3%A1,%20Lucas%20Roberto%20Tay,%20encontrei%20seu%20contato%20no%20site%20ClimatologiaBits%20e%20gostaria%20de%20falar%20com%20voc%C3%AA!",
    },
  },
  {
    id: "yuri",
    nome: "Yuri Hostins Raimundo",
    funcao: "Dev / UI",
    foto: `${process.env.PUBLIC_URL}/assets/img/team/yuri.jpg`,
    thumb: `${process.env.PUBLIC_URL}/assets/img/team/yuri.jpg`,
    bio: "Responsável pela implementação e design do ClimatologiaBits, com foco em visualização e UX.",
    links: {
      instagram: "https://instagram.com/yurihr.___",
      github: "https://github.com/Yuri-Hostins",
      whatsapp: "https://wa.me/554797588370?text=Ol%C3%A1,%20Yuri%20Hostins%20Raimundo,%20encontrei%20seu%20contato%20no%20site%20ClimatologiaBits%20e%20gostaria%20de%20falar%20com%20voc%C3%AA!",
    },
  },
];

/**
 * Ícones simples em SVG (mantém seu bundle leve e coerente com o resto do site).
 */
const Icon = {
  ig: () => (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="2" fill="none" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" fill="none" />
      <circle cx="17.5" cy="6.5" r="1.3" fill="currentColor" />
    </svg>
  ),
  gh: () => (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.17-3.37-1.17-.46-1.17-1.12-1.48-1.12-1.48-.92-.63.07-.62.07-.62 1.02.07 1.56 1.05 1.56 1.05.9 1.55 2.37 1.1 2.95.84.09-.66.35-1.1.63-1.35-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.26.1-2.62 0 0 .85-.27 2.78 1.02a9.67 9.67 0 0 1 5.06 0c1.92-1.29 2.77-1.02 2.77-1.02.55 1.36.2 2.37.1 2.62.64.7 1.03 1.59 1.03 2.68 0 3.85-2.34 4.69-4.57 4.94.36.31.68.92.68 1.86v2.75c0 .26.18.58.69.48A10 10 0 0 0 12 2Z"
      />
    </svg>
  ),
  in: () => (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="4" fill="currentColor" opacity=".1" />
      <path
        fill="currentColor"
        d="M8.5 8.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3ZM7 10h3v7H7v-7Zm5 0h2.8v1.1h.04c.39-.7 1.34-1.44 2.76-1.44 2.95 0 3.5 1.94 3.5 4.47V17h-3v-3.34c0-.8-.01-1.83-1.12-1.83-1.12 0-1.29.87-1.29 1.77V17h-3v-7Z"
      />
    </svg>
  ),
  wh: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M20.5 12a8.5 8.5 0 0 1-12 7.6L4 21l1.4-4.3A8.5 8.5 0 1 1 20.5 12Z" stroke="currentColor" strokeWidth="2" />
      <path d="M8.8 9.9c.2-.6.5-.7.8-.7.2 0 .4 0 .6.1.2.1.5.7.6.9.1.2.1.3 0 .4-.1.2-.3.4-.4.5-.1.1-.2.2-.1.4.1.3.6 1 1.4 1.6.9.6 1.6.8 1.9.9.1 0 .3 0 .4-.1.1-.1.5-.6.6-.7.1-.1.2-.1.4 0 .2.1 1.2.6 1.4.7.2.1.3.1.4.2 0 .1 0 .8-.3 1.2-.3.4-1 .8-1.4.8-.3 0-2.6-.4-4.4-1.7-1.9-1.4-2.8-3.3-3-3.6-.2-.3-.6-1.1-.6-1.8 0-.6.3-1 .4-1.1Z" fill="currentColor" />
    </svg>
  ),
};

/**
 * Componente principal
 */
export default function Integrantes({ items = DEFAULT_MEMBERS }) {
  const [active, setActive] = useState(0);

  const total = items.length;
  const current = items[active];

  const go = useCallback(
    (dir) => {
      setActive((i) => {
        const n = (i + dir + total) % total;
        return n;
      });
    },
    [total]
  );

  // Teclado: setas navegam; Enter/Space selecionam thumb focada
  const handleThumbKey = (e, idx) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setActive(idx);
    }
    if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
      e.preventDefault();
      go(-1);
    }
    if (e.key === "ArrowDown" || e.key === "ArrowRight") {
      e.preventDefault();
      go(1);
    }
  };

  // Atalhos globais (opcional): ←/→ no bloco principal
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  return (
    <section id="integrantes" className="gb-section team-section" aria-label="Integrantes do ClimatologiaBits">
      <div className="gb-shell">
        <header className="team-header">
          <h2 className="team-title">
            <span className="dropcap" aria-hidden="true">I</span>ntegrantes
          </h2>
          <p className="team-sub">
            Conheça quem fez este projeto com carinho — design, conteúdo e pesquisa para aprender climatologia de forma simples.
          </p>
        </header>

        <div className="team-grid">
          {/* Miniaturas (sidebar em desktop / carrossel em mobile) */}
          <aside className="team-thumbs" role="tablist" aria-label="Escolha um integrante">
            {items.map((m, idx) => {
              const selected = idx === active;
              return (
                <button
                  key={m.id}
                  role="tab"
                  aria-selected={selected}
                  aria-controls={`team-panel-${m.id}`}
                  className={`team-thumb ${selected ? "is-active" : ""}`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActive(idx)}
                  onKeyDown={(e) => handleThumbKey(e, idx)}
                  title={m.nome}
                >
                  <span className="thumb-ring" />
                  <img
                    src={m.thumb || m.foto}
                    alt={m.nome}
                    loading="lazy"
                    className="thumb-img"
                  />
                </button>
              );
            })}
          </aside>

          {/* Conteúdo principal */}
          <div className="team-main" role="tabpanel" id={`team-panel-${current.id}`} aria-live="polite">
            <figure className="team-photo-wrap">
              <img
                className="team-photo"
                src={current.foto}
                alt={`Foto de ${current.nome}`}
                loading="lazy"
              />
            </figure>

            <div className="team-info">
              <h3 className="team-name">{current.nome}</h3>
              <div className="team-role">{current.funcao}</div>
              <p className="team-bio">{current.bio}</p>

              <div className="team-links">
                {current?.links?.instagram && (
                  <a className="team-link" href={current.links.instagram} target="_blank" rel="noreferrer" aria-label="Instagram">
                    <Icon.ig />
                    <span>Instagram</span>
                  </a>
                )}
                {current?.links?.github && (
                  <a className="team-link" href={current.links.github} target="_blank" rel="noreferrer" aria-label="GitHub">
                    <Icon.gh />
                    <span>GitHub</span>
                  </a>
                )}
                {current?.links?.linkedin && (
                  <a className="team-link" href={current.links.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
                    <Icon.in />
                    <span>LinkedIn</span>
                  </a>
                )}
                {current?.links?.whatsapp && (
                  <a className="team-link" href={current.links.whatsapp} target="_blank" rel="noreferrer" aria-label="whatsapp">
                    <Icon.wh />
                    <span>Whatsapp</span>
                  </a>
                )}
              </div>

              <div className="team-actions">
                <button className="team-nav" onClick={() => go(-1)} aria-label="Anterior">←</button>
                <button className="team-nav" onClick={() => go(1)} aria-label="Próximo">→</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

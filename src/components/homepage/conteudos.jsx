import React, { useEffect, useRef, useState } from "react";

const PUBLIC = process.env.PUBLIC_URL || "";
const img = (p) => `${PUBLIC}/assets/img/${p}`;

const DEFAULT_ITEMS = [
  {
    id: "Equatorial",
    titulo: "Equatorial",
    descricao:
      "Quente e úmido o ano todo, chuvas abundantes diárias e floresta densa.",
    img: img("homepage/conteudos/capaEquatorial.png"),
    href: "/conteudos/equatorial",
  },
  {
    id: "Tropical",
    titulo: "Tropical",
    descricao:
      "Altas temperaturas com estação chuvosa e estação seca; no Brasil, verão mais chuvoso.",
    img: img("homepage/conteudos/capaTropical.png"),
    href: "/conteudos/tropical",
  },
  {
    id: "Mediterrâneo",
    titulo: "Mediterrâneo",
    descricao:
      "Verões quentes e secos, invernos amenos e chuvosos; típico do sul da Europa.",
    img: img("homepage/conteudos/capaMediterraneo.png"),
    href: "/conteudos/mediterraneo",
  },
  {
    id: "Subtropical",
    titulo: "Subtropical",
    descricao:
      "Verões quentes e invernos frios; chuvas bem distribuídas. Comuns frentes frias no Sul do Brasil.",
    img: img("/homepage/conteudos/CapaClimaSubtropical.png"),
    href: "/conteudos/subtropical",
  },
  {
    id: "Polar e Subpolar",
    titulo: "Polar e Subpolar",
    descricao:
      "Muito frio, invernos longos; baixa evaporação e precipitação em forma de neve.",
    img: img("homepage/conteudos/capaPolarSubpolar.png"),
    href: "/conteudos/polar-subpolar",
  },
  {
    id: "Frio de Montanha",
    titulo: "Frio de Montanha",
    descricao:
      "Temperatura diminui com a altitude; noites frias e chance de neve em áreas elevadas.",
    img: img("homepage/conteudos/capaFrioMontanha.png"),
    href: "/conteudos/frio-de-montanha",
  },
  {
    id: "Brasil",
    titulo: "Brasil",
    descricao:
      "Panorama dos climas do Brasil e curiosidades regionais.",
    img: img("homepage/conteudos/capaBrasil.png"),
    href: "/conteudos/brasil",
  },
  {
    id: "Clima de Santa Catarina",
    titulo: "Clima de Santa Catarina",
    descricao:
      "Subtropical com influência de frentes frias e do relevo; foco em Blumenau/Vale do Itajaí.",
    img: img("homepage/conteudos/capaSantaCatarina.jpg"),
    href: "/conteudos/santa-catarina",
  },
];


export default function Conteudos({
  title = "Conteúdos",
  subtitle = "Aqui você encontra todo o conteúdo necessário para estudar, organizado em tópicos curtos.",
  items = DEFAULT_ITEMS,
}) {
  const trackRef = useRef(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  // Atualiza habilitação das setas
  const updateNav = () => {
    const el = trackRef.current;
    if (!el) return;
    const atStart = el.scrollLeft <= 1;
    const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 1;
    setCanPrev(!atStart);
    setCanNext(!atEnd);
  };

  // Rolagem por card (aprox. largura do card + gap)
  const scrollByCard = (dir) => {
    const el = trackRef.current;
    if (!el) return;
    const firstCard = el.querySelector(".ct-card");
    const gap = 28;
    const step = firstCard ? firstCard.offsetWidth + gap : Math.max(320, el.clientWidth * 0.9);
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  useEffect(() => {
    updateNav();
    const el = trackRef.current;
    if (!el) return;
    const onScroll = () => updateNav();
    el.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", updateNav);
    return () => {
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updateNav);
    };
  }, []);

  // Acessibilidade por teclado
  const onKey = (e) => {
    if (e.key === "ArrowRight") { e.preventDefault(); scrollByCard(1); }
    if (e.key === "ArrowLeft") { e.preventDefault(); scrollByCard(-1); }
  };

  // Fallback de imagem simples
  const onImgError = (ev, title) => {
    const el = ev.currentTarget;
    if (el.dataset.fallback) return;
    el.dataset.fallback = "1";
    el.src =
      "data:image/svg+xml;utf8," +
      `<svg xmlns='http://www.w3.org/2000/svg' width='800' height='450'>
      <rect width='100%' height='100%' rx='20' ry='20' fill='%23e9edf6'/>
      <text x='50%' y='52%' text-anchor='middle' font-family='Inter,Arial' font-size='24' fill='%23899'>${title}</text>
     </svg>`;
  };


  return (
    <section id="conteudos" className="ct-section" aria-label="Conteúdos">
      <div className="ct-head">
        <h2 className="ct-title"><span className="ct-drop">C</span>onteúdos</h2>
        <p className="ct-sub">{subtitle}</p>
      </div>

      <div className="ct-carousel">
        {/* setas (ficam fora do clip) */}
        <button
          type="button"
          className="ct-nav ct-prev"
          aria-label="Conteúdo anterior"
          onClick={() => scrollByCard(-1)}
          disabled={!canPrev}
        >
          ‹
        </button>

        {/* CLIP: recorta fades + track com cantos arredondados */}
        <div className="ct-clip">
          <div className="ct-fade ct-left" aria-hidden="true" />
          <div className="ct-fade ct-right" aria-hidden="true" />

          <div
            className="ct-track"
            ref={trackRef}
            role="list"
            tabIndex={0}
            onKeyDown={onKey}
          >
            {items.map((it) => (
              <article key={it.id} role="listitem" className="ct-card">
                <div className="ct-media">
                  <img
                    src={it.img}
                    alt={it.titulo}
                    loading="lazy"
                    onError={(e) => onImgError(e, it.titulo)}
                  />
                </div>

                <h3 className="ct-card-title">{it.titulo}</h3>
                <p className="ct-desc">{it.descricao}</p>

                <div className="ct-card-footer">
                  <a className="ct-btn" href={it.href}>VER MAIS</a>
                </div>
              </article>
            ))}
          </div>
        </div>

        <button
          type="button"
          className="ct-nav ct-next"
          aria-label="Próximo conteúdo"
          onClick={() => scrollByCard(1)}
          disabled={!canNext}
        >
          ›
        </button>
      </div>

    </section>
  );
}

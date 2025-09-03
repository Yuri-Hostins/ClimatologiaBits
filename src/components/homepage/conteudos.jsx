import React, { useEffect, useRef, useState } from "react";

// Dados de exemplo (troque por seus itens)
const DEFAULT_ITEMS = [
  {
    id: "Equatorial",
    titulo: "Equatorial",
    descricao:
      "Gel viscoso onde acontecem várias reações celulares. Veja mais abaixo.",
    img: `${process.env.PUBLIC_URL || ""}/assets/conteudos/citoplasma.jpg`,
    href: "/Equatorial",
  },
  {
    id: "Tropical",
    titulo: "Tropical",
    descricao:
      "Estruturas que realizam funções específicas na célula. Veja mais abaixo.",
    img: `${process.env.PUBLIC_URL || ""}/assets/conteudos/Tropical.jpg`,
    href: "/Tropical",
  },
  {
    id: "Mediterrâneo",
    titulo: "Mediterrâneo",
    descricao:
      "Pequenas fábricas de proteínas da célula. Veja mais abaixo.",
    img: `${process.env.PUBLIC_URL || ""}/assets/conteudos/Mediterrâneo.jpg`,
    href: "/Mediterrâneo",
  },
  {
    id: "Subtropical",
    titulo: "Subtropical",
    descricao:
      "Responsáveis pela digestão intracelular. Veja mais abaixo.",
    img: `${process.env.PUBLIC_URL || ""}/assets/conteudos/lisossomos.jpg`,
    href: "/Subtropical",
  },
  {
    id: "Polar e Subpolar",
    titulo: "Polar e Subpolar",
    descricao:
      "Importantes na detoxificação celular. Veja mais abaixo.",
    img: `${process.env.PUBLIC_URL || ""}/assets/conteudos/Polar e Subpolar.jpg`,
    href: "/Polar e Subpolar",
  },
  {
    id: "Frio de Montanha",
    titulo: "Frio de Montanha",
    descricao:
      "Importantes na detoxificação celular. Veja mais abaixo.",
    img: `${process.env.PUBLIC_URL || ""}/assets/conteudos/Frio de Montanha.jpg`,
    href: "/Frio de Montanha",
  },
  {
    id: "Brasil",
    titulo: "Brasil",
    descricao:
      "Importantes na detoxificação celular. Veja mais abaixo.",
    img: `${process.env.PUBLIC_URL || ""}/assets/conteudos/Brasil.jpg`,
    href: "/Brasil",
  },
  {
    id: "Clima de Santa Catarina",
    titulo: "Clima de Santa Catarina",
    descricao:
      "Importantes na detoxificação celular. Veja mais abaixo.",
    img: `${process.env.PUBLIC_URL || ""}/assets/conteudos/Clima de Santa Catarina.jpg`,
    href: "/Clima de Santa Catarina",
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
    ev.currentTarget.src =
      `data:image/svg+xml;utf8,` +
      `<svg xmlns='http://www.w3.org/2000/svg' width='800' height='450'>` +
      `<rect width='100%' height='100%' rx='20' ry='20' fill='%23e9edf6'/>` +
      `<text x='50%' y='52%' text-anchor='middle' font-family='Inter,Arial' font-size='24' fill='%23899'>${title}</text>` +
      `</svg>`;
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

import React, { useEffect, useRef, useState } from "react";

export default function SlideDeck({ slides = [], startIndex = 0, onExit }) {
  const [idx, setIdx] = useState(
    Number.isFinite(startIndex)
      ? Math.min(Math.max(startIndex, 0), slides.length - 1)
      : 0
  );
  const wrapRef = useRef(null);
  const touchStartX = useRef(null);

  const go   = (to) => setIdx((_) => Math.max(0, Math.min(slides.length - 1, to)));
  const next = () => go(idx + 1);
  const prev = () => go(idx - 1);

  // teclado
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === "Escape" && onExit) onExit();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idx, slides.length]);

  // swipe
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    const onTouchStart = (e) => (touchStartX.current = e.touches[0].clientX);
    const onTouchEnd = (e) => {
      if (touchStartX.current == null) return;
      const dx = e.changedTouches[0].clientX - touchStartX.current;
      if (Math.abs(dx) > 60) (dx < 0 ? next() : prev());
      touchStartX.current = null;
    };

    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchend", onTouchEnd);
    return () => {
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchend", onTouchEnd);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idx]);

  if (!slides.length) {
    return (
      <section className="sd sd-empty">
        <p>Nenhum slide ainda.</p>
      </section>
    );
  }

  const s = slides[idx];
  const isSplit = s.layout === "split";

  const Media = () => {
    if (!s.media) return null;

    if (s.media.type === "img") {
      return (
        <figure className="sd-media sd-appear">
          <img src={s.media.src} alt={s.media.alt || ""} loading="lazy" />
          {s.caption && <figcaption className="sd-cap">{s.caption}</figcaption>}
        </figure>
      );
    }
    if (s.media.type === "iframe") {
      return (
        <figure className="sd-media sd-appear">
          <div className="sd-iframe">
            <iframe
              src={s.media.src}
              title={s.media.alt || s.title || "slide"}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          {s.caption && <figcaption className="sd-cap">{s.caption}</figcaption>}
        </figure>
      );
    }
    if (s.media.type === "video") {
      return (
        <figure className="sd-media sd-appear">
          <video src={s.media.src} controls />
          {s.caption && <figcaption className="sd-cap">{s.caption}</figcaption>}
        </figure>
      );
    }
    return null;
  };

  const TextBlock = () => (
    <div className="sd-content sd-appear">
      {s.content ? (
        Array.isArray(s.content) ? (
          s.content.map((t, i) => (
            <p key={i} dangerouslySetInnerHTML={{ __html: t }} />
          ))
        ) : (
          <p dangerouslySetInnerHTML={{ __html: s.content }} />
        )
      ) : null}
    </div>
  );

  return (
    <section className="sd" aria-label="Apresentação de slides" ref={wrapRef}>
      <div
        key={idx} /* força reflow para animar entrada */
        className={`sd-frame ${isSplit ? "is-split" : ""}`}
        role="group"
        aria-roledescription="slide"
        aria-label={`${idx + 1} de ${slides.length}`}
      >
        {(s.title || s.subtitle) && (
          <header className="sd-head">
            {s.title && <h3 className="sd-title">{s.title}</h3>}
            {s.subtitle && <p className="sd-sub">{s.subtitle}</p>}
          </header>
        )}

        <div className="sd-body">
          {isSplit ? (
            <div className={`sd-split ${s.flip ? "is-flip" : ""}`}>
              {/* texto à esquerda / imagem à direita (ou invertido com flip) */}
              <TextBlock />
              <Media />
            </div>
          ) : (
            <>
              <Media />
              <TextBlock />
            </>
          )}
        </div>
      </div>

      <footer className="sd-controls">
        <button
          className="sd-nav"
          onClick={prev}
          disabled={idx === 0}
          aria-label="Slide anterior"
        >
          ←
        </button>

        <div className="sd-dots" role="tablist" aria-label="Ir para slide">
          {slides.map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === idx}
              className={`sd-dot ${i === idx ? "is-active" : ""}`}
              onClick={() => go(i)}
            />
          ))}
        </div>

        <button
          className="sd-nav"
          onClick={next}
          disabled={idx === slides.length - 1}
          aria-label="Próximo slide"
        >
          →
        </button>
      </footer>

      {onExit && <div className="sd-hint">Pressione <kbd>Esc</kbd> para voltar</div>}
    </section>
  );
}

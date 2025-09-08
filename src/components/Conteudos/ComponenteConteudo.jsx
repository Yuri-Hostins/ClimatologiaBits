import React from "react";

export default function ComponenteConteudo({ secoes = [], video }) {
  return (
    <main className="ct-shell">
      {video?.url && (
        <section className="ct-video" aria-labelledby="video-titulo">
          {video.titulo && <h3 id="video-titulo">{video.titulo}</h3>}
          <iframe
            src={video.url}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            title={video.titulo || "Vídeo explicativo"}
          />
        </section>
      )}

      {secoes.map(sec => (
        <article className="ct-section" key={sec.id} aria-labelledby={`sec-${sec.id}`}>
          <div className="ct-sec-inner">
            <div>
              <h2 id={`sec-${sec.id}`} className="ct-sec-title">{sec.titulo}</h2>
              {sec.paragrafos?.map((p, i) => (
                <p className="ct-sec-text" key={i}>{p}</p>
              ))}
              {sec.lista?.length ? (
                <ul className="ct-sec-list">
                  {sec.lista.map((li, i) => <li key={i}>{li}</li>)}
                </ul>
              ) : null}
              {sec.cta?.length ? (
                <div className="ct-actions">
                  {sec.cta.map((btn, i) => (
                    <a key={i} className="ct-btn" href={btn.href}>{btn.label}</a>
                  ))}
                </div>
              ) : null}
            </div>

            {sec.imagem?.src && (
              <figure className="ct-figure">
                <img className="ct-img" src={sec.imagem.src} alt={sec.imagem.alt || ""} loading="lazy" />
                {sec.imagem.legenda && <figcaption className="ct-cap">{sec.imagem.legenda}</figcaption>}
              </figure>
            )}
          </div>
        </article>
      ))}
    </main>
  );
}

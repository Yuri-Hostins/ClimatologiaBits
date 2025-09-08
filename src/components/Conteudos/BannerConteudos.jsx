import React from "react";

export default function BannerConteudos({ titulo, descricao, topicos, actions }) {
  return (
    <div className="ct-hero">
      <div className="ct-shell ct-hero-inner">
        <span className="ct-eyebrow">ClimatologiaBits</span>
        <h1 className="ct-title">{titulo}</h1>
        {descricao && <p className="ct-lead">{descricao}</p>}
        {topicos && <p className="ct-topics">{topicos}</p>}

        {/* NOVO: área de ações (modo e vídeo) */}
        {actions && <div className="ct-toolbar">{actions}</div>}
      </div>
    </div>
  );
}

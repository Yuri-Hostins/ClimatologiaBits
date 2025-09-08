import React, { useEffect, useState, useMemo } from "react";
import Navbar from "../../components/layout/navbar";
import Footer from "../../components/layout/footer";
import BannerConteudos from "../../components/Conteudos/BannerConteudos";
import ComponenteConteudo from "../../components/Conteudos/ComponenteConteudo";
import SlideDeck from "../../components/Conteudos/SlideDeck";
import subtropical, { subtropicalSlides } from "../../conteudos/subtropical";
import "../../styles/Conteudos.css";

const SLUG = "subtropical";
const STORAGE_KEY = `cb:prefs:${SLUG}`;

// 🔹 helper para ler prefs
const readPrefs = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
};

export default function SubtropicalPage() {
  // 🔹 estado já nasce do localStorage (sem piscar)
  const init = readPrefs();
  const [mode, setMode] = useState(
    init.mode === "texto" || init.mode === "slides" ? init.mode : "texto"
  );
  const [showVideo, setShowVideo] = useState(
    typeof init.showVideo === "boolean" ? init.showVideo : true
  );

  useEffect(() => {
    document.title = 'Subtropical | ClimatologiaBits';

    if (mode === "texto" || mode === "slides") {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ mode, showVideo }));
      } catch { }
    }
  }, [mode, showVideo]);

  const actions = (
    <>
      {/* Toggle de modo */}
      <div className="ct-seg" role="tablist" aria-label="Modo de visualização">
        <button
          type="button"
          className={`ct-toggle ${mode === "texto" ? "is-active" : ""}`}
          aria-pressed={mode === "texto"}
          onClick={() => setMode("texto")}
        >
          Texto
        </button>
        <button
          type="button"
          className={`ct-toggle ${mode === "slides" ? "is-active" : ""}`}
          aria-pressed={mode === "slides"}
          onClick={() => setMode("slides")}
        >
          Slides
        </button>
      </div>

      {/* 🔹 Switch de vídeo só aparece no modo texto */}
      {mode !== "slides" && (
        <label className="ct-switch">
          <input
            type="checkbox"
            checked={showVideo}
            onChange={(e) => setShowVideo(e.target.checked)}
          />
          <span className="ct-switch-visual" aria-hidden="true" />
          <span className="ct-switch-label">
            {showVideo ? "Com vídeo" : "Sem vídeo"}
          </span>
        </label>
      )}
    </>
  );

   // Adapta subtropicalSlides -> SlideDeck schema
  const slidesAdaptados = useMemo(() => {
    return (subtropicalSlides || []).map((s, i) => ({
      title: s.title,
      subtitle: s.subtitle,
      layout: "split",
      flip: i % 2 === 1,
      content: Array.isArray(s.bullets)
        ? s.bullets.map((b) => b) 
        : s.content || null,
      media: s.img
        ? { type: "img", src: s.img.src, alt: s.img.alt || s.title }
        : s.media || null,
      caption: s.img?.credit || s.caption || null,
    }));
  }, []);

  

  return (  
    <>
     <Navbar />
      <BannerConteudos
        titulo="Clima Subtropical"
        descricao="Aqui você encontra um panorama direto sobre o clima subtropical, com foco no Sul do Brasil."
        topicos="Características gerais, influências, impactos ambientais, aspectos socioeconômicos e curiosidades."
        actions={actions}
      />

      {mode === "texto" ? (
        <ComponenteConteudo
          secoes={subtropical}
          video={
            showVideo
              ? {
                  titulo: "Vídeo explicativo (opcional)",
                  url: "https://www.youtube.com/embed/XeJmPOoZOo0?si=KIryY6qToPaCkRH4",
                }
              : undefined
          }
        />
      ) : (
        <SlideDeck
          slides={slidesAdaptados}
          onExit={() => setMode("texto")} // Esc volta para Texto
        />
      )}

      <Footer />
    </>
  );
}

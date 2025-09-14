import React from "react";

export default function ModeSelect({ onChoose }) {
  return (
    <section className="quiz-mode">
      <header className="quiz-mode-head">
        <h1 className="quiz-mode-title">ClimaQuiz</h1>
        <p className="quiz-mode-sub">
          Escolha como você quer jogar:
        </p>
      </header>

      <div className="quiz-mode-grid">
        <article className="mode-card">
          <div className="mode-illu" aria-hidden="true">🌤️</div>
          <h2>Singleplayer</h2>
          <p>Jogue sozinho, com tempo por pergunta e placar final.</p>
          <button className="btn primary" onClick={() => onChoose("sp")}>
            Começar no Singleplayer
          </button>
        </article>

        <article className="mode-card disabled">
          <div className="mode-illu" aria-hidden="true">🧑‍🤝‍🧑</div>
          <h2>Multiplayer</h2>
          <p>Desafie amigos em tempo real. <i>Em breve.</i></p>
          <button className="btn" disabled>
            Em breve
          </button>
        </article>
      </div>
    </section>
  );
}

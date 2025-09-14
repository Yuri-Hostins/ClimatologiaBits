import React from "react";

export default function RulesDialog({
  mode = "sp",
  onCancel,
  onStart,
  secondsPerQ = 25,
  total = 10,
  difficulty = "facil",
  onChangeDifficulty = () => {},
}) {
  const title = mode === "sp" ? "Regras — Singleplayer" : "Regras — Multiplayer";

  const secsByDiff = { facil: 25, medio: 15, dificil: 8 };
  const labels = { facil: "Fácil", medio: "Médio", dificil: "Difícil" };

  const Chip = ({ id }) => (
    <button
      type="button"
      className={`chip ${difficulty === id ? "active" : ""}`}
      onClick={() => onChangeDifficulty(id)}
      aria-pressed={difficulty === id}
    >
      {labels[id]}
      <span className="chip-sec">{secsByDiff[id]}s</span>
    </button>
  );

  return (
    <section className="quiz-card rules-card" aria-labelledby="rules-title">
      <header className="quiz-head">
        <h2 id="rules-title" className="quiz-title">{title}</h2>
        <div className="quiz-meta">
          <span>Rodada: <b>{total}</b></span>
          <span>•</span>
          <span>Tempo: <b>{secondsPerQ}s</b></span>
        </div>
      </header>

      <div className="quiz-body">
        {/* seletor de dificuldade */}
        <div className="diff-select" role="group" aria-label="Selecionar dificuldade">
          <Chip id="facil" />
          <Chip id="medio" />
          <Chip id="dificil" />
        </div>

        {mode === "sp" ? (
          <>
            <ol className="rules-list">
              <li>Você terá <b>{secondsPerQ} segundos</b> por pergunta (de acordo com a dificuldade acima).</li>
              <li>Após confirmar a alternativa, não é possível desfazer.</li>
              <li>Se o tempo acabar, a questão é registrada como errada.</li>
              <li>
                Teclado: <code>1…9</code> (alternativas), <code>V/F</code> (VF),
                <kbd>Enter</kbd> (confirmar).
              </li>
              <li>Seu resultado sai no final — tente bater seu melhor placar!</li>
            </ol>
          </>
        ) : (
          <p>O modo multiplayer estará disponível em breve.</p>
        )}
      </div>

      <footer className="quiz-foot">
        <button className="btn" onClick={onCancel}>Voltar</button>
        <button className="btn primary" onClick={onStart}>Começar</button>
      </footer>
    </section>
  );
}

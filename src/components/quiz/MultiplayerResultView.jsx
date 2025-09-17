import React from "react";

/**
 * props:
 * - pool: array das perguntas (mesmo do jogo)
 * - answers: { [qi]: { p1:{choice, timeout}, p2:{choice, timeout} } }
 * - score: { p1:number, p2:number }
 * - p1Name, p2Name: string
 * - onRestart: () => void
 */
export default function MultiplayerResultView({ pool, answers, score, p1Name = "Jogador 1", p2Name = "Jogador 2", onRestart }) {
  // util para texto correto
  const correctText = (q) =>
    q.type === "mc" ? q.options[q.answer] : (q.answer ? "Verdadeiro" : "Falso");

  const badge = (ok, timeout) => (
    <span className={`mini-badge ${timeout ? "timeout" : ok ? "ok" : "no"}`}>
      {timeout ? "Tempo" : ok ? "✓" : "✗"}
    </span>
  );

  const wasCorrect = (q, choice) => (choice !== null && choice !== undefined && choice === q.answer);

  return (
    <div className="quiz-card">
      <header className="quiz-head">
        <h2 className="quiz-title">ClimaQuiz — Multiplayer</h2>
        <div className="quiz-meta"><span>Fim!</span></div>
      </header>

      <div className="quiz-body">
        <h3 style={{ marginTop: 0 }}>Placar final</h3>
        <p><b>{p1Name}:</b> {score.p1}</p>
        <p><b>{p2Name}:</b> {score.p2}</p>

        <details className="quiz-review" style={{ marginTop: 12 }}>
          <summary>Ver gabarito / explicações</summary>

          <ol className="review-list" style={{ marginTop: 10 }}>
            {pool.map((q, i) => {
              const a = answers[i] || {};
              const p1 = a.p1 ?? { choice: null, timeout: true };
              const p2 = a.p2 ?? { choice: null, timeout: true };

              const p1ok = wasCorrect(q, p1.choice);
              const p2ok = wasCorrect(q, p2.choice);

              return (
                <li key={q.id} className="review-item">
                  <header className="review-head">
                    <span className="badge neutral">?</span>
                    <p className="q">{q.prompt}</p>
                  </header>

                  <p className="a ok">Correto: <b>{correctText(q)}</b></p>

                  {/* status de cada jogador */}
                  <div className="mp-row">
                    <div className="mp-col">
                      <div className="mp-name">{p1Name}</div>
                      {badge(p1ok, !!p1.timeout)}
                    </div>
                    <div className="mp-col">
                      <div className="mp-name">{p2Name}</div>
                      {badge(p2ok, !!p2.timeout)}
                    </div>
                  </div>

                  {q.explanation ? <p className="exp">{q.explanation}</p> : null}
                </li>
              );
            })}
          </ol>
        </details>
      </div>

      <footer className="quiz-foot">
        <button className="btn primary" onClick={onRestart}>Jogar novamente</button>
      </footer>
    </div>
  );
}

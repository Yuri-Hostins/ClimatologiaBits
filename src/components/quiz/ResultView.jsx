export default function ResultView({ pool, answers, high, onRestart, onExit }) {
  const score = answers.filter((x) => x.correct).length;

  return (
    <div className="quiz-card" role="region" aria-label="Resultado do quiz">
      <h2 className="quiz-title">Resultado</h2>
      <p className="quiz-score">
        Você acertou <b>{score}</b> de <b>{pool.length}</b>.
      </p>

      {high?.best ? (
        <p className="quiz-high">
          Seu melhor: <b>{high.best}</b> (
          {high.date ? new Date(high.date).toLocaleDateString() : "—"})
        </p>
      ) : null}

      <details className="quiz-review">
        <summary>Ver gabarito / explicações</summary>
        <ol className="review-list">
          {pool.map((qq, i) => {
            const r = answers[i];
            const was =
              qq.type === "mc"
                ? qq.options[qq.answer]
                : qq.answer
                  ? "Verdadeiro"
                  : "Falso";
            return (
              <li key={qq.id} className="review-item">
                <header className="review-head">
                  <span className={`badge ${r.correct ? "ok" : "no"}`} aria-hidden="true">
                    {r.correct ? "✓" : "✗"}
                  </span>
                  <p className="q">{qq.prompt}</p>
                </header>
                <p className={`a ${r.correct ? "ok" : "no"}`}>
                  Correto: <b>{was}</b>
                </p>
                {qq.explanation ? <p className="exp">{qq.explanation}</p> : null}
              </li>
            );
          })}
        </ol>
      </details>

      <div className="quiz-actions">
        <button className="btn primary" onClick={onRestart}>Jogar novamente</button>
        {onExit ? <button className="btn" onClick={onExit}>Sair do Quiz</button> : null}
      </div>
    </div>
  );
}

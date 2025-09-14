export function QuestionPrompt({ q, showTags = true }) {
  return (
    <>
      {showTags && q.tags?.length ? (
        <div className="quiz-tags" aria-hidden="true">
          {q.tags.map((t) => (
            <span key={t} className="chip">{t}</span>
          ))}
        </div>
      ) : null}

      <div className="quiz-body">
        {q.image ? (
          <figure className="quiz-figure" aria-hidden="true">
            <img src={q.image} alt="" loading="lazy" />
          </figure>
        ) : null}

        <p className="quiz-prompt">{q.prompt}</p>
      </div>
    </>
  );
}

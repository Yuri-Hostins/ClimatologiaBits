export function OptionsMC({ q, selected, onSelect }) {
  return (
    <ul className="quiz-list" role="listbox" aria-label="Alternativas">
      {q._opts.map((o, idx) => {
       const originalIndex = o.orig;
        const isSel = selected === originalIndex;
        return (
          <li key={idx}>
            <button
              className={`opt ${isSel ? "is-selected" : ""}`}
              onClick={() => onSelect(originalIndex)}
            >
              <span className="kbd">{idx + 1}</span>
              {o.t}
            </button>
          </li>
        );
      })}
    </ul>
  );
}

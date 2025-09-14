export function OptionsTF({ selected, onSelect }) {
  return (
    <div className="quiz-bool">
      <button
        className={`opt ${selected === true ? "is-selected" : ""}`}
        onClick={() => onSelect(true)}
      >
        <span className="kbd">V</span> Verdadeiro
      </button>
      <button
        className={`opt ${selected === false ? "is-selected" : ""}`}
        onClick={() => onSelect(false)}
      >
        <span className="kbd">F</span> Falso
      </button>
    </div>
  );
}

// src/components/quiz/QuizGame.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import "../../styles/quiz/quiz.css";

const STORAGE_SETTINGS = "cb:quiz:settings";
const STORAGE_HIGHSCORE = "cb:quiz:highscore";

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

export default function QuizGame({
  bank = [],
  total = 8,           // nº de questões por rodada
  showTags = true,
  enableTimer = false, // defina true para cronômetro por questão
  secondsPerQ = 25,
  title = "Quiz de Climatologia",
}) {
  const [seed, setSeed] = useState(() => Math.random());
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]); // {id, correct, chosen}
  const [selected, setSelected] = useState(null);
  const [locked, setLocked] = useState(false);
  const [timeLeft, setTimeLeft] = useState(secondsPerQ);
  const [high, setHigh] = useState(() => {
    const raw = localStorage.getItem(STORAGE_HIGHSCORE);
    return raw ? JSON.parse(raw) : { best: 0, date: null };
  });

  // carrega settings (pode expandir com dificuldade, etc.)
  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_SETTINGS);
    if (raw) {
      try {
        const s = JSON.parse(raw);
        if (typeof s.secondsPerQ === "number") {
          // exemplo de restauração — opcional
        }
      } catch {}
    }
  }, []);

  const pool = useMemo(() => {
    // “embaralha” sempre que seed muda
    const sliced = shuffle(bank).slice(0, Math.min(total, bank.length));
    return sliced.map((q, idx) =>
      q.type === "mc"
        ? { ...q, _opts: shuffle(q.options).map((t, i) => ({ t, i })) }
        : q
    );
  }, [bank, total, seed]);

  const q = pool[current];
  const done = current >= pool.length;

  // Timer por questão (opcional)
  useEffect(() => {
    if (!enableTimer || done || locked) return;
    setTimeLeft(secondsPerQ);
    const id = setInterval(() => {
      setTimeLeft((v) => {
        if (v <= 1) {
          clearInterval(id);
          // tempo esgotou → submete como errado (ou pula)
          handleSubmit(null, true);
          return secondsPerQ;
        }
        return v - 1;
      });
    }, 1000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current, enableTimer, locked, done]);

  function handleSubmit(choice, timeout = false) {
    if (locked || done) return;
    setLocked(true);
    let correct = false;

    if (q.type === "mc") {
      const chosenIndexInOriginal =
        q.options.indexOf(q._opts.find((o) => o.i === choice)?.t);
      correct = chosenIndexInOriginal === q.answer;
    } else {
      correct = choice === q.answer;
    }

    setAnswers((a) => [...a, { id: q.id, correct, chosen: choice, timeout }]);

    // atualiza recorde ao final
    setTimeout(() => {
      setLocked(false);
      setSelected(null);
      setCurrent((i) => i + 1);
    }, 650);
  }

  function restart() {
    setSeed(Math.random());
    setCurrent(0);
    setAnswers([]);
    setSelected(null);
    setLocked(false);
  }

  // highscore
  useEffect(() => {
    if (!done) return;
    const score = answers.filter((x) => x.correct).length;
    if (score > (high?.best || 0)) {
      const payload = { best: score, date: new Date().toISOString() };
      setHigh(payload);
      localStorage.setItem(STORAGE_HIGHSCORE, JSON.stringify(payload));
    }
  }, [done, answers, high]);

  // navegação por teclado
  const rootRef = useRef(null);
  useEffect(() => {
    const host = rootRef.current;
    if (!host) return;
    function onKey(e) {
      if (locked) return;
      if (e.key === "Enter" && selected !== null) {
        handleSubmit(selected);
      }
      if (q?.type === "tf") {
        if (e.key.toLowerCase() === "v") setSelected(true);
        if (e.key.toLowerCase() === "f") setSelected(false);
      }
      if (q?.type === "mc") {
        const n = parseInt(e.key, 10);
        if (!Number.isNaN(n) && n >= 1 && n <= q.options.length) {
          // encontra opção n na ordem embaralhada
          const target = q._opts[n - 1]?.i;
          if (typeof target === "number") setSelected(target);
        }
      }
    }
    host.addEventListener("keydown", onKey);
    return () => host.removeEventListener("keydown", onKey);
  }, [q, selected, locked]);

  if (done) {
    const score = answers.filter((x) => x.correct).length;
    return (
      <div className="quiz-card" ref={rootRef} tabIndex={0} role="region" aria-label="Resultado do quiz">
        <h2 className="quiz-title">Resultado</h2>
        <p className="quiz-score">
          Você acertou <b>{score}</b> de <b>{pool.length}</b>.
        </p>

        {high?.best ? (
          <p className="quiz-high">
            Seu melhor: <b>{high.best}</b> ({new Date(high.date).toLocaleDateString()})
          </p>
        ) : null}

        <details className="quiz-review">
          <summary>Ver gabarito / explicações</summary>
          <ol>
            {pool.map((qq, i) => {
              const r = answers[i];
              const was =
                qq.type === "mc"
                  ? qq.options[qq.answer]
                  : qq.answer
                  ? "Verdadeiro"
                  : "Falso";
              return (
                <li key={qq.id}>
                  <p className="q">{qq.prompt}</p>
                  <p className={`a ${r.correct ? "ok" : "no"}`}>
                    Correto: {was}
                  </p>
                  {qq.explanation ? (
                    <p className="exp">{qq.explanation}</p>
                  ) : null}
                </li>
              );
            })}
          </ol>
        </details>

        <div className="quiz-actions">
          <button className="btn" onClick={restart}>Jogar novamente</button>
        </div>
      </div>
    );
  }

  // render da questão atual
  return (
    <div className="quiz-card" ref={rootRef} tabIndex={0} role="group" aria-label={title}>
      <header className="quiz-head">
        <h2 className="quiz-title">{title}</h2>
        <div className="quiz-meta">
          <span>{current + 1}/{pool.length}</span>
          {enableTimer && (
            <span className={`timer ${timeLeft <= 5 ? "warn" : ""}`} aria-live="polite">
              {timeLeft}s
            </span>
          )}
        </div>
      </header>

      {showTags && q.tags?.length ? (
        <div className="quiz-tags" aria-hidden="true">
          {q.tags.map((t) => <span key={t} className="chip">{t}</span>)}
        </div>
      ) : null}

      <div className="quiz-body">
        {q.image ? (
          <figure className="quiz-figure" aria-hidden="true">
            <img src={q.image} alt="" loading="lazy" />
          </figure>
        ) : null}

        <p className="quiz-prompt">{q.prompt}</p>

        {q.type === "mc" ? (
          <ul className="quiz-list" role="listbox" aria-label="Alternativas">
            {q._opts.map((o, idx) => {
              const originalIndex = q.options.indexOf(o.t);
              const isSel = selected === originalIndex;
              return (
                <li key={idx}>
                  <button
                    className={`opt ${isSel ? "is-selected" : ""}`}
                    onClick={() => setSelected(originalIndex)}
                  >
                    <span className="kbd">{idx + 1}</span>
                    {o.t}
                  </button>
                </li>
              );
            })}
          </ul>
        ) : (
          <div className="quiz-bool">
            <button
              className={`opt ${selected === true ? "is-selected" : ""}`}
              onClick={() => setSelected(true)}
            >
              <span className="kbd">V</span> Verdadeiro
            </button>
            <button
              className={`opt ${selected === false ? "is-selected" : ""}`}
              onClick={() => setSelected(false)}
            >
              <span className="kbd">F</span> Falso
            </button>
          </div>
        )}
      </div>

      <footer className="quiz-foot">
        <button
          className="btn primary"
          disabled={selected === null || locked}
          onClick={() => handleSubmit(selected)}
        >
          Confirmar
        </button>
      </footer>
    </div>
  );
}

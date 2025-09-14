import React from "react";
import QuizFrame from "./QuizFrame";
import { QuestionPrompt } from "./QuestionPrompt";
import { OptionsMC } from "./OptionsMC";
import { OptionsTF } from "./OptionsTF";
import ResultView from "./ResultView";
import { useQuizEngine } from "../../hook/quizgame/useQuizEngine";

import "../../styles/quiz/quiz.css";


export default function QuizGame({
  bank = [],
  total = 10,
  showTags = true,
  enableTimer = false,
  secondsPerQ = 25,
  title = "Quiz de Climatologia",
  difficulty = "facil", // "facil" | "medio" | "dificil"
}) {
  const eng = useQuizEngine({ bank, total, enableTimer, secondsPerQ });
  const { hostRef, pool, current, q, done, selected, setSelected, locked,
    timeLeft, submit, restart, high, answers } = eng;

  if (done) {
    return <ResultView pool={pool} answers={answers} high={high} onRestart={restart} />;
  }

  return (
    <div ref={hostRef} tabIndex={0}>
      <QuizFrame
        title={title}
        stepText={`${current + 1}/${pool.length}`}
        badgeRight={
          <span className={`chip diff ${difficulty}`}>
            {difficulty === "facil" ? "Fácil" : difficulty === "medio" ? "Médio" : "Difícil"}
          </span>
        }
        timer={
          enableTimer ? (
            <span className={`timer ${timeLeft <= 5 ? "warn" : ""}`} aria-live="polite">
              {timeLeft}s
            </span>
          ) : null
        }
        footer={
          <button
            className="btn primary"
            disabled={selected === null || locked}
            onClick={() => submit(selected)}
          >
            Confirmar
          </button>
        }
      >
        <QuestionPrompt q={q} showTags={showTags} />
        {q.type === "mc" ? (
          <OptionsMC q={q} selected={selected} onSelect={setSelected} />
        ) : (
          <OptionsTF selected={selected} onSelect={setSelected} />
        )}
      </QuizFrame>
    </div>
  );
}

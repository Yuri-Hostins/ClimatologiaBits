import React from "react";
import QuizFrame from "./QuizFrame";
import { QuestionPrompt } from "./QuestionPrompt";
import { OptionsMC } from "./OptionsMC";
import { OptionsTF } from "./OptionsTF";
import { useMPQuizEngine } from "../../hook/quizgame/useMPQuizEngine";
import MultiplayerResultView from "./MultiplayerResultView";

// Visual de revelação: aplica classe quando for a vez de mostrar o correto.
// Se você já tem lógica de highlight nas Options, basta usar as props abaixo.
export default function MultiplayerGame({
  bank = [],
  total = 10,
  enableTimer = true,
  secondsPerQ = 25,
  title = "ClimaQuiz — Multiplayer",
  difficulty = "facil",
  showTags = true,
  p1Name = "Jogador 1",
  p2Name = "Jogador 2",
}) {
  const eng = useMPQuizEngine({ bank, total, enableTimer, secondsPerQ });

  const {
    pool, current, q, done,
    turn, score,
    selected, setSelected, locked,
    phase, waitingP2Ready, readyP2,
    timeLeft, submit, restart, answers
  } = eng;

  if (done) {

    return (
 <MultiplayerResultView
   pool={pool}
   answers={answers}
   score={score}
   p1Name={p1Name}
   p2Name={p2Name}
   onRestart={restart}
 />
);
  }

  // badge de dificuldade (visual opcional)
  const diffLabel = difficulty === "facil" ? "Fácil"
    : difficulty === "medio" ? "Médio" : "Difícil";

  // badge de turno
  const turnBadge = (
    <span className={`chip ${turn === "p1" ? "ok" : "no"}`}>
      {turn === "p1" ? `Vez de ${p1Name}` : `Vez de ${p2Name}`}
    </span>
  );

  // placar compacto
  const scoreboard = (
    <span className="chip" style={{ fontWeight: 800 }}>
      {p1Name}: {score.p1} • {p2Name}: {score.p2}
    </span>
  );
  // timer
  const timerEl = enableTimer ? (
    <span className={`timer ${timeLeft <= 5 ? "warn" : ""}`} aria-live="polite">
      {timeLeft}s
    </span>
  ) : null;

  return (
    <div>
      <QuizFrame
        title={title}
        stepText={`${current + 1}/${pool.length}`}
        badge={
          <>
            {turnBadge}
            <span className={`chip diff ${difficulty}`} style={{ marginLeft: 6 }}>{diffLabel}</span>
          </>
        }
        badgeRight={scoreboard}
        timer={timerEl}
        footer={
          waitingP2Ready ? (
            <button className="btn primary" onClick={readyP2}>
              Jogador 2, estou pronto
            </button>
          ) : (
            <button
              className="btn primary"
              disabled={selected === null || locked || phase !== "answer"}
              onClick={() => submit(selected)}
            >
              Confirmar
            </button>
          )
        }
      >
        <QuestionPrompt q={q} showTags={showTags} />

        {phase === "reveal" && (
          <div className="info" style={{ marginBottom: 10 }}>
            Revelando resposta…
          </div>
        )}

        {q.type === "mc" ? (
          <OptionsMC
            q={q}
            selected={selected}
            onSelect={setSelected}
          />
        ) : (
          <OptionsTF
            selected={selected}
            onSelect={setSelected}
          />
        )}
      </QuizFrame>
    </div>
  );
}

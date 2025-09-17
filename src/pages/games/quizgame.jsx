import React from "react";

import Navbar from "../../components/layout/navbar";
import Footer from "../../components/layout/footer";
import QuizGame from "../../components/quiz/QuizGame";
import MultiplayerGame from "../../components/quiz/MultiplayerGame";
import ModeSelect from "../../components/quiz/ModeSelect";
import RulesDialog from "../../components/quiz/RulesDialog";
import { QUIZ_BANK } from "../../conteudos/game/QuizData";

export default function QuizPage() {
  const total = 10;

  const [phase, setPhase] = React.useState("menu");     // "menu" | "rules" | "game"
  const [mode, setMode] = React.useState("sp");         // "sp" | "mp"
  const [difficulty, setDifficulty] = React.useState("facil"); // "facil" | "medio" | "dificil"
  const [p1Name, setP1Name] = React.useState(localStorage.getItem("cb_p1") || "");
  const [p2Name, setP2Name] = React.useState(localStorage.getItem("cb_p2") || "");

  const DIFF = { facil: 25, medio: 15, dificil: 8 };
  const secondsPerQ = DIFF[difficulty];

  return (
    <>
      <Navbar />
      <main className="main-quiz">
        {phase === "menu" && (
          <ModeSelect
            mode={mode}
            setMode={setMode}
            onChoose={(m) => {
              setMode(m);
              setPhase("rules");
            }}
          />
        )}

        {phase === "rules" && (
          <RulesDialog
            mode={mode}
            total={total}
            secondsPerQ={secondsPerQ}
            difficulty={difficulty}
            onChangeDifficulty={setDifficulty}
            p1Name={p1Name}
            p2Name={p2Name}
            onChangeP1={setP1Name}
            onChangeP2={setP2Name}
            onCancel={() => setPhase("menu")}
            onStart={() => {
              const n1 = p1Name?.trim() || "Jogador 1";
              const n2 = p2Name?.trim() || "Jogador 2";
              setP1Name(n1); setP2Name(n2);
              localStorage.setItem("cb_p1", n1);
              localStorage.setItem("cb_p2", n2);
              setPhase("game");
            }}
          />
        )}

        {phase === "game" && mode === "sp" && (
          <QuizGame
            bank={QUIZ_BANK}
            total={total}
            topic="subtropical"
            showTags
            enableTimer
            secondsPerQ={secondsPerQ}
            title="ClimaQuiz — Singleplayer"
            difficulty={difficulty}
          />
        )}

        {phase === "game" && mode === "mp" && (
          <MultiplayerGame
            bank={QUIZ_BANK}
            total={total}
            enableTimer
            secondsPerQ={secondsPerQ}
            title="ClimaQuiz — Multiplayer"
            difficulty={difficulty}
            p1Name={p1Name}
            p2Name={p2Name}
          />
        )}
      </main>
      <Footer />
    </>
  );
}

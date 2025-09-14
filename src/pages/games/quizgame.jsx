import React, { useState } from "react";

import Navbar from "../../components/layout/navbar";
import Footer from "../../components/layout/footer";
import QuizGame from "../../components/quiz/QuizGame";
import ModeSelect from "../../components/quiz/ModeSelect";
import RulesDialog from "../../components/quiz/RulesDialog";
import { QUIZ_BANK } from "../../conteudos/game/QuizData";

export default function QuizPage() {


  // ajustes padrão para o singleplayer:
  const total = 10;
  const [phase, setPhase] = React.useState("menu");
  const [setMode] = useState("sp");
  const [difficulty, setDifficulty] = React.useState("facil"); // "facil" | "medio" | "dificil"
  const DIFF = { facil: 25, medio: 15, dificil: 8 };
  const secondsPerQ = DIFF[difficulty];
  

  return (
    <>
      <Navbar />
      <main className="main-quiz">
        {phase === "menu" && (
          <ModeSelect
            onChoose={(m) => {
              setMode(m);
              setPhase("rules");
            }}
          />
        )}

        {phase === "rules" ? (
          <RulesDialog
            mode="sp"
            total={total}
            secondsPerQ={secondsPerQ}
            difficulty={difficulty}
            onChangeDifficulty={setDifficulty}
            onCancel={() => setPhase("menu")}
            onStart={() => setPhase("game")}
          />
        ) : null}

        {phase === "game" ? (
          <QuizGame
            bank={QUIZ_BANK}
            total={total}
            topic="subtropical"
            showTags
            enableTimer={true}
            secondsPerQ={secondsPerQ}
            title="ClimaQuiz — Singleplayer"
            
          />
        ) : null}
      </main>
      <Footer />
    </>
  );
}

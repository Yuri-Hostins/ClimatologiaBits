import React from "react";
import Navbar from "../../components/layout/navbar";
import Footer from "../../components/layout/footer";
import QuizGame from "../../components/quiz/QuizGame";
import { QUIZ_BANK } from "../../conteudos/game/QuizData";

export default function QuizPage(){
  return (
    <>
      <Navbar />
      <section className="gb-shell" style={{padding: "26px 0"}}>
        <QuizGame bank={QUIZ_BANK} total={8} enableTimer={false} />
      </section>
      <Footer />
    </>
  );
}

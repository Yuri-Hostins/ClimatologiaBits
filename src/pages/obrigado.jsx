import React from "react";
import ThemeToggle from "../components/layout/ThemeToggle";
import QuoteStrip from "../components/common/QuoteStrip";
import "../styles/pages/obrigado.css";

export default function ObrigadoPage() {

  document.title = "Obrigado | ClimatologiaBits";

  return (
    <>
      {/* Botão de tema flutuante, no topo direito */}
      <ThemeToggle floating />

      <section className="thx-hero" aria-labelledby="thx-title">
        {/* fundo decorativo que você já tem */}
        <div className="thx-bg" aria-hidden="true">
          <span className="thx-bubble thx-b1" />
          <span className="thx-bubble thx-b2" />
          <span className="thx-bubble thx-b3" />
        </div>

        {/* card central */}
        <div className="thx-card">
          <div className="thx-icon" aria-hidden="true">✔</div>
          <h1 id="thx-title" className="thx-title">Mensagem enviada!</h1>
          <p className="thx-text">
            Recebemos sua mensagem e retornaremos por nós em breve. Enquanto isso, você pode voltar
            para a página inicial ou explorar nossos conteúdos.
          </p>
          <div className="thx-actions">
            <a href="/" className="thx-btn thx-primary">Voltar ao início</a>
            <a href="/?to=conteudos" className="thx-btn thx-ghost">Explorar conteúdos</a>
          </div>
        <QuoteStrip />

        </div>
      </section>
    </>
  );
}

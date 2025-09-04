import React, { useEffect} from 'react';
import { Link } from "react-router-dom";
import "../styles/pages/notfound.css";

export default function NotFound() {

  useEffect(() => {
    document.title = 'Erro 404 | ClimatologiaBits';
  }, []);  

  return (
    <section className="nf-hero" aria-labelledby="nf-title">
      {/* Fundo de cena (preenche toda a viewport) */}
      <div className="nf-bg" aria-hidden="true">
        <div className="nf-sky">
          <span className="nf-cloud" />
          <span className="nf-cloud is-2" />
          <span className="nf-bubble" />
        </div>
      </div>

      {/* Card central */}
      <div className="nf-card">
        <div className="nf-code" aria-hidden="true">
          <span>4</span>
          <span>0</span>
          <span>4</span>
        </div>

        <h1 id="nf-title" className="nf-title">
          Opa! Não encontramos a página que você tentou acessar.
        </h1>

        <p className="nf-text">
          Talvez o link tenha mudado ou nunca existiu. Você pode voltar para a
          página inicial ou explorar nossos conteúdos.
        </p>

        <div className="nf-actions">
          <Link to="/" className="nf-btn nf-primary">Voltar ao início</Link>
          <Link to="/conteudos" className="nf-btn nf-ghost">Explorar conteúdos</Link>
        </div>
      </div>
    </section>
  );
}

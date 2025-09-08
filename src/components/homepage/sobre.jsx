import React from "react";

const sobreImg = `${process.env.PUBLIC_URL}/assets/img/homepage/sobre/background.png`;
export default function SobreSection() {
  const goTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    const base = `${window.location.origin}/`;
    window.location.assign(`${base}?to=${encodeURIComponent(id)}`);
  };

  return (
    <section id="sobre" className="gb-section sobre" aria-label="Sobre o projeto">
      <div className="gb-shell">
        <div className="sobre-two">
          {/* texto */}
          <div className="sobre-left">
            <h2 className="sobre-heading">
              <span className="dropcap" aria-hidden="true">S</span>obre
            </h2>

            <p className="sobre-lead">
              O <b>ClimatologiaBits</b> é um trabalho escolar de
              <strong> Climatologia em Geografia (3º ano do ensino médio)</strong>.
              A ideia é explicar os fenômenos do tempo e do clima de forma
              <strong> visual, direta e amigável</strong>.
            </p>

            <p className="sobre-text">
              O projeto foi feito com muito carinho para ajudar as pessoas a
              <strong> aprender climatologia de um jeito fácil e divertido</strong>.
              Aqui você encontra <strong>previsões</strong>, <strong>mapas</strong> e
              <strong> textos curtos</strong> com exemplos do cotidiano — para estudar em sala de aula ou em casa.
            </p>

            <p className="sobre-text">
              este trabalho é composto pela nossa equipe de{" "}
              <a
                href="/"
                onClick={(e) => { e.preventDefault(); goTo("integrantes"); }}
              >
                integrantes
              </a>.
            </p>

            <p className="sobre-text">
              nosso muito obrigado à nossa querida e dedicada professora{" "}
              <a
                href="https://instagram.com/amand.cruz"
                target="_blank"
                rel="noreferrer noopener"
                title="Instagram da professora Amanda Dias da Cruz"
              >
                Amanda Dias da Cruz 
              </a> — ela é top DEMAIS!
            </p>

            <ul className="sobre-list">
              <li>
                <span className="num">1º</span>
                <div>
                  <strong>Objetivo:</strong> levar conteúdo claro e confiável,
                  com visualizações simples que ajudam a entender os fenômenos.
                </div>
              </li>
              <li>
                <span className="num">2º</span>
                <div>
                  <strong>Objetivo:</strong> ser um site top!!
                </div>
              </li>
            </ul>

            <hr className="sobre-sep" />

            <div className="sobre-social">
              <a href="https://github.com/Yuri-Hostins" aria-label="GitHub" title="GitHub" className="social">
                {/* GitHub */}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" >
                  <path d="M12 .5a12 12 0 0 0-3.79 23.4c.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.38-1.35-1.75-1.35-1.75-1.1-.75.09-.74.09-.74 1.21.09 1.85 1.24 1.85 1.24 1.08 1.86 2.83 1.32 3.52 1.01.11-.78.42-1.32.76-1.62-2.66-.3-5.46-1.33-5.46-5.9 0-1.31.47-2.39 1.24-3.23-.12-.3-.54-1.52.12-3.17 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.65.24 2.87.12 3.17.77.84 1.24 1.92 1.24 3.23 0 4.59-2.8 5.59-5.47 5.89.43.37.81 1.1.81 2.22v3.29c0 .32.21.7.83.58A12 12 0 0 0 12 .5Z" />
                </svg>
              </a>
              <a href="https://www.instagram.com/yurihr.___/" aria-label="Instagram" target="_blank" title="Instagram" className="social">
                {/* instagram */}
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <rect x="4" y="4" width="16" height="16" rx="4" stroke="currentColor" strokeWidth="2" />
                  <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
                  <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" />
                </svg>
              </a>
              <a href="https://api.whatsapp.com/send/?phone=554797588370&text&type=phone_number&app_absent=0" target="_blank" aria-label="WhatsApp" title="WhatsApp" className="social">
                {/* whatsapp */}
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path d="M20.5 12a8.5 8.5 0 0 1-12 7.6L4 21l1.4-4.3A8.5 8.5 0 1 1 20.5 12Z" stroke="currentColor" strokeWidth="2" />
                  <path d="M8.8 9.9c.2-.6.5-.7.8-.7.2 0 .4 0 .6.1.2.1.5.7.6.9.1.2.1.3 0 .4-.1.2-.3.4-.4.5-.1.1-.2.2-.1.4.1.3.6 1 1.4 1.6.9.6 1.6.8 1.9.9.1 0 .3 0 .4-.1.1-.1.5-.6.6-.7.1-.1.2-.1.4 0 .2.1 1.2.6 1.4.7.2.1.3.1.4.2 0 .1 0 .8-.3 1.2-.3.4-1 .8-1.4.8-.3 0-2.6-.4-4.4-1.7-1.9-1.4-2.8-3.3-3-3.6-.2-.3-.6-1.1-.6-1.8 0-.6.3-1 .4-1.1Z" fill="currentColor" />
                </svg>
              </a>
            </div>
          </div>

          {/* imagem */}
          <figure className="sobre-figure" aria-hidden="true">
            <div className="sobre-frame">
              <img src={sobreImg} alt="" loading="lazy" />
            </div>
          </figure>
        </div>
      </div>
    </section>
  );
}

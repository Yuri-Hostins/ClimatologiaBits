import React, { useEffect, useRef, useState } from "react";

/** Select custom acessível + input hidden para Netlify */
function CbcSelect({ label, name, options = [], defaultValue }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(defaultValue || options[0] || "");
  const [cursor, setCursor] = useState(
    Math.max(0, options.indexOf(defaultValue))
  );

  const btnRef = useRef(null);
  const listRef = useRef(null);
  const wrapRef = useRef(null);

  // fecha clicando fora
  useEffect(() => {
    function onDoc(e) {
      if (!wrapRef.current?.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  function commit(i) {
    const v = options[i];
    if (!v) return;
    setValue(v);
    setCursor(i);
    setOpen(false);
  }

  function onKey(e) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setOpen(true);
      setCursor((c) => Math.min(options.length - 1, c + 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setOpen(true);
      setCursor((c) => Math.max(0, c - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (open) commit(cursor);
      else setOpen(true);
    } else if (e.key === "Escape") {
      setOpen(false);
      btnRef.current?.focus();
    }
  }

  useEffect(() => {
    if (open) {
      const el = listRef.current?.querySelector(`[data-i="${cursor}"]`);
      el?.scrollIntoView({ block: "nearest" });
    }
  }, [open, cursor]);

  return (
    <div className="cbc-field cbc-sel" ref={wrapRef}>
      <label className="cbc-sel-label" id={`${name}-label`}>{label}</label>

      {/* O Netlify lê este input */}
      <input type="hidden" name={name} value={value} />

      <button
        type="button"
        className={`cbc-sel-btn ${open ? "is-open" : ""}`}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-labelledby={`${name}-label`}
        onClick={() => setOpen((v) => !v)}
        onKeyDown={onKey}
        ref={btnRef}
      >
        <span className="cbc-sel-text">{value}</span>
        <span className="cbc-sel-caret" aria-hidden="true" />
      </button>

      {open && (
        <ul
          className="cbc-sel-list"
          role="listbox"
          aria-label={label}
          tabIndex={-1}
          ref={listRef}
          onKeyDown={onKey}
        >
          {options.map((opt, i) => (
            <li
              key={opt}
              role="option"
              aria-selected={opt === value}
              className={`cbc-sel-opt ${i === cursor ? "is-active" : ""} ${opt === value ? "is-selected" : ""}`}
              onMouseEnter={() => setCursor(i)}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => commit(i)}
              data-i={i}
            >
              {opt}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function Contato() {
  // imagem do bloco esquerdo (troque se quiser)
  const banner = `${process.env.PUBLIC_URL || ""}/assets/img/contact-banner.jpg`;

  return (
    <section id="contato" className="cbc-section" aria-labelledby="cbc-title">
      <div className="cbc-shell">

        {/* Esquerda: imagem + card de informações */}
        <aside className="cbc-left" style={{ backgroundImage: `url(${banner})` }}>
          <div className="cbc-left-inner">
            <h2 className="cbc-left-title">
              <span>Fale com a</span> ClimatologiaBits
            </h2>

            <div className="cbc-card">
              <a className="cbc-row" href="tel:+55479758-8370">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.6 10.8a15 15 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.24 11.3 11.3 0 0 0 3.2.5 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 8a1 1 0 0 1 1-1h3.6a1 1 0 0 1 1 1 11.3 11.3 0 0 0 .5 3.2 1 1 0 0 1-.25 1z"/></svg>
                <span>+55 (47) 9758-8370</span>
              </a>

              <a className="cbc-row" href="mailto:yurivn21@Outlook.com">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm0 4-8 5L4 8V6l8 5 8-5Z"/></svg>
                <span>yurivn21@outlook.com</span>
              </a>

              <a className="cbc-row" target="_blank" rel="noreferrer"
                 href="https://www.google.com/maps/place/Blumenau,+SC/@-26.8564099,-49.0991038,11z/data=!3m1!4b1!4m6!3m5!1s0x94df1e408b5c3095:0xacfb8520bc1a7644!8m2!3d-26.9165792!4d-49.0717331!16zL20vMDJ5Z2h6">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 14.5 9 2.5 2.5 0 0 1 12 11.5Z"/></svg>
                <span>Brasil, SC - Blumenau</span>
              </a>
            </div>
          </div>
        </aside>

        {/* Direita: formulário (Netlify) */}
        <div className="cbc-form-wrap">
          <h3 id="cbc-title" className="cbc-title">Envie uma mensagem</h3>

          <form
            name="contato"
            method="POST"
            data-netlify="true"
            netlify-honeypot="bot-field"
            action="/obrigado"
            className="cbc-form"
          >
            {/* obrigatório para Netlify */}
            <input type="hidden" name="form-name" value="contato" />

            <div className="cbc-field">
              <label htmlFor="nome">Nome</label>
              <input id="nome" name="nome" type="text" placeholder="Seu nome" required />
            </div>

            <div className="cbc-field">
              <label htmlFor="email">E-mail</label>
              <input id="email" name="email" type="email" placeholder="seu@email.com" required />
            </div>

            {/* Select custom estilizado */}
            <CbcSelect
              label="Assunto"
              name="assunto"
              options={["Sugestão", "Dúvida", "Bug"]}
              defaultValue="Sugestão"
            />

            <fieldset className="cbc-field cbc-inline" aria-label="Método preferido de contato">
              <legend>Preferência de contato</legend>
              <label className="cbc-radio">
                <input type="radio" name="prefer" value="Email" defaultChecked />
                <span>Email</span>
              </label>
              <label className="cbc-radio">
                <input type="radio" name="prefer" value="WhatsApp" />
                <span>WhatsApp</span>
              </label>
            </fieldset>

            <div className="cbc-field cbc-full">
              <label htmlFor="mensagem">Mensagem</label>
              <textarea id="mensagem" name="mensagem" rows={6} placeholder="Escreva aqui…" required />
            </div>

            <div className="cbc-actions">
              <button className="cbc-btn" type="submit">Enviar</button>
              <span className="cbc-hint">Você será redirecionado para “/obrigado”.</span>
            </div>
          </form>
        </div>

      </div>
    </section>
  );
}

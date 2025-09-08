import React, { useEffect, useState } from "react";
import "../../styles/components/quote-strip.css";

const STORAGE_KEY = "cb:quote:last";

const QUOTES = [
  // Bíblia
  { text: '"Entregue ao Senhor tudo o que você faz, e os seus planos serão bem-sucedidos."', ref: "Provérbios 16:3" },
  { text: '"Não fui eu que lhe ordenei? Seja forte e corajoso! Não se apavore, nem se desanime, pois o Senhor, o seu Deus, estará com você por onde você andar"', ref: "Josué 1:9" },
  { text: '"Por isso não tema, pois estou com você; não tenha medo, pois sou o seu Deus. Eu o fortalecerei e o ajudarei; eu o segurarei com a minha mão direita vitoriosa."', ref: "Isaías 41:10" },
  { text: '"Pois eu bem sei os planos que tenho para vocês."', ref: "Jeremias 29:11" },
  { text: '"O Senhor é o meu pastor; nada me faltará."', ref: "Salmo 23:1" },
  { text: '"Tudo posso naquele que me fortalece."', ref: "Filipenses 4:13" },
  { text: '"Não temas, porque eu sou contigo."', ref: "Isaías 41:10" },
  { text: '"Busquem primeiro o Reino de Deus."', ref: "Mateus 6:33" },
  { text: '"Entregue o seu caminho ao Senhor; confie nele."', ref: "Salmo 37:5" },
  { text: '"O Senhor é a minha luz e a minha salvação."', ref: "Salmo 27:1" },
  { text: '"Deus é o nosso refúgio e fortaleza."', ref: "Salmo 46:1" },
  { text: '"Se Deus é por nós, quem será contra nós?"', ref: "Romanos 8:31" },
  { text: '"Venham a mim todos os que estão cansados."', ref: "Mateus 11:28" },
  { text: '"Se alguém precisa de sabedoria, peça a Deus."', ref: "Tiago 1:5" },

  // Motivacionais / famosos
  { text: '"Feito é melhor que perfeito."', ref: "Sheryl Sandberg" },
  { text: '"Você não precisa ser ótimo para começar."', ref: "Zig Ziglar" },
  { text: '"Disciplina é liberdade."', ref: "Jocko Willink" },
  { text: '"O sucesso é a soma de pequenos esforços diários."', ref: "Robert Collier" },

  // Cristiano Ronaldo
  { text: '"Sem disciplina, o talento não é nada."', ref: "Cristiano Ronaldo" },
  { text: '"Trabalho duro vence talento quando o talento não trabalha."', ref: "Cristiano Ronaldo" },
  { text: '"Sonhe grande. O resto é treino."', ref: "Cristiano Ronaldo" },

  // Esporte / inspiração
  { text: '"Eu falhei inúmeras vezes — e por isso venci."', ref: "Michael Jordan" },
  { text: '"A maior glória está em levantar-se após a queda."', ref: "Nelson Mandela" },
  { text: '"O importante é vencer, mas com humildade."', ref: "Pelé" },
  { text: '"Se você quer ser bem-sucedido, precisa ter dedicação."', ref: "Ayrton Senna" },
  { text: '"Não pare até se orgulhar."', ref: "Desconhecido" },

  // Tech / criatividade / clássicos
  { text: '"Foco é dizer não a mil coisas."', ref: "Steve Jobs" },
  { text: '"A imaginação é mais importante que o conhecimento."', ref: "Albert Einstein" },
  { text: '"A persistência realiza o impossível."', ref: "Provérbio" },
  { text: '"A sorte favorece a mente preparada."', ref: "Louis Pasteur" },
  { text: '"Você é o que repete todos os dias."', ref: "Aristóteles" },
  { text: '"Trabalhe duro em silêncio; os resultados fazem barulho."', ref: "Desconhecido" },
  { text: '"O sucesso deixa pistas."', ref: "Tony Robbins" },
  { text: '"Pequenos hábitos, grandes mudanças."', ref: "James Clear" },
  { text: '"O que é medido é melhorado."', ref: "Peter Drucker" },
];

export default function QuoteStrip({ className = "" }) {
  // índice inicial (restaurado do localStorage ou aleatório)
  const [index, setIndex] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw != null) return Number(raw) % QUOTES.length;
    } catch {}
    return Math.floor(Math.random() * QUOTES.length);
  });

  // controlar pausa ao passar o mouse / focar
  const [isPaused, setIsPaused] = useState(false);

  // persiste o índice atual
  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, String(index)); } catch {}
  }, [index]);

  // avança automaticamente só quando não está pausado
  useEffect(() => {
    if (isPaused) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % QUOTES.length), 8000);
    return () => clearInterval(id);
  }, [isPaused]);

  const quote = QUOTES[index];

  return (
    <div
      className={`quote-strip ${className}`}
      role="note"
      aria-live="polite"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      tabIndex={0} // acessível por teclado; foco pausa também
    >
      <div className="qs-inner" key={index}>
        <span className="qs-ico" aria-hidden="true">✦</span>
        <p className="qs-text">{quote.text}</p>
        {quote.ref && <span className="qs-ref">{quote.ref}</span>}
      </div>
    </div>
  );
}

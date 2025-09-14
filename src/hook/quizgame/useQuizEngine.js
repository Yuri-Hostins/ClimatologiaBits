import { useEffect, useMemo, useRef, useState } from "react";

const STORAGE_SETTINGS = "cb:quiz:settings";
const STORAGE_HIGHSCORE = "cb:quiz:highscore";

const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);

const answeredOnceRefInit = () => new Set();

export function useQuizEngine({
  bank,
  total = 10,
  enableTimer = false,
  secondsPerQ = 25,
}) {
  const [seed, setSeed] = useState(() => Math.random());
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]); // {id, correct, chosen, timeout}
  const [selected, setSelected] = useState(null);
  const [locked, setLocked] = useState(false);
  const [timeLeft, setTimeLeft] = useState(secondsPerQ);
  const [high, setHigh] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_HIGHSCORE);
      return raw ? JSON.parse(raw) : { best: 0, date: null };
    } catch {
      return { best: 0, date: null };
    }
  });
  
  const answeredOnceRef = useRef(answeredOnceRefInit());

  // (opcional) restaurar preferências
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_SETTINGS);
      if (raw) JSON.parse(raw); // reservado para futuros ajustes
    } catch { }
  }, []);

  const pool = useMemo(() => {
    const sample = shuffle(bank).slice(0, Math.min(total, bank.length));
    return sample.map((q) =>
      q.type === "mc"
        ? {
          ...q,
          _opts: shuffle(q.options).map((t) => ({
            t,
            orig: q.options.indexOf(t),
          })),
        }
        : q
    );
  }, [bank, total, seed]);

  const q = pool[current];
  const done = current >= pool.length;

  useEffect(() => {
if (!q) return;
}, [q]);

  // timer por questão
  useEffect(() => {
    if (!enableTimer || done || locked) return;
    setTimeLeft(secondsPerQ);
    const id = setInterval(() => {
      setTimeLeft((v) => {
        if (v <= 1) {
          clearInterval(id);
          setSelected(null);
          submit(null, true);
          return secondsPerQ;
        }
        return v - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [current, enableTimer, locked, done]);

  function submit(choice, timeout = false) {
    if (locked || done) return;

    if (locked || done || !q) return;
    if (answeredOnceRef.current.has(q.id)) return;
    answeredOnceRef.current.add(q.id);

    setLocked(true);

    let correct = false;
    if (q.type === "mc") {
      correct = choice === q.answer;
    } else {
      correct = choice === q.answer;
    }

    setAnswers((a) => [...a, { id: q.id, correct, chosen: choice, timeout }]);

    setTimeout(() => {
      setLocked(false);
      setSelected(null);
      setCurrent((i) => i + 1);
    }, 650);
  }

  function restart() {
    setSeed(Math.random());
    setCurrent(0);
    setAnswers([]);
    setSelected(null);
    setLocked(false);
    answeredOnceRef.current = answeredOnceRefInit();
  }

  // high score
  useEffect(() => {
    if (!done) return;
    const score = answers.filter((x) => x.correct).length;
    if (score > (high?.best || 0)) {
      const payload = { best: score, date: new Date().toISOString() };
      setHigh(payload);
      try {
        localStorage.setItem(STORAGE_HIGHSCORE, JSON.stringify(payload));
      } catch { }
    }
  }, [done, answers, high]);

  // teclado
  const hostRef = useRef(null);
  useEffect(() => {
    const host = hostRef.current;
    if (!host || !q) return;
    function onKey(e) {
      if (locked) return;
      if (e.key === "Enter" && selected !== null) submit(selected);
      if (q.type === "tf") {
        if (e.key.toLowerCase() === "v") setSelected(true);
        if (e.key.toLowerCase() === "f") setSelected(false);
      } else {
        const n = parseInt(e.key, 10);
        if (!Number.isNaN(n) && n >= 1 && n <= q.options.length) {
          const target = q._opts[n - 1]?.orig;
          if (typeof target === "number") setSelected(target);
        }
      }
    }
    host.addEventListener("keydown", onKey);
    return () => host.removeEventListener("keydown", onKey);
  }, [q, selected, locked]);

  return {
    hostRef,
    pool,
    current,
    q,
    done,
    selected,
    setSelected,
    locked,
    timeLeft,
    submit,
    restart,
    high,
    answers,
  };
}

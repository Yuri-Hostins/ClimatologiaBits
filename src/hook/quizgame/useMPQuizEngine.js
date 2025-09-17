// useMPQuizEngine.js
import { useEffect, useMemo, useRef, useState } from "react";

// util: shuffle simples (Fisher–Yates)
function shuffle(a) {
    const arr = [...a];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

// Amostra sem repetir
function sample(arr, n) {
    return shuffle(arr).slice(0, Math.min(n, arr.length));
}

export function useMPQuizEngine({ bank, total = 10, enableTimer = true, secondsPerQ = 25 }) {
    const [seed, setSeed] = useState(Math.random());
    const pool = useMemo(() => {
        const base = sample(bank, total).map((q) =>
            q.type === "mc"
                ? { ...q, _opts: shuffle(q.options).map((t) => ({ t, orig: q.options.indexOf(t) })) }
                : q
        );
        // hash leve para validar re-hydrate se um dia precisar
        base.__hash = base.map((q) => q.id).join("|");
        return base;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [bank?.length, total, seed]);

    const [current, setCurrent] = useState(0); // pergunta atual
    const [turn, setTurn] = useState("p1"); // "p1" | "p2"
    const [selected, setSelected] = useState(null); // escolha do jogador do turno
    const [locked, setLocked] = useState(false);

    // respostas e pontuação
    const [answers, setAnswers] = useState({}); // histórico
    const currAnsRef = useRef({});
    const [score, setScore] = useState({ p1: 0, p2: 0 });

    // fase de UI: responder ou revelar
    const [phase, setPhase] = useState("answer"); // "answer" | "reveal"

    // “P2 pronto?” se P1 estourar tempo
    const [waitingP2Ready, setWaitingP2Ready] = useState(false);

    // timer
    const [timeLeft, setTimeLeft] = useState(enableTimer ? secondsPerQ : null);
    const timerRef = useRef(null);

    const q = pool[current];
    const done = current >= pool.length;

    // parar timer
    function clearTimer() {
        if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
        }
    }

    // iniciar timer do turno
    function startTimer() {
        if (!enableTimer) return;
        clearTimer();
        setTimeLeft(secondsPerQ);
        timerRef.current = setInterval(() => {
            setTimeLeft((v) => {
                if (v <= 1) {
                    clearTimer();
                    onTimeout();
                    return secondsPerQ; // será reconfigurado ao trocar turno/fase
                }
                return v - 1;
            });
        }, 1000);
    }

    // sempre que mudar de pergunta ou de turno (e não estiver pausado aguardando P2)
    useEffect(() => {
        clearTimer();
        if (!done && phase === "answer" && !waitingP2Ready) {
            if (enableTimer) setTimeLeft(secondsPerQ);
            startTimer();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [current, turn, phase, waitingP2Ready, enableTimer, secondsPerQ]);

    // ao desmontar
    useEffect(() => clearTimer, []);

    function wasCorrect(question, choice) {
        if (choice === null || choice === undefined) return false;
        if (question.type === "mc") return choice === question.answer;
        return choice === question.answer; // true/false
    }

    function saveAnswerReturn({ player, choice, timeout = false }) {
        let merged = null;
        setAnswers((prev) => {
            const curr = prev[current] || {};
            merged = { ...curr, [player]: { choice, timeout } };
            return { ...prev, [current]: merged };
        });
        currAnsRef.current = { ...currAnsRef.current, [player]: { choice, timeout } };
        return merged; // respostas da pergunta atual após mescla
    }

    // confirmar escolha do jogador atual
    function submit(choice) {
        if (locked || done || !q || phase !== "answer") return;
        setLocked(true);
        saveAnswerReturn({ player: turn, choice, timeout: false });

        // troca turno ou revela
        if (turn === "p1") {
            // vai para p2
            setTimeout(() => {
                setSelected(null);
                setTurn("p2");
                setLocked(false);
            }, 250);
        } else {
            // p2 respondeu → revelar
            const merged = saveAnswerReturn({ player: "p2", choice, timeout: false });
            revealAndAdvance(merged);
        }
    }

    function onTimeout() {
        if (locked || done || !q || phase !== "answer") return;
        setLocked(true);
        if (turn === "p1") {
            // P1 estourou: pausa até P2 clicar "pronto"
            saveAnswerReturn({ player: "p1", choice: null, timeout: true });
            setSelected(null);
            setWaitingP2Ready(true);
            setLocked(false); // pode apertar “pronto”
        } else {
            // P2 estourou: revela e avança
            const merged = saveAnswerReturn({ player: "p2", choice: null, timeout: true });
            revealAndAdvance(merged);
        }
    }

    // quando P2 confirma que está pronto para jogar após P1 ter estourado o tempo
    function readyP2() {
        if (!waitingP2Ready) return;
        setWaitingP2Ready(false);
        setTurn("p2");
        setSelected(null);
        setLocked(false);
        // timer recomeça automaticamente pelo efeito
    }

    function revealAndAdvance(mergedCurrentAnswers = null) {
        clearTimer();
        // computa pontuação da pergunta
        const a = mergedCurrentAnswers || currAnsRef.current || answers[current] || {};
        const p1 = a.p1 ?? { choice: null, timeout: true };
        const p2 = a.p2 ?? { choice: null, timeout: true };
        const add1 = !p1.timeout && wasCorrect(q, p1.choice) ? 1 : 0;
        const add2 = !p2.timeout && wasCorrect(q, p2.choice) ? 1 : 0;
        setScore((s) => ({ p1: s.p1 + add1, p2: s.p2 + add2 }));

        // pequena fase de revelação
        setPhase("reveal");
        setTimeout(() => {
            // próxima pergunta
            setSelected(null);
            setTurn("p1");
            setPhase("answer");
            setLocked(false);
            setCurrent((i) => i + 1);
            currAnsRef.current = {}; // zera o buffer para a próxima pergunta
        }, 800);
    }

    function restart() {
        clearTimer();
        setSeed(Math.random());
        setCurrent(0);
        setTurn("p1");
        setSelected(null);
        setLocked(false);
        setAnswers({});
        setScore({ p1: 0, p2: 0 });
        setPhase("answer");
        setWaitingP2Ready(false);
        if (enableTimer) setTimeLeft(secondsPerQ);
        startTimer();
    }

    return {
        pool,
        current,
        q,
        done,
        // turno e pontuação
        turn,
        score,
        // seleção/lock
        selected,
        setSelected,
        locked,
        // fases especiais
        phase,
        waitingP2Ready,
        readyP2,
        // timer
        timeLeft,
        // ações
        submit,
        restart,
        answers,
    };
}

import React, { useLayoutEffect, useRef, useState } from "react";

export const THEME_KEY = "cb_theme_pref";

// ===== helpers de horário Brasil (America/Sao_Paulo) =====
function nowSP() {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Sao_Paulo",
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  })
    .formatToParts(new Date())
    .reduce((acc, x) => ((acc[x.type] = x.value), acc), {});
  return {
    h: Number(parts.hour || 0),
    m: Number(parts.minute || 0),
    s: Number(parts.second || 0),
  };
}

function isDaySP() {
  const { h } = nowSP();
  return h >= 6 && h < 18; // 06:00–17:59
}

function untilNextBoundary() {
  const { h, m, s } = nowSP();
  const dayNow = h >= 6 && h < 18; // true=dia
  const targetH = dayNow ? 18 : 6;
  let dH = targetH - h;
  if (dH <= 0) dH += 24;
  const ms = ((dH * 60 - m) * 60 - s) * 1000;
  return { ms, nextTheme: dayNow ? "dark" : "light" };
}

export function useClimaTheme() {
  const [theme, setTheme] = useState("light");
  const boundaryTimer = useRef(null);

  const applyTheme = (mode) =>
    document.documentElement.setAttribute("data-theme", mode === "dark" ? "dark" : "light");

  const scheduleBoundary = () => {
    clearTimeout(boundaryTimer.current);
    const { ms, nextTheme } = untilNextBoundary();
    boundaryTimer.current = setTimeout(() => {
      setTheme(nextTheme);
      applyTheme(nextTheme);
      try {
        localStorage.setItem(THEME_KEY, nextTheme); // sobrepõe preferência na virada
      } catch {}
      scheduleBoundary();
    }, Math.max(500, ms + 250));
  };

  useLayoutEffect(() => {
    let initial = "light";
    try {
      const saved = localStorage.getItem(THEME_KEY);
      if (saved === "light" || saved === "dark") {
        initial = saved;
      } else {
        initial = isDaySP() ? "light" : "dark";
        localStorage.setItem(THEME_KEY, initial);
      }
    } catch {
      initial = isDaySP() ? "light" : "dark";
    }
    setTheme(initial);
    applyTheme(initial);
    scheduleBoundary();
    return () => clearTimeout(boundaryTimer.current);
  }, []);

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    applyTheme(next);
    try {
      localStorage.setItem(THEME_KEY, next);
    } catch {}
    // não cancela o timer — na virada 06/18h o sistema ainda vai sobrepor
  };

  return { theme, toggleTheme };
}

export default function ThemeToggle({ floating = false, className = "", ...props }) {
  const { theme, toggleTheme } = useClimaTheme();
  return (
    <button
      type="button"
      className={`cb-ghost ${floating ? "thx-theme-fab" : ""} ${className}`}
      aria-label="Alternar tema"
      onClick={toggleTheme}
      {...props}
    >
      {theme === "dark" ? "🌙" : "☀️"}
    </button>
  );
}

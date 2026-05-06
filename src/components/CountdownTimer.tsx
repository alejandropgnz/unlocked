import { useEffect, useState } from "react";

interface Parts {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  total: number;
}

function diffParts(target: number, now: number): Parts {
  const total = Math.max(0, target - now);
  return {
    days: Math.floor(total / 86_400_000),
    hours: Math.floor((total % 86_400_000) / 3_600_000),
    minutes: Math.floor((total % 3_600_000) / 60_000),
    seconds: Math.floor((total % 60_000) / 1_000),
    total,
  };
}

/**
 * Big "days · hours · minutes · seconds" countdown to the launch date.
 * Updates every second client-side. When target reached, shows a "ya
 * disponible" cue (the visitor will reload anyway since the gate flips).
 */
export function LaunchDate({ target }: { target: Date }) {
  const targetMs = target.getTime();
  const [parts, setParts] = useState<Parts>(() => diffParts(targetMs, Date.now()));

  useEffect(() => {
    const id = setInterval(() => {
      setParts(diffParts(targetMs, Date.now()));
    }, 1000);
    return () => clearInterval(id);
  }, [targetMs]);

  if (parts.total === 0) {
    return (
      <div className="text-center">
        <p className="text-2xl sm:text-3xl font-black tracking-tighter text-indigo uppercase">
          ¡Ya está aquí!
        </p>
        <p className="text-muted text-xs mt-1">Recarga la página.</p>
      </div>
    );
  }

  return (
    <div className="flex justify-center gap-2 sm:gap-3">
      <Cell value={parts.days} label="días" />
      <Cell value={parts.hours} label="horas" />
      <Cell value={parts.minutes} label="min" />
      <Cell value={parts.seconds} label="seg" />
    </div>
  );
}

/**
 * Each unit gets its own bordered tile — gives the countdown a "designed"
 * feel without any gradient/glow trick. Solid borders, solid bg, brand
 * indigo on the digits to match the CTA button below.
 */
function Cell({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="bg-bg border-2 border-grey rounded-xl px-3 py-2 sm:px-4 sm:py-3 min-w-[3.5rem] sm:min-w-[4.25rem] flex items-center justify-center">
        <span
          className="font-black font-mono tabular-nums leading-none text-indigo"
          style={{ fontSize: "clamp(1.75rem, 4.5vw, 2.5rem)" }}
        >
          {String(value).padStart(2, "0")}
        </span>
      </div>
      <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-muted font-bold mt-2">
        {label}
      </span>
    </div>
  );
}

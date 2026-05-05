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
        <p className="text-2xl sm:text-3xl font-black tracking-tighter text-gold uppercase">
          ¡Ya está aquí!
        </p>
        <p className="text-muted text-xs mt-1">Recarga la página.</p>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-end gap-3 sm:gap-5">
      <Cell value={parts.days} label="días" />
      <Sep />
      <Cell value={parts.hours} label="horas" />
      <Sep />
      <Cell value={parts.minutes} label="min" />
      <Sep />
      <Cell value={parts.seconds} label="seg" />
    </div>
  );
}

function Cell({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center min-w-[3.25rem] sm:min-w-[4.25rem]">
      <span
        className="font-black font-mono tabular-nums leading-none text-white"
        style={{ fontSize: "clamp(1.85rem, 5vw, 3rem)" }}
      >
        {String(value).padStart(2, "0")}
      </span>
      <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-muted mt-2">
        {label}
      </span>
    </div>
  );
}

function Sep() {
  return (
    <span
      className="font-black text-grey leading-none flex items-end pb-7 sm:pb-9"
      style={{ fontSize: "clamp(1.5rem, 4vw, 2.5rem)" }}
    >
      :
    </span>
  );
}

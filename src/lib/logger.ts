type LogLevel = "info" | "warn" | "error";

function log(level: LogLevel, message: string, meta?: unknown) {
  if (typeof window === "undefined") {
    // Server-side (api functions) — use console
    // eslint-disable-next-line no-console
    console[level === "error" ? "error" : level === "warn" ? "warn" : "log"](
      `[${level}] ${message}`,
      meta ?? "",
    );
    return;
  }

  // Client-side: only emit warnings/errors in production; full logs in dev
  if (import.meta.env.DEV) {
    // eslint-disable-next-line no-console
    console[level === "error" ? "error" : level === "warn" ? "warn" : "log"](
      `[${level}] ${message}`,
      meta ?? "",
    );
    return;
  }
  if (level === "info") return;
  // eslint-disable-next-line no-console
  console[level === "error" ? "error" : "warn"](message, meta ?? "");
}

export const logger = {
  info: (message: string, meta?: unknown) => log("info", message, meta),
  warn: (message: string, meta?: unknown) => log("warn", message, meta),
  error: (message: string, meta?: unknown) => log("error", message, meta),
};

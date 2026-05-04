export async function trackClient(name: string, properties: Record<string, unknown> = {}): Promise<void> {
  try {
    await fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, properties }),
    });
  } catch {
    // ignored
  }
}

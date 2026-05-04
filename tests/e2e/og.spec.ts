import { test, expect } from "@playwright/test";

test("achievement OG endpoint returns PNG", async ({ request }) => {
  const r = await request.get("/og/achievement/mi-padre-tabaco");
  expect(r.status()).toBe(200);
  expect(r.headers()["content-type"]).toContain("image/png");
});

test("unknown achievement OG returns 404", async ({ request }) => {
  const r = await request.get("/og/achievement/this-does-not-exist-9999");
  expect(r.status()).toBe(404);
});

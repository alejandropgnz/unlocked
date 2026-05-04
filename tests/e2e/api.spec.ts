import { test, expect } from "@playwright/test";

test("react endpoint rejects unauthenticated", async ({ request }) => {
  const r = await request.post("/api/react", {
    data: {
      targetType: "story",
      targetId: "00000000-0000-0000-0000-000000000000",
      value: 1,
    },
  });
  expect(r.status()).toBe(401);
});

test("react endpoint rejects bad input", async ({ request }) => {
  const r = await request.post("/api/react", {
    data: { foo: "bar" },
  });
  expect(r.status()).toBe(400);
});

test("report endpoint rejects unauthenticated", async ({ request }) => {
  const r = await request.post("/api/report", {
    data: {
      targetType: "story",
      targetId: "00000000-0000-0000-0000-000000000000",
      reason: "ofensivo",
    },
  });
  expect(r.status()).toBe(401);
});

test("track endpoint accepts valid payload (no auth required)", async ({ request }) => {
  const r = await request.post("/api/track", {
    data: { name: "test_event", properties: { foo: "bar" } },
  });
  expect(r.status()).toBe(200);
});

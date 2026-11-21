import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  use: {
    ...devices["Desktop Chrome"],
    channel: process.env.PLAYWRIGHT_CHANNEL || undefined,
    baseURL: "http://127.0.0.1:4365",
  },
  workers: 1,
  reporter: "list",
  webServer: {
    command: "npm run start -- --hostname 127.0.0.1 --port 4365",
    url: "http://127.0.0.1:4365/",
    reuseExistingServer: false,
    env: {
      RESEND_API_KEY: "re_for-browser-tests-only",
      CONTACT_FROM: "Portfolio <from@example.test>",
      CONTACT_TO: "to@example.test",
      UPSTASH_REDIS_REST_URL: "http://127.0.0.1:1",
      UPSTASH_REDIS_REST_TOKEN: "browser-tests-only",
    },
  },
});

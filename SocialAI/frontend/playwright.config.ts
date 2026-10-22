import { defineConfig, devices } from "@playwright/test";
import path from "node:path";

const python =
  process.env.API_PYTHON ||
  (process.platform === "win32"
    ? ".venv/Scripts/python.exe"
    : ".venv/bin/python");
export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: false,
  workers: 1,
  timeout: 120_000,
  expect: { timeout: 15_000 },
  reporter: "list",
  use: { baseURL: "http://127.0.0.1:3001", trace: "retain-on-failure" },
  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        channel: process.env.PLAYWRIGHT_CHANNEL || undefined,
      },
    },
  ],
  webServer: [
    {
      command: `"${python}" -m tests.e2e_server`,
      cwd: path.resolve(__dirname, "../backend"),
      url: "http://127.0.0.1:8001/api/v1/health",
      reuseExistingServer: !process.env.CI,
      timeout: 90_000,
      env: {
        DATABASE_URL: "sqlite:///./e2e.db",
        FRONTEND_URL: "http://127.0.0.1:3001",
        E2E_TEST_MODE: "1",
        APP_ENV: "test",
        COOKIE_SECURE: "false",
      },
    },
    {
      command: "npm run dev -- --port 3001",
      url: "http://127.0.0.1:3001/login",
      reuseExistingServer: !process.env.CI,
      timeout: 120_000,
      env: { API_BASE_URL: "http://127.0.0.1:8001" },
    },
  ],
});

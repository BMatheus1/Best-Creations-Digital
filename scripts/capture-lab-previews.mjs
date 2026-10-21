import { chromium } from "@playwright/test";
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
const base = process.env.PREVIEW_URL || "http://127.0.0.1:3005";
await mkdir("artifacts/showroom", { recursive: true });
await mkdir("public/portfolio", { recursive: true });
const browser = await chromium.launch({ channel: "chrome" });
try {
  const page = await browser.newPage({ reducedMotion: "reduce" });
  page.setDefaultNavigationTimeout(180000);
  for (const id of ["crm", "booking", "restaurant"]) {
    for (const [view, width, height] of [
      ["desktop", 1360, 900],
      ["mobile", 390, 844],
    ]) {
      await page.setViewportSize({ width, height });
      await page.goto(`${base}/lab/${id}`);
      await page
        .locator('.lab-app[data-ready="true"]')
        .waitFor({ state: "visible", timeout: 180000 });
      await page.evaluate(() => document.fonts.ready);
      await page.locator(".lab-app").evaluate((element) =>
        window.scrollTo({
          top: element.getBoundingClientRect().top + window.scrollY,
          behavior: "instant",
        }),
      );
      const path = `artifacts/showroom/demo-${id}-${view}.png`;
      await page.screenshot({
        path,
        fullPage: false,
        style: ".site-header, nextjs-portal { visibility: hidden !important; }",
      });
      await sharp(path)
        .webp({ quality: 87 })
        .toFile(`public/portfolio/demo-${id}-${view}.webp`);
    }
  }
  console.log(
    "Six screenshots captured from functional demos and optimized for the collection.",
  );
} finally {
  await browser.close();
}

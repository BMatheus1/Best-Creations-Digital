import { chromium } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { mkdir, writeFile } from "node:fs/promises";

const base = process.env.PREVIEW_URL || "http://127.0.0.1:3005";
const output = "artifacts/showroom";
await mkdir(output, { recursive: true });
const browser = await chromium.launch({ channel: "chrome" });
const report = {
  base,
  capturedAt: new Date().toISOString(),
  pages: [],
  errors: [],
};
try {
  const context = await browser.newContext({ reducedMotion: "reduce" });
  const page = await context.newPage();
  page.setDefaultNavigationTimeout(180000);
  page.on("pageerror", (error) => report.errors.push(error.message));
  for (const width of [1440, 390, 320]) {
    await page.setViewportSize({ width, height: width < 640 ? 844 : 1000 });
    for (const [name, path] of [
      ["showroom", "/projetos"],
      ["case", "/projetos/my-expenses"],
      ["crm", "/lab/crm"],
      ["booking", "/lab/booking"],
      ["restaurant", "/lab/restaurant"],
    ]) {
      await page.goto(base + path);
      await page
        .locator(
          path.startsWith("/lab")
            ? '.lab-app[data-ready="true"]'
            : path === "/projetos"
              ? ".showroom-piece"
              : ".case-cover",
        )
        .waitFor({ state: "visible" });
      await page.evaluate(async () => {
        await document.fonts.ready;
        await Promise.all(
          Array.from(document.images, (image) =>
            image.decode().catch(() => {}),
          ),
        );
      });
      await page.screenshot({
        path: `${output}/${name}-${width}.png`,
        fullPage: true,
      });
      const measurements = await page.evaluate(() => ({
        overflow: document.documentElement.scrollWidth > window.innerWidth,
        brokenImages: Array.from(document.images)
          .filter((image) => !image.complete || image.naturalWidth === 0)
          .map((image) => image.currentSrc),
      }));
      const entry = { path, width, ...measurements };
      if (width === 1440) {
        const result = await new AxeBuilder({ page })
          .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
          .analyze();
        entry.violations = result.violations.map(({ id, nodes }) => ({
          id,
          targets: nodes.map(({ target }) => target),
        }));
      }
      report.pages.push(entry);
    }
  }
  await writeFile(
    `${output}/production-audit.json`,
    JSON.stringify(report, null, 2) + "\n",
  );
  console.log(JSON.stringify(report, null, 2));
  if (
    report.errors.length ||
    report.pages.some(
      (page) =>
        page.overflow || page.brokenImages.length || page.violations?.length,
    )
  )
    process.exitCode = 1;
} finally {
  await browser.close();
}

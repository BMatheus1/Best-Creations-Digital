import { chromium } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { mkdir, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
const base = process.env.PREVIEW_URL || "http://127.0.0.1:3005";
const directory = new URL("../artifacts/redesign/", import.meta.url);
await mkdir(directory, { recursive: true });
const browser = await chromium.launch({ channel: "chrome" });
const context = await browser.newContext({ reducedMotion: "reduce" });
const page = await context.newPage();
const errors = [];
page.on("pageerror", (error) => errors.push(error.message));
const routes = [
  ["home", "/"],
  ["servicos", "/servicos"],
  ["projetos", "/projetos"],
  ["estudio", "/estudio"],
  ["iniciar-projeto", "/iniciar-projeto"],
];
async function open(path) {
  await page.goto(base + path);
  if (path.startsWith("/iniciar-projeto"))
    await page.waitForSelector('form[data-ready="true"]');
  await page.evaluate(() => document.fonts.ready);
}
const audits = {};
try {
  for (const width of [1440, 390, 320]) {
    await page.setViewportSize({ width, height: width < 640 ? 844 : 1000 });
    for (const [name, path] of routes) {
      await open(path);
      await page.screenshot({
        path: fileURLToPath(new URL(name + "-" + width + ".png", directory)),
        fullPage: true,
      });
      if (name === "home")
        await page.screenshot({
          path: fileURLToPath(new URL("preview-" + width + ".png", directory)),
          fullPage: false,
        });
      if (width === 1440) {
        const result = await new AxeBuilder({ page })
          .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
          .analyze();
        audits[path] = result.violations.map(({ id, nodes }) => ({
          id,
          nodes: nodes.map(({ target, failureSummary }) => ({
            target,
            failureSummary,
          })),
        }));
      }
    }
    await open("/");
    await page.getByRole("button", { name: "Abrir menu" }).click();
    if (width === 1440)
      await page
        .getByRole("dialog")
        .getByRole("link", { name: /Projetos/ })
        .hover();
    await page.screenshot({
      path: fileURLToPath(new URL("menu-" + width + ".png", directory)),
      fullPage: true,
    });
    await page.keyboard.press("Escape");
  }
  await writeFile(
    new URL("accessibility.json", directory),
    JSON.stringify(audits, null, 2),
  );
  console.log(JSON.stringify({ audits, errors }));
} finally {
  await browser.close();
}

import { expect, test } from "@playwright/test";
import type { Page } from "@playwright/test";

async function expectSplit(page: Page) {
  const hero = page.locator(".home-stage");
  const width = page.viewportSize()!.width;
  const left = page.locator(".home-surface-dark");
  const right = page.locator(".home-surface-light");
  const glyph = page.locator(".home-signature");
  await expect(hero).toBeVisible();
  expect((await hero.boundingBox())!.width).toBe(width);
  expect((await left.boundingBox())!.width).toBe(width * 0.75);
  expect((await right.boundingBox())!.x).toBe(width * 0.75);
  expect((await right.boundingBox())!.width).toBe(width * 0.25);
  const bounds = (await glyph.boundingBox())!;
  expect(bounds.width).toBe(Math.min(width * 0.5, 552));
  expect(bounds.x + bounds.width / 2).toBeCloseTo(width * 0.75, 1);
  await expect(left).toHaveCSS("background-color", "rgb(8, 8, 8)");
  await expect(right).toHaveCSS("background-color", "rgb(255, 255, 255)");
  await expect(glyph).toHaveCount(1);
  await expect(glyph.locator("rect, circle, image")).toHaveCount(0);
  await expect(glyph.locator(".brand-letter-c path")).toHaveCount(2);
}

test("assinatura: entrada elegante e sem repetição ao retornar", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  const stage = page.locator(".home-stage");
  const signature = page.locator(".home-signature");
  await expect(stage).toHaveAttribute("data-animate", "true");
  await expectSplit(page);
  const motion = await signature.evaluate((element) => {
    const b = element.querySelector(".brand-letter-b")!;
    const c = element.querySelector(".brand-letter-c")!;
    const animations = [b.getAnimations()[0], c.getAnimations()[0]];
    for (const animation of animations) {
      animation.pause();
      animation.currentTime = 0;
    }
    const first = [b, c, element].map((node) =>
      node.getBoundingClientRect().toJSON(),
    );
    for (const animation of animations) animation.finish();
    const last = [b, c, element].map((node) =>
      node.getBoundingClientRect().toJSON(),
    );
    return {
      first,
      last,
      durations: animations.map(
        (animation) => animation.effect!.getTiming().duration,
      ),
      names: animations.map(
        (animation) => (animation as CSSAnimation).animationName,
      ),
    };
  });
  expect(motion.names).toEqual(["home-b-descend", "home-c-ascend"]);
  expect(motion.durations).toEqual([2000, 2000]);
  expect(motion.first[0].y).toBeLessThan(motion.last[0].y);
  expect(motion.first[1].y).toBeGreaterThan(motion.last[1].y);
  expect(motion.first[0].x).toBe(motion.last[0].x);
  expect(motion.first[1].x).toBe(motion.last[1].x);
  expect(motion.first[2]).toEqual(motion.last[2]);
  expect(motion.last[0].right).toBeCloseTo(
    page.viewportSize()!.width * 0.75,
    1,
  );
  expect(motion.last[1].left).toBeCloseTo(page.viewportSize()!.width * 0.75, 1);
  await page
    .getByRole("link", { name: "Explorar serviços", exact: true })
    .click();
  await expect(page).toHaveURL(/\/servicos$/);
  await page
    .getByRole("link", { name: "Best Creations — início", exact: true })
    .first()
    .click();
  await expect(page).toHaveURL(/\/$/);
  await expect(stage).not.toHaveAttribute("data-animate", "true");
  expect(
    await signature.evaluate(
      (element) => element.getAnimations({ subtree: true }).length,
    ),
  ).toBe(0);
});

test("assinatura: redução de movimento e marca consistente no mobile", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const signature = page.locator(".home-signature");
  await expect(signature).toBeAttached();
  await expectSplit(page);
  expect(
    await signature.evaluate(
      (element) => element.getAnimations({ subtree: true }).length,
    ),
  ).toBe(0);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  const mark = page.locator(".site-header .brand-mark");
  await expect(mark).toBeVisible();
  await expect(mark.locator(".brand-letter-b")).toHaveCount(1);
  await expect(mark.locator(".brand-letter-c path")).toHaveCount(2);
  await page.getByRole("button", { name: "Abrir menu" }).click();
  await expect(page.getByRole("dialog").locator(".brand-mark")).toBeVisible();
  await page.keyboard.press("Escape");
  for (const asset of [
    "/icon.svg",
    "/brand/best-creations-symbol.svg",
    "/opengraph-image",
  ]) {
    expect((await page.request.get(asset)).status()).toBe(200);
  }
});

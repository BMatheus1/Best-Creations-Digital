import { expect, test } from "@playwright/test";

test("assinatura: entrada elegante e sem repetição ao retornar", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  const signature = page.locator(".signature-motion");
  await expect(signature).toHaveAttribute("data-animate", "true");
  const names = await signature.evaluate((element) =>
    element
      .getAnimations({ subtree: true })
      .map((animation) => (animation as CSSAnimation).animationName),
  );
  expect(names).toContain("signature-assemble-b");
  expect(names).toContain("signature-assemble-c");
  expect(names).toContain("signature-sheen");
  const bounds = await signature.locator(".metal-monogram").boundingBox();
  expect(bounds).not.toBeNull();
  const viewport = page.viewportSize()!;
  expect(bounds!.x + bounds!.width / 2).toBeGreaterThan(0);
  expect(bounds!.x + bounds!.width / 2).toBeLessThan(viewport.width);
  expect(bounds!.y + bounds!.height / 2).toBeGreaterThan(0);
  expect(bounds!.y + bounds!.height / 2).toBeLessThan(viewport.height);
  await expect(
    page.getByRole("link", { name: "Explorar", exact: true }),
  ).toBeVisible();
  await page.getByRole("link", { name: "Explorar", exact: true }).click();
  await expect(page).toHaveURL(/\/servicos$/);
  await page
    .getByRole("link", { name: "Best Creations — início", exact: true })
    .first()
    .click();
  await expect(page).toHaveURL(/\/$/);
  await expect(signature).not.toHaveAttribute("data-animate", "true");
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
  const signature = page.locator(".signature-motion");
  await expect(signature).toBeAttached();
  await expect(signature).not.toHaveAttribute("data-animate", "true");
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
  expect(await mark.locator(".mark-piece").count()).toBe(2);
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

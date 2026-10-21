import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
for (const route of [
  "/",
  "/servicos",
  "/projetos",
  "/estudio",
  "/iniciar-projeto",
  "/projetos/cantinho-do-luiz",
  "/privacidade",
]) {
  test("acessibilidade AA: " + route, async ({ page }) => {
    await page.goto(route);
    if (route === "/iniciar-projeto")
      await expect(page.locator("form")).toHaveAttribute("data-ready", "true");
    const result = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(result.violations).toEqual([]);
  });
}
test("acessibilidade do menu e etapas com erros", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/iniciar-projeto");
  await expect(page.locator("form")).toHaveAttribute("data-ready", "true");
  await page.getByRole("button", { name: "Abrir menu" }).click();
  expect(
    (
      await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag22aa"])
        .analyze()
    ).violations,
  ).toEqual([]);
  await page.keyboard.press("Escape");
  await page.getByRole("button", { name: "Continuar" }).click();
  expect(
    (
      await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag22aa"])
        .analyze()
    ).violations,
  ).toEqual([]);
  await page.getByRole("radio", { name: /Site.*presença/ }).check();
  await page.getByRole("button", { name: "Continuar" }).click();
  await page.getByRole("button", { name: "Continuar" }).click();
  expect(
    (
      await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag22aa"])
        .analyze()
    ).violations,
  ).toEqual([]);
});

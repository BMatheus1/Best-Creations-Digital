import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("política pública: conteúdo, navegação, metadados e acessibilidade", async ({
  page,
  request,
}) => {
  const response = await request.get("/politica-de-privacidade");
  expect(response.status()).toBe(200);
  const legacy = await request.get("/privacidade", { maxRedirects: 0 });
  expect(legacy.status()).toBe(308);
  expect(legacy.headers().location).toBe("/politica-de-privacidade");
  await page.goto("/politica-de-privacidade");
  await expect(page).toHaveTitle("Política de Privacidade | Best Creations");
  await expect(page.locator("html")).toHaveAttribute("lang", "pt-BR");
  const canonical = await page
    .locator('link[rel="canonical"]')
    .getAttribute("href");
  expect(new URL(canonical!).pathname).toBe("/politica-de-privacidade");
  await expect(page.locator(".privacy-content > section")).toHaveCount(12);
  await expect(
    page.getByRole("heading", { name: "Integração com a API do Pinterest" }),
  ).toBeVisible();
  await expect(
    page.getByText(/A integração com a API está planejada/),
  ).toBeVisible();
  await expect(
    page
      .getByRole("contentinfo")
      .getByRole("link", { name: "Política de Privacidade" }),
  ).toHaveAttribute("href", "/politica-de-privacidade");
  await page
    .getByRole("navigation", { name: "Seções da política de privacidade" })
    .getByRole("link", { name: /Contato e solicitações/ })
    .click();
  await expect(page).toHaveURL(/#contato$/);
  const contact = new URL(
    (await page
      .getByRole("link", { name: /Falar sobre privacidade/ })
      .getAttribute("href"))!,
  );
  expect(contact.hostname).toBe("wa.me");
  expect(contact.searchParams.get("text")).toContain("privacidade");
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(results.violations).toEqual([]);
});

for (const width of [320, 390, 768, 1440]) {
  test(`política responsiva em ${width}px`, async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/politica-de-privacidade");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true);
    expect(errors).toEqual([]);
  });
}

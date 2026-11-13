import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("catálogo: seis modelos, trinta telas e orçamento com referência validada", async ({
  page,
}) => {
  await page.goto("/projetos");
  await expect(
    page.getByRole("button", { name: "Catálogo", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
  const models = page.getByRole("group", { name: "Selecionar modelo" });
  await expect(models.getByRole("button")).toHaveCount(6);
  for (const name of [
    "Vitta",
    "Lumina",
    "Sapore",
    "Nexus",
    "Forma",
    "Wellness",
  ]) {
    await models.getByRole("button", { name, exact: true }).click();
    const gallery = page.getByRole("region", { name: "Prévias de " + name });
    const thumbnails = gallery
      .getByRole("group", { name: "Miniaturas de prévias" })
      .getByRole("button");
    await expect(thumbnails).toHaveCount(5);
    for (let index = 0; index < 5; index++) {
      await thumbnails.nth(index).click();
      await expect
        .poll(() =>
          thumbnails
            .nth(index)
            .locator("img")
            .evaluate((image) => {
              return (image as HTMLImageElement).naturalWidth;
            }),
        )
        .toBe(200);
      await expect(thumbnails.nth(index)).toHaveAttribute(
        "aria-pressed",
        "true",
      );
      await expect(gallery.locator(".concept-preview h4")).toBeVisible();
    }
    await expect(gallery.locator(".device-mobile")).toBeVisible();
  }
  const gallery = page.getByRole("region", { name: "Prévias de Wellness" });
  await gallery.focus();
  await page.keyboard.press("ArrowRight");
  await expect(gallery.locator(".concept-frame")).toHaveAttribute(
    "data-screen",
    "Página inicial",
  );
  await gallery.getByRole("button", { name: "Ampliar prévia" }).click();
  await expect(
    page.getByRole("dialog", { name: "Prévia ampliada de Wellness" }),
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Fechar prévia" }),
  ).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(
    gallery.getByRole("button", { name: "Ampliar prévia" }),
  ).toBeFocused();
  const explore = page.getByRole("button", { name: "Explorar modelo" });
  await explore.click();
  await page.getByRole("button", { name: "Fechar prévia" }).click();
  await expect(explore).toBeFocused();
  await page
    .getByRole("link", { name: "Quero um projeto nesse estilo" })
    .click();
  await expect(page).toHaveURL(/referencia=wellness/);
  await expect(page.getByRole("radio", { name: /Aplicativo/ })).toBeChecked();
  await page.getByRole("button", { name: "Continuar" }).click();
  await expect(page.getByLabel("Sua ideia *")).toHaveValue(/Wellness/);
  await page
    .getByLabel("Sua ideia *")
    .fill("Quero apresentar a academia e organizar o acesso dos alunos.");
  await page.getByRole("button", { name: "Continuar" }).click();
  await page.getByLabel("Seu nome *").fill("Ana Teste");
  await page.getByLabel("WhatsApp ou telefone *").fill("11900000000");
  await page.getByRole("button", { name: "Continuar" }).click();
  await expect(
    page.getByText("Referência: Wellness", { exact: true }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Preparar mensagem" }).click();
  await expect(page.getByLabel("Mensagem preparada")).toHaveValue(
    /Referência: Wellness/,
  );
  await page.goto("/iniciar-projeto?referencia=desconhecido");
  await expect(page.locator(".quote-reference")).toHaveCount(0);
});

test("catálogo mobile: swipe, compra simulada e acessibilidade", async ({
  page,
  context,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/projetos");
  const stage = page.locator(".concept-gallery .concept-stage");
  await stage.scrollIntoViewIfNeeded();
  const box = (await stage.boundingBox())!;
  const session = await context.newCDPSession(page);
  await session.send("Emulation.setTouchEmulationEnabled", { enabled: true });
  const y = box.y + box.height / 2;
  await session.send("Input.dispatchTouchEvent", {
    type: "touchStart",
    touchPoints: [{ x: box.x + box.width * 0.8, y }],
  });
  await session.send("Input.dispatchTouchEvent", {
    type: "touchMove",
    touchPoints: [{ x: box.x + box.width * 0.2, y }],
  });
  await session.send("Input.dispatchTouchEvent", {
    type: "touchEnd",
    touchPoints: [],
  });
  await expect(stage.locator(".concept-frame")).toHaveAttribute(
    "data-screen",
    "Catálogo de produtos",
  );
  await stage.getByRole("button", { name: /Tênis Pulso/ }).click();
  await stage.getByRole("button", { name: "40", exact: true }).click();
  await stage.getByRole("button", { name: "Adicionar ao carrinho" }).click();
  await expect(stage.getByText("40 · Preto · 1 un.")).toBeVisible();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(results.violations).toEqual([]);
});

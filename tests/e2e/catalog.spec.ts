import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { concepts } from "@/data/concepts";

test("catálogo: seis modelos, celular e desktop e orçamento com referência validada", async ({
  page,
}) => {
  await page.goto("/projetos");
  await expect(
    page.getByRole("button", { name: "Catálogo", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
  const models = page.getByRole("group", { name: "Selecionar modelo" });
  await expect(models.getByRole("button")).toHaveCount(6);
  await expect(
    page.getByRole("button", { name: "Projetos existentes" }),
  ).toHaveCount(0);
  await expect(
    models.getByRole("button", { name: "Pizzaria Bc.", exact: true }),
  ).toBeVisible();
  for (const concept of concepts) {
    await models
      .getByRole("button", { name: concept.name, exact: true })
      .click();
    const gallery = page.getByRole("region", {
      name: "Prévias de " + concept.name,
    });
    const thumbnails = gallery
      .getByRole("group", { name: "Miniaturas de prévias" })
      .getByRole("button");
    await expect(
      gallery.getByRole("button", { name: /Celular/ }),
    ).toHaveAttribute("aria-pressed", "true");
    for (const device of ["mobile", "desktop"] as const) {
      await gallery
        .getByRole("button", {
          name: device === "mobile" ? /Celular/ : /Desktop/,
        })
        .click();
      await expect(thumbnails).toHaveCount(concept[device].length);
      for (const [, label] of concept[device]) {
        const thumbnail = gallery
          .getByRole("button", { name: label, exact: true })
          .and(thumbnails);
        await thumbnail.click();
        await expect
          .poll(() =>
            thumbnail
              .locator("img")
              .evaluate((image) => (image as HTMLImageElement).naturalWidth),
          )
          .toBe(240);
        await expect(thumbnail).toHaveAttribute("aria-pressed", "true");
        await expect(gallery.locator(".concept-preview h4")).toBeVisible();
      }
      await expect(gallery.locator(".device-" + device)).toBeVisible();
    }
  }
  const gallery = page.getByRole("region", {
    name: "Prévias de Academia by Bc.",
  });
  await gallery.getByRole("button", { name: /Celular/ }).click();
  await gallery.focus();
  await page.keyboard.press("ArrowRight");
  await expect(gallery.locator(".concept-frame")).toHaveAttribute(
    "data-screen",
    "Início do aluno",
  );
  await gallery.getByRole("button", { name: "Ampliar prévia" }).click();
  await expect(
    page.getByRole("dialog", { name: "Prévia ampliada de Academia by Bc." }),
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
  await expect(page.getByLabel("Sua ideia *")).toHaveValue(/Academia by Bc./);
  await page
    .getByLabel("Sua ideia *")
    .fill("Quero apresentar a academia e organizar o acesso dos alunos.");
  await page.getByRole("button", { name: "Continuar" }).click();
  await page.getByLabel("Seu nome *").fill("Ana Teste");
  await page.getByLabel("WhatsApp ou telefone *").fill("11900000000");
  await page.getByRole("button", { name: "Continuar" }).click();
  await expect(
    page.getByText("Referência: Academia by Bc.", { exact: true }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Preparar mensagem" }).click();
  await expect(page.getByLabel("Mensagem preparada")).toHaveValue(
    /Referência: Academia by Bc./,
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
    "Coleção",
  );
  await stage.getByRole("button", { name: /Tênis Pulso/ }).click();
  await stage.getByRole("button", { name: "40", exact: true }).click();
  await stage.getByRole("button", { name: "Adicionar ao carrinho" }).click();
  await expect(stage.getByText("40 · Preto · 1 un.")).toBeVisible();
  await stage.getByRole("button", { name: "Finalizar compra" }).click();
  await stage.getByRole("button", { name: "Simular compra" }).click();
  await expect(stage.getByRole("status")).toContainText("Nenhuma cobrança");
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

test("Pizzaria Bc.: personalização, sacola, acompanhamento e histórico mobile", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/projetos");
  await page.getByRole("button", { name: "Pizzaria Bc.", exact: true }).click();
  const preview = page.locator(".concept-gallery .concept-preview");
  await preview
    .getByRole("button", { name: "Montar Calabresa artesanal" })
    .click();
  await preview.getByRole("button", { name: "Grande", exact: true }).click();
  await preview
    .getByRole("button", { name: "Manjericão", exact: true })
    .click();
  await preview.getByRole("button", { name: /Adicionar/ }).click();
  await expect(
    preview.getByText("Calabresa artesanal · Grande · Manjericão"),
  ).toBeVisible();
  await preview.getByRole("button", { name: "Simular pedido" }).click();
  await preview.getByRole("button", { name: "Avançar simulação" }).click();
  await expect(preview.getByRole("status")).toContainText("Preparando");
  await preview.getByRole("button", { name: "Perfil", exact: true }).click();
  await expect(
    preview.getByText("Calabresa artesanal · Grande · Manjericão"),
  ).toBeVisible();
});

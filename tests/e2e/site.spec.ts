import { test, expect, type Page } from "@playwright/test";
const pages = ["/", "/servicos", "/projetos", "/estudio", "/iniciar-projeto"];
async function ready(page: Page, path: string) {
  await page.goto(path);
  if (path.startsWith("/iniciar-projeto"))
    await expect(page.locator("form[data-ready]")).toHaveAttribute(
      "data-ready",
      "true",
    );
  await page.evaluate(() => document.fonts.ready);
}
test("menu fullscreen: foco, previews, Escape, scroll e links", async ({
  page,
}) => {
  await ready(page, "/");
  await page.getByRole("button", { name: "Abrir menu" }).click();
  const dialog = page.getByRole("dialog", { name: "Navegação em tela cheia" });
  await expect(dialog).toBeVisible();
  const scrollBefore = await page.evaluate(() => window.scrollY);
  await page.mouse.wheel(0, 500);
  expect(await page.evaluate(() => window.scrollY)).toBe(scrollBefore);
  await expect(dialog.getByRole("link", { name: /Início/ })).toBeFocused();
  expect(await page.evaluate(() => document.body.style.overflow)).toBe(
    "hidden",
  );
  await page.keyboard.press("Tab");
  await expect(page.locator(".menu-preview")).toHaveAttribute(
    "data-preview",
    "interfaces",
  );
  await dialog.getByRole("link", { name: /Projetos/ }).hover();
  await expect(page.locator(".menu-preview")).toHaveAttribute(
    "data-preview",
    "collection",
  );
  for (let i = 0; i < 10; i++) {
    await page.keyboard.press("Tab");
    expect(
      await dialog.evaluate((el) => el.contains(document.activeElement)),
    ).toBe(true);
  }
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await expect(page.getByRole("button", { name: "Abrir menu" })).toBeFocused();
  expect(await page.evaluate(() => document.body.style.overflow)).toBe("");
  await page.getByRole("button", { name: "Abrir menu" }).click();
  await dialog.getByRole("link", { name: /Serviços/ }).click();
  await expect(page).toHaveURL(/\/servicos$/);
  await expect(dialog).not.toBeVisible();
});
test("serviços: todas as categorias, entregáveis e orçamento contextual", async ({
  page,
}) => {
  await ready(page, "/servicos");
  const categories = page.getByRole("group", {
    name: "Categorias de serviços",
  });
  const buttons = categories.getByRole("button");
  await expect(buttons).toHaveCount(7);
  for (let i = 0; i < 7; i++) {
    await buttons.nth(i).click();
    await expect(buttons.nth(i)).toHaveAttribute("aria-pressed", "true");
    await page.locator(".solution-details summary").click();
    await expect(page.locator(".solution-details li")).toHaveCount(5);
    await expect(page.locator(".solution-details")).toHaveAttribute("open", "");
  }
  await page.getByRole("link", { name: "Criar essa solução" }).click();
  await expect(page).toHaveURL(/iniciar-projeto\?servico=Manuten/);
  await expect(page.getByRole("radio", { name: "Manutenção" })).toBeChecked();
});
test("coleção: anterior, próximo, teclado, página e galeria", async ({
  page,
}) => {
  await ready(page, "/projetos");
  await expect(page.getByRole("heading", { level: 2 })).toContainText(
    "My Expenses",
  );
  await page.getByRole("button", { name: "Próximo projeto" }).click();
  await expect(page.getByRole("heading", { level: 2 })).toContainText(
    "Pri Beauty",
  );
  await page.getByRole("button", { name: "Projeto anterior" }).click();
  await page.getByRole("region", { name: "Coleção de projetos" }).focus();
  await page.keyboard.press("ArrowLeft");
  await expect(page.getByRole("heading", { level: 2 })).toHaveText(
    "Best Restaurant",
  );
  await page.getByRole("button", { name: "Mostrar My Expenses" }).click();
  await page
    .getByRole("link", { name: "Explorar projeto My Expenses" })
    .focus();
  await page.keyboard.press("ArrowRight");
  await expect(
    page.getByRole("region", { name: "Coleção de projetos" }),
  ).toBeFocused();
  await expect(page.getByRole("heading", { level: 2 })).toHaveText(
    "Pri Beauty",
  );
  await page.getByRole("button", { name: "Mostrar My Expenses" }).click();
  await page
    .getByRole("link", { name: "Explorar projeto My Expenses" })
    .click();
  await expect(page).toHaveURL(/my-expenses$/);
  await page.getByRole("button", { name: "Ampliar imagem" }).click();
  await expect(page.getByRole("dialog", { name: /ampliada/ })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(
    page.getByRole("button", { name: "Ampliar imagem" }),
  ).toBeFocused();
  await page.getByRole("link", { name: "Pri Beauty" }).click();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Pri Beauty",
  );
});
test("brief completo: validação, persistência, revisão e WhatsApp interceptado", async ({
  page,
  context,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  await ready(page, "/iniciar-projeto");
  await page.getByRole("button", { name: "Continuar" }).click();
  await expect(page.getByText("Selecione o tipo de serviço.")).toBeVisible();
  await page.getByRole("radio", { name: /Site.*presença/ }).check();
  await page.getByRole("button", { name: "Continuar" }).click();
  await page.getByRole("button", { name: "Continuar" }).click();
  await expect(page.getByText(/Conte um pouco mais/)).toBeVisible();
  const idea =
    "Preciso de um site para apresentar meu trabalho e receber novos contatos.";
  await page.getByLabel("Sua ideia *").fill(idea);
  await page.getByRole("button", { name: "Voltar", exact: true }).click();
  await expect(
    page.getByRole("radio", { name: /Site.*presença/ }),
  ).toBeChecked();
  await page.getByRole("button", { name: "Continuar" }).click();
  await expect(page.getByLabel("Sua ideia *")).toHaveValue(idea);
  await page.getByRole("button", { name: "Continuar" }).click();
  await page.getByRole("button", { name: "Continuar" }).click();
  await expect(page.getByText(/Informe seu nome/)).toBeVisible();
  await page.getByLabel("Seu nome *").fill("Ana Teste");
  await page.getByLabel("WhatsApp ou telefone *").fill("11900000000");
  await page.getByLabel("E-mail (opcional)").fill("ana@example.com");
  await page.getByRole("button", { name: "Continuar" }).click();
  await page.getByRole("button", { name: "Editar contato" }).click();
  await expect(page.getByLabel("Seu nome *")).toHaveValue("Ana Teste");
  await page.getByRole("button", { name: "Continuar" }).click();
  await page.getByRole("button", { name: "Preparar mensagem" }).click();
  const summary = await page.getByLabel("Mensagem preparada").inputValue();
  expect(summary).toContain("Nome: Ana Teste");
  expect(summary).toContain(idea);
  const link = page.getByRole("link", { name: /Abrir WhatsApp/ });
  expect(
    new URL((await link.getAttribute("href"))!).searchParams.get("text"),
  ).toBe(summary);
  await expect(page.getByRole("status")).toContainText(
    "Nenhuma solicitação foi enviada",
  );
  await context.route("https://wa.me/**", (route) =>
    route.fulfill({
      status: 200,
      contentType: "text/html",
      body: "<title>Destino de teste interceptado</title>",
    }),
  );
  const popupPromise = page.waitForEvent("popup");
  await link.click();
  const popup = await popupPromise;
  await expect(popup).toHaveURL(/wa\.me/);
  await popup.close();
  await expect(page.getByRole("status")).toContainText("Conversa aberta");
  expect(errors).toEqual([]);
});
test("rotas e imagens disponíveis; 404 para projeto desconhecido", async ({
  request,
}) => {
  for (const route of [
    ...pages,
    "/privacidade",
    ...[
      "cantinho-do-luiz",
      "estudio-de-estetica",
      "my-expenses",
      "easydiet",
      "analise-de-dados",
    ].map((slug) => "/projetos/" + slug),
    "/sitemap.xml",
    "/robots.txt",
    "/opengraph-image",
    ...["restaurant", "beauty", "finance", "diet", "data"].map(
      (theme) => "/visuals/project-" + theme + ".svg",
    ),
  ])
    expect((await request.get(route)).ok(), route).toBe(true);
  expect((await request.get("/projetos/inexistente")).status()).toBe(404);
});
for (const width of [320, 375, 390, 430, 768, 1024, 1440, 1920]) {
  test(`layout responsivo em ${width}px`, async ({ page }, info) => {
    await page.setViewportSize({ width, height: width < 640 ? 844 : 1000 });
    for (const path of pages) {
      await ready(page, path);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= window.innerWidth,
        ),
        path,
      ).toBe(true);
      const cuts = await page
        .locator(
          "main h1:not(.sr-only),main h2,main input:not([type=radio]),main textarea,main select",
        )
        .evaluateAll((elements) =>
          elements
            .filter((el) => {
              const r = el.getBoundingClientRect();
              return r.width > 1 && (r.left < -1 || r.right > innerWidth + 1);
            })
            .map((el) => el.textContent?.slice(0, 40) || el.tagName),
        );
      expect(cuts, path).toEqual([]);
      await page.screenshot({
        path: info.outputPath(
          path === "/" ? `home-${width}.png` : `${path.slice(1)}-${width}.png`,
        ),
        fullPage: true,
      });
    }
    await ready(page, "/");
    await page.getByRole("button", { name: "Abrir menu" }).click();
    await expect(page.getByRole("dialog")).toBeVisible();
    expect(
      await page
        .getByRole("dialog")
        .evaluate((el) => el.scrollWidth <= innerWidth),
    ).toBe(true);
    await page.screenshot({
      path: info.outputPath(`menu-${width}.png`),
      fullPage: true,
    });
    await page.keyboard.press("Escape");
  });
}
test("mobile: categorias, orientação e navegação utilizável", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await ready(page, "/servicos");
  await page.getByRole("button", { name: /Explore as soluções/ }).click();
  await page
    .getByRole("dialog", { name: "Explore as soluções" })
    .getByRole("button", { name: /Inteligência artificial/i })
    .click();
  await expect(page.locator(".service-stage")).toHaveAttribute(
    "data-active-service",
    "ia",
  );
  await page.getByRole("button", { name: "Próxima solução" }).click();
  await expect(page.locator(".service-stage")).toHaveAttribute(
    "data-active-service",
    "manutencao",
  );
  await page.setViewportSize({ width: 844, height: 390 });
  await page.getByRole("button", { name: "Abrir menu" }).click();
  await expect(
    page.getByRole("dialog").getByRole("link", { name: /Iniciar projeto/ }),
  ).toBeVisible();
  await page.keyboard.press("Escape");
});
test("páginas individuais e imagens no mobile", async ({ page }, info) => {
  await page.setViewportSize({ width: 390, height: 844 });
  for (const slug of [
    "cantinho-do-luiz",
    "estudio-de-estetica",
    "my-expenses",
    "easydiet",
    "analise-de-dados",
    "pri-beauty",
    "deteccao-de-sepse",
    "binance-ai-research",
    "best-crm",
    "best-booking",
    "best-restaurant",
  ]) {
    await ready(page, "/projetos/" + slug);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
      slug,
    ).toBe(true);
    const image = page.locator(".case-cover img");
    await expect(image).toBeVisible();
    expect(
      await image.evaluate((el) => (el as HTMLImageElement).naturalWidth),
    ).toBeGreaterThan(0);
    await page.screenshot({
      path: info.outputPath(slug + ".png"),
      fullPage: true,
    });
  }
});
test("homepage compacta e redução de movimento", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await ready(page, "/");
  expect(
    await page.locator("body").evaluate((el) => el.scrollHeight),
  ).toBeLessThanOrEqual(1200);
  expect(
    await page
      .locator(".metal-monogram")
      .first()
      .evaluate((el) => getComputedStyle(el).animationName),
  ).toBe("none");
});

test("reflow equivalente a zoom de 200%", async ({ page, context }, info) => {
  const session = await context.newCDPSession(page);
  await session.send("Emulation.setDeviceMetricsOverride", {
    width: 640,
    height: 450,
    deviceScaleFactor: 2,
    mobile: false,
  });
  for (const path of pages) {
    await ready(page, path);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
      path,
    ).toBe(true);
  }
  await ready(page, "/");
  await page.getByRole("button", { name: "Abrir menu" }).click();
  await expect(
    page.getByRole("dialog").getByRole("link", { name: /Iniciar projeto/ }),
  ).toBeVisible();
  await page.screenshot({
    path: info.outputPath("reflow-200-percent.png"),
    fullPage: true,
  });
});

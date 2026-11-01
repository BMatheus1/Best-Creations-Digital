import { afterEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Header } from "@/components/layout/Header";
import { ServiceExplorer } from "@/components/services/ServiceExplorer";
import { ProjectCollection } from "@/components/projects/ProjectCollection";
import { ProjectVisual } from "@/components/projects/ProjectVisual";
import { ProjectGallery } from "@/components/projects/ProjectGallery";
import { ProjectWizard } from "@/components/forms/ProjectWizard";
import { services } from "@/data/services";
import { company, navigation } from "@/data/company";
import { projects } from "@/data/projects";
vi.mock("next/navigation", () => ({ usePathname: () => "/" }));
vi.mock("@/data/company", async (original) => {
  const actual = await original<typeof import("@/data/company")>();
  return { ...actual, company: { ...actual.company, whatsapp: "" } };
});
afterEach(() => {
  company.whatsapp = "";
  document.body.style.overflow = "";
});
describe("Menu fullscreen", () => {
  it("abre um modal, move o foco e bloqueia o scroll", async () => {
    const user = userEvent.setup();
    render(<Header />);
    await user.click(screen.getByRole("button", { name: "Abrir menu" }));
    const modal = screen.getByRole("dialog", {
      name: "Navegação em tela cheia",
    });
    expect(modal).toBeVisible();
    expect(document.body.style.overflow).toBe("hidden");
    expect(within(modal).getByRole("link", { name: /Início/ })).toHaveFocus();
    const links = within(modal).getByRole("navigation");
    navigation.forEach((item) =>
      expect(
        within(links).getByRole("link", { name: new RegExp(item.label) }),
      ).toHaveAttribute("href", item.href),
    );
  });
  it("muda o preview por foco e restaura foco/scroll ao fechar", async () => {
    const user = userEvent.setup();
    const { container } = render(<Header />);
    await user.click(screen.getByRole("button", { name: "Abrir menu" }));
    await user.tab();
    expect(container.querySelector(".menu-preview")).toHaveAttribute(
      "data-preview",
      "interfaces",
    );
    await user.hover(screen.getByRole("link", { name: /Projetos/ }));
    expect(container.querySelector(".menu-preview")).toHaveAttribute(
      "data-preview",
      "collection",
    );
    await user.click(screen.getByRole("button", { name: "Fechar menu" }));
    expect(screen.getByRole("button", { name: "Abrir menu" })).toHaveFocus();
    expect(document.body.style.overflow).toBe("");
  });
  it("trata o cancelamento nativo de Escape e fecha na seleção", async () => {
    const user = userEvent.setup();
    render(<Header />);
    await user.click(screen.getByRole("button", { name: "Abrir menu" }));
    fireEvent(
      screen.getByRole("dialog"),
      new Event("cancel", { bubbles: true, cancelable: true }),
    );
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Abrir menu" }));
    await user.click(screen.getByRole("link", { name: /Serviços/ }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
  it("mantém o ciclo de Tab e Shift+Tab dentro do menu", async () => {
    const user = userEvent.setup();
    render(<Header />);
    await user.click(screen.getByRole("button", { name: "Abrir menu" }));
    const modal = screen.getByRole("dialog");
    const instagram = within(modal).getByRole("link", { name: /Instagram/ });
    const brand = within(modal).getByRole("link", {
      name: "Best Creations — início",
    });
    instagram.focus();
    await user.tab();
    expect(brand).toHaveFocus();
    await user.tab({ shift: true });
    expect(instagram).toHaveFocus();
  });
});
describe("Exploradores", () => {
  it("preserva as sete categorias e todos os entregáveis", async () => {
    const user = userEvent.setup();
    render(<ServiceExplorer />);
    const group = screen.getByRole("group", { name: "Categorias de serviços" });
    expect(within(group).getAllByRole("button")).toHaveLength(7);
    for (const service of services) {
      await user.click(
        within(group).getByRole("button", {
          name: new RegExp(
            service.title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
          ),
        }),
      );
      expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
        service.title,
      );
      await user.click(
        screen.getByText("Explorar solução", { selector: "summary" }),
      );
      service.deliverables.forEach((item) =>
        expect(screen.getByText(item)).toBeVisible(),
      );
      expect(
        screen
          .getByRole("link", { name: "Criar essa solução" })
          .getAttribute("href"),
      ).toMatch(/^\/iniciar-projeto\?servico=/);
    }
  });
  it("permite escolher soluções pelo seletor mobile e botões", async () => {
    const user = userEvent.setup();
    render(<ServiceExplorer />);
    const trigger = screen.getByRole("button", { name: /Explore as soluções/ });
    await user.click(trigger);
    const picker = screen.getByRole("dialog", { name: "Explore as soluções" });
    await user.click(
      within(picker).getByRole("button", { name: /Aplicativos mobile/ }),
    );
    expect(picker).not.toHaveAttribute("open");
    expect(trigger).toHaveFocus();
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      "Aplicativos mobile",
    );
    await user.click(screen.getByRole("button", { name: "Próxima solução" }));
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      "negócios locais",
    );
    await user.click(screen.getByRole("button", { name: "Solução anterior" }));
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      "Aplicativos mobile",
    );
  });
  it("navega pela coleção com controles e teclado", async () => {
    const user = userEvent.setup();
    render(<ProjectCollection items={projects} />);
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      "My Expenses",
    );
    await user.click(screen.getByRole("button", { name: "Próximo projeto" }));
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      "Pri Beauty",
    );
    await user.click(screen.getByRole("button", { name: "Projeto anterior" }));
    const collection = screen.getByRole("region", {
      name: "Coleção de projetos",
    });
    collection.focus();
    await user.keyboard("{ArrowLeft}");
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      "Best Restaurant",
    );
    await user.click(
      screen.getByRole("button", { name: "Mostrar My Expenses" }),
    );
    expect(
      screen.getByRole("link", { name: "Explorar projeto My Expenses" }),
    ).toHaveAttribute("href", "/projetos/my-expenses");
    screen.getByRole("link", { name: "Explorar projeto My Expenses" }).focus();
    await user.keyboard("{ArrowRight}");
    expect(collection).toHaveFocus();
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      "Pri Beauty",
    );
  });
  it("oferece estado honesto quando a prévia está ausente", () => {
    render(<ProjectVisual />);
    expect(
      screen.getByText("Prévia real ainda não disponibilizada."),
    ).toBeVisible();
  });
  it("filtra a coleção e oferece alternativa para categoria vazia", async () => {
    const user = userEvent.setup();
    render(<ProjectCollection items={[projects[0]]} />);
    await user.click(screen.getByRole("button", { name: "Websites" }));
    expect(
      screen.getByText("Ainda não há projetos nesta categoria."),
    ).toBeVisible();
    expect(
      screen.getByRole("button", { name: "Próximo projeto" }),
    ).toBeDisabled();
    await user.click(
      screen.getByRole("button", { name: /Explorar toda a coleção/ }),
    );
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      "My Expenses",
    );
  });
  it("trata imagem que falhou sem ocultar o restante do projeto", () => {
    render(<ProjectVisual image={projects[0].images[0]} />);
    fireEvent.error(screen.getByRole("img"));
    expect(
      screen.getByText("Prévia real ainda não disponibilizada."),
    ).toBeVisible();
  });
  it("abre a galeria e restaura o foco no fechamento", async () => {
    const user = userEvent.setup();
    render(<ProjectGallery images={projects[0].images} name="My Expenses" />);
    await user.click(screen.getByRole("button", { name: "Próxima imagem" }));
    expect(screen.getByText(/02 \/ 02/)).toBeVisible();
    await user.click(screen.getByRole("button", { name: "Ampliar imagem" }));
    expect(screen.getByRole("dialog")).toBeVisible();
    await user.click(
      screen.getByRole("button", { name: "Fechar visualização" }),
    );
    expect(
      screen.getByRole("button", { name: "Ampliar imagem" }),
    ).toHaveFocus();
  });
});
async function completeWizard(user: ReturnType<typeof userEvent.setup>) {
  await user.click(screen.getByRole("radio", { name: /Site.*presença/ }));
  await user.click(screen.getByRole("button", { name: "Continuar" }));
  await user.click(screen.getByLabelText("Sua ideia *"));
  await user.paste(
    "Quero um website para apresentar meus serviços e receber contatos.",
  );
  await user.click(screen.getByRole("button", { name: "Continuar" }));
  await user.type(screen.getByLabelText("Seu nome *"), "Ana Teste");
  await user.type(
    screen.getByLabelText("WhatsApp ou telefone *"),
    "11900000000",
  );
  await user.click(screen.getByRole("button", { name: "Continuar" }));
}
describe("Formulário progressivo", () => {
  it("valida a solução antes de avançar", async () => {
    const user = userEvent.setup();
    render(<ProjectWizard />);
    await user.click(screen.getByRole("button", { name: "Continuar" }));
    expect(
      await screen.findByText("Selecione o tipo de serviço."),
    ).toBeVisible();
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      "Qual solução",
    );
  });
  it("preserva respostas ao avançar, voltar e editar a revisão", async () => {
    const user = userEvent.setup();
    render(<ProjectWizard />);
    await completeWizard(user);
    expect(screen.getByText("Ana Teste")).toBeVisible();
    await user.click(screen.getByRole("button", { name: "Editar ideia" }));
    expect(screen.getByLabelText("Sua ideia *")).toHaveValue(
      "Quero um website para apresentar meus serviços e receber contatos.",
    );
    await user.click(screen.getByRole("button", { name: "Continuar" }));
    expect(screen.getByLabelText("Seu nome *")).toHaveValue("Ana Teste");
    await user.click(screen.getByRole("button", { name: "Continuar" }));
    await user.click(screen.getByRole("button", { name: "Preparar mensagem" }));
    expect(
      (screen.getByLabelText("Mensagem preparada") as HTMLTextAreaElement)
        .value,
    ).toContain("Nome: Ana Teste");
    expect(screen.getByRole("status")).toHaveTextContent(
      "Nenhuma solicitação foi enviada.",
    );
    expect(
      screen.queryByRole("link", { name: /Abrir WhatsApp/ }),
    ).not.toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Copiar resumo" }));
    expect(
      await screen.findByRole("button", { name: "Resumo copiado" }),
    ).toBeVisible();
  });
  it("aceita a categoria contextual sem etapas adicionais", () => {
    render(<ProjectWizard initialService="Manutenção" />);
    expect(screen.getByRole("radio", { name: "Manutenção" })).toBeChecked();
  });
  it("gera o link configurado sem enviar uma solicitação", async () => {
    company.whatsapp = "5511000000000";
    const user = userEvent.setup();
    render(<ProjectWizard />);
    await completeWizard(user);
    await user.click(screen.getByRole("button", { name: "Preparar mensagem" }));
    const url = new URL(
      screen
        .getByRole("link", { name: /Abrir WhatsApp/ })
        .getAttribute("href")!,
    );
    expect(url.hostname).toBe("wa.me");
    expect(url.searchParams.get("text")).toContain("Nome: Ana Teste");
  });
});

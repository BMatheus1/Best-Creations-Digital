"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Dialog } from "radix-ui";
import {
  BarChart3,
  CalendarDays,
  ChevronDown,
  CircleHelp,
  ImageIcon,
  Instagram,
  LayoutDashboard,
  LogOut,
  Menu,
  PanelLeftClose,
  Settings,
  ShieldCheck,
  Sparkles,
  Wallet,
  X,
} from "lucide-react";
import { api, ApiError, type SessionData } from "@/lib/api";
import { Brand } from "@/components/brand";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/providers";

const SessionContext = createContext<SessionData | null>(null);
export function useSession() {
  const value = useContext(SessionContext);
  if (!value) throw new Error("Sessão indisponível");
  return value;
}
const navigation = [
  { href: "/dashboard", label: "Visão geral", icon: LayoutDashboard },
  { href: "/calendar", label: "Calendário", icon: CalendarDays, future: true },
  {
    href: "/media",
    label: "Biblioteca de mídia",
    icon: ImageIcon,
    future: true,
  },
  { href: "/analytics", label: "Analytics", icon: BarChart3, future: true },
  {
    href: "/accounts",
    label: "Contas conectadas",
    icon: Instagram,
    future: true,
  },
];
const management = [
  { href: "/billing", label: "Assinatura", icon: Wallet, future: true },
  { href: "/settings", label: "Configurações", icon: Settings },
];

export function AppShell({
  children,
  initialSession,
}: {
  children: React.ReactNode;
  initialSession: SessionData;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const cache = useQueryClient();
  const { notify } = useToast();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [busy, setBusy] = useState(false);
  const session = useQuery({
    queryKey: ["session"],
    queryFn: () => api<SessionData>("/auth/session"),
    initialData: initialSession,
    refetchOnWindowFocus: true,
  });
  const data = session.data;
  useEffect(() => {
    if (
      session.error instanceof ApiError &&
      [401, 403].includes(session.error.status)
    ) {
      cache.clear();
      router.replace("/login");
    }
  }, [session.error, cache, router]);
  const workspace = data.workspaces.find((ws) => ws.id === data.workspace_id)!;
  const active = [...navigation, ...management].find((item) =>
    pathname.startsWith(item.href),
  );
  const logout = async () => {
    setBusy(true);
    try {
      await api("/auth/logout", { method: "POST" });
      cache.clear();
      router.replace("/login");
      router.refresh();
    } catch (err) {
      notify((err as Error).message, true);
    } finally {
      setBusy(false);
    }
  };
  const switchWorkspace = async (id: string) => {
    setBusy(true);
    try {
      const next = await api<SessionData>("/workspaces/select", {
        method: "POST",
        body: JSON.stringify({ workspace_id: id }),
      });
      cache.removeQueries({
        predicate: (query) => query.queryKey[0] !== "session",
      });
      cache.setQueryData(["session"], next);
      router.refresh();
      notify("Workspace alterado.");
    } catch (err) {
      notify((err as Error).message, true);
    } finally {
      setBusy(false);
    }
  };
  const sidebarContent = (mobile = false) => (
    <>
      <Link
        href="/dashboard"
        className="sidebar-brand"
        onClick={() => setMobileOpen(false)}
      >
        <Brand />
      </Link>
      <div className="workspace-picker">
        <span className="workspace-avatar">
          {workspace.name.charAt(0).toUpperCase()}
        </span>
        <div>
          <span className="workspace-caption">SEU WORKSPACE</span>
          <label
            className="sr-only"
            htmlFor={mobile ? "mobile-workspace" : "workspace"}
          >
            Selecionar workspace
          </label>
          <select
            id={mobile ? "mobile-workspace" : "workspace"}
            value={workspace.id}
            disabled={busy}
            onChange={(e) => switchWorkspace(e.target.value)}
          >
            {data.workspaces.map((ws) => (
              <option key={ws.id} value={ws.id}>
                {ws.name}
              </option>
            ))}
          </select>
        </div>
        <ChevronDown size={14} />
      </div>
      <div className="nav-section-label">WORKSPACE</div>
      <nav aria-label="Navegação principal">
        {navigation.map((item) => (
          <Link
            href={item.href}
            key={item.href}
            onClick={() => setMobileOpen(false)}
            className={`nav-item ${pathname.startsWith(item.href) ? "active" : ""}`}
            aria-current={pathname.startsWith(item.href) ? "page" : undefined}
            title={item.label}
          >
            <item.icon size={19} />
            <span>{item.label}</span>
            {item.future && (
              <span className="nav-future" aria-label="Em desenvolvimento">
                Em breve
              </span>
            )}
          </Link>
        ))}
      </nav>
      <div className="nav-section-label management-label">GERENCIAR</div>
      <nav aria-label="Gerenciar workspace">
        {management.map((item) => (
          <Link
            href={item.href}
            key={item.href}
            onClick={() => setMobileOpen(false)}
            className={`nav-item ${pathname.startsWith(item.href) ? "active" : ""}`}
            aria-current={pathname.startsWith(item.href) ? "page" : undefined}
            title={item.label}
          >
            <item.icon size={19} />
            <span>{item.label}</span>
            {item.future && <span className="nav-future">Em breve</span>}
          </Link>
        ))}
      </nav>
      <div className="sidebar-bottom">
        <div className="sidebar-note">
          <span className="note-icon">
            <Sparkles size={18} />
          </span>
          <strong>Um bom começo.</strong>
          <p>
            Seu espaço está pronto.
            <br />
            Vamos construir o próximo passo.
          </p>
          <Link href="/getting-started" onClick={() => setMobileOpen(false)}>
            Conhecer a plataforma <span>↗</span>
          </Link>
        </div>
        <Link
          className="support-link"
          href="/getting-started"
          onClick={() => setMobileOpen(false)}
        >
          <CircleHelp size={18} />
          <span>Primeiros passos</span>
        </Link>
        <div className="sidebar-profile">
          <span className="profile-avatar">
            {data.user.name
              .split(" ")
              .map((word) => word[0])
              .slice(0, 2)
              .join("")}
          </span>
          <div>
            <strong>{data.user.name}</strong>
            <span>
              {workspace.role === "owner"
                ? "Proprietário"
                : workspace.role === "admin"
                  ? "Administrador"
                  : "Membro"}
            </span>
          </div>
          <button
            onClick={logout}
            disabled={busy}
            aria-label="Sair da conta"
            title="Sair da conta"
          >
            <LogOut size={17} />
          </button>
        </div>
      </div>
    </>
  );
  if (session.error)
    return (
      <main className="standalone">
        <h1>Não foi possível carregar sua sessão.</h1>
        <p>{session.error.message}</p>
        <Button onClick={() => session.refetch()}>Tentar novamente</Button>
      </main>
    );
  return (
    <SessionContext.Provider value={data}>
      <div className={`app-layout ${collapsed ? "sidebar-collapsed" : ""}`}>
        <aside className="sidebar">{sidebarContent()}</aside>
        <div className="app-main">
          <header className="topbar">
            <div className="topbar-left">
              <Button
                className="desktop-menu"
                variant="ghost"
                size="icon"
                onClick={() => setCollapsed(!collapsed)}
                aria-label={collapsed ? "Expandir menu" : "Recolher menu"}
              >
                <PanelLeftClose size={18} />
              </Button>
              <Dialog.Root open={mobileOpen} onOpenChange={setMobileOpen}>
                <Dialog.Trigger asChild>
                  <Button
                    className="mobile-menu"
                    variant="ghost"
                    size="icon"
                    aria-label="Abrir menu"
                  >
                    <Menu size={22} />
                  </Button>
                </Dialog.Trigger>
                <Dialog.Portal>
                  <Dialog.Overlay className="dialog-overlay" />
                  <Dialog.Content className="mobile-sidebar">
                    <Dialog.Title className="sr-only">
                      Menu de navegação
                    </Dialog.Title>
                    <Dialog.Description className="sr-only">
                      Navegue pelas páginas do PostPilot.
                    </Dialog.Description>
                    <Dialog.Close asChild>
                      <button className="mobile-close" aria-label="Fechar menu">
                        <X size={20} />
                      </button>
                    </Dialog.Close>
                    {sidebarContent(true)}
                  </Dialog.Content>
                </Dialog.Portal>
              </Dialog.Root>
              <span className="breadcrumb-workspace">Workspace</span>
              <span className="breadcrumb-divider">/</span>
              <span>{active?.label || "Primeiros passos"}</span>
            </div>
            <div className="topbar-right">
              <span className="development-badge">
                <span />
                Fase 1 · Fundação
              </span>
              <span className="topbar-divider" />
              <Link
                href="/settings"
                className="topbar-avatar"
                aria-label="Abrir meu perfil"
              >
                {data.user.name[0].toUpperCase()}
              </Link>
            </div>
          </header>
          <main id="main-content" className="page-content">
            {children}
          </main>
          <footer className="app-footer">
            <span>
              © PostPilot <span className="footer-dot">·</span> Mais espaço para
              suas ideias.
            </span>
            <span>
              <ShieldCheck size={13} /> Workspace privado
            </span>
          </footer>
        </div>
      </div>
    </SessionContext.Provider>
  );
}

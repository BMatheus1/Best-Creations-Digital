"use client";
import Link from "next/link";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronRight,
  Circle,
  Clock3,
  Compass,
  Instagram,
  LayoutGrid,
  Mail,
  Send,
  Settings2,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import { api, type DashboardData } from "@/lib/api";
import { useSession } from "@/components/app-shell";
import { useToast } from "@/components/providers";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const actionLabels: Record<string, string> = {
  "auth.register": "Sua conta e seu workspace foram criados",
  "auth.login": "Você acessou o workspace",
  "auth.logout": "Uma sessão foi encerrada",
  "profile.updated": "Seu perfil foi atualizado",
  "workspace.updated": "Os dados do workspace foram atualizados",
  "workspace.created": "Workspace criado",
  "membership.role_updated": "As permissões de um membro foram alteradas",
};

export default function Dashboard() {
  const session = useSession();
  const workspace = session.workspaces.find(
    (ws) => ws.id === session.workspace_id,
  )!;
  const { notify } = useToast();
  const cache = useQueryClient();
  const [sending, setSending] = useState(false);
  const dashboard = useQuery({
    queryKey: ["dashboard", workspace.id],
    queryFn: () => api<DashboardData>("/dashboard"),
  });
  const resend = async () => {
    setSending(true);
    try {
      const result = await api<{ message: string }>(
        "/auth/resend-verification",
        { method: "POST" },
      );
      notify(result.message);
      await cache.invalidateQueries({ queryKey: ["session"] });
    } catch (err) {
      notify((err as Error).message, true);
    } finally {
      setSending(false);
    }
  };
  return (
    <>
      <div className="page-heading">
        <div>
          <span className="eyebrow">SEU ESPAÇO CRIATIVO</span>
          <h1>
            Olá, {session.user.name.split(" ")[0]}{" "}
            <span className="hello-spark">✦</span>
          </h1>
          <p>Um novo começo para a presença do seu negócio.</p>
        </div>
        <Button variant="outline" asChild>
          <Link href="/settings">
            <Settings2 size={16} /> Gerenciar workspace
          </Link>
        </Button>
      </div>
      {!session.user.email_verified && (
        <div className="verification-banner">
          <span className="banner-icon">
            <Mail size={17} />
          </span>
          <p>
            <strong>Só falta confirmar seu email.</strong> Confira sua caixa de
            entrada para proteger sua conta.
          </p>
          <button disabled={sending} onClick={resend}>
            {sending ? "Enviando…" : "Reenviar email"}
            <ArrowRight size={14} />
          </button>
        </div>
      )}
      <section className="welcome-card">
        <div className="welcome-copy">
          <span className="welcome-tag">
            <span /> TUDO COMEÇA COM UMA BOA IDEIA
          </span>
          <h2>
            Sua próxima fase
            <br />
            começa <span>aqui.</span>
          </h2>
          <p>
            Seu workspace está pronto. Personalize seu espaço
            <br className="desktop-break" /> e conheça os próximos passos do
            PostPilot.
          </p>
          <Button asChild>
            <Link href="/getting-started">
              Vamos começar <ArrowRight size={17} />
            </Link>
          </Button>
          <span className="welcome-foot">
            <ShieldCheck size={13} /> Seu espaço. Suas ideias. No seu ritmo.
          </span>
        </div>
        <div className="welcome-art" aria-hidden="true">
          <div className="art-grid" />
          <span className="decor-star star-one">✦</span>
          <span className="decor-star star-two">✧</span>
          <div className="floating-note">
            <span className="floating-icon">
              <Compass size={24} />
            </span>
            <div>
              <span>UM NOVO PONTO DE PARTIDA</span>
              <strong>Ideias com direção.</strong>
            </div>
            <span className="note-dot" />
          </div>
          <div className="floating-planner">
            <div className="planner-top">
              <span>
                <CalendarDays size={16} /> Meu espaço criativo
              </span>
              <span>•••</span>
            </div>
            <div className="planner-lines">
              <span />
              <span />
              <span />
            </div>
            <div className="planner-bottom">
              <span>
                <span /> Pronto para começar
              </span>
              <span className="planner-arrow">
                <ArrowUpRight size={16} />
              </span>
            </div>
          </div>
          <span className="art-circle">
            <Send size={29} />
          </span>
          <span className="art-small-pill">
            <Sparkles size={13} /> O próximo passo é seu
          </span>
        </div>
      </section>
      <section className="summary-grid" aria-label="Resumo do workspace">
        {[
          {
            label: "Publicações agendadas",
            icon: CalendarDays,
            foot: "Agendamento em desenvolvimento",
            color: "purple",
          },
          {
            label: "Publicações realizadas",
            icon: CheckCircle2,
            foot: "Publicação em desenvolvimento",
            color: "green",
          },
          {
            label: "Alcance no Instagram",
            icon: Users,
            foot: "Conecte uma conta quando disponível",
            color: "blue",
          },
        ].map((stat) => (
          <div className="summary-card" key={stat.label}>
            <div>
              <span>{stat.label}</span>
              <span className={`stat-icon ${stat.color}`}>
                <stat.icon size={17} />
              </span>
            </div>
            <strong aria-label="Dado indisponível">—</strong>
            <p>
              <span className="mini-dot" />
              {stat.foot}
            </p>
          </div>
        ))}
      </section>
      <div className="dashboard-columns">
        <section className="panel onboarding-panel">
          <div className="panel-heading">
            <div>
              <h2>Seu ponto de partida</h2>
              <p>Prepare seu workspace para o que vem a seguir.</p>
            </div>
            <span className="count-tag">
              {session.user.email_verified ? "2" : "1"} de 2
            </span>
          </div>
          <div className="progress-track">
            <span
              style={{
                width: session.user.email_verified ? "100%" : "50%",
              }}
            />
          </div>
          <div className="onboarding-step complete">
            <span className="step-check">
              <Check size={14} />
            </span>
            <div>
              <h3>Criar seu workspace</h3>
              <p>{workspace.name} já tem um lugar por aqui.</p>
            </div>
            <span className="step-status">Concluído</span>
          </div>
          <div
            className={`onboarding-step ${session.user.email_verified ? "complete" : ""}`}
          >
            <span className="step-check">
              {session.user.email_verified ? (
                <Check size={14} />
              ) : (
                <Mail size={14} />
              )}
            </span>
            <div>
              <h3>Confirmar seu email</h3>
              <p>
                {session.user.email_verified
                  ? "Endereço confirmado e conta protegida."
                  : "Abra o link enviado para sua caixa de entrada."}
              </p>
            </div>
            {session.user.email_verified ? (
              <span className="step-status">Concluído</span>
            ) : (
              <button
                className="text-button"
                onClick={resend}
                disabled={sending}
              >
                Reenviar <ArrowRight size={14} />
              </button>
            )}
          </div>
          <Link href="/settings" className="onboarding-step">
            <span className="step-check">
              <Settings2 size={14} />
            </span>
            <div>
              <h3>Deixar seu espaço com a sua cara</h3>
              <p>Opcional: ajuste seu nome, workspace e fuso horário.</p>
            </div>
            <ChevronRight size={17} />
          </Link>
        </section>
        <section className="panel connection-panel">
          <div className="panel-heading">
            <h2>Sua presença no Instagram</h2>
            <span className="subtle-badge">Próxima fase</span>
          </div>
          <div className="connection-empty">
            <span className="instagram-bubble">
              <Instagram size={27} />
            </span>
            <h3>Uma conexão que vem aí.</h3>
            <p>
              A integração oficial com o Instagram será
              <br className="desktop-break" /> disponibilizada na Fase 3 do
              produto.
            </p>
            <Link href="/accounts">
              Entenda como vai funcionar <ArrowUpRight size={15} />
            </Link>
          </div>
        </section>
      </div>
      <div className="dashboard-columns bottom-columns">
        <section className="panel">
          <div className="panel-heading">
            <div>
              <h2>Próximas publicações</h2>
              <p>Um espaço para acompanhar seu planejamento.</p>
            </div>
            <span className="soft-icon">
              <CalendarDays size={18} />
            </span>
          </div>
          <div className="publications-empty">
            <span className="empty-outline-icon">
              <LayoutGrid size={22} />
            </span>
            <div>
              <h3>O primeiro capítulo ainda está por vir.</h3>
              <p>
                Editor e calendário chegam na Fase 2. Suas publicações
                <br className="desktop-break" /> aparecerão aqui quando esses
                módulos estiverem disponíveis.
              </p>
            </div>
            <Link href="/calendar" aria-label="Conhecer o calendário">
              <ArrowUpRight size={18} />
            </Link>
          </div>
        </section>
        <section className="panel">
          <div className="panel-heading">
            <h2>Atividade do workspace</h2>
            <span className="soft-icon">
              <Clock3 size={17} />
            </span>
          </div>
          {dashboard.isPending ? (
            <div
              className="activity-skeleton"
              role="status"
              aria-label="Carregando atividades"
            >
              <span />
              <span />
            </div>
          ) : dashboard.isError ? (
            <div className="panel-error" role="alert">
              <p>{dashboard.error.message}</p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => dashboard.refetch()}
              >
                Tentar novamente
              </Button>
            </div>
          ) : (
            <ul className="activity-list">
              {dashboard.data.activity.map((event) => (
                <li key={event.id}>
                  <span className="activity-dot">
                    <Circle size={7} fill="currentColor" />
                  </span>
                  <div>
                    <p>
                      {actionLabels[event.action] ||
                        "Atividade registrada no workspace"}
                    </p>
                    <time dateTime={event.created_at}>
                      {new Intl.DateTimeFormat("pt-BR", {
                        dateStyle: "short",
                        timeStyle: "short",
                        timeZone: session.user.timezone,
                      }).format(new Date(event.created_at))}
                    </time>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
      <div className="dashboard-endnote">
        <Sparkles size={14} />
        <p>
          Um passo de cada vez. Sua criatividade já tem um lugar para crescer.
        </p>
      </div>
    </>
  );
}

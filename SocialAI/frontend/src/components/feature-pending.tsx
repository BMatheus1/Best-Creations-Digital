import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  CalendarDays,
  ChartNoAxesCombined,
  ImageIcon,
  Instagram,
  LockKeyhole,
  PenLine,
  Wallet,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const features = {
  calendar: {
    title: "Calendário",
    icon: CalendarDays,
    phase: 2,
    tagline: "Um lugar para suas próximas ideias.",
    body: "O calendário e o editor de publicações serão construídos na Fase 2, com rascunhos persistentes, filtros e navegação por período.",
    note: "O agendamento com publicação automática depende das Fases 3 e 4.",
  },
  media: {
    title: "Biblioteca de mídia",
    icon: ImageIcon,
    phase: 2,
    tagline: "Suas imagens, no lugar certo.",
    body: "Upload validado, armazenamento privado e organização de imagens serão implementados na Fase 2.",
    note: "O envio de arquivos ainda não está disponível nesta versão.",
  },
  analytics: {
    title: "Analytics",
    icon: ChartNoAxesCombined,
    phase: 5,
    tagline: "Resultados que contam a sua história.",
    body: "As métricas serão obtidas pela API oficial e exibidas quando houver uma conta autorizada e dados disponíveis.",
    note: "Nenhuma métrica do Instagram é coletada ou exibida nesta fase.",
  },
  accounts: {
    title: "Contas conectadas",
    icon: Instagram,
    phase: 3,
    tagline: "Seu Instagram, mais perto.",
    body: "A conexão oficial com o Instagram será implementada na Fase 3, após validação da documentação e configuração do aplicativo Meta.",
    note: "OAuth e publicação ainda não estão disponíveis. O PostPilot nunca solicitará sua senha do Instagram.",
  },
  billing: {
    title: "Assinatura",
    icon: Wallet,
    phase: 6,
    tagline: "Um plano para cada próximo passo.",
    body: "Os planos e a assinatura mensal via Mercado Pago serão implementados na Fase 6, com confirmação pelo provedor e controle de limites no servidor.",
    note: "Você não tem uma assinatura contratada nesta versão. Nenhuma cobrança está habilitada.",
  },
  posts: {
    title: "Criar publicação",
    icon: PenLine,
    phase: 2,
    tagline: "De uma boa ideia a um bom conteúdo.",
    body: "O editor com imagem, legenda e rascunhos será implementado na Fase 2.",
    note: "Ainda não é possível salvar ou publicar conteúdos nesta versão.",
  },
};
export function FeaturePending({
  feature,
}: {
  feature: keyof typeof features;
}) {
  const item = features[feature];
  return (
    <>
      <div className="page-heading">
        <div>
          <span className="eyebrow">O QUE VEM A SEGUIR</span>
          <h1>{item.title}</h1>
          <p>Crescendo com cada etapa do PostPilot.</p>
        </div>
        <span className="subtle-badge">
          Em desenvolvimento · Fase {item.phase}
        </span>
      </div>
      <section className="feature-pending panel">
        <span className="feature-pending-icon">
          <item.icon size={35} />
        </span>
        <span className="eyebrow">UM PASSO DE CADA VEZ</span>
        <h2>{item.tagline}</h2>
        <p>{item.body}</p>
        <div className="feature-note">
          <LockKeyhole size={16} />
          <span>{item.note}</span>
        </div>
        <div className="feature-actions">
          <Button asChild>
            <Link href="/getting-started">
              Conhecer as etapas <ArrowUpRight size={16} />
            </Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/dashboard">
              <ArrowLeft size={15} /> Voltar à visão geral
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
}

import Link from "next/link";
import { ArrowRight, Check, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function GettingStarted() {
  return (
    <>
      <div className="page-heading">
        <div>
          <span className="eyebrow">PRIMEIROS PASSOS</span>
          <h1>Um caminho com direção.</h1>
          <p>Conheça o que já está disponível e o que vem pela frente.</p>
        </div>
        <Compass size={30} className="purple-text" />
      </div>
      <section className="intro-panel">
        <span className="subtle-badge">Fase 1 · Fundação</span>
        <h2>Seu workspace já tem um lugar.</h2>
        <p>
          Nesta versão você pode criar sua conta, confirmar seu email, gerenciar
          seu perfil e organizar workspaces independentes. Os módulos de
          conteúdo e as integrações serão construídos nas próximas fases.
        </p>
        <Button asChild>
          <Link href="/settings">
            Personalizar meu espaço <ArrowRight size={16} />
          </Link>
        </Button>
      </section>
      <div className="roadmap-grid">
        {[
          [
            "01",
            "Fundação",
            "Contas de usuário, sessões seguras, workspaces e permissões.",
            true,
          ],
          [
            "02",
            "Espaço para criar",
            "Biblioteca privada, editor de imagens, rascunhos e calendário.",
          ],
          [
            "03",
            "Conexão com Instagram",
            "OAuth oficial e publicação, sujeitos às permissões da Meta.",
          ],
          [
            "04",
            "Publicação agendada",
            "Tarefas persistentes, controle de concorrência e reconciliação.",
          ],
          [
            "05",
            "Resultados com clareza",
            "Insights reais, sincronização e gráficos de desempenho.",
          ],
          [
            "06",
            "Planos e assinaturas",
            "Mercado Pago, confirmação de pagamentos e limites de uso.",
          ],
        ].map(([number, title, description, available]) => (
          <section
            className={`panel roadmap-card ${available ? "available" : ""}`}
            key={String(number)}
          >
            <span className="roadmap-number">{number}</span>
            <span className="subtle-badge">
              {available ? (
                <>
                  <Check size={12} /> Disponível
                </>
              ) : (
                "Próxima etapa"
              )}
            </span>
            <h3>{title}</h3>
            <p>{description}</p>
          </section>
        ))}
      </div>
      <p className="roadmap-footnote">
        A preparação comercial e o lançamento acontecem após a validação das
        etapas e das integrações externas.
      </p>
    </>
  );
}

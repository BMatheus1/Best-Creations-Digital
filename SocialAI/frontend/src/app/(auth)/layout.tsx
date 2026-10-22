import { ArrowUpRight, Check, Compass, Sparkles } from "lucide-react";
import { Brand } from "@/components/brand";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="auth-layout">
      <section className="auth-story">
        <Brand light />
        <div className="story-copy">
          <span className="story-label">
            <span />
            MAIS CLAREZA. MAIS CRIATIVIDADE.
          </span>
          <h2>
            Seu conteúdo merece
            <br />
            uma boa <em>direção.</em>
          </h2>
          <p>
            Um espaço para suas ideias ganharem forma.
            <br />E sua presença no Instagram ganhar consistência.
          </p>
          <div className="story-art" aria-hidden="true">
            <div className="orbit orbit-one" />
            <div className="orbit orbit-two" />
            <div className="art-main">
              <Compass size={34} />
              <span>
                Da ideia à próxima
                <br />
                <strong>grande publicação.</strong>
              </span>
              <ArrowUpRight size={24} />
            </div>
            <span className="art-pill">
              <Sparkles size={16} /> Espaço para criar
            </span>
            <span className="art-check">
              <Check size={19} />
            </span>
          </div>
        </div>
        <p className="auth-foot">
          POSTPILOT <span>FEITO PARA O SEU PRÓXIMO PASSO.</span>
        </p>
      </section>
      <section className="auth-form-side">
        <div className="auth-mobile-brand">
          <Brand />
        </div>
        {children}
        <p className="auth-phase">
          Versão de desenvolvimento · Fundação do produto
        </p>
      </section>
    </main>
  );
}

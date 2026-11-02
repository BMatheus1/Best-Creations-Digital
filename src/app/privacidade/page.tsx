import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { company } from "@/data/company";

export const metadata: Metadata = {
  title: "Privacidade",
  description:
    "Saiba como funciona o formulário e como os dados são tratados neste website.",
  ...(company.siteUrl
    ? { alternates: { canonical: `${company.siteUrl}/privacidade` } }
    : {}),
};
export default function PrivacyPage() {
  return (
    <main id="conteudo" className="legal-page container">
      <Link className="text-link" href="/iniciar-projeto">
        <ArrowLeft size={16} aria-hidden="true" />
        Voltar ao orçamento
      </Link>
      <p className="eyebrow">TRANSPARÊNCIA NO PRIMEIRO CONTATO</p>
      <h1>
        Sua privacidade
        <br />
        <span className="serif gold-text">merece cuidado.</span>
      </h1>
      <p className="legal-date">Atualizado em 21 de outubro de 2026.</p>
      <div className="legal-copy">
        <h2>Dados do formulário</h2>
        <p>
          O formulário prepara um resumo de orçamento no seu navegador com nome,
          telefone, serviço e descrição, além das informações opcionais que você
          escolher preencher. Não enviamos o formulário a um servidor da Best
          Creations, nem o salvamos em cookies, localStorage ou banco de dados.
          O texto permanece na memória da página até você sair ou recarregá-la.
        </p>
        <h2>Ambientes de demonstração</h2>
        <p>
          Best CRM, Best Booking e Best Restaurant utilizam cenários fictícios.
          As alterações ficam apenas na memória da página, sem cadastro, banco
          de produção, cookies ou armazenamento persistente. Restaurar o
          cenário, recarregar ou sair da demo descarta essas alterações.
          Pedidos, reservas e agendamentos são simulações; não geram pagamentos,
          mensagens ou solicitações comerciais. Utilize somente informações
          inventadas.
        </p>
        <h2>Compartilhamento por sua escolha</h2>
        <p>
          Copiar o resumo utiliza a área de transferência do seu dispositivo. Ao
          abrir o WhatsApp, o texto é incluído no endereço da conversa e
          compartilhado com esse serviço, podendo aparecer no histórico do
          navegador. O envio da mensagem depende da sua confirmação no WhatsApp.
          O Instagram também é um serviço externo. Esses serviços tratam dados
          conforme suas próprias políticas.
        </p>
        <p>
          Os links para GitHub e aplicações do portfólio abrem serviços
          externos, sujeitos às políticas de seus responsáveis. As capturas
          exibidas no showroom são arquivos locais; as demos não incorporam
          essas aplicações nem acessam suas contas.
        </p>
        <h2>Informações técnicas de acesso</h2>
        <p>
          Este projeto não inclui ferramentas de publicidade, rastreadores ou
          analytics. O provedor de hospedagem poderá processar informações
          técnicas de acesso, como endereço IP, horário e requisições, conforme
          sua configuração e política. A hospedagem e o domínio oficiais serão
          definidos na publicação.
        </p>
        <h2>Dados necessários</h2>
        <p>
          Compartilhe somente as informações necessárias para explicar seu
          projeto. Evite incluir senhas, documentos, dados financeiros ou outras
          informações sensíveis no campo de descrição.
        </p>
        <h2>Contato e solicitações</h2>
        <p>
          Para dúvidas ou solicitações relacionadas a informações compartilhadas
          diretamente com o estúdio, entre em contato pelo{" "}
          <a
            href={company.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp da Best Creations (abre em nova aba)
          </a>
          {company.email ? (
            <>
              {" "}
              ou pelo e-mail{" "}
              <a href={`mailto:${company.email}`}>{company.email}</a>
            </>
          ) : (
            ". O e-mail comercial será disponibilizado após confirmação"
          )}
          .
        </p>
        <h2>Atualizações</h2>
        <p>
          Novos formulários, integrações, analytics ou sistemas de armazenamento
          exigirão revisão destas informações antes de entrar em operação.
        </p>
      </div>
    </main>
  );
}

import { company } from "@/data/company";

export const privacyPolicy = {
  path: "/politica-de-privacidade",
  url: new URL(
    "/politica-de-privacidade",
    company.siteUrl || "https://best-creations-digital.mylinkbr.workers.dev",
  ).href,
  updatedAt: "2026-11-07",
  description:
    "Saiba como a Best Creations trata e protege informações relacionadas aos seus serviços e aplicações digitais.",
};

export const privacySections = [
  {
    id: "introducao",
    title: "Introdução e abrangência",
    paragraphs: [
      "A Best Creations é responsável por este site institucional e pelo atendimento realizado por seus canais de contato. Esta política explica o tratamento de informações no site, em suas demonstrações e no Studio Factory, ferramenta privada de criação de recursos gráficos digitais, como figurinhas, composições e LUTs.",
      "O site público e o Studio Factory são ambientes distintos. A navegação no site não cria uma conta no aplicativo nem conecta automaticamente contas de terceiros. Funcionalidades planejadas são identificadas como tais e não representam integrações já disponíveis.",
    ],
  },
  {
    id: "informacoes",
    title: "Dados pessoais e informações tratadas",
    paragraphs: [
      "No site, o formulário de orçamento utiliza nome, telefone, serviço e descrição do projeto. Empresa, e-mail, prazo e investimento são opcionais. As respostas ficam na memória da página e não são enviadas a uma API de orçamento ou banco de dados da Best Creations. Recarregar ou sair da página descarta o preenchimento.",
      "Ao escolher abrir o WhatsApp, o resumo é incluído no endereço da conversa e compartilhado com esse serviço; ele também pode constar no histórico do navegador. O envio da mensagem exige sua confirmação no WhatsApp. Copiar o resumo grava o texto na área de transferência do dispositivo.",
      "No Studio Factory, são processados arquivos importados, imagens e vídeos de prévia, temas, frases, referências por link, projetos, preferências e metadados necessários à criação e organização dos recursos. A versão examinada não oferece cadastro público nem login com Pinterest. A chave opcional do Google Fonts, quando configurada, é utilizada para consultas a esse provedor.",
      "Na hospedagem, a entrega e a proteção do site pela Cloudflare podem envolver endereço IP, informações do navegador, horários, requisições e registros técnicos, conforme a configuração e a política do provedor. Isso é diferente dos dados preenchidos no formulário.",
    ],
  },
  {
    id: "finalidades",
    title: "Finalidades do tratamento",
    paragraphs: [
      "As informações são utilizadas para apresentar o site, preparar orçamentos, atender contatos iniciados pelo visitante e manter a segurança e o funcionamento dos serviços. No Studio Factory, servem à criação, edição, prévia, organização e exportação de recursos gráficos e às consultas externas escolhidas pelo operador.",
      "No atendimento, o tratamento se relaciona à solicitação de proposta e às providências necessárias a um eventual contrato. Outras operações dependem da finalidade e da hipótese legal aplicável, como cumprimento de obrigação legal ou consentimento quando exigido. Autorizar uma plataforma não significa autorizar usos diferentes dos informados.",
    ],
  },
  {
    id: "pinterest",
    title: "Integração com a API do Pinterest",
    paragraphs: [
      "O Studio Factory poderá utilizar a API oficial do Pinterest, após as aprovações necessárias, mediante autenticação e permissões concedidas pelo titular da conta, para consultar e organizar referências visuais. A integração com a API está planejada e não é apresentada nesta política como ativa.",
      "Atualmente, a funcionalidade examinada permite registrar manualmente links de referência, títulos, autoria e observações. Ela não realiza autenticação OAuth no Pinterest nem consulta automaticamente dados da conta pela API.",
      "Quando disponibilizada, a integração deverá limitar o acesso às permissões autorizadas e usar as informações apenas para as finalidades declaradas. Não haverá venda de dados pessoais obtidos pela API. A implementação deverá observar os termos e as políticas aplicáveis do Pinterest.",
      "Você poderá revogar uma futura autorização pelos mecanismos disponibilizados pelo Pinterest. Antes da ativação, esta política deverá informar as permissões efetivas, os dados acessados e o procedimento de desconexão e exclusão. Não são prometidos acessos a dados ou funcionalidades ainda não implementados.",
    ],
    link: {
      href: "https://policy.pinterest.com/en/developer-guidelines",
      label: "Diretrizes de desenvolvedores do Pinterest",
    },
  },
  {
    id: "armazenamento",
    title: "Armazenamento e segurança",
    paragraphs: [
      "O site não persiste as respostas do orçamento nem as alterações das demos. Best CRM, Best Booking e Best Restaurant trabalham com dados fictícios na memória da página; recarregar, sair ou restaurar o cenário descarta essas alterações. Pedidos, reservas e agendamentos são simulações.",
      "O Studio Factory foi concebido para execução local. Projetos e metadados são mantidos em banco SQLite; arquivos de trabalho, exportações, caches e registros ficam nas pastas locais da instalação. O editor também pode preservar rascunhos no armazenamento local do navegador. Esses dados não desaparecem simplesmente ao fechar o aplicativo.",
      "Consultas online opcionais e arquivos enviados a serviços externos seguem fluxos diferentes do armazenamento local. No fluxo experimental do Colab, o operador escolhe exportar um lote e pode enviá-lo ao serviço, incluindo imagem de referência quando adicionada. Por isso, não afirmamos que todas as informações permanecem exclusivamente no computador.",
      "Entre as medidas observadas estão HTTPS no site, cabeçalhos de proteção do navegador, validação de entradas e controles de arquivos importados. No Windows, a chave do Google Fonts salva pela interface utiliza proteção do sistema operacional; ela também pode ser fornecida por configuração de ambiente. Essas medidas não garantem segurança absoluta. O operador deve proteger o dispositivo, os backups e as credenciais.",
    ],
  },
  {
    id: "compartilhamento",
    title: "Compartilhamento de informações",
    paragraphs: [
      "A Cloudflare participa da hospedagem e entrega deste site. Ao abrir um contato no WhatsApp ou Instagram, você passa a utilizar um serviço de terceiros. Os dados enviados nesses canais são tratados também pelos respectivos provedores.",
      "No Studio Factory, ações opcionais podem consultar serviços como Google Fonts e Iconify, abrir links externos ou levar arquivos ao Google Colab. Esses provedores podem receber informações técnicas das requisições e os conteúdos efetivamente enviados pelo operador. Uma futura integração com o Pinterest terá fluxo próprio de autorização.",
      "Não há, no código examinado do site, envio automático do formulário ao Studio Factory ou a um sistema de marketing. Não inclua senhas, documentos ou dados sensíveis nas descrições, referências e arquivos sem necessidade e autorização.",
    ],
  },
  {
    id: "retencao",
    title: "Retenção e exclusão",
    paragraphs: [
      "O preenchimento do site e os estados das demos duram enquanto a página permanece em memória. Mensagens efetivamente enviadas pelos canais de atendimento podem ser conservadas enquanto necessárias ao atendimento, à relação contratual, ao cumprimento de obrigações ou ao exercício de direitos. Não foi definido um prazo único para todas essas situações.",
      "No Studio Factory, arquivos, projetos e metadados locais permanecem até sua remoção pelo operador ou pelos recursos disponíveis na aplicação. Exportações, backups, caches e rascunhos do navegador podem exigir limpeza separada. Fechar o aplicativo ou revogar uma autorização externa não equivale, por si só, a apagar todas as cópias existentes.",
      "Para solicitar análise de exclusão de dados mantidos pela Best Creations, use o contato indicado ao final desta página. Dados conservados por outras plataformas seguem também os controles e as condições desses serviços.",
    ],
  },
  {
    id: "direitos",
    title: "Seus direitos",
    paragraphs: [
      "Conforme a LGPD e as condições aplicáveis, você pode solicitar confirmação do tratamento e acesso, correção, informações sobre compartilhamento, portabilidade e anonimização, bloqueio ou eliminação de dados. Também pode revogar consentimento, conhecer as consequências de não o conceder e pedir revisão de decisões exclusivamente automatizadas que afetem seus interesses.",
      "Envie sua solicitação ao canal de privacidade. Poderão ser necessárias informações proporcionais para verificar sua identidade. Algumas obrigações legais podem justificar a conservação de dados; nesse caso, a resposta deverá explicar o motivo. Você também pode procurar a Agência Nacional de Proteção de Dados (ANPD).",
    ],
    link: {
      href: "https://www.gov.br/anpd/pt-br/assuntos/titular-de-dados/direito-dos-titulares",
      label: "Conheça seus direitos na ANPD",
    },
  },
  {
    id: "cookies",
    title: "Cookies e tecnologias semelhantes",
    paragraphs: [
      "O código do site institucional não implementa cookies de aplicação, login, pixels publicitários ou ferramentas de análise de audiência. O orçamento e as demos não usam localStorage ou IndexedDB para guardar seus dados. Isso não impede registros técnicos ou mecanismos de segurança da infraestrutura de hospedagem, conforme sua configuração.",
      "O Studio Factory é um ambiente separado: seu editor utiliza armazenamento local do navegador para rascunhos. Serviços externos abertos ou utilizados pelo operador podem empregar seus próprios cookies e tecnologias, de acordo com suas políticas.",
    ],
  },
  {
    id: "links-externos",
    title: "Links e plataformas externas",
    paragraphs: [
      "O site e o aplicativo podem oferecer links para WhatsApp, Instagram, GitHub, Pinterest, provedores de recursos e aplicações do portfólio. Ao acessar esses destinos, consulte as políticas de seus responsáveis. As imagens locais do showroom não conectam automaticamente sua conta às aplicações apresentadas.",
    ],
  },
  {
    id: "atualizacoes",
    title: "Atualizações desta política",
    paragraphs: [
      "Esta política poderá ser atualizada para refletir alterações nos serviços, integrações ou requisitos legais. A data no início da página identifica a versão publicada. Novas formas de coleta, armazenamento ou autenticação, incluindo a ativação da API do Pinterest, exigem revisão das informações antes de entrar em operação.",
    ],
  },
];

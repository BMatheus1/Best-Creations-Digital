# Cobrança — não implementada

Prevista na Fase 6. Nenhum checkout, assinatura, plano concedido ou cobrança
está habilitado. Página do produto informa explicitamente esse estado.

Briefing comercial: Starter R$39 / 1 conta / 30 publicações; Pro R$79 / 3 / 120;
Agência R$149 / 10 / 500 por ciclo. Estes são requisitos futuros, não assinaturas
ou preços retornados por um provedor já conectado. Configurar no backend.

Implementação exige pesquisa da documentação oficial Mercado Pago, escolha do
produto de assinatura, separação sandbox/produção, segredo de webhook,
validação de autenticidade e consulta ao provedor. Não confiar em redirect
ou parâmetros do browser para confirmar pagamento.

Eventos devem ser idempotentes e conservar histórico de estado/instante do
provedor para lidar com duplicações e eventos fora de ordem. Acesso e consumo
devem respeitar o estado confirmado e alterações de ciclo. Nenhum teste atual
valida Mercado Pago, nem mesmo com mocks. Não cobrar valores reais em testes.

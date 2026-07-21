# Roadmap de produto

## Fase 1 — Fundação (esta entrega)

- experiência completa e responsiva do ERP;
- navegação e componentes reutilizáveis;
- modelo relacional multiempresa;
- regras testadas para margem, custo, parcelas e kits;
- arquitetura e limites das integrações documentados.

## Fase 2 — Operação interna

- autenticação, sessões, MFA e permissões;
- CRUD persistente de empresas, pessoas, produtos, preços e depósitos;
- estoque transacional com reservas, transferências e inventário;
- vendas, compras e financeiro com aprovações;
- anexos, histórico e auditoria;
- importadores de cadastros e saldos por planilha.

## Fase 3 — Fiscal e bancário

- provedor fiscal homologado para NF-e/NFC-e;
- certificado A1 em cofre seguro;
- entrada por XML e manifestação do destinatário;
- boletos, PIX, CNAB/Open Finance conforme os bancos escolhidos;
- conciliação e DRE gerencial.

## Fase 4 — Marketplaces

- OAuth oficial Mercado Livre e Shopee;
- importação idempotente de pedidos;
- mapeamento de anúncio simples e composto;
- sincronização de saldo e preço com fila, retentativas e alertas;
- faturamento e envio de XML/DANFE para cada plataforma;
- custos reais de taxas, frete e rentabilidade por anúncio.

## Critérios mínimos antes da produção

- testes unitários, integração e ponta a ponta dos fluxos financeiros/fiscais;
- revisão contábil e tributária das regras configuradas;
- teste de carga, backup, restauração e contingência;
- logs, alertas e painel de jobs;
- política de privacidade, termos e processo LGPD;
- homologação com os provedores externos escolhidos.

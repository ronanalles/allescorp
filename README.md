# AllesCorp

ERP web moderno, multiempresa e orientado à operação brasileira. A primeira entrega estabelece a experiência visual, os módulos do produto, as regras críticas de negócio e o modelo relacional que sustenta a evolução do sistema.

## O que já existe

- dashboard executivo responsivo com faturamento, resultado, pedidos, estoque e fluxo de caixa;
- navegação funcional entre Produtos, Estoque, Pessoas, Vendas, Compras, Financeiro, Fiscal, Marketplaces, Relatórios e Configurações;
- listagens, filtros, abas, indicadores, formulários e feedback visual;
- suporte de domínio para produtos simples, serviços, kits e composições;
- estoque físico, reservado e disponível por empresa e depósito;
- tabelas de preço, custo médio, margem, markup e perfis tributários;
- pedidos de venda e compra com itens, custos, impostos e vínculos financeiros/fiscais;
- contas a pagar e receber com baixas parciais e múltiplas formas de pagamento;
- anúncios de Mercado Livre e Shopee ligados a um ou vários produtos e quantidades;
- relatórios editáveis e trilha de auditoria previstos no banco;
- testes das regras críticas de margem, custo médio, parcelamento e disponibilidade de kits.

## Tecnologias

- Next.js 16, React 19 e TypeScript
- Tailwind CSS 4 + design system próprio
- Recharts e Lucide
- PostgreSQL + Prisma
- Vitest

## Executar localmente

```bash
cp .env.example .env
npm install
npm run dev
```

Abra `http://localhost:3000`.

## Validar

```bash
npm run lint
npm test
npm run db:validate
npm run build
```

## Estado da entrega

Esta versão é uma fundação funcional de produto: toda a experiência navegável e o domínio do banco estão implementados. A persistência das telas, autenticação, emissão fiscal e sincronização oficial com marketplaces entram nas próximas etapas, pois dependem de infraestrutura, credenciais, certificados e homologações externas. Veja [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) e [docs/ROADMAP.md](docs/ROADMAP.md).

## Segurança

Nunca salve tokens de marketplace, certificados A1, senhas ou segredos no Git. Use um cofre de segredos no ambiente de produção. Dados financeiros e fiscais exigem permissões por função, auditoria, backups testados e revisão profissional antes de operar em produção.

# Arquitetura do AllesCorp

## Princípios

1. **Multiempresa desde a origem.** Todo dado de negócio pertence a um tenant e, quando necessário, a uma empresa/filial.
2. **Um único livro de movimentos.** Estoque e financeiro são derivados de lançamentos rastreáveis; saldos não devem ser alterados sem movimento correspondente.
3. **Documentos imutáveis após confirmação.** Pedidos podem evoluir, mas fatos fiscais, financeiros e de estoque confirmados recebem estornos ou eventos compensatórios.
4. **Integrações assíncronas e idempotentes.** Webhooks são recebidos, persistidos e processados em fila. Repetir o mesmo evento não pode duplicar pedido, nota ou baixa.
5. **Segredos fora do banco operacional.** Tokens OAuth e certificados devem ser referenciados por IDs de um cofre seguro.

## Módulos e responsabilidades

| Módulo | Responsabilidade central |
|---|---|
| Cadastros | Produtos, kits, pessoas, tabelas e tributos |
| Estoque | Movimentos, reservas, depósitos, inventário e custo médio |
| Vendas | Orçamento → pedido → separação → faturamento → expedição |
| Compras | Cotação → pedido → recebimento → entrada → financeiro |
| Financeiro | Competência, vencimentos, baixas, conciliação e caixa |
| Fiscal | NF-e/NFC-e, XML, DANFE, manifestações e eventos |
| Marketplaces | OAuth, anúncios, composições, pedidos, estoque, preço e nota |
| Relatórios | Consultas salvas, filtros, dimensões, métricas e exportações |

## Regras que não podem ser quebradas

- `disponível = físico - reservado` por produto e depósito;
- o estoque de um kit é o menor quociente inteiro entre saldo disponível e quantidade exigida de cada componente;
- custo médio só muda por entradas com valor ou ajustes explicitamente autorizados;
- margem usa a venda como base; markup usa o custo como base;
- parcelas e baixas devem somar o valor do título, respeitando arredondamento monetário;
- um pedido externo é único por tenant, canal e ID externo;
- webhooks e emissões fiscais precisam de chave de idempotência;
- exclusões relevantes são lógicas e toda mudança sensível gera auditoria.

## Implantação recomendada

- aplicação Next.js em runtime Node;
- PostgreSQL gerenciado com backup point-in-time;
- fila Redis/SQS para sincronizações e emissão fiscal;
- armazenamento de objetos privado para XML, DANFE e anexos;
- cofre de segredos para OAuth e certificados;
- observabilidade com logs estruturados, métricas e rastreamento de jobs.

## LGPD e segurança

O sistema deve aplicar menor privilégio, MFA para administradores, criptografia em trânsito e repouso, política de retenção, exportação e anonimização, registro de acesso, revisão periódica de permissões e plano testado de recuperação de desastre.

import {
  BarChart3,
  Boxes,
  Building2,
  Calculator,
  ChartNoAxesCombined,
  CircleDollarSign,
  ClipboardList,
  FileText,
  Gauge,
  Landmark,
  PackageCheck,
  PlugZap,
  ReceiptText,
  Settings,
  ShoppingBag,
  ShoppingCart,
  Store,
  Tags,
  Truck,
  Users,
  WalletCards,
  Warehouse,
  type LucideIcon,
} from "lucide-react";

export type ModuleKey =
  | "dashboard"
  | "products"
  | "inventory"
  | "people"
  | "sales"
  | "purchases"
  | "finance"
  | "fiscal"
  | "marketplaces"
  | "reports"
  | "settings";

export type NavItem = { id: ModuleKey; label: string; icon: LucideIcon };
export type NavGroup = { label: string; items: NavItem[] };

export const navigation: NavGroup[] = [
  { label: "Visão geral", items: [{ id: "dashboard", label: "Dashboard", icon: Gauge }] },
  {
    label: "Operação",
    items: [
      { id: "products", label: "Produtos e preços", icon: Boxes },
      { id: "inventory", label: "Estoque e inventário", icon: Warehouse },
      { id: "people", label: "Pessoas e empresas", icon: Users },
    ],
  },
  {
    label: "Comercial",
    items: [
      { id: "sales", label: "Vendas", icon: ShoppingCart },
      { id: "purchases", label: "Compras", icon: ShoppingBag },
      { id: "finance", label: "Financeiro", icon: CircleDollarSign },
      { id: "fiscal", label: "Fiscal e notas", icon: ReceiptText },
    ],
  },
  {
    label: "Inteligência",
    items: [
      { id: "marketplaces", label: "Marketplaces", icon: PlugZap },
      { id: "reports", label: "Central de relatórios", icon: BarChart3 },
    ],
  },
  { label: "Sistema", items: [{ id: "settings", label: "Configurações", icon: Settings }] },
];

export const moduleMeta: Record<ModuleKey, { eyebrow: string; title: string; description: string }> = {
  dashboard: { eyebrow: "Ambiente de demonstração", title: "Bom dia, Administrador", description: "Acompanhe sua operação em tempo real e priorize o que precisa de atenção." },
  products: { eyebrow: "Cadastros", title: "Produtos e preços", description: "Custos, margens, tabelas de preço, kits, impostos e rentabilidade em uma única visão." },
  inventory: { eyebrow: "Operação", title: "Estoque e inventário", description: "Saldo físico, disponível, reservado, lotes, validades e movimentações por depósito." },
  people: { eyebrow: "Relacionamento", title: "Pessoas e empresas", description: "Clientes, fornecedores e transportadoras com histórico completo e dados fiscais." },
  sales: { eyebrow: "Comercial", title: "Vendas", description: "Orçamentos, pedidos, separação, faturamento e expedição em um fluxo contínuo." },
  purchases: { eyebrow: "Suprimentos", title: "Compras", description: "Solicitações, cotações, pedidos, recebimentos e notas de entrada com rastreabilidade." },
  finance: { eyebrow: "Tesouraria", title: "Controle financeiro", description: "Contas a pagar e receber, caixa, bancos, boletos, cartões e cheques conciliados." },
  fiscal: { eyebrow: "Fiscal", title: "Documentos fiscais", description: "Emissão, manifestação, armazenamento e monitoramento de NF-e e NFC-e." },
  marketplaces: { eyebrow: "Integrações", title: "Marketplaces", description: "Anúncios, kits, pedidos, estoque, preços e notas sincronizados com os canais de venda." },
  reports: { eyebrow: "Inteligência", title: "Central de relatórios", description: "Crie análises editáveis, salve visões e transforme dados operacionais em decisões." },
  settings: { eyebrow: "Administração", title: "Configurações", description: "Empresas, usuários, permissões, regras, integrações e preferências do sistema." },
};

export const kpis = [
  { label: "Faturamento no mês", value: "R$ 184.750", delta: "+12,4%", detail: "vs. mês anterior", tone: "green", icon: ChartNoAxesCombined },
  { label: "Resultado previsto", value: "R$ 41.826", delta: "+8,7%", detail: "margem de 22,6%", tone: "blue", icon: Calculator },
  { label: "Pedidos em aberto", value: "38", delta: "11 hoje", detail: "7 aguardam faturamento", tone: "amber", icon: ClipboardList },
  { label: "Estoque imobilizado", value: "R$ 329.420", delta: "1.842 SKUs", detail: "26 abaixo do mínimo", tone: "violet", icon: Warehouse },
];

export const revenueData = [
  { month: "Fev", revenue: 128, profit: 28 },
  { month: "Mar", revenue: 151, profit: 33 },
  { month: "Abr", revenue: 143, profit: 31 },
  { month: "Mai", revenue: 169, profit: 38 },
  { month: "Jun", revenue: 164, profit: 36 },
  { month: "Jul", revenue: 185, profit: 42 },
];

export const cashflowData = [
  { day: "20/07", receive: 28600, pay: 12400 },
  { day: "21/07", receive: 18900, pay: 7200 },
  { day: "22/07", receive: 24300, pay: 31800 },
  { day: "23/07", receive: 12600, pay: 9100 },
  { day: "24/07", receive: 35100, pay: 18600 },
  { day: "25/07", receive: 9800, pay: 4300 },
  { day: "26/07", receive: 17400, pay: 11200 },
];

export const recentOrders = [
  { id: "PV-01482", customer: "Cliente Aurora", channel: "B2B", total: "R$ 4.829,70", status: "Separação", tone: "blue" },
  { id: "MLB-DEMO-46", customer: "Cliente Exemplo 01", channel: "Mercado Livre", total: "R$ 289,90", status: "Faturar", tone: "amber" },
  { id: "SHP-DEMO-01", customer: "Loja Modelo", channel: "Shopee", total: "R$ 174,80", status: "Pronto", tone: "green" },
  { id: "PV-01479", customer: "Comercial Horizonte", channel: "Representante", total: "R$ 7.614,50", status: "Aprovação", tone: "violet" },
  { id: "MLB-DEMO-01", customer: "Cliente Exemplo 02", channel: "Mercado Livre", total: "R$ 126,90", status: "Enviado", tone: "slate" },
];

export const alerts = [
  { title: "26 produtos abaixo do estoque mínimo", detail: "R$ 18.430 em reposição sugerida", tone: "amber", icon: PackageCheck },
  { title: "7 pedidos aguardam faturamento", detail: "O mais antigo está parado há 3h", tone: "blue", icon: FileText },
  { title: "R$ 8.760 vencem hoje", detail: "5 contas a pagar · 9 a receber", tone: "rose", icon: WalletCards },
  { title: "Sincronização concluída", detail: "Mercado Livre e Shopee · há 4 min", tone: "green", icon: PlugZap },
];

export const products = [
  { sku: "PRD-001842", name: "Produto Higiene Premium 30un", category: "Higiene", stock: 184, reserved: 32, cost: "R$ 42,80", price: "R$ 69,90", margin: "38,8%", status: "Ativo" },
  { sku: "PRD-000731", name: "Produto Estética 1L", category: "Estética", stock: 47, reserved: 8, cost: "R$ 31,40", price: "R$ 58,90", margin: "46,7%", status: "Ativo" },
  { sku: "PRD-002114", name: "Produto Jardim 1L", category: "Jardinagem", stock: 12, reserved: 9, cost: "R$ 28,70", price: "R$ 44,90", margin: "36,1%", status: "Estoque baixo" },
  { sku: "PRD-001093", name: "Produto Agro 500ml", category: "Agropecuária", stock: 0, reserved: 0, cost: "R$ 19,20", price: "R$ 34,90", margin: "45,0%", status: "Sem estoque" },
  { sku: "KIT-000084", name: "Kit Demonstração Premium", category: "Kit / Composição", stock: 39, reserved: 6, cost: "R$ 58,90", price: "R$ 109,90", margin: "46,4%", status: "Ativo" },
];

export const moduleRows: Record<Exclude<ModuleKey, "dashboard" | "products" | "reports" | "settings">, { headers: string[]; rows: string[][]; icon: LucideIcon }> = {
  inventory: { icon: Warehouse, headers: ["Documento", "Produto / motivo", "Depósito", "Movimento", "Saldo", "Data"], rows: [["MOV-10482", "Produto Higiene Premium", "CD Principal", "+120 un", "184 un", "Hoje, 09:42"], ["RES-08316", "Kit Demonstração", "CD Principal", "-6 un", "39 un", "Hoje, 09:18"], ["AJU-00491", "Produto Jardim · inventário", "Loja", "+2 un", "12 un", "Ontem, 17:36"], ["TRF-00128", "Produto Estética 1L", "CD → Loja", "-12 un", "47 un", "Ontem, 15:12"]] },
  people: { icon: Building2, headers: ["Nome / razão social", "Tipo", "Documento", "Cidade", "Saldo", "Situação"], rows: [["Cliente Aurora", "Cliente", "Documento mascarado", "Cidade/UF", "R$ 8.420,00", "Ativo"], ["Fornecedor Horizonte", "Fornecedor", "Documento mascarado", "Cidade/UF", "R$ 18.670,00", "Ativo"], ["Comercial Modelo", "Cliente", "Documento mascarado", "Cidade/UF", "R$ 3.214,50", "Em análise"], ["Transportadora Exemplo", "Transportadora", "Documento mascarado", "Cidade/UF", "R$ 0,00", "Ativo"]] },
  sales: { icon: ShoppingCart, headers: ["Pedido", "Cliente", "Canal", "Emissão", "Valor", "Status"], rows: recentOrders.map((order) => [order.id, order.customer, order.channel, "20/07/2026", order.total, order.status]) },
  purchases: { icon: Truck, headers: ["Pedido", "Fornecedor", "Previsão", "Itens", "Total", "Status"], rows: [["PC-00382", "Fornecedor Horizonte", "22/07/2026", "18", "R$ 24.810,00", "Em trânsito"], ["PC-00381", "Fornecedor Modelo 02", "21/07/2026", "7", "R$ 8.942,30", "Aguardando"], ["PC-00380", "Fornecedor Modelo 03", "20/07/2026", "12", "R$ 16.480,00", "Receber"], ["PC-00379", "Fornecedor Modelo 04", "18/07/2026", "5", "R$ 11.260,00", "Concluído"]] },
  finance: { icon: Landmark, headers: ["Título", "Pessoa", "Vencimento", "Forma", "Valor", "Status"], rows: [["REC-01829", "Cliente Aurora", "20/07/2026", "Boleto", "R$ 4.210,00", "A receber"], ["PAG-01082", "Fornecedor Horizonte", "20/07/2026", "PIX", "R$ 6.480,00", "A pagar"], ["REC-01828", "Canal Marketplace", "21/07/2026", "Carteira digital", "R$ 12.840,50", "Previsto"], ["PAG-01081", "Transportadora Exemplo", "22/07/2026", "Boleto", "R$ 2.280,00", "A pagar"]] },
  fiscal: { icon: ReceiptText, headers: ["Documento", "Destinatário / emitente", "Emissão", "Valor", "Chave / série", "Status"], rows: [["NF-e DEMO-14826", "Cliente Aurora", "20/07/2026", "R$ 4.829,70", "Série teste", "Autorizada"], ["NF-e DEMO-14825", "Cliente Exemplo 01", "20/07/2026", "R$ 289,90", "Série teste", "Autorizada"], ["NF-e DEMO-14824", "Loja Modelo", "20/07/2026", "R$ 174,80", "Série teste", "Processando"], ["NF-e DEMO-28119", "Fornecedor Modelo 03", "19/07/2026", "R$ 16.480,00", "Entrada teste", "Manifestada"]] },
  marketplaces: { icon: Store, headers: ["Anúncio", "Canal", "SKU / composição", "Preço", "Estoque", "Sincronização"], rows: [["Produto Higiene Premium", "Mercado Livre", "1 × PRD-001842", "R$ 69,90", "152", "Sincronizado"], ["Kit Demonstração 3 itens", "Shopee", "2 × PRD-000731 + 1 × PRD-000744", "R$ 149,90", "18", "Sincronizado"], ["Produto Jardim Original", "Mercado Livre", "1 × PRD-002114", "R$ 44,90", "3", "Atenção"], ["Kit Demonstração Premium", "Shopee", "1 × KIT-000084", "R$ 109,90", "39", "Sincronizado"]] },
};

export const reportCards = [
  { title: "DRE gerencial", description: "Receita, custos, despesas, impostos e resultado por competência.", icon: ChartNoAxesCombined, updated: "Atualizado agora" },
  { title: "Curva ABC de produtos", description: "Classificação por faturamento, margem, giro ou rentabilidade.", icon: Tags, updated: "Atualizado há 5 min" },
  { title: "Fluxo de caixa projetado", description: "Saldos realizados e previstos por conta e forma de pagamento.", icon: Landmark, updated: "Atualizado agora" },
  { title: "Rentabilidade por canal", description: "Margem líquida considerando taxas, fretes, impostos e comissões.", icon: Store, updated: "Atualizado há 12 min" },
  { title: "Giro e cobertura de estoque", description: "Dias de cobertura, ruptura, excesso e sugestão de compra.", icon: Warehouse, updated: "Atualizado há 8 min" },
  { title: "Desempenho de clientes", description: "Ticket, frequência, atraso, limite e evolução das compras.", icon: Users, updated: "Atualizado hoje" },
];

"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Activity, ArrowUpRight, Bell, CalendarDays, Check, ChevronDown,
  ChevronRight, CircleAlert, Cloud, Command, Download, FileJson,
  Filter, HelpCircle, History, Menu, MoreHorizontal, PackagePlus, PanelLeftClose,
  Plus, RefreshCw, Search, ShieldCheck, SlidersHorizontal, Sparkles,
  Trash2, Upload, X,
} from "lucide-react";
import {
  Area, AreaChart, Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip,
  XAxis, YAxis,
} from "recharts";
import {
  alerts, cashflowData, kpis, moduleMeta, moduleRows, navigation, products,
  recentOrders, reportCards, revenueData, type ModuleKey,
} from "@/lib/data";
import {
  createRecord, csvContent, emptyWorkspace, formatCurrency,
  recordToRow, type DemoRecord, type DemoWorkspace, type SavedReport,
} from "@/lib/demo-store";

type GenericKey = Exclude<ModuleKey, "dashboard" | "products" | "reports" | "settings">;
type SelectedItem = {
  id: string;
  module: ModuleKey;
  title: string;
  status: string;
  custom: boolean;
  fields: { label: string; value: string }[];
};

const STORAGE_KEY = "allescorp-demo-workspace-v2";
const tooltipStyle = { border: "1px solid #e4e7ec", borderRadius: 12, boxShadow: "0 8px 24px rgba(16,24,40,.08)", fontSize: 12 };

function Brand() {
  return <div className="brand"><div className="brand-mark"><span/><span/><span/></div><div><strong>Alles</strong><strong className="brand-accent">Corp</strong><small>Gestão inteligente</small></div></div>;
}

function StatusPill({ children, tone }: { children: React.ReactNode; tone?: string }) {
  const text = String(children);
  const color = tone ?? (/Ativo|Autorizada|Pronto|Concluído|Sincronizado|Enviado|Manifestada|Recebido/.test(text) ? "green" : /Atenção|baixo|Faturar|Aguardando|Receber|Processando|Em trânsito|Em análise/.test(text) ? "amber" : /Sem estoque|A pagar|Vencido|Cancelado/.test(text) ? "rose" : "blue");
  return <span className={`status status-${color}`}>{children}</span>;
}

function Sidebar({ active, onSelect, open, onClose }: { active: ModuleKey; onSelect: (id: ModuleKey) => void; open: boolean; onClose: () => void }) {
  return <>
    {open && <button className="mobile-backdrop" onClick={onClose} aria-label="Fechar menu"/>}
    <aside className={`sidebar ${open ? "sidebar-open" : ""}`}>
      <div className="sidebar-head"><Brand/><button className="icon-button sidebar-close" onClick={onClose} aria-label="Fechar menu"><PanelLeftClose size={18}/></button></div>
      <nav className="sidebar-nav">{navigation.map((group) => <div className="nav-group" key={group.label}><p>{group.label}</p>{group.items.map((item) => { const Icon = item.icon; return <button className={`nav-item ${active === item.id ? "active" : ""}`} key={item.id} onClick={() => { onSelect(item.id); onClose(); }}><Icon size={18}/><span>{item.label}</span>{item.id === "sales" && <em>7</em>}</button>; })}</div>)}</nav>
      <div className="sidebar-footer"><button className="company-switcher"><div className="company-avatar">ED</div><span><strong>Empresa Demonstração</strong><small>Dados salvos neste navegador</small></span><ChevronDown size={16}/></button><div className="system-health"><span><i/> Aplicação disponível</span><small>v0.3.0</small></div></div>
    </aside>
  </>;
}

function Topbar({ onMenu, onNew, query, setQuery, onSearch, onNotifications }: { onMenu: () => void; onNew: () => void; query: string; setQuery: (value: string) => void; onSearch: () => void; onNotifications: () => void }) {
  return <header className="topbar">
    <button className="icon-button menu-button" onClick={onMenu} aria-label="Abrir menu"><Menu size={21}/></button>
    <div className="global-search" onClick={onSearch}><Search size={18}/><input value={query} onChange={(event) => setQuery(event.target.value)} onFocus={onSearch} aria-label="Busca global" placeholder="Buscar pedidos, produtos, clientes..."/><kbd><Command size={12}/> K</kbd></div>
    <div className="topbar-actions"><button className="icon-button help-button" aria-label="Ajuda"><HelpCircle size={19}/></button><button className="icon-button notification-button" onClick={onNotifications} aria-label="Atividades"><Bell size={19}/><i/></button><button className="primary-button top-new" onClick={onNew}><Plus size={17}/> Novo <ChevronDown size={14}/></button><button className="profile-button"><span>AD</span><div><strong>Admin Demo</strong><small>Administrador</small></div><ChevronDown size={15}/></button></div>
  </header>;
}

function KpiGrid() {
  return <div className="kpi-grid">{kpis.map((item) => { const Icon = item.icon; return <article className="kpi-card" key={item.label}><div className={`kpi-icon icon-${item.tone}`}><Icon size={20}/></div><button className="more-button"><MoreHorizontal size={18}/></button><p>{item.label}</p><strong>{item.value}</strong><small><span className={`delta delta-${item.tone}`}>{item.delta.startsWith("+") && <ArrowUpRight size={13}/>} {item.delta}</span> {item.detail}</small></article>; })}</div>;
}

function Dashboard({ workspace, onNavigate }: { workspace: DemoWorkspace; onNavigate: (module: ModuleKey) => void }) {
  return <>
    <div className="workspace-strip"><span><Cloud size={16}/> Demonstração interativa</span><strong>{workspace.records.length} registros locais</strong><strong>{workspace.savedReports.length} relatórios personalizados</strong><small>Sem transmissão de dados</small></div>
    <KpiGrid/>
    <div className="dashboard-grid">
      <section className="card revenue-card"><div className="card-head"><div><h2>Desempenho comercial</h2><p>Faturamento e resultado nos últimos 6 meses</p></div><button className="select-button">Últimos 6 meses <ChevronDown size={14}/></button></div><div className="chart-legend"><span><i className="legend-blue"/> Faturamento</span><span><i className="legend-green"/> Resultado</span></div><div className="chart-wrap"><ResponsiveContainer width="100%" height="100%"><BarChart data={revenueData} barGap={5} margin={{ left: -18, right: 4 }}><CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#edf0f3"/><XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "#667085", fontSize: 12 }}/><YAxis axisLine={false} tickLine={false} tick={{ fill: "#98a2b3", fontSize: 11 }} tickFormatter={(value) => `${value}k`}/><Tooltip contentStyle={tooltipStyle} formatter={(value) => [`R$ ${value}.000`, ""]} cursor={{ fill: "#f7f9fb" }}/><Bar dataKey="revenue" fill="#316be8" radius={[5,5,0,0]} maxBarSize={30}/><Bar dataKey="profit" fill="#48c7a1" radius={[5,5,0,0]} maxBarSize={30}/></BarChart></ResponsiveContainer></div></section>
      <section className="card attention-card"><div className="card-head"><div><h2>Precisa da sua atenção</h2><p>Itens priorizados pelo impacto</p></div><button className="text-button" onClick={() => onNavigate("inventory")}>Ver todos <ChevronRight size={14}/></button></div><div className="alert-list">{alerts.map((alert, index) => { const Icon = alert.icon; const destinations: ModuleKey[] = ["inventory", "sales", "finance", "marketplaces"]; return <button className="alert-item" key={alert.title} onClick={() => onNavigate(destinations[index])}><span className={`alert-icon alert-${alert.tone}`}><Icon size={18}/></span><span><strong>{alert.title}</strong><small>{alert.detail}</small></span><ChevronRight size={16}/></button>; })}</div></section>
    </div>
    <div className="dashboard-grid lower-grid">
      <section className="card orders-card"><div className="card-head"><div><h2>Pedidos recentes</h2><p>Movimentações de todos os canais</p></div><button className="text-button" onClick={() => onNavigate("sales")}>Ver pedidos <ChevronRight size={14}/></button></div><div className="table-scroll"><table><thead><tr><th>Pedido</th><th>Cliente</th><th>Canal</th><th>Total</th><th>Status</th></tr></thead><tbody>{recentOrders.map((order) => <tr key={order.id}><td><strong>{order.id}</strong></td><td>{order.customer}</td><td>{order.channel}</td><td><strong>{order.total}</strong></td><td><StatusPill tone={order.tone}>{order.status}</StatusPill></td></tr>)}</tbody></table></div></section>
      <section className="card cash-card"><div className="card-head"><div><h2>Fluxo de caixa</h2><p>Próximos 7 dias</p></div><button className="icon-button"><MoreHorizontal size={18}/></button></div><div className="cash-summary"><div><span className="cash-dot receive"/>A receber<strong>R$ 146,7 mil</strong></div><div><span className="cash-dot pay"/>A pagar<strong>R$ 94,6 mil</strong></div></div><div className="cash-chart"><ResponsiveContainer width="100%" height="100%"><AreaChart data={cashflowData} margin={{ left: -28, right: 3 }}><CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#edf0f3"/><XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "#98a2b3" }}/><YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "#98a2b3" }} tickFormatter={(value) => `${Number(value)/1000}k`}/><Tooltip contentStyle={tooltipStyle} formatter={(value) => [`R$ ${Number(value).toLocaleString("pt-BR")}`, ""]}/><Area type="monotone" dataKey="receive" stroke="#316be8" strokeWidth={2} fill="#316be822"/><Area type="monotone" dataKey="pay" stroke="#ef6b75" strokeWidth={2} fill="transparent" strokeDasharray="4 3"/></AreaChart></ResponsiveContainer></div><div className="cash-balance"><span>Saldo projetado em 26/07</span><strong>R$ 218.430,20 <ArrowUpRight size={15}/></strong></div></section>
    </div>
  </>;
}

function DataToolbar({ count, noun = "registros", query, setQuery, onNew }: { count: number; noun?: string; query: string; setQuery: (value: string) => void; onNew: () => void }) {
  return <div className="data-toolbar"><div className="local-search"><Search size={17}/><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={`Buscar em ${noun}...`}/></div><button className="secondary-button"><Filter size={16}/> Filtros</button><button className="secondary-button columns-button"><SlidersHorizontal size={16}/> Colunas</button><span className="record-count">{count} {noun}</span><button className="primary-button" onClick={onNew}><Plus size={16}/> Adicionar</button></div>;
}

function Pagination({ text }: { text: string }) {
  return <div className="pagination"><span>{text}</span><div><button disabled>Anterior</button><button className="active">1</button><button>2</button><button>Próxima</button></div></div>;
}

function Products({ workspace, query, setQuery, onNew, onSelect }: { workspace: DemoWorkspace; query: string; setQuery: (value: string) => void; onNew: () => void; onSelect: (item: SelectedItem) => void }) {
  const [tab, setTab] = useState("Todos");
  const localProducts = workspace.records.filter((record) => record.module === "products");
  const seedProducts = products.filter((product) => !workspace.archivedSeedIds.includes(product.sku));
  const rows = [
    ...localProducts.map((record) => ({ id: record.id, name: record.title, sku: record.code, category: record.category, stock: record.quantity, reserved: 0, cost: "A definir", price: formatCurrency(record.value), margin: "A calcular", status: record.status, custom: true })),
    ...seedProducts.map((product) => ({ ...product, id: product.sku, status: workspace.seedStatuses[product.sku] ?? product.status, custom: false })),
  ];
  const visible = rows.filter((product) => {
    const matchesTab = tab === "Todos" || (tab === "Estoque baixo" ? product.status !== "Ativo" : product.category.includes("Kit"));
    return matchesTab && `${product.name} ${product.sku} ${product.category} ${product.status}`.toLowerCase().includes(query.toLowerCase());
  });
  return <section className="card module-card"><div className="tabs">{["Todos", "Estoque baixo", "Kits e composições"].map((item) => <button className={tab === item ? "active" : ""} key={item} onClick={() => setTab(item)}>{item}{item === "Estoque baixo" && <span>{rows.filter((row) => row.status !== "Ativo").length}</span>}</button>)}</div><DataToolbar count={visible.length} noun="produtos" query={query} setQuery={setQuery} onNew={onNew}/><div className="table-scroll module-table"><table><thead><tr><th>Produto</th><th>Categoria</th><th>Disponível</th><th>Custo</th><th>Preço</th><th>Margem</th><th>Situação</th><th/></tr></thead><tbody>{visible.map((product) => <tr className="clickable-row" key={product.id} onClick={() => onSelect({ id: product.id, module: "products", title: product.name, status: product.status, custom: product.custom, fields: [{ label: "SKU", value: product.sku }, { label: "Categoria", value: product.category }, { label: "Disponível", value: `${product.stock - product.reserved} un` }, { label: "Custo", value: product.cost }, { label: "Preço", value: product.price }, { label: "Margem", value: product.margin }] })}><td><div className="product-cell"><span className="product-thumb"><PackagePlus size={19}/></span><span><strong>{product.name}</strong><small>{product.sku}</small></span></div></td><td>{product.category}</td><td><strong>{product.stock - product.reserved} un</strong><small className="cell-sub">{product.reserved} reservadas</small></td><td>{product.cost}</td><td><strong>{product.price}</strong></td><td><span className="margin-value">{product.margin}</span></td><td><StatusPill>{product.status}</StatusPill></td><td><button className="icon-button" aria-label="Abrir detalhes"><ChevronRight size={17}/></button></td></tr>)}</tbody></table></div><Pagination text={`Mostrando ${visible.length} de ${rows.length} produtos da demonstração`}/></section>;
}

function GenericModule({ module, workspace, query, setQuery, onNew, onSelect }: { module: GenericKey; workspace: DemoWorkspace; query: string; setQuery: (value: string) => void; onNew: () => void; onSelect: (item: SelectedItem) => void }) {
  const [tab, setTab] = useState("Visão geral");
  const data = moduleRows[module]; const Icon = data.icon;
  const customRecords = workspace.records.filter((record) => record.module === module);
  const customRows = customRecords.map((record) => ({ id: record.id, row: recordToRow(record), custom: true, status: record.status }));
  const seedRows = data.rows.map((row) => ({ id: row[0], row: [...row.slice(0, -1), workspace.seedStatuses[row[0]] ?? row.at(-1) ?? ""], custom: false, status: workspace.seedStatuses[row[0]] ?? row.at(-1) ?? "" })).filter((entry) => !workspace.archivedSeedIds.includes(entry.id));
  const allRows = [...customRows, ...seedRows];
  const visible = allRows.filter((entry) => {
    const status = entry.status;
    const tabMatch = tab === "Visão geral" || (tab === "Concluídos" ? /Concluído|Autorizada|Enviado|Sincronizado|Manifestada|Ativo/.test(status) : !/Concluído|Autorizada|Enviado|Sincronizado|Manifestada/.test(status));
    return tabMatch && entry.row.join(" ").toLowerCase().includes(query.toLowerCase());
  });
  const totals: Record<GenericKey, string> = { inventory: "4.891 unidades", people: "2.416 cadastros", sales: "R$ 184.750", purchases: "R$ 61.492", finance: "R$ 218.430", fiscal: "168 documentos", marketplaces: "342 anúncios" };
  return <><div className="module-summary-grid"><article><span><Icon size={19}/></span><div><small>Total no período</small><strong>{totals[module]}</strong></div></article><article><span><Activity size={19}/></span><div><small>Registros locais</small><strong>{customRows.length}</strong></div></article><article><span><CircleAlert size={19}/></span><div><small>Requer atenção</small><strong>{allRows.filter((entry) => /Atenção|A pagar|Faturar|Aguardando|Processando/.test(entry.status)).length}</strong></div></article></div><section className="card module-card"><div className="tabs">{["Visão geral", "Em andamento", "Concluídos"].map((item) => <button className={tab === item ? "active" : ""} onClick={() => setTab(item)} key={item}>{item}</button>)}</div><DataToolbar count={visible.length} query={query} setQuery={setQuery} onNew={onNew}/><div className="table-scroll module-table"><table><thead><tr>{data.headers.map((header) => <th key={header}>{header}</th>)}<th/></tr></thead><tbody>{visible.map((entry) => <tr className="clickable-row" key={entry.id} onClick={() => onSelect({ id: entry.id, module, title: entry.row[0], status: entry.status, custom: entry.custom, fields: data.headers.map((header, index) => ({ label: header, value: entry.row[index] })) })}>{entry.row.map((cell, index) => <td key={`${entry.id}-${index}`}>{index === 0 ? <strong>{cell}</strong> : index === entry.row.length - 1 ? <StatusPill>{cell}</StatusPill> : cell}</td>)}<td><button className="icon-button" aria-label="Abrir detalhes"><ChevronRight size={17}/></button></td></tr>)}</tbody></table></div><Pagination text={`${visible.length} registros nesta visualização`}/></section></>;
}

function Reports({ workspace, onNew }: { workspace: DemoWorkspace; onNew: () => void }) {
  return <><div className="report-actions"><button className="secondary-button"><Upload size={16}/> Importar modelo</button><button className="primary-button" onClick={onNew}><Plus size={16}/> Criar relatório</button></div>{workspace.savedReports.length > 0 && <section className="saved-reports"><div className="section-title"><div><h2>Meus relatórios</h2><p>Visões salvas neste navegador</p></div><StatusPill>{workspace.savedReports.length} personalizados</StatusPill></div><div className="reports-grid">{workspace.savedReports.map((report) => <button className="report-card custom-report" key={report.id}><span className="report-icon"><FileJson size={21}/></span><span><strong>{report.title}</strong><small>{report.metric} por {report.dimension} · {report.visualization}</small><em>{report.updatedAt}</em></span><ChevronRight size={18}/></button>)}</div></section>}<div className="reports-grid">{reportCards.map((report) => { const Icon = report.icon; return <button className="report-card" key={report.title}><span className="report-icon"><Icon size={21}/></span><span><strong>{report.title}</strong><small>{report.description}</small><em>{report.updated}</em></span><ChevronRight size={18}/></button>; })}</div><section className="card report-builder"><div><span className="sparkle"><Sparkles size={20}/></span><h2>Construtor de relatórios</h2><p>Escolha dimensões, métricas, filtros, agrupamentos e formatos. Salve sua visão e exporte os dados.</p><button className="secondary-button" onClick={onNew}>Abrir construtor <ChevronRight size={15}/></button></div><div className="builder-preview"><div className="preview-head"><i/><i/><i/></div><div className="preview-body"><span/><span/><span/><span/></div></div></section></>;
}

function SettingsModule({ onNotify }: { onNotify: (message: string) => void }) {
  const core = [
    { title: "Frontend AllesCorp", detail: "Next.js · GitHub Pages", status: "Operacional", tone: "green" },
    { title: "Persistência da demonstração", detail: "LocalStorage protegido por origem", status: "Operacional", tone: "green" },
    { title: "Odoo Community 18", detail: "Conector de API planejado", status: "Próxima etapa", tone: "amber" },
    { title: "PostgreSQL e autenticação", detail: "Servidor privado necessário", status: "Próxima etapa", tone: "amber" },
    { title: "Mercado Livre e Shopee", detail: "OAuth, webhooks, kits e pedidos", status: "Preparado", tone: "blue" },
    { title: "Fiscal Brasil", detail: "Homologação, A1, NF-e e NFS-e", status: "Planejado", tone: "blue" },
  ];
  const items = [["Empresa e filiais","Dados cadastrais, regimes tributários, certificados e séries fiscais"],["Usuários e permissões","Papéis por empresa, módulo, ação, depósito e centro de custo"],["Parâmetros comerciais","Tabelas de preço, descontos, aprovações, comissões e metas"],["Financeiro","Contas, categorias, centros de custo, formas de pagamento e conciliação"],["Integrações","Mercado Livre, Shopee, bancos, gateways, transportadoras e webhooks"],["Auditoria e segurança","Histórico, sessões, políticas de acesso e backups"]];
  return <><section className="integration-board"><div className="section-title"><div><h2>Arquitetura e integrações</h2><p>Preparação para transformar a demonstração em ERP transacional</p></div><span className="architecture-badge"><ShieldCheck size={15}/> Evolução segura</span></div><div className="integration-grid">{core.map((item) => <article key={item.title}><span className={`integration-dot ${item.tone}`}/><div><strong>{item.title}</strong><small>{item.detail}</small></div><StatusPill tone={item.tone}>{item.status}</StatusPill></article>)}</div></section><div className="settings-grid">{items.map(([title, description], index) => <button className="settings-card" key={title} onClick={() => onNotify(`${title}: configuração disponível na próxima etapa do ambiente transacional.`)}><span>{index + 1}</span><div><strong>{title}</strong><small>{description}</small></div><ChevronRight size={18}/></button>)}</div></>;
}

function NewRecordModal({ open, module, onClose, onSave }: { open: boolean; module: ModuleKey; onClose: () => void; onSave: (record: DemoRecord) => void }) {
  if (!open) return null;
  const titles: Partial<Record<ModuleKey, string>> = { products: "Novo produto", inventory: "Nova movimentação", people: "Nova pessoa ou empresa", sales: "Novo pedido de venda", purchases: "Novo pedido de compra", finance: "Novo lançamento financeiro", fiscal: "Novo documento fiscal", marketplaces: "Novo anúncio" };
  const defaults: Partial<Record<ModuleKey, string>> = { products: "Ativo", inventory: "Recebido", people: "Ativo", sales: "Rascunho", purchases: "Aguardando", finance: "Previsto", fiscal: "Rascunho", marketplaces: "Atenção" };
  return <div className="modal-backdrop" onMouseDown={(event) => event.target === event.currentTarget && onClose()}><div className="modal" role="dialog" aria-modal="true"><div className="modal-head"><div><span className="modal-icon"><Plus size={19}/></span><div><h2>{titles[module] ?? "Novo registro"}</h2><p>O registro será salvo somente neste navegador.</p></div></div><button className="icon-button" onClick={onClose} aria-label="Fechar"><X size={19}/></button></div><form onSubmit={(event) => { event.preventDefault(); const form = new FormData(event.currentTarget); onSave(createRecord(module, { title: String(form.get("title")), code: String(form.get("code")) || `DEMO-${Date.now().toString().slice(-5)}`, category: String(form.get("category")), status: String(form.get("status")), value: Number(form.get("value")) || 0, quantity: Number(form.get("quantity")) || 0, notes: String(form.get("notes")) })); }}><div className="form-grid"><label className="full">Nome / descrição<input name="title" required autoFocus placeholder="Digite uma identificação clara"/></label><label>Código<input name="code" placeholder="Gerado automaticamente"/></label><label>Situação<select name="status" defaultValue={defaults[module] ?? "Ativo"}>{[defaults[module] ?? "Ativo", "Rascunho", "Em andamento", "Concluído", "Atenção", "Cancelado"].filter((value, index, list) => list.indexOf(value) === index).map((value) => <option key={value}>{value}</option>)}</select></label><label>Categoria / canal / forma<input name="category" defaultValue="Geral"/></label><label>Valor<input name="value" type="number" min="0" step="0.01" placeholder="0,00"/></label><label>Quantidade<input name="quantity" type="number" min="0" step="1" placeholder="0"/></label><label className="full">Observações<textarea name="notes" rows={3} placeholder="Composição, cidade, depósito ou informações complementares"/></label></div><div className="modal-actions"><button type="button" className="secondary-button" onClick={onClose}>Cancelar</button><button className="primary-button" type="submit">Salvar registro</button></div></form></div></div>;
}

function ReportModal({ open, onClose, onSave }: { open: boolean; onClose: () => void; onSave: (report: SavedReport) => void }) {
  if (!open) return null;
  return <div className="modal-backdrop"><div className="modal"><div className="modal-head"><div><span className="modal-icon"><Sparkles size={19}/></span><div><h2>Novo relatório editável</h2><p>Monte e salve uma visão personalizada.</p></div></div><button className="icon-button" onClick={onClose}><X size={19}/></button></div><form onSubmit={(event) => { event.preventDefault(); const form = new FormData(event.currentTarget); onSave({ id: `report-${Date.now()}`, title: String(form.get("title")), dimension: String(form.get("dimension")), metric: String(form.get("metric")), visualization: String(form.get("visualization")), updatedAt: "Criado agora" }); }}><div className="form-grid"><label className="full">Nome do relatório<input name="title" required autoFocus placeholder="Ex.: Margem por categoria"/></label><label>Dimensão<select name="dimension"><option>Produto</option><option>Categoria</option><option>Cliente</option><option>Canal</option><option>Vendedor</option><option>Centro de custo</option></select></label><label>Métrica<select name="metric"><option>Faturamento</option><option>Margem líquida</option><option>Quantidade</option><option>Custo</option><option>Ticket médio</option></select></label><label className="full">Visualização<select name="visualization"><option>Tabela detalhada</option><option>Gráfico de barras</option><option>Gráfico de linha</option><option>Indicadores</option></select></label></div><div className="modal-actions"><button type="button" className="secondary-button" onClick={onClose}>Cancelar</button><button className="primary-button" type="submit">Salvar relatório</button></div></form></div></div>;
}

function DetailDrawer({ item, onClose, onStatus, onArchive }: { item: SelectedItem | null; onClose: () => void; onStatus: (status: string) => void; onArchive: () => void }) {
  if (!item) return null;
  return <div className="drawer-backdrop" onMouseDown={(event) => event.target === event.currentTarget && onClose()}><aside className="detail-drawer"><div className="drawer-head"><div><small>{moduleMeta[item.module].eyebrow}</small><h2>{item.title}</h2><StatusPill>{item.status}</StatusPill></div><button className="icon-button" onClick={onClose}><X size={20}/></button></div><div className="drawer-section"><h3>Informações do registro</h3><dl>{item.fields.map((field) => <div key={field.label}><dt>{field.label}</dt><dd>{field.value || "—"}</dd></div>)}</dl></div><div className="drawer-section"><h3>Atualizar situação</h3><select value={item.status} onChange={(event) => onStatus(event.target.value)}>{[item.status, "Rascunho", "Em andamento", "Atenção", "Concluído", "Cancelado"].filter((value, index, list) => list.indexOf(value) === index).map((value) => <option key={value}>{value}</option>)}</select><p className="drawer-hint">A alteração é registrada na atividade e permanece neste navegador.</p></div><div className="drawer-section audit-mini"><h3><History size={15}/> Trilha da demonstração</h3><p>Registro consultado pelo Administrador Demo.</p><small>Agora · GitHub Pages</small></div><div className="drawer-actions"><button className="danger-button" onClick={onArchive}><Trash2 size={16}/> {item.custom ? "Excluir" : "Arquivar"}</button><button className="primary-button" onClick={onClose}><Check size={16}/> Concluir</button></div></aside></div>;
}

function SearchPalette({ open, query, setQuery, results, onClose, onSelect }: { open: boolean; query: string; setQuery: (value: string) => void; results: { module: ModuleKey; title: string; detail: string }[]; onClose: () => void; onSelect: (module: ModuleKey) => void }) {
  if (!open) return null;
  return <div className="palette-backdrop" onMouseDown={(event) => event.target === event.currentTarget && onClose()}><div className="command-palette"><div className="palette-search"><Search size={20}/><input value={query} onChange={(event) => setQuery(event.target.value)} autoFocus placeholder="Busque por qualquer módulo ou registro..."/><button className="key-button" onClick={onClose}>Esc</button></div><div className="palette-results">{results.length ? results.slice(0, 12).map((result, index) => <button key={`${result.module}-${result.title}-${index}`} onClick={() => onSelect(result.module)}><span><strong>{result.title}</strong><small>{result.detail}</small></span><ChevronRight size={17}/></button>) : <div className="empty-search"><Search size={28}/><strong>Nenhum resultado</strong><small>Tente buscar por produto, cliente, pedido ou módulo.</small></div>}</div></div></div>;
}

function ActivityPanel({ open, workspace, onClose, onReset }: { open: boolean; workspace: DemoWorkspace; onClose: () => void; onReset: () => void }) {
  if (!open) return null;
  return <div className="activity-popover"><div className="activity-head"><div><strong>Atividade recente</strong><small>Alterações deste navegador</small></div><button className="icon-button" onClick={onClose}><X size={17}/></button></div><div className="activity-feed">{workspace.activity.slice(0, 8).map((activity) => <article key={activity.id}><span><Check size={13}/></span><div><strong>{activity.text}</strong><p>{activity.detail}</p><small>{activity.createdAt}</small></div></article>)}</div><button className="reset-button" onClick={onReset}>Restaurar dados da demonstração</button></div>;
}

export default function ErpShell() {
  const [active, setActive] = useState<ModuleKey>("dashboard");
  const [menuOpen, setMenuOpen] = useState(false);
  const [recordModal, setRecordModal] = useState(false);
  const [reportModal, setReportModal] = useState(false);
  const [selected, setSelected] = useState<SelectedItem | null>(null);
  const [workspace, setWorkspace] = useState<DemoWorkspace>(emptyWorkspace);
  const [hydrated, setHydrated] = useState(false);
  const [moduleQuery, setModuleQuery] = useState("");
  const [globalQuery, setGlobalQuery] = useState("");
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [activityOpen, setActivityOpen] = useState(false);
  const [toast, setToast] = useState("");
  const meta = moduleMeta[active];

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      try { const saved = localStorage.getItem(STORAGE_KEY); if (saved) setWorkspace(JSON.parse(saved) as DemoWorkspace); } catch { /* mantém os dados iniciais */ }
      setHydrated(true);
    }, 0);
    return () => window.clearTimeout(timeout);
  }, []);
  useEffect(() => { if (hydrated) localStorage.setItem(STORAGE_KEY, JSON.stringify(workspace)); }, [workspace, hydrated]);
  useEffect(() => { const handler = (event: KeyboardEvent) => { if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") { event.preventDefault(); setPaletteOpen(true); } if (event.key === "Escape") { setPaletteOpen(false); setSelected(null); setRecordModal(false); setReportModal(false); } }; window.addEventListener("keydown", handler); return () => window.removeEventListener("keydown", handler); }, []);
  useEffect(() => { if (!toast) return; const timeout = window.setTimeout(() => setToast(""), 2800); return () => window.clearTimeout(timeout); }, [toast]);

  const addActivity = (text: string, detail: string) => ({ id: `activity-${Date.now()}-${Math.random()}`, text, detail, createdAt: "Agora" });
  const searchResults = useMemo(() => {
    const results: { module: ModuleKey; title: string; detail: string }[] = [];
    navigation.flatMap((group) => group.items).forEach((item) => results.push({ module: item.id, title: item.label, detail: moduleMeta[item.id].description }));
    products.forEach((product) => results.push({ module: "products", title: product.name, detail: `${product.sku} · ${product.category}` }));
    (Object.entries(moduleRows) as [GenericKey, typeof moduleRows[GenericKey]][]).forEach(([module, data]) => data.rows.forEach((row) => results.push({ module, title: row[0], detail: row.slice(1, 3).join(" · ") })));
    workspace.records.forEach((record) => results.push({ module: record.module, title: record.title, detail: `${record.code} · Registro local` }));
    const query = globalQuery.trim().toLowerCase();
    return query ? results.filter((result) => `${result.title} ${result.detail}`.toLowerCase().includes(query)) : results;
  }, [globalQuery, workspace.records]);

  const notify = (message: string) => setToast(message);
  const navigate = (module: ModuleKey) => { setActive(module); setModuleQuery(""); };
  const saveRecord = (record: DemoRecord) => {
    setWorkspace((current) => ({ ...current, records: [record, ...current.records], activity: [addActivity("Registro criado", `${record.title} · ${moduleMeta[record.module].title}`), ...current.activity] }));
    setRecordModal(false); notify("Registro salvo e sincronizado com a demonstração.");
  };
  const saveReport = (report: SavedReport) => {
    setWorkspace((current) => ({ ...current, savedReports: [report, ...current.savedReports], activity: [addActivity("Relatório criado", report.title), ...current.activity] }));
    setReportModal(false); notify("Relatório personalizado salvo.");
  };
  const updateStatus = (status: string) => {
    if (!selected) return;
    setWorkspace((current) => ({ ...current, records: selected.custom ? current.records.map((record) => record.id === selected.id ? { ...record, status, updatedAt: new Date().toISOString() } : record) : current.records, seedStatuses: selected.custom ? current.seedStatuses : { ...current.seedStatuses, [selected.id]: status }, activity: [addActivity("Situação atualizada", `${selected.title}: ${status}`), ...current.activity] }));
    setSelected({ ...selected, status }); notify("Situação atualizada.");
  };
  const archiveSelected = () => {
    if (!selected) return;
    setWorkspace((current) => ({ ...current, records: selected.custom ? current.records.filter((record) => record.id !== selected.id) : current.records, archivedSeedIds: selected.custom ? current.archivedSeedIds : [...current.archivedSeedIds, selected.id], activity: [addActivity(selected.custom ? "Registro excluído" : "Registro arquivado", selected.title), ...current.activity] }));
    setSelected(null); notify("Registro removido da visualização.");
  };
  const exportActive = () => {
    let headers: string[] = []; let rows: string[][] = [];
    if (active === "products") { headers = ["SKU", "Produto", "Categoria", "Estoque", "Preço", "Status"]; rows = [...workspace.records.filter((record) => record.module === "products").map((record) => [record.code, record.title, record.category, String(record.quantity), formatCurrency(record.value), record.status]), ...products.map((product) => [product.sku, product.name, product.category, String(product.stock), product.price, workspace.seedStatuses[product.sku] ?? product.status])]; }
    else if (!["dashboard", "reports", "settings"].includes(active)) { const data = moduleRows[active as GenericKey]; headers = data.headers; rows = [...workspace.records.filter((record) => record.module === active).map(recordToRow), ...data.rows]; }
    else { headers = ["Módulo", "Descrição"]; rows = navigation.flatMap((group) => group.items.map((item) => [item.label, moduleMeta[item.id].description])); }
    const blob = new Blob(["\ufeff", csvContent(headers, rows)], { type: "text/csv;charset=utf-8" }); const url = URL.createObjectURL(blob); const link = document.createElement("a"); link.href = url; link.download = `allescorp-${active}.csv`; link.click(); URL.revokeObjectURL(url); notify("Arquivo CSV exportado.");
  };
  const resetWorkspace = () => { setWorkspace(emptyWorkspace); setActivityOpen(false); notify("Demonstração restaurada."); };
  const generic = !(["dashboard", "products", "reports", "settings"] as ModuleKey[]).includes(active);

  return <div className="app-shell">
    <Sidebar active={active} onSelect={navigate} open={menuOpen} onClose={() => setMenuOpen(false)}/>
    <div className="app-main"><Topbar onMenu={() => setMenuOpen(true)} onNew={() => active === "reports" ? setReportModal(true) : setRecordModal(true)} query={globalQuery} setQuery={setGlobalQuery} onSearch={() => setPaletteOpen(true)} onNotifications={() => setActivityOpen((open) => !open)}/>{activityOpen && <ActivityPanel open={activityOpen} workspace={workspace} onClose={() => setActivityOpen(false)} onReset={resetWorkspace}/>}<main className="content"><div className="page-head"><div><p>{meta.eyebrow}</p><h1>{meta.title}</h1><span>{meta.description}</span></div><div className="page-actions"><button className="secondary-button"><CalendarDays size={16}/> Este mês <ChevronDown size={14}/></button><button className="secondary-button" onClick={() => notify("Dados da demonstração atualizados.")}><RefreshCw size={16}/> Atualizar</button><button className="secondary-button export-button" onClick={exportActive}><Download size={16}/> Exportar</button></div></div>{active === "dashboard" && <Dashboard workspace={workspace} onNavigate={navigate}/>} {active === "products" && <Products workspace={workspace} query={moduleQuery} setQuery={setModuleQuery} onNew={() => setRecordModal(true)} onSelect={setSelected}/>} {active === "reports" && <Reports workspace={workspace} onNew={() => setReportModal(true)}/>} {active === "settings" && <SettingsModule onNotify={notify}/>} {generic && <GenericModule module={active as GenericKey} workspace={workspace} query={moduleQuery} setQuery={setModuleQuery} onNew={() => setRecordModal(true)} onSelect={setSelected}/>}</main></div>
    <NewRecordModal open={recordModal} module={active} onClose={() => setRecordModal(false)} onSave={saveRecord}/>
    <ReportModal open={reportModal} onClose={() => setReportModal(false)} onSave={saveReport}/>
    <DetailDrawer item={selected} onClose={() => setSelected(null)} onStatus={updateStatus} onArchive={archiveSelected}/>
    <SearchPalette open={paletteOpen} query={globalQuery} setQuery={setGlobalQuery} results={searchResults} onClose={() => setPaletteOpen(false)} onSelect={(module) => { navigate(module); setPaletteOpen(false); setGlobalQuery(""); }}/>
    {toast && <div className="toast"><Check size={16}/>{toast}</div>}
  </div>;
}

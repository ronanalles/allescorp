import type { ModuleKey } from "./data";

export type DemoRecord = {
  id: string;
  module: ModuleKey;
  code: string;
  title: string;
  category: string;
  status: string;
  value: number;
  quantity: number;
  notes: string;
  createdAt: string;
  updatedAt: string;
};

export type SavedReport = {
  id: string;
  title: string;
  dimension: string;
  metric: string;
  visualization: string;
  updatedAt: string;
};

export type DemoWorkspace = {
  records: DemoRecord[];
  savedReports: SavedReport[];
  archivedSeedIds: string[];
  seedStatuses: Record<string, string>;
  activity: { id: string; text: string; detail: string; createdAt: string }[];
};

export const emptyWorkspace: DemoWorkspace = {
  records: [],
  savedReports: [],
  archivedSeedIds: [],
  seedStatuses: {},
  activity: [
    {
      id: "welcome",
      text: "Ambiente demonstrativo preparado",
      detail: "Os dados criados ficam salvos somente neste navegador.",
      createdAt: "Agora",
    },
  ],
};

export function createRecord(
  module: ModuleKey,
  values: Omit<DemoRecord, "id" | "module" | "createdAt" | "updatedAt">,
): DemoRecord {
  const now = new Date().toISOString();
  return {
    ...values,
    id: `local-${module}-${Date.now()}`,
    module,
    createdAt: now,
    updatedAt: now,
  };
}

export function formatCurrency(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value || 0);
}

export function formatDateTime(value: string) {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

export function recordToRow(record: DemoRecord): string[] {
  const amount = formatCurrency(record.value);
  const date = formatDateTime(record.updatedAt);
  switch (record.module) {
    case "inventory":
      return [record.code, record.title, record.category, `+${record.quantity} un`, `${record.quantity} un`, date];
    case "people":
      return [record.title, record.category, record.code || "Não informado", record.notes || "Não informado", amount, record.status];
    case "sales":
      return [record.code, record.title, record.category, date, amount, record.status];
    case "purchases":
      return [record.code, record.title, date, String(record.quantity), amount, record.status];
    case "finance":
      return [record.code, record.title, date, record.category, amount, record.status];
    case "fiscal":
      return [record.code, record.title, date, amount, record.category, record.status];
    case "marketplaces":
      return [record.title, record.category, record.notes || record.code, amount, String(record.quantity), record.status];
    default:
      return [record.code, record.title, record.category, date, amount, record.status];
  }
}

export function csvContent(headers: string[], rows: string[][]) {
  const escape = (value: string) => `"${String(value).replaceAll('"', '""')}"`;
  return [headers, ...rows].map((row) => row.map(escape).join(";")).join("\n");
}

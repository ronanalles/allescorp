import { describe, expect, it } from "vitest";
import { createRecord, csvContent, formatCurrency, recordToRow } from "./demo-store";

describe("workspace demonstrativo", () => {
  it("cria um registro vinculado ao módulo correto", () => {
    const record = createRecord("sales", {
      code: "PV-TESTE",
      title: "Pedido de teste",
      category: "B2B",
      status: "Rascunho",
      value: 150,
      quantity: 2,
      notes: "",
    });

    expect(record.module).toBe("sales");
    expect(record.id).toContain("local-sales");
    expect(recordToRow(record)).toContain("PV-TESTE");
  });

  it("gera CSV compatível com valores que contêm aspas", () => {
    const csv = csvContent(["Nome"], [['Produto "Premium"']]);
    expect(csv).toContain('"Produto ""Premium"""');
  });

  it("formata valores na moeda brasileira", () => {
    expect(formatCurrency(1234.5)).toMatch(/1\.234,50/);
  });
});

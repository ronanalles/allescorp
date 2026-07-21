import { describe, expect, it } from "vitest";
import { calculateInstallmentValue, calculateKitAvailability, calculateMargin, calculateMarkup, calculateWeightedAverageCost } from "./business";

describe("regras comerciais", () => {
  it("calcula margem sobre o preço de venda", () => {
    expect(calculateMargin(100, 65)).toBe(35);
  });

  it("calcula markup sobre o custo", () => {
    expect(calculateMarkup(150, 100)).toBe(50);
  });

  it("calcula custo médio ponderado de uma entrada", () => {
    expect(calculateWeightedAverageCost(10, 20, 5, 26)).toBe(22);
  });

  it("limita a disponibilidade do anúncio pelo componente crítico", () => {
    const components = [{ productId: "A", quantity: 2 }, { productId: "B", quantity: 1 }];
    const stock = [{ productId: "A", available: 9 }, { productId: "B", available: 7 }];
    expect(calculateKitAvailability(components, stock)).toBe(4);
  });

  it("divide parcelas com arredondamento monetário", () => {
    expect(calculateInstallmentValue(100, 3)).toBe(33.33);
  });
});

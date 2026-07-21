export type KitComponent = {
  productId: string;
  quantity: number;
};

export type StockPosition = {
  productId: string;
  available: number;
};

export function calculateMargin(salePrice: number, totalCost: number) {
  if (salePrice <= 0) return 0;
  return ((salePrice - totalCost) / salePrice) * 100;
}

export function calculateMarkup(salePrice: number, totalCost: number) {
  if (totalCost <= 0) return 0;
  return ((salePrice - totalCost) / totalCost) * 100;
}

export function calculateWeightedAverageCost(
  currentQuantity: number,
  currentAverageCost: number,
  incomingQuantity: number,
  incomingUnitCost: number,
) {
  const quantity = currentQuantity + incomingQuantity;
  if (quantity <= 0) return 0;
  return (
    (currentQuantity * currentAverageCost + incomingQuantity * incomingUnitCost) /
    quantity
  );
}

export function calculateKitAvailability(
  components: KitComponent[],
  stock: StockPosition[],
) {
  if (components.length === 0) return 0;
  const stockMap = new Map(stock.map((item) => [item.productId, item.available]));
  return Math.max(
    0,
    Math.min(
      ...components.map((component) =>
        Math.floor((stockMap.get(component.productId) ?? 0) / component.quantity),
      ),
    ),
  );
}

export function calculateInstallmentValue(total: number, installments: number) {
  if (installments <= 0) throw new Error("A quantidade de parcelas deve ser positiva.");
  return Math.round((total / installments) * 100) / 100;
}

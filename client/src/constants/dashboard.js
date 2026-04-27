export const CHART_COLOR = "#6366F1";

export const formatCurrency = (value) =>
  new Intl.NumberFormat("it-IT", { style: "currency", currency: "EUR" }).format(value ?? 0);

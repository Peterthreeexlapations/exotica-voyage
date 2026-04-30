export function formatRate(rate: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(rate);
}

export function formatNumber(n: number): string {
  return new Intl.NumberFormat("en-US").format(n);
}

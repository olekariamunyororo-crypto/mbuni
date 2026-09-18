const usd = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });

export const fmtUsd = (n: number) => usd.format(n);

export function fmtPrice(n: number): string {
  if (n >= 1000) return "$" + n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  if (n >= 1) return "$" + n.toFixed(2);
  return "$" + n.toFixed(4);
}

export function fmtCrypto(n: number, decimals = 6): string {
  return n.toLocaleString("en-US", { maximumFractionDigits: decimals });
}

export const fmtPct = (n: number) => `${n >= 0 ? "+" : "−"}${Math.abs(n).toFixed(2)}%`;

/** Groups the integer part of an in-progress amount string: "12345.6" → "12,345.6" */
export function fmtAmountInput(v: string): string {
  if (!v) return "0";
  const [i, d] = v.split(".");
  const g = Number(i || "0").toLocaleString("en-US");
  return d !== undefined ? `${g}.${d}` : g;
}

export const trimZeros = (n: number, d: number) => {
  const s = n.toFixed(d);
  return s.includes(".") ? s.replace(/0+$/, "").replace(/\.$/, "") : s;
};

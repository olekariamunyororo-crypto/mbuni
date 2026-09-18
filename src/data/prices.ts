import { ASSETS } from "./assets";
import { hashStr, mulberry32 } from "../lib/rand";
import type { PriceMap } from "../types";

export function initialPrices(): PriceMap {
  const out: PriceMap = {};
  for (const a of ASSETS) out[a.symbol] = { price: a.price, change24h: a.change24h };
  return out;
}

export const INITIAL_PRICES: PriceMap = initialPrices();

/** Random-walk tick; keeps the 24h baseline fixed so change % drifts believably. */
export function tickPrices(prev: PriceMap): PriceMap {
  const out: PriceMap = {};
  for (const a of ASSETS) {
    const p = prev[a.symbol] ?? { price: a.price, change24h: a.change24h };
    const drift = (Math.random() - 0.485) * 0.006;
    out[a.symbol] = {
      price: Math.max(p.price * (1 + drift), 0.0001),
      change24h: p.change24h + drift * 100,
    };
  }
  return out;
}

/** Deterministic series (seeded by symbol) that ends exactly at `endPrice`. */
export function assetSeries(symbol: string, points: number, endPrice: number): number[] {
  const rng = mulberry32(hashStr(symbol) + points);
  const out = new Array<number>(points);
  out[points - 1] = endPrice;
  for (let i = points - 2; i >= 0; i--) out[i] = out[i + 1] / (1 + (rng() - 0.5) * 0.035);
  return out;
}

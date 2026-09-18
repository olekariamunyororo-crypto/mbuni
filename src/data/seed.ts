import type { Holding, StakePosition, Tx } from "../types";

const now = Date.now();

export const SEED_HOLDINGS: Holding[] = [
  { symbol: "BTC", amount: 1.2842 },
  { symbol: "ETH", amount: 9.42 },
  { symbol: "USDT", amount: 24800 },
  { symbol: "SOL", amount: 112.6 },
  { symbol: "BNB", amount: 21.4 },
  { symbol: "LINK", amount: 850 },
  { symbol: "ADA", amount: 15300 },
];

export const SEED_TXS: Tx[] = [
  { id: "tx_seed1", type: "buy", symbol: "BTC", amount: 0.0513, usd: 5000, label: "Paid with Visa •• 4241", ts: now - 2 * 864e5, status: "completed" },
  { id: "tx_seed2", type: "receive", symbol: "USDT", amount: 1200, usd: 1200, label: "From 0x83fD…9c21", ts: now - 3 * 864e5, status: "completed" },
  { id: "tx_seed3", type: "send", symbol: "ETH", amount: 0.42, usd: 1436, label: "To 0x51bA…77e2", ts: now - 5 * 864e5, status: "completed" },
  { id: "tx_seed4", type: "swap", symbol: "SOL", amount: 12.5, usd: 2682, label: "Swapped to BNB", ts: now - 6 * 864e5, status: "completed" },
  { id: "tx_seed5", type: "stake", symbol: "USDT", amount: 5000, usd: 5000, label: "30-day lock · 8.4% APY", ts: now - 12 * 864e5, status: "completed" },
];

export const SEED_STAKES: StakePosition[] = [
  { id: "st_seed1", symbol: "USDT", amount: 5000, apy: 8.4, termDays: 30, startedAt: now - 12 * 864e5 },
];

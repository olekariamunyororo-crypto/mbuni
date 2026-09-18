import type { StakePlan } from "../types";

export const STAKE_PLANS: StakePlan[] = [
  { id: "usdt-flex", symbol: "USDT", apy: 5.9, termDays: 0, min: 100 },
  { id: "usdt-30", symbol: "USDT", apy: 8.4, termDays: 30, min: 500 },
  { id: "sol-30", symbol: "SOL", apy: 9.6, termDays: 30, min: 10 },
  { id: "eth-90", symbol: "ETH", apy: 12.1, termDays: 90, min: 0.5 },
  { id: "btc-180", symbol: "BTC", apy: 3.2, termDays: 180, min: 0.05 },
];

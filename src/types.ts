export interface User {
  uid: string;
  email: string;
  displayName: string;
  phone?: string;
}

export interface Asset {
  symbol: string;
  name: string;
  color: string;
  glyph: string;
  networks: string[];
  decimals: number;
  fee: number; // network fee in asset units
  price: number; // seed price, USD
  change24h: number; // seed 24h change, %
}

export interface PricePoint {
  price: number;
  change24h: number;
}
export type PriceMap = Record<string, PricePoint>;

export type TxType = "buy" | "sell" | "send" | "receive" | "swap" | "stake" | "reward";

export interface Tx {
  id: string;
  type: TxType;
  symbol: string;
  amount: number;
  usd: number;
  label: string;
  ts: number;
  status: "completed" | "pending";
}

export interface Holding {
  symbol: string;
  amount: number;
}

export interface StakePosition {
  id: string;
  symbol: string;
  amount: number;
  apy: number;
  termDays: number; // 0 = flexible
  startedAt: number;
}

export interface StakePlan {
  id: string;
  symbol: string;
  apy: number;
  termDays: number;
  min: number;
}

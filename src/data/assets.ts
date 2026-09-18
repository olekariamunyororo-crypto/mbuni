import type { Asset } from "../types";

export const ASSETS: Asset[] = [
  { symbol: "BTC", name: "Bitcoin", color: "#F7931A", glyph: "₿", networks: ["Bitcoin"], decimals: 8, fee: 0.00012, price: 97312.4, change24h: 2.34 },
  { symbol: "ETH", name: "Ethereum", color: "#627EEA", glyph: "Ξ", networks: ["ERC-20"], decimals: 6, fee: 0.0018, price: 3418.76, change24h: 1.82 },
  { symbol: "USDT", name: "Tether", color: "#26A17B", glyph: "₮", networks: ["ERC-20", "TRC-20"], decimals: 2, fee: 0.9, price: 1.0, change24h: 0.01 },
  { symbol: "SOL", name: "Solana", color: "#9945FF", glyph: "◎", networks: ["Solana"], decimals: 4, fee: 0.008, price: 214.55, change24h: 5.67 },
  { symbol: "BNB", name: "BNB", color: "#F3BA2F", glyph: "◆", networks: ["BEP-20"], decimals: 5, fee: 0.002, price: 706.12, change24h: 0.94 },
  { symbol: "LINK", name: "Chainlink", color: "#2A5ADA", glyph: "⬡", networks: ["ERC-20"], decimals: 4, fee: 0.05, price: 22.84, change24h: 3.41 },
  { symbol: "ADA", name: "Cardano", color: "#0033AD", glyph: "₳", networks: ["Cardano"], decimals: 4, fee: 0.4, price: 0.9812, change24h: -1.24 },
];

export const assetMap: Record<string, Asset> = Object.fromEntries(ASSETS.map((a) => [a.symbol, a]));

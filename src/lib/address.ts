import { hashStr, mulberry32 } from "./rand";

const B58 = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
const PREFIX: Record<string, string> = { BTC: "bc1q", ETH: "0x", USDT: "0x", LINK: "0x", BNB: "0x", SOL: "", ADA: "addr1" };

/** Deterministic demo address per uid + asset + network. */
export function genAddress(uid: string, symbol: string, network: string): string {
  const rng = mulberry32(hashStr(`${uid}:${symbol}:${network}`));
  const prefix = PREFIX[symbol] ?? "0x";
  let body = "";
  for (let i = 0; i < 32; i++) body += B58[Math.floor(rng() * B58.length)];
  return prefix + body;
}

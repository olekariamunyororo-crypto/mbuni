import { cn } from "../lib/utils";
import { assetMap } from "../data/assets";

const DISC: Record<string, string> = {
  BTC: "bg-btc", ETH: "bg-eth", USDT: "bg-usdt", SOL: "bg-sol", BNB: "bg-bnb", LINK: "bg-link", ADA: "bg-ada",
};

const SIZES = {
  sm: "h-9 w-9 text-[15px]",
  md: "h-10 w-10 text-[17px]",
  lg: "h-11 w-11 text-[18px]",
} as const;

export function AssetIcon({ symbol, size = "md" }: { symbol: string; size?: keyof typeof SIZES }) {
  const meta = assetMap[symbol];
  return (
    <span className={cn("grid shrink-0 select-none place-items-center rounded-full font-bold text-white", DISC[symbol] ?? "bg-muted", SIZES[size])}>
      {meta?.glyph ?? symbol.slice(0, 1)}
    </span>
  );
}

import { Star } from "lucide-react";
import { cn } from "../lib/utils";
import { fmtCrypto, fmtPct, fmtPrice, fmtUsd } from "../lib/format";
import { assetSeries } from "../data/prices";
import { AssetIcon } from "./AssetIcon";
import { Sparkline } from "./ui/charts";

interface Props {
  symbol: string;
  name: string;
  price?: number;
  change24h?: number;
  amount?: number;
  usd?: number;
  spark?: boolean;
  star?: boolean;
  starred?: boolean;
  onStar?: () => void;
  onClick?: () => void;
}

export function AssetRow({ symbol, name, price, change24h = 0, amount, usd, spark, star, starred, onStar, onClick }: Props) {
  const up = change24h >= 0;
  return (
    <div className="flex items-center gap-2 py-2.5">
      <button type="button" onClick={onClick} className="flex min-w-0 flex-1 items-center gap-3 text-left">
        <AssetIcon symbol={symbol} size="lg" />
        <span className="min-w-0 flex-1">
          <span className="block truncate text-[15px] font-semibold text-white">{name}</span>
          <span className="block text-[13px] text-secondary">{symbol}</span>
        </span>
        {spark && price !== undefined && <Sparkline data={assetSeries(symbol, 24, price)} positive={up} />}
        {price !== undefined && usd === undefined && (
          <span className="shrink-0 text-right">
            <span className="block text-[15px] font-semibold text-white tnum">{fmtPrice(price)}</span>
            <span className={cn("block text-[13px] font-medium tnum", up ? "text-success" : "text-danger")}>{fmtPct(change24h)}</span>
          </span>
        )}
        {usd !== undefined && (
          <span className="shrink-0 text-right">
            <span className="block text-[15px] font-semibold text-white tnum">{fmtUsd(usd)}</span>
            <span className="block text-[13px] text-secondary tnum">
              {fmtCrypto(amount ?? 0, 6)} {symbol}
            </span>
          </span>
        )}
      </button>
      {star && (
        <button
          type="button"
          onClick={onStar}
          aria-label={starred ? "Remove from watchlist" : "Add to watchlist"}
          className={cn(
            "grid h-9 w-9 shrink-0 place-items-center rounded-full transition-colors",
            starred ? "text-warning" : "text-tertiary hover:text-secondary",
          )}
        >
          <Star size={17} fill={starred ? "currentColor" : "none"} />
        </button>
      )}
    </div>
  );
}

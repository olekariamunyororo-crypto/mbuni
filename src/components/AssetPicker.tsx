import { Check } from "lucide-react";
import { ASSETS } from "../data/assets";
import { cn } from "../lib/utils";
import { fmtPct, fmtPrice } from "../lib/format";
import type { Asset } from "../types";
import { usePrices } from "../queries/hooks";
import { AssetIcon } from "./AssetIcon";
import { Sheet } from "./ui/Sheet";

interface Props {
  open: boolean;
  onClose: () => void;
  selected?: string;
  onSelect: (a: Asset) => void;
}

export function AssetPicker({ open, onClose, selected, onSelect }: Props) {
  const { data: prices } = usePrices();
  return (
    <Sheet open={open} onClose={onClose} title="Select asset">
      <div className="space-y-1 pb-2">
        {ASSETS.map((a) => {
          const p = prices?.[a.symbol];
          return (
            <button
              key={a.symbol}
              type="button"
              onClick={() => {
                onSelect(a);
                onClose();
              }}
              className="flex w-full items-center gap-3 rounded-xl p-3 text-left transition-colors hover:bg-surface"
            >
              <AssetIcon symbol={a.symbol} size="md" />
              <span className="min-w-0 flex-1">
                <span className="block text-[15px] font-semibold text-white">{a.name}</span>
                <span className="block text-[13px] text-secondary">{a.symbol}</span>
              </span>
              <span className="text-right">
                <span className="block text-[15px] font-semibold text-white tnum">{p ? fmtPrice(p.price) : "—"}</span>
                <span className={cn("block text-[13px] tnum", (p?.change24h ?? 0) >= 0 ? "text-success" : "text-danger")}>
                  {p ? fmtPct(p.change24h) : ""}
                </span>
              </span>
              {selected === a.symbol && <Check size={18} className="ml-1 shrink-0 text-primary" />}
            </button>
          );
        })}
      </div>
    </Sheet>
  );
}

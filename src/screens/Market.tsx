import { Search, SearchX, X } from "lucide-react";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ASSETS } from "../data/assets";
import { usePrices } from "../queries/hooks";
import { useSettings } from "../store/settings";
import { Page } from "../components/layout/Page";
import { AssetRow } from "../components/AssetRow";
import { Chip, EmptyState } from "../components/ui/controls";

type Filter = "all" | "favorites" | "gainers" | "losers";
const FILTER_LABEL: Record<Filter, string> = { all: "All", favorites: "Watchlist", gainers: "Gainers", losers: "Losers" };

export default function Market() {
  const { data: prices } = usePrices();
  const { favorites, toggleFavorite } = useSettings();
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const navigate = useNavigate();

  const rows = useMemo(() => {
    const p = prices ?? {};
    let arr = ASSETS.map((a) => ({ a, price: p[a.symbol]?.price ?? a.price, change24h: p[a.symbol]?.change24h ?? a.change24h }));
    const term = q.trim().toLowerCase();
    if (term) arr = arr.filter((r) => r.a.name.toLowerCase().includes(term) || r.a.symbol.toLowerCase().includes(term));
    if (filter === "favorites") arr = arr.filter((r) => favorites.includes(r.a.symbol));
    if (filter === "gainers") arr = arr.filter((r) => r.change24h > 0).sort((x, y) => y.change24h - x.change24h);
    if (filter === "losers") arr = arr.filter((r) => r.change24h < 0).sort((x, y) => x.change24h - y.change24h);
    return arr;
  }, [prices, q, filter, favorites]);

  return (
    <Page className="pb-28">
      <h1 className="pt-2 text-[28px] font-bold tracking-tight">Market</h1>
      <div className="relative mt-4">
        <Search size={17} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-tertiary" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search assets"
          aria-label="Search assets"
          className="h-12 w-full rounded-xl border border-line bg-surface pl-11 pr-10 text-[15px] outline-none transition-colors focus:border-primary"
        />
        {q && (
          <button type="button" onClick={() => setQ("")} aria-label="Clear search" className="absolute right-3 top-1/2 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-full text-tertiary hover:text-secondary">
            <X size={15} />
          </button>
        )}
      </div>
      <div className="no-scrollbar -mx-5 mt-4 flex gap-2 overflow-x-auto px-5">
        {(["all", "favorites", "gainers", "losers"] as const).map((f) => (
          <Chip key={f} active={filter === f} onClick={() => setFilter(f)}>
            {FILTER_LABEL[f]}
          </Chip>
        ))}
      </div>
      <div className="mt-3 divide-y divide-divider">
        {rows.map(({ a, price, change24h }) => (
          <AssetRow
            key={a.symbol}
            symbol={a.symbol}
            name={a.name}
            price={price}
            change24h={change24h}
            spark
            star
            starred={favorites.includes(a.symbol)}
            onStar={() => toggleFavorite(a.symbol)}
            onClick={() => navigate(`/app/buy?asset=${a.symbol}`)}
          />
        ))}
      </div>
      {rows.length === 0 && <EmptyState icon={SearchX} title="No results" message={`Nothing matches “${q}”. Try a different search.`} />}
      <p className="pt-4 text-center text-[12px] text-tertiary">Prices refresh automatically every few seconds.</p>
    </Page>
  );
}

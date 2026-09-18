import { ArrowDownLeft, ArrowLeftRight, ArrowUpRight, Coins, History as HistoryIcon, Plus, Sparkles, type LucideIcon } from "lucide-react";
import { useMemo, useState } from "react";
import { dayLabel, cn } from "../lib/utils";
import { fmtCrypto, fmtUsd } from "../lib/format";
import { useTxs } from "../queries/hooks";
import type { Tx, TxType } from "../types";
import { Page } from "../components/layout/Page";
import { EmptyState, Tabs } from "../components/ui/controls";

const FILTERS = ["All", "Buy", "Send", "Receive", "Swap", "Stake"] as const;
type F = (typeof FILTERS)[number];
const MATCH: Record<F, TxType | null> = { All: null, Buy: "buy", Send: "send", Receive: "receive", Swap: "swap", Stake: "stake" };

const TX_META: Record<TxType, { icon: LucideIcon; cls: string }> = {
  buy: { icon: Plus, cls: "bg-primary/10 text-primary" },
  send: { icon: ArrowUpRight, cls: "bg-danger/10 text-danger" },
  receive: { icon: ArrowDownLeft, cls: "bg-success/10 text-success" },
  swap: { icon: ArrowLeftRight, cls: "bg-primary-soft/15 text-primary-soft" },
  stake: { icon: Coins, cls: "bg-warning/10 text-warning" },
  reward: { icon: Sparkles, cls: "bg-success/10 text-success" },
};

function HistoryRow({ t }: { t: Tx }) {
  const meta = TX_META[t.type];
  const inflow = t.type === "receive" || t.type === "buy";
  return (
    <div className="flex items-center gap-3 py-3">
      <span className={cn("grid h-10 w-10 shrink-0 place-items-center rounded-full", meta.cls)}>
        <meta.icon size={17} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-[15px] font-semibold text-white">{t.label}</span>
        <span className="block text-[12px] text-secondary">
          {new Date(t.ts).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })}
          {t.status === "pending" && <span className="ml-2 font-medium text-warning">Pending</span>}
        </span>
      </span>
      <span className="shrink-0 text-right">
        <span className={cn("block text-[15px] font-semibold tnum", inflow ? "text-success" : "text-white")}>
          {inflow ? "+" : "−"}
          {fmtCrypto(t.amount, 6)} {t.symbol}
        </span>
        <span className="block text-[12px] text-secondary tnum">{t.usd > 0 ? fmtUsd(t.usd) : "—"}</span>
      </span>
    </div>
  );
}

export default function History() {
  const { data: txs, isLoading } = useTxs();
  const [f, setF] = useState<F>("All");

  const list = useMemo(() => (txs ?? []).filter((t) => !MATCH[f] || t.type === MATCH[f]), [txs, f]);
  const groups = useMemo(() => {
    const m = new Map<string, Tx[]>();
    for (const t of list) {
      const k = dayLabel(t.ts);
      const arr = m.get(k);
      if (arr) arr.push(t);
      else m.set(k, [t]);
    }
    return Array.from(m.entries());
  }, [list]);

  return (
    <Page className="pb-28">
      <h1 className="pt-2 text-[28px] font-bold tracking-tight">History</h1>
      <div className="no-scrollbar -mx-5 mt-4 overflow-x-auto px-5">
        <Tabs tabs={FILTERS} value={f} onChange={setF} />
      </div>
      {isLoading ? (
        <div className="mt-4 space-y-2">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="h-16 animate-pulse rounded-2xl bg-surface" />
          ))}
        </div>
      ) : groups.length === 0 ? (
        <EmptyState icon={HistoryIcon} title="No transactions" message={f === "All" ? "Your activity will appear here." : `No ${f.toLowerCase()} transactions yet.`} />
      ) : (
        <div className="mt-2">
          {groups.map(([day, items]) => (
            <section key={day}>
              <p className="pt-4 text-[12px] font-medium uppercase tracking-wider text-tertiary">{day}</p>
              <div className="divide-y divide-divider">
                {items.map((t) => (
                  <HistoryRow key={t.id} t={t} />
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </Page>
  );
}

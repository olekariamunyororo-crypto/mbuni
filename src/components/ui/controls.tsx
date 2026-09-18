import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "../../lib/utils";

/* ---------------------------------- Chip ---------------------------------- */

export function Chip({ active, children, onClick, className }: { active: boolean; children: ReactNode; onClick?: () => void; className?: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "h-9 shrink-0 rounded-full px-4 text-[13px] font-semibold transition-colors",
        active ? "bg-white text-black" : "border border-line bg-surface text-secondary hover:text-white",
        className,
      )}
    >
      {children}
    </button>
  );
}

/* ---------------------------------- Tabs ----------------------------------- */

export function Tabs<T extends string>({ tabs, value, onChange, className }: { tabs: readonly T[]; value: T; onChange: (t: T) => void; className?: string }) {
  return (
    <div className={cn("flex items-center gap-5 border-b border-line", className)}>
      {tabs.map((t) => (
        <button key={t} type="button" onClick={() => onChange(t)} className="relative pb-2.5 pt-1">
          <span className={cn("text-[14px] font-medium transition-colors", value === t ? "text-white" : "text-secondary")}>{t}</span>
          {value === t && <motion.span layoutId="mbuni-tab" className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-primary" />}
        </button>
      ))}
    </div>
  );
}

/* -------------------------------- RadioRow --------------------------------- */

export function RadioRow({ selected, title, subtitle, icon: Icon, onClick }: { selected: boolean; title: string; subtitle?: string; icon?: LucideIcon; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex w-full items-center gap-3.5 rounded-2xl border p-4 text-left transition-colors",
        selected ? "border-white/80 bg-surface" : "border-line bg-surface hover:border-tertiary",
      )}
    >
      {Icon && (
        <span className={cn("grid h-10 w-10 place-items-center rounded-full", selected ? "bg-primary/15 text-primary" : "bg-elevated text-secondary")}>
          <Icon size={19} />
        </span>
      )}
      <span className="min-w-0 flex-1">
        <span className="block truncate text-[15px] font-semibold text-white">{title}</span>
        {subtitle && <span className="block truncate text-[13px] text-secondary">{subtitle}</span>}
      </span>
      <span className={cn("grid h-5 w-5 shrink-0 place-items-center rounded-full border transition-colors", selected ? "border-white" : "border-tertiary")}>
        {selected && <span className="h-2.5 w-2.5 rounded-full bg-white" />}
      </span>
    </button>
  );
}

/* ------------------------------- ProgressBar ------------------------------- */

export function ProgressBar({ pct, className }: { pct: number; className?: string }) {
  return (
    <div className={cn("h-1 w-full overflow-hidden rounded-full bg-surface", className)}>
      <motion.div
        className="h-full rounded-full bg-success"
        initial={false}
        animate={{ width: `${Math.min(100, Math.max(0, pct))}%` }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      />
    </div>
  );
}

/* -------------------------------- EmptyState -------------------------------- */

export function EmptyState({ icon: Icon, title, message, action }: { icon: LucideIcon; title: string; message: string; action?: ReactNode }) {
  return (
    <div className="flex flex-col items-center px-8 py-12 text-center">
      <span className="grid h-14 w-14 place-items-center rounded-2xl border border-line bg-surface text-secondary">
        <Icon size={24} />
      </span>
      <p className="mt-4 text-[16px] font-semibold">{title}</p>
      <p className="mt-1.5 text-[14px] text-secondary">{message}</p>
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}

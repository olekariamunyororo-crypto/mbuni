import { Coins, History, Home, TrendingUp, Wallet, type LucideIcon } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { cn } from "../../lib/utils";

const TABS: { to: string; label: string; icon: LucideIcon }[] = [
  { to: "/app/home", label: "Home", icon: Home },
  { to: "/app/market", label: "Market", icon: TrendingUp },
  { to: "/app/assets", label: "Assets", icon: Wallet },
  { to: "/app/stake", label: "Stake", icon: Coins },
  { to: "/app/history", label: "History", icon: History },
];

export function TabBar() {
  const { pathname } = useLocation();
  if (!TABS.some((t) => t.to === pathname)) return null;
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 mx-auto max-w-md border-t border-line bg-bg/95 backdrop-blur">
      <div className="grid grid-cols-5 pb-[env(safe-area-inset-bottom)]">
        {TABS.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              cn("flex flex-col items-center gap-1 pb-2 pt-3 transition-colors", isActive ? "text-primary" : "text-muted hover:text-secondary")
            }
          >
            {({ isActive }) => (
              <>
                <Icon size={22} strokeWidth={isActive ? 2.4 : 1.8} />
                <span className="text-[11px] font-medium">{label}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}

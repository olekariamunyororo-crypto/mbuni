import { motion, type HTMLMotionProps } from "framer-motion";
import { Loader2 } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "../../lib/utils";

interface Props extends HTMLMotionProps<"button"> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "lg" | "md";
  loading?: boolean;
  icon?: ReactNode;
  children?: ReactNode;
}

export function Button({ variant = "primary", size = "lg", loading, icon, className, children, disabled, ...rest }: Props) {
  const off = disabled || loading;
  return (
    <motion.button
      whileTap={{ scale: off ? 1 : 0.98 }}
      disabled={off}
      {...rest}
      className={cn(
        "inline-flex items-center justify-center gap-2 font-semibold transition-colors disabled:opacity-40",
        size === "lg" ? "h-[52px] w-full rounded-[14px] text-[16px]" : "h-11 rounded-xl px-5 text-[15px]",
        variant === "primary" && "bg-primary text-white hover:bg-primary-hover",
        variant === "secondary" && "bg-white text-black hover:bg-white/90",
        variant === "outline" && "border border-line bg-transparent text-white hover:bg-surface",
        variant === "ghost" && "text-primary hover:bg-primary/10",
        className,
      )}
    >
      {loading && <Loader2 size={18} className="animate-spin" />}
      {icon}
      {children}
    </motion.button>
  );
}

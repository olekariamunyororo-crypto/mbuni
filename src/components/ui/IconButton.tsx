import { motion, type HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "../../lib/utils";

interface Props extends HTMLMotionProps<"button"> {
  children: ReactNode;
  label?: string;
}

export function IconButton({ children, className, label, ...rest }: Props) {
  return (
    <motion.button
      whileTap={{ scale: 0.92 }}
      aria-label={label}
      {...rest}
      className={cn(
        "grid h-10 w-10 shrink-0 place-items-center rounded-full border border-line bg-surface text-white transition-colors hover:bg-elevated",
        className,
      )}
    >
      {children}
    </motion.button>
  );
}

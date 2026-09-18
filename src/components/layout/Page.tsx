import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "../../lib/utils";

interface Props {
  children: ReactNode;
  className?: string;
  padded?: boolean;
}

export function Page({ children, className, padded = true }: Props) {
  return (
    <motion.main
      initial={{ opacity: 0, x: 14 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -14 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
      className={cn("flex min-h-dvh flex-col", padded && "px-5 pb-10 pt-2", className)}
    >
      {children}
    </motion.main>
  );
}

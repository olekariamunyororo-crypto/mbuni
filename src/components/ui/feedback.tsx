import { AnimatePresence, motion } from "framer-motion";
import { Check } from "lucide-react";
import { createPortal } from "react-dom";
import { Ostrich } from "../Ostrich";
import { useToast } from "../../store/toast";

export function Splash() {
  return (
    <div className="grid min-h-dvh place-items-center">
      <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center gap-4">
        <motion.div animate={{ scale: [1, 1.07, 1] }} transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}>
          <Ostrich className="h-16 w-16 text-primary" />
        </motion.div>
        <span className="text-[15px] font-semibold tracking-wide text-secondary">Mbuni</span>
      </motion.div>
    </div>
  );
}

export function Toaster() {
  const toasts = useToast((s) => s.toasts);
  return createPortal(
    <div className="pointer-events-none fixed inset-x-0 top-4 z-[80] mx-auto flex max-w-md flex-col items-center gap-2 px-5">
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: -14, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className="pointer-events-auto flex items-center gap-2 rounded-full border border-line bg-elevated px-4 py-2.5 text-[14px] font-medium shadow-xl"
          >
            <Check size={15} className="text-success" />
            {t.msg}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>,
    document.body,
  );
}

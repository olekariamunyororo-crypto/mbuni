import { AnimatePresence, motion, useDragControls } from "framer-motion";
import { X } from "lucide-react";
import { createPortal } from "react-dom";
import type { ReactNode } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
}

export function Sheet({ open, onClose, title, children }: Props) {
  const controls = useDragControls();
  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-50" initial="hidden" animate="visible" exit="hidden">
          <motion.div
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-black/60"
            onClick={onClose}
          />
          <motion.div
            variants={{ hidden: { y: "100%" }, visible: { y: 0 } }}
            transition={{ type: "spring", stiffness: 320, damping: 32 }}
            drag="y"
            dragListener={false}
            dragControls={controls}
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.5 }}
            onDragEnd={(_, info) => {
              if (info.offset.y > 90 || info.velocity.y > 550) onClose();
            }}
            className="absolute inset-x-0 bottom-0 mx-auto max-w-md rounded-t-[20px] bg-elevated"
          >
            <div onPointerDown={(e) => controls.start(e)} className="cursor-grab touch-none active:cursor-grabbing">
              <div className="mx-auto mt-3 h-1 w-10 rounded-full bg-line" />
              <div className="flex items-center justify-between px-5 pb-2 pt-3">
                <h2 className="text-[18px] font-bold tracking-tight">{title}</h2>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close"
                  className="grid h-8 w-8 place-items-center rounded-full bg-surface text-secondary transition-colors hover:text-white"
                >
                  <X size={16} />
                </button>
              </div>
            </div>
            <div className="max-h-[68dvh] overflow-y-auto px-5 pb-[max(16px,env(safe-area-inset-bottom))]">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}

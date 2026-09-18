import { motion } from "framer-motion";
import { Delete } from "lucide-react";

export function Keypad({ onKey }: { onKey: (k: string) => void }) {
  const keys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "0", "back"];
  return (
    <div className="grid grid-cols-3 gap-2 px-1">
      {keys.map((k) => (
        <motion.button
          key={k}
          type="button"
          whileTap={{ scale: 0.9, backgroundColor: "rgba(255,255,255,0.08)" }}
          onClick={() => onKey(k)}
          aria-label={k === "back" ? "Delete" : k}
          className="grid h-14 place-items-center rounded-xl text-[22px] font-medium text-white"
        >
          {k === "back" ? <Delete size={22} /> : k}
        </motion.button>
      ))}
    </div>
  );
}

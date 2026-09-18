import { motion } from "framer-motion";
import { Globe, ShieldCheck, Zap, type LucideIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Ostrich } from "../components/Ostrich";
import { Page } from "../components/layout/Page";
import { Button } from "../components/ui/Button";

const FEATURES: { icon: LucideIcon; text: string }[] = [
  { icon: ShieldCheck, text: "Non-custodial and encrypted — your keys, your crypto" },
  { icon: Zap, text: "Buy, swap, send and stake in seconds" },
  { icon: Globe, text: "Reach 190+ countries, anytime" },
];

export default function Welcome() {
  const navigate = useNavigate();
  return (
    <Page padded={false} className="pb-8">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-1 flex-col items-center px-5 pt-14 text-center"
      >
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ repeat: Infinity, duration: 3.2, ease: "easeInOut" }}
          className="grid h-28 w-28 place-items-center rounded-[28px] border border-line bg-surface"
        >
          <Ostrich className="h-16 w-16 text-primary" />
        </motion.div>
        <h1 className="mt-8 text-[32px] font-bold leading-[1.15] tracking-tight">Welcome to Mbuni</h1>
        <p className="mt-3 max-w-[300px] text-[15px] leading-relaxed text-secondary">
          Secure, effortless crypto management — all in one place.
        </p>
        <div className="mt-8 w-full space-y-3 text-left">
          {FEATURES.map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-3.5">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-line bg-surface text-primary">
                <Icon size={18} />
              </span>
              <span className="text-[14px] text-secondary">{text}</span>
            </div>
          ))}
        </div>
      </motion.div>
      <div className="mt-10 space-y-2 px-5">
        <Button onClick={() => navigate("/onboarding/location")}>Get started</Button>
        <Button variant="ghost" onClick={() => navigate("/login")}>
          I already have an account
        </Button>
      </div>
    </Page>
  );
}

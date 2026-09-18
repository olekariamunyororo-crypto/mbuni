import { fmtAmountInput } from "../../lib/format";

interface Props {
  label: string;
  value: string;
  unit: string;
  sub?: string;
  prefix?: string;
}

export function AmountCenter({ label, value, unit, sub, prefix = "" }: Props) {
  return (
    <div className="flex flex-col items-center py-5">
      <span className="text-[13px] font-medium text-secondary">{label}</span>
      <div className="mt-1 flex items-baseline gap-2">
        <span className="text-[40px] font-bold leading-none tracking-tight tnum">
          {prefix}
          {value ? fmtAmountInput(value) : "0"}
        </span>
        {!value && <span className="inline-block h-8 w-[2px] animate-pulse self-center rounded-full bg-primary" />}
        <span className="text-[15px] font-medium text-secondary">{unit}</span>
      </div>
      <span className="mt-1.5 h-5 text-[13px] text-tertiary tnum">{sub ?? ""}</span>
    </div>
  );
}

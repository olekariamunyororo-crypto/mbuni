import { useEffect, useRef } from "react";
import { cn } from "../../lib/utils";

interface Props {
  value: string;
  onChange: (v: string) => void;
  onComplete?: (v: string) => void;
  length?: number;
  error?: boolean;
}

export function PinInput({ value, onChange, onComplete, length = 4, error }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const doneRef = useRef(false);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (value.length === length && !doneRef.current) {
      doneRef.current = true;
      onComplete?.(value);
    }
    if (value.length < length) doneRef.current = false;
  }, [value, length, onComplete]);

  return (
    <div role="group" aria-label="PIN input" className="relative" onClick={() => inputRef.current?.focus()}>
      <input
        ref={inputRef}
        value={value}
        inputMode="numeric"
        autoComplete="off"
        aria-label="PIN"
        onChange={(e) => onChange(e.target.value.replace(/\D/g, "").slice(0, length))}
        className="absolute h-0 w-0 opacity-0"
      />
      <div className="flex justify-center gap-3">
        {Array.from({ length }, (_, i) => (
          <div
            key={i}
            className={cn(
              "grid h-14 w-12 place-items-center rounded-[10px] border bg-surface transition-colors",
              error ? "border-danger" : i === value.length ? "border-primary" : "border-line",
            )}
          >
            {i < value.length ? (
              <span className="h-2.5 w-2.5 rounded-full bg-white" />
            ) : (
              <span className={cn("h-0.5 w-5 rounded-full", i === value.length ? "bg-primary" : "bg-transparent")} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

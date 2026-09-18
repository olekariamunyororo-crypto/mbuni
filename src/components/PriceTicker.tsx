import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { INITIAL_PRICES, tickPrices } from "../data/prices";
import type { PriceMap } from "../types";

/** Drives the simulated live market into the Query cache. */
export function PriceTicker() {
  const qc = useQueryClient();
  useEffect(() => {
    const id = setInterval(() => {
      qc.setQueryData<PriceMap>(["prices"], (prev) => tickPrices(prev ?? INITIAL_PRICES));
    }, 3500);
    return () => clearInterval(id);
  }, [qc]);
  return null;
}

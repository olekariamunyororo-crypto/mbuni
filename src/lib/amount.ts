/** Reducer for keypad-driven amount entry with decimal cap. k ∈ "0"-"9" | "." | "back" */
export function pushKey(cur: string, k: string, decimals: number): string {
  if (k === "back") return cur.slice(0, -1);
  if (k === ".") {
    if (cur.includes(".")) return cur;
    return cur === "" || cur === "0" ? "0." : cur + ".";
  }
  const dot = cur.indexOf(".");
  if (dot !== -1 && cur.length - dot - 1 >= decimals) return cur;
  if (cur === "0") return k === "0" ? cur : k;
  if (cur === "") return k;
  return cur + k;
}

import {
  addDoc,
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  setDoc,
  type Firestore,
} from "firebase/firestore";
import { fs, isFirebaseConfigured } from "./firebase";
import type { Holding, StakePosition, Tx } from "../types";
import { SEED_HOLDINGS, SEED_STAKES, SEED_TXS } from "../data/seed";

export interface Db {
  seed(uid: string): Promise<void>;
  getHoldings(uid: string): Promise<Holding[]>;
  saveHolding(uid: string, h: Holding): Promise<void>;
  getTxs(uid: string): Promise<Tx[]>;
  addTx(uid: string, tx: Tx): Promise<void>;
  getStakes(uid: string): Promise<StakePosition[]>;
  addStake(uid: string, s: StakePosition): Promise<void>;
}

/* ---------------------------------- Local ---------------------------------- */

const key = (uid: string, c: string) => `mbuni.db.${uid}.${c}`;
function read<T>(uid: string, c: string): T[] {
  try {
    return JSON.parse(localStorage.getItem(key(uid, c)) ?? "[]") as T[];
  } catch {
    return [];
  }
}
function write<T>(uid: string, c: string, v: T[]) {
  localStorage.setItem(key(uid, c), JSON.stringify(v));
}
const wait = (ms = 220) => new Promise<void>((r) => setTimeout(r, ms));

export const localDb: Db = {
  async seed(uid) {
    await wait();
    if (read<Holding>(uid, "holdings").length === 0) {
      write(uid, "holdings", SEED_HOLDINGS);
      write(uid, "txs", SEED_TXS);
      write(uid, "stakes", SEED_STAKES);
    }
  },
  async getHoldings(uid) {
    await wait();
    return read<Holding>(uid, "holdings");
  },
  async saveHolding(uid, h) {
    const all = read<Holding>(uid, "holdings").filter((x) => x.symbol !== h.symbol);
    all.push(h);
    write(uid, "holdings", all);
  },
  async getTxs(uid) {
    await wait();
    return read<Tx>(uid, "txs").sort((a, b) => b.ts - a.ts);
  },
  async addTx(uid, tx) {
    const all = read<Tx>(uid, "txs");
    all.unshift(tx);
    write(uid, "txs", all);
  },
  async getStakes(uid) {
    await wait();
    return read<StakePosition>(uid, "stakes");
  },
  async addStake(uid, s) {
    const all = read<StakePosition>(uid, "stakes");
    all.unshift(s);
    write(uid, "stakes", all);
  },
};

/* --------------------------------- Firestore -------------------------------- */

function fdb(): Firestore {
  if (!fs) throw new Error("Firestore not configured");
  return fs;
}

export const firestoreDb: Db = {
  async seed(uid) {
    const ref = doc(fdb(), "users", uid);
    const snap = await getDocs(collection(ref, "holdings"));
    if (!snap.empty) return;
    await Promise.all(SEED_HOLDINGS.map((h) => setDoc(doc(collection(ref, "holdings"), h.symbol), h)));
    await Promise.all(SEED_TXS.map((t) => addDoc(collection(ref, "txs"), t)));
    await Promise.all(SEED_STAKES.map((s) => addDoc(collection(ref, "stakes"), s)));
  },
  async getHoldings(uid) {
    const snap = await getDocs(collection(fdb(), "users", uid, "holdings"));
    return snap.docs.map((d) => d.data() as Holding);
  },
  async saveHolding(uid, h) {
    await setDoc(doc(fdb(), "users", uid, "holdings", h.symbol), h);
  },
  async getTxs(uid) {
    const snap = await getDocs(query(collection(fdb(), "users", uid, "txs"), orderBy("ts", "desc")));
    return snap.docs.map((d) => ({ ...(d.data() as Tx), id: d.id }));
  },
  async addTx(uid, tx) {
    await addDoc(collection(fdb(), "users", uid, "txs"), tx);
  },
  async getStakes(uid) {
    const snap = await getDocs(collection(fdb(), "users", uid, "stakes"));
    return snap.docs.map((d) => ({ ...(d.data() as StakePosition), id: d.id }));
  },
  async addStake(uid, s) {
    await addDoc(collection(fdb(), "users", uid, "stakes"), s);
  },
};

export const db: Db = isFirebaseConfigured && fs ? firestoreDb : localDb;

/* ------------------------------ Seeding helper ------------------------------ */

const inFlight = new Map<string, Promise<void>>();

/** Runs seed at most once per uid (dedupes concurrent callers). */
export function ensureSeed(uid: string): Promise<void> {
  let p = inFlight.get(uid);
  if (!p) {
    p = db.seed(uid).catch(() => undefined);
    inFlight.set(uid, p);
  }
  return p;
}

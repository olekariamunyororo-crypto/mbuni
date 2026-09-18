import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  OAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut as fbSignOut,
  updateProfile,
  type User as FBUser,
} from "firebase/auth";
import { auth, isFirebaseConfigured } from "./firebase";
import type { User } from "../types";

export interface AuthClient {
  onChange(cb: (u: User | null) => void): () => void;
  signUp(email: string, password: string, displayName: string): Promise<User>;
  signIn(identifier: string, password: string): Promise<User>;
  signInGoogle(): Promise<User>;
  signInApple(): Promise<User>;
  resetPassword(email: string): Promise<void>;
  signOut(): Promise<void>;
}

/* ---------------------------------- Mock ---------------------------------- */

const SESSION_KEY = "mbuni.session";
const USERS_KEY = "mbuni.users";
type MockRecord = { uid: string; email: string; displayName: string; phone: string; password: string };

function readJSON<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}
function writeJSON<T>(key: string, v: T) {
  localStorage.setItem(key, JSON.stringify(v));
}
const toUser = (r: MockRecord): User => ({ uid: r.uid, email: r.email, displayName: r.displayName, phone: r.phone || undefined });
const delay = (ms = 700) => new Promise<void>((r) => setTimeout(r, ms));
const listeners = new Set<(u: User | null) => void>();
const emit = (u: User | null) => listeners.forEach((l) => l(u));
const newUid = () => "u_" + Math.random().toString(36).slice(2, 12);

function currentMock(): User | null {
  const uid = localStorage.getItem(SESSION_KEY);
  if (!uid) return null;
  const rec = readJSON<MockRecord[]>(USERS_KEY, []).find((r) => r.uid === uid);
  return rec ? toUser(rec) : null;
}
function persistSession(u: User | null) {
  if (u) localStorage.setItem(SESSION_KEY, u.uid);
  else localStorage.removeItem(SESSION_KEY);
}
function upsert(rec: MockRecord) {
  const all = readJSON<MockRecord[]>(USERS_KEY, []);
  const i = all.findIndex((r) => r.uid === rec.uid);
  if (i >= 0) all[i] = rec;
  else all.push(rec);
  writeJSON(USERS_KEY, all);
}

export const mockAuthClient: AuthClient = {
  onChange(cb) {
    listeners.add(cb);
    cb(currentMock());
    return () => {
      listeners.delete(cb);
    };
  },
  async signUp(email, password, displayName) {
    await delay();
    const all = readJSON<MockRecord[]>(USERS_KEY, []);
    if (all.some((r) => r.email.toLowerCase() === email.toLowerCase()))
      throw new Error("An account with this email already exists. Try logging in.");
    const rec: MockRecord = { uid: newUid(), email, displayName, phone: "", password };
    upsert(rec);
    const u = toUser(rec);
    persistSession(u);
    emit(u);
    return u;
  },
  async signIn(identifier, password) {
    await delay();
    const rec = readJSON<MockRecord[]>(USERS_KEY, []).find(
      (r) => r.email.toLowerCase() === identifier.toLowerCase() || (r.phone !== "" && r.phone === identifier),
    );
    if (!rec || rec.password !== password) throw new Error("Incorrect email or password. Please try again.");
    const u = toUser(rec);
    persistSession(u);
    emit(u);
    return u;
  },
  async signInGoogle() {
    await delay(900);
    const all = readJSON<MockRecord[]>(USERS_KEY, []);
    let rec = all.find((r) => r.uid === "u_google");
    if (!rec) {
      rec = { uid: "u_google", email: "demo.google@mbuni.app", displayName: "Demo User", phone: "", password: "" };
      upsert(rec);
    }
    const u = toUser(rec);
    persistSession(u);
    emit(u);
    return u;
  },
  async signInApple() {
    await delay(900);
    const all = readJSON<MockRecord[]>(USERS_KEY, []);
    let rec = all.find((r) => r.uid === "u_apple");
    if (!rec) {
      rec = { uid: "u_apple", email: "demo.apple@mbuni.app", displayName: "Demo User", phone: "", password: "" };
      upsert(rec);
    }
    const u = toUser(rec);
    persistSession(u);
    emit(u);
    return u;
  },
  async resetPassword(email) {
    await delay(500);
    if (!readJSON<MockRecord[]>(USERS_KEY, []).some((r) => r.email.toLowerCase() === email.toLowerCase()))
      throw new Error("No account found with that email.");
  },
  async signOut() {
    persistSession(null);
    emit(null);
  },
};

/* --------------------------------- Firebase -------------------------------- */

function mapUser(u: FBUser): User {
  return { uid: u.uid, email: u.email ?? "", displayName: u.displayName ?? u.email?.split("@")[0] ?? "Mbuni user" };
}

export const firebaseAuthClient: AuthClient = {
  onChange(cb) {
    return onAuthStateChanged(auth!, (u) => cb(u ? mapUser(u) : null));
  },
  async signUp(email, password, displayName) {
    const cred = await createUserWithEmailAndPassword(auth!, email, password);
    await updateProfile(cred.user, { displayName });
    return { uid: cred.user.uid, email, displayName };
  },
  async signIn(identifier, password) {
    if (!identifier.includes("@")) throw new Error("Please sign in with your email address.");
    const cred = await signInWithEmailAndPassword(auth!, identifier, password);
    return mapUser(cred.user);
  },
  async signInGoogle() {
    const cred = await signInWithPopup(auth!, new GoogleAuthProvider());
    return mapUser(cred.user);
  },
  async signInApple() {
    const p = new OAuthProvider("apple.com");
    p.addScope("email");
    p.addScope("name");
    const cred = await signInWithPopup(auth!, p);
    return mapUser(cred.user);
  },
  async resetPassword(email) {
    await sendPasswordResetEmail(auth!, email);
  },
  async signOut() {
    await fbSignOut(auth!);
  },
};

export const authClient: AuthClient = isFirebaseConfigured ? firebaseAuthClient : mockAuthClient;

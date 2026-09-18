import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { BrowserRouter, Navigate, Outlet, Route, Routes, useLocation } from "react-router-dom";
import { TabBar } from "./components/layout/TabBar";
import { PriceTicker } from "./components/PriceTicker";
import { Splash, Toaster } from "./components/ui/feedback";
import { authClient } from "./lib/auth";
import { ensureSeed } from "./lib/db";
import { useAuthStore } from "./store/auth";
import { useSettings } from "./store/settings";
import Assets from "./screens/Assets";
import Buy from "./screens/Buy";
import Forgot from "./screens/Forgot";
import History from "./screens/History";
import Home from "./screens/Home";
import Login from "./screens/Login";
import Market from "./screens/Market";
import Onboarding from "./screens/Onboarding";
import Receive from "./screens/Receive";
import Send from "./screens/Send";
import Stake from "./screens/Stake";
import Swap from "./screens/Swap";
import Verification from "./screens/Verification";
import Welcome from "./screens/Welcome";

const qc = new QueryClient({
  defaultOptions: { queries: { retry: 1, refetchOnWindowFocus: false } },
});

function RequireAuth() {
  const status = useAuthStore((s) => s.status);
  if (status === "loading") return <Splash />;
  if (status === "guest") return <Navigate to="/login" replace />;
  return <Outlet />;
}

function RootRedirect() {
  const status = useAuthStore((s) => s.status);
  const onboarded = useSettings((s) => s.onboarded);
  if (status === "loading") return <Splash />;
  if (status === "authed") return <Navigate to="/app/home" replace />;
  return <Navigate to={onboarded ? "/login" : "/welcome"} replace />;
}

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<RootRedirect />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/onboarding/:step" element={<Onboarding />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot" element={<Forgot />} />
        <Route element={<RequireAuth />}>
          <Route path="/app/home" element={<Home />} />
          <Route path="/app/market" element={<Market />} />
          <Route path="/app/assets" element={<Assets />} />
          <Route path="/app/stake" element={<Stake />} />
          <Route path="/app/history" element={<History />} />
          <Route path="/app/buy" element={<Buy />} />
          <Route path="/app/send" element={<Send />} />
          <Route path="/app/swap" element={<Swap />} />
          <Route path="/app/receive" element={<Receive />} />
          <Route path="/app/verification" element={<Verification />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  useEffect(
    () =>
      authClient.onChange(async (u) => {
        if (u) {
          try {
            await ensureSeed(u.uid);
          } catch {
            /* offline — continue with empty data */
          }
        }
        useAuthStore.getState().setUser(u);
      }),
    [],
  );

  return (
    <QueryClientProvider client={qc}>
      <BrowserRouter>
        <div className="flex min-h-dvh justify-center bg-black">
          <div className="relative flex min-h-dvh w-full max-w-md flex-col border-line bg-bg md:border-x">
            <PriceTicker />
            <AnimatedRoutes />
            <TabBar />
            <Toaster />
          </div>
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

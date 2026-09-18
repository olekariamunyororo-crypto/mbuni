import { zodResolver } from "@hookform/resolvers/zod";
import { MailCheck } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { Page } from "../components/layout/Page";
import { TopBar } from "../components/layout/TopBar";
import { Button } from "../components/ui/Button";
import { TextField } from "../components/ui/TextField";
import { authClient } from "../lib/auth";

const schema = z.object({ email: z.string().email("Enter a valid email address") });

export default function Forgot() {
  const navigate = useNavigate();
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const form = useForm<z.infer<typeof schema>>({ resolver: zodResolver(schema), mode: "onTouched" });
  const email = form.watch("email") ?? "";

  const submit = form.handleSubmit(async (v) => {
    setBusy(true);
    setError(null);
    try {
      await authClient.resetPassword(v.email);
      setSent(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not send the reset link.");
    } finally {
      setBusy(false);
    }
  });

  if (sent) {
    return (
      <Page>
        <TopBar back />
        <div className="flex flex-1 flex-col items-center justify-center text-center">
          <span className="grid h-16 w-16 place-items-center rounded-2xl bg-success/10 text-success">
            <MailCheck size={30} />
          </span>
          <h1 className="mt-6 text-[26px] font-bold tracking-tight">Check your inbox</h1>
          <p className="mt-2 max-w-[300px] text-[15px] text-secondary">
            We sent a password reset link to <span className="font-medium text-white">{email}</span>.
          </p>
        </div>
        <Button onClick={() => navigate("/login")}>Back to log in</Button>
      </Page>
    );
  }

  return (
    <Page>
      <TopBar back />
      <h1 className="mt-2 text-[28px] font-bold leading-tight tracking-tight">Forgot password?</h1>
      <p className="mt-2 text-[15px] text-secondary">Enter your account email and we'll send you a reset link.</p>
      {error && <p className="mt-5 rounded-xl border border-danger/40 bg-danger/10 px-4 py-3 text-[14px] text-danger">{error}</p>}
      <form onSubmit={submit} className="mt-6 flex flex-1 flex-col">
        <TextField label="Email" type="email" placeholder="you@example.com" inputMode="email" clearable {...form.register("email")} error={form.formState.errors.email?.message} />
        <Button type="submit" loading={busy} className="mt-auto">
          Send reset link
        </Button>
      </form>
    </Page>
  );
}

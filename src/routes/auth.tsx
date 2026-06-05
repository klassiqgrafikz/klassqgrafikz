import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Sign in — Klassiq Grafikz" },
      { name: "description", content: "Sign in or create your Klassiq Grafikz account." },
    ],
  }),
  component: AuthPage,
});

const emailSchema = z.string().trim().email().max(255);
const passwordSchema = z.string().min(6).max(72);

function AuthPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/account" });
    });
  }, [navigate]);

  async function handleSignIn(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const email = emailSchema.safeParse(fd.get("email"));
    const password = passwordSchema.safeParse(fd.get("password"));
    if (!email.success || !password.success) {
      toast.error("Check your email and password (min 6 chars)");
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email: email.data, password: password.data });
    setLoading(false);
    if (error) return toast.error(error.message);
    toast.success("Welcome back");
    navigate({ to: "/account" });
  }

  async function handleSignUp(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const email = emailSchema.safeParse(fd.get("email"));
    const password = passwordSchema.safeParse(fd.get("password"));
    const name = String(fd.get("name") || "").trim().slice(0, 100);
    if (!email.success || !password.success || !name) {
      toast.error("Fill all fields (password min 6 chars)");
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email: email.data,
      password: password.data,
      options: {
        emailRedirectTo: `${window.location.origin}/account`,
        data: { display_name: name },
      },
    });
    setLoading(false);
    if (error) return toast.error(error.message);
    toast.success("Account created — check your email to verify.");
  }

  async function handleGoogle() {
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin + "/account",
    });
    if (result.error) toast.error("Google sign-in failed");
  }

  return (
    <SiteLayout>
      <section className="mx-auto mt-16 max-w-md px-6">
        <div className="text-center">
          <h1 className="font-display text-4xl uppercase md:text-5xl">Account</h1>
          <p className="mt-2 text-sm text-muted-foreground">Sign in or create your Klassiq account.</p>
        </div>

        <div className="mt-8 rounded-3xl border border-border bg-card p-6 shadow-card-soft md:p-8">
          <Button onClick={handleGoogle} variant="outline" className="w-full rounded-full">
            Continue with Google
          </Button>
          <div className="my-5 flex items-center gap-3 text-xs text-muted-foreground">
            <div className="h-px flex-1 bg-border" /> OR <div className="h-px flex-1 bg-border" />
          </div>

          <Tabs defaultValue="signin">
            <TabsList className="grid w-full grid-cols-2 rounded-full">
              <TabsTrigger value="signin" className="rounded-full">Sign in</TabsTrigger>
              <TabsTrigger value="signup" className="rounded-full">Sign up</TabsTrigger>
            </TabsList>

            <TabsContent value="signin">
              <form onSubmit={handleSignIn} className="mt-5 grid gap-3">
                <div>
                  <Label htmlFor="si-email">Email</Label>
                  <Input id="si-email" name="email" type="email" required className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="si-pwd">Password</Label>
                  <Input id="si-pwd" name="password" type="password" required minLength={6} className="mt-1" />
                </div>
                <Button type="submit" disabled={loading} className="mt-2 rounded-full gradient-primary text-primary-foreground">
                  {loading ? "Signing in..." : "Sign in"}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="signup">
              <form onSubmit={handleSignUp} className="mt-5 grid gap-3">
                <div>
                  <Label htmlFor="su-name">Name</Label>
                  <Input id="su-name" name="name" required maxLength={100} className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="su-email">Email</Label>
                  <Input id="su-email" name="email" type="email" required className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="su-pwd">Password</Label>
                  <Input id="su-pwd" name="password" type="password" required minLength={6} className="mt-1" />
                </div>
                <Button type="submit" disabled={loading} className="mt-2 rounded-full gradient-primary text-primary-foreground">
                  {loading ? "Creating..." : "Create account"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </SiteLayout>
  );
}

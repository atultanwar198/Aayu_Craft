import { SiteHeader } from "@/app/components/site-header";
import { SiteFooter } from "@/app/components/site-footer";
import { AuthForm } from "@/app/components/auth-form";

export default function LoginPage() {
  return (
    <div className="bg-[var(--color-background)] text-[var(--color-text)]">
      <SiteHeader />
      <main className="section-shell py-16">
        <div className="mx-auto max-w-md card-surface p-8">
          <p className="eyebrow">Welcome back</p>
          <h1 className="mt-3 font-display text-4xl font-bold">Login</h1>
          <AuthForm mode="login" />
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

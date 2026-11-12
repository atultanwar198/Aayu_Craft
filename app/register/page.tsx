import { SiteHeader } from "@/app/components/site-header";
import { SiteFooter } from "@/app/components/site-footer";
import { AuthForm } from "@/app/components/auth-form";

export default function RegisterPage() {
  return (
    <div className="bg-[var(--color-background)] text-[var(--color-text)]">
      <SiteHeader />
      <main className="section-shell py-16">
        <div className="mx-auto max-w-xl card-surface p-8">
          <p className="eyebrow">Join the marketplace</p>
          <h1 className="mt-3 font-display text-4xl font-bold">
            Create an account
          </h1>
          <AuthForm mode="register" />
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { Bell, LogOut, ShieldCheck, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMarketplaceStore } from "@/app/stores/useMarketplaceStore";

export function DashboardShell({
  title,
  subtitle,
  nav,
  children,
}: {
  title: string;
  subtitle: string;
  nav: { href: string; label: string }[];
  children: ReactNode;
}) {
  const router = useRouter();
  const currentUser = useMarketplaceStore((state) => state.currentUser);
  const signOut = useMarketplaceStore((state) => state.signOut);

  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-text)]">
      <div className="mx-auto flex max-w-7xl gap-6 px-4 py-6 lg:px-6">
        <aside className="hidden w-72 shrink-0 rounded-[28px] border border-[var(--color-border)] bg-white p-5 shadow-[0_20px_60px_rgba(41,39,32,0.08)] lg:block">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-primary)] text-white">
              <Sparkles size={18} />
            </div>
            <div>
              <div className="font-[family-name:var(--font-playfair)] text-2xl font-bold">AayuCraft</div>
            </div>
          </div>

          <div className="mt-8 space-y-2">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center justify-between rounded-2xl px-3 py-2 text-sm font-medium text-[var(--color-text)]/80 transition hover:bg-[#F6EFE6] hover:text-[var(--color-primary)]"
              >
                <span>{item.label}</span>
                <ShieldCheck size={15} className="opacity-50" />
              </Link>
            ))}
          </div>
        </aside>

        <main className="flex-1 rounded-[28px] border border-[var(--color-border)] bg-white p-5 shadow-[0_20px_60px_rgba(41,39,32,0.08)] sm:p-7">
          <details className="mb-5 rounded-2xl border border-[var(--color-border)] bg-[#F9F7F3] p-3 lg:hidden">
            <summary className="cursor-pointer text-sm font-semibold">Dashboard navigation</summary>
            <nav className="mt-2 grid grid-cols-2 gap-1">
              {nav.map((item) => <Link key={item.href} href={item.href} className="rounded-xl px-3 py-2 text-sm hover:bg-white">{item.label}</Link>)}
            </nav>
          </details>
          <div className="flex items-center justify-between gap-4 border-b border-[var(--color-border)] pb-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-primary)]">Dashboard</p>
              <h1 className="mt-2 font-[family-name:var(--font-playfair)] text-3xl font-bold">{title}</h1>
              <p className="mt-1 text-sm text-[var(--color-text)]/70">{subtitle}</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="rounded-full border border-[var(--color-border)] p-2 text-[var(--color-text)]/80" aria-label="Notifications">
                <Bell size={18} />
              </button>
              <div className="flex items-center gap-3 rounded-full bg-[#F6EFE6] px-3 py-2">
                <div className="h-9 w-9 rounded-full bg-[linear-gradient(135deg,#D6B77A,#A85D42)]" />
                <div className="hidden text-sm font-medium sm:block">{currentUser?.name ?? title.split(" ")[0]}</div>
              </div>
              <button type="button" onClick={() => { signOut(); router.push("/login"); }} className="rounded-full border border-[var(--color-border)] p-2 text-[var(--color-text)]/70" aria-label="Sign out"><LogOut size={17} /></button>
            </div>
          </div>

          <div className="mt-6">{children}</div>
        </main>
      </div>
    </div>
  );
}

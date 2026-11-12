import Link from "next/link";
import { DashboardShell } from "@/app/components/dashboard-shell";
import { artisans, dashboardNav } from "@/app/data/mockData";

export default function CustomerArtisansPage() {
  return (
    <DashboardShell title="Artisans" subtitle="Explore makers and favorite studio profiles." nav={dashboardNav.customer}>
      <div className="grid gap-5 md:grid-cols-2">
        {artisans.map((artisan) => (
          <div key={artisan.id} className="overflow-hidden rounded-[24px] border border-[var(--color-border)] bg-[#F9F7F3]">
            <img src={artisan.profileImage} alt={artisan.name} className="h-52 w-full object-cover" />
            <div className="p-5">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h2 className="font-display text-2xl font-bold">{artisan.name}</h2>
                  <p className="text-sm text-[var(--color-text)]/65">{artisan.specialty}</p>
                </div>
                <Link href={`/artisans/${artisan.id}`} className="text-sm font-semibold text-[var(--color-primary)]">View</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </DashboardShell>
  );
}

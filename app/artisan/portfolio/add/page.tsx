import Link from "next/link";
import { DashboardShell } from "@/app/components/dashboard-shell";
import { ArtisanPortfolioManager } from "@/app/components/artisan-catalog-manager";
import { dashboardNav } from "@/app/data/mockData";

export default function ArtisanAddPortfolioPage() {
  return (
    <DashboardShell title="Add portfolio work" subtitle="Upload a new example to your artisan portfolio." nav={dashboardNav.artisan}>
      <div className="mb-5"><Link href="/artisan/portfolio" className="text-sm font-semibold text-[var(--color-primary)]">← Back to portfolio</Link></div>
      <ArtisanPortfolioManager />
    </DashboardShell>
  );
}

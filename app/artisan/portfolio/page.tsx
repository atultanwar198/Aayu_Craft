import { DashboardShell } from "@/app/components/dashboard-shell";
import { ArtisanPortfolioManager } from "@/app/components/artisan-catalog-manager";
import { dashboardNav } from "@/app/data/mockData";

export default function ArtisanPortfolioPage() {
  return (
    <DashboardShell title="Portfolio" subtitle="Showcase your latest collections and current work." nav={dashboardNav.artisan}>
      <ArtisanPortfolioManager />
    </DashboardShell>
  );
}

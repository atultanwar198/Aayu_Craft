import { DashboardShell } from "@/app/components/dashboard-shell";
import Link from "next/link";
import { ArtisanProductsManager } from "@/app/components/artisan-catalog-manager";
import { dashboardNav } from "@/app/data/mockData";

export default function ArtisanProductsPage() {
  return (
    <DashboardShell title="Products" subtitle="Manage catalog listings and availability." nav={dashboardNav.artisan}>
      <Link href="/artisan/products/add" className="btn-primary mb-5">Add product</Link>
      <ArtisanProductsManager />
    </DashboardShell>
  );
}

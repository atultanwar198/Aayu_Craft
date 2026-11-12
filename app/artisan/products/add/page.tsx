import Link from "next/link";
import { DashboardShell } from "@/app/components/dashboard-shell";
import { AddArtisanProductForm } from "@/app/components/artisan-catalog-manager";
import { dashboardNav } from "@/app/data/mockData";

export default function ArtisanAddProductPage() {
  return (
    <DashboardShell title="Add product" subtitle="Create a product listing for your handmade shop." nav={dashboardNav.artisan}>
      <div className="mb-5"><Link href="/artisan/products" className="text-sm font-semibold text-[var(--color-primary)]">← Back to products</Link></div>
      <AddArtisanProductForm />
    </DashboardShell>
  );
}

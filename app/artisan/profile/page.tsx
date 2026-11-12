import { DashboardShell } from "@/app/components/dashboard-shell";
import { dashboardNav } from "@/app/data/mockData";

export default function ArtisanProfilePage() {
  return (
    <DashboardShell title="Profile" subtitle="Tell your story and showcase your handcrafted identity." nav={dashboardNav.artisan}>
      <div className="rounded-[24px] border border-[var(--color-border)] bg-[#F9F7F3] p-6">
        <div className="font-display text-3xl font-bold">Ananya Sharma</div>
        <div className="mt-2 text-sm text-[var(--color-text)]/65">Handloom & Textiles • Jaipur</div>
      </div>
    </DashboardShell>
  );
}

import { DashboardShell } from "@/app/components/dashboard-shell";
import { dashboardNav } from "@/app/data/mockData";

export default function ArtisanSettingsPage() {
  return (
    <DashboardShell title="Settings" subtitle="Manage your artisan profile and delivery preferences." nav={dashboardNav.artisan}>
      <div className="rounded-[24px] border border-[var(--color-border)] bg-[#F9F7F3] p-6">
        <div className="space-y-4 text-sm text-[var(--color-text)]/70">
          <div>Auto-approve quotes: Yes</div>
          <div>Dispatch window: 5-7 days</div>
          <div>Profile visibility: Public</div>
        </div>
      </div>
    </DashboardShell>
  );
}

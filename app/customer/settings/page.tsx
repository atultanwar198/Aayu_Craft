import { DashboardShell } from "@/app/components/dashboard-shell";
import { dashboardNav } from "@/app/data/mockData";

export default function CustomerSettingsPage() {
  return (
    <DashboardShell title="Settings" subtitle="Update your account settings and preferences." nav={dashboardNav.customer}>
      <div className="rounded-[24px] border border-[var(--color-border)] bg-[#F9F7F3] p-6">
        <div className="space-y-4 text-sm text-[var(--color-text)]/70">
          <div>Notifications: On</div>
          <div>Delivery alerts: On</div>
          <div>Privacy: Standard</div>
        </div>
      </div>
    </DashboardShell>
  );
}

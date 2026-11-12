import { DashboardShell } from "@/app/components/dashboard-shell";
import { dashboardNav } from "@/app/data/mockData";

export default function ArtisanNotificationsPage() {
  return (
    <DashboardShell title="Notifications" subtitle="Customer and admin updates around your workshop." nav={dashboardNav.artisan}>
      <div className="space-y-4">
        {[
          "Customer approved your quotation for the custom wall hanging.",
          "Admin requested updated production notes for the next milestone.",
          "Two new customer reviews are awaiting response.",
        ].map((item) => (
          <div key={item} className="rounded-[24px] border border-[var(--color-border)] bg-[#F9F7F3] p-5 text-sm text-[var(--color-text)]/70">{item}</div>
        ))}
      </div>
    </DashboardShell>
  );
}

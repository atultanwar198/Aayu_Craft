import { DashboardShell } from "@/app/components/dashboard-shell";
import { dashboardNav } from "@/app/data/mockData";

export default function ArtisanEarningsPage() {
  return (
    <DashboardShell title="Earnings" subtitle="Revenue snapshots and payout overview." nav={dashboardNav.artisan}>
      <div className="grid gap-4 md:grid-cols-3">
        {[
          { label: "Monthly sales", value: "₹1.8L" },
          { label: "Pending payout", value: "₹48,000" },
          { label: "Completed sales", value: "₹6.2L" },
        ].map((item) => (
          <div key={item.label} className="rounded-[24px] border border-[var(--color-border)] bg-[#F9F7F3] p-5">
            <div className="text-sm text-[var(--color-text)]/60">{item.label}</div>
            <div className="mt-3 font-display text-4xl font-bold">{item.value}</div>
          </div>
        ))}
      </div>
    </DashboardShell>
  );
}

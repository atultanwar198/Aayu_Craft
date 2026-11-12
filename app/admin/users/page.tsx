import { DashboardShell } from "@/app/components/dashboard-shell";
import { dashboardNav, latestRegistrations } from "@/app/data/mockData";

export default function AdminUsersPage() {
  return (
    <DashboardShell
      title="Users"
      subtitle="Overview of registered customers and account health."
      nav={dashboardNav.admin}
    >
      <div className="space-y-4">
        {latestRegistrations.map((entry) => (
          <div
            key={entry.name}
            className="rounded-[24px] border border-[var(--color-border)] bg-[#F9F7F3] p-5"
          >
            <div className="font-display text-2xl font-bold">{entry.name}</div>
            <div className="mt-2 text-sm text-[var(--color-text)]/65">
              {entry.role}
            </div>
          </div>
        ))}
      </div>
    </DashboardShell>
  );
}

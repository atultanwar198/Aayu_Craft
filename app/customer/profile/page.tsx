import { DashboardShell } from "@/app/components/dashboard-shell";
import { dashboardNav } from "@/app/data/mockData";

export default function CustomerProfilePage() {
  return (
    <DashboardShell title="Profile" subtitle="Manage your personal information and preferences." nav={dashboardNav.customer}>
      <div className="rounded-[24px] border border-[var(--color-border)] bg-[#F9F7F3] p-6">
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 rounded-full bg-[linear-gradient(135deg,#D6B77A,#A85D42)]" />
          <div>
            <div className="font-display text-3xl font-bold">Aisha Mehra</div>
            <div className="text-sm text-[var(--color-text)]/65">Customer</div>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}

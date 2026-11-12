import { DashboardShell } from "@/app/components/dashboard-shell";
import { AdminRequestManager } from "@/app/components/request-workflow";
import { dashboardNav } from "@/app/data/mockData";

export default function AdminCustomRequestsPage() {
  return (
    <DashboardShell title="Custom requests" subtitle="Review all incoming customer requests and assign artisans." nav={dashboardNav.admin}>
      <AdminRequestManager />
    </DashboardShell>
  );
}

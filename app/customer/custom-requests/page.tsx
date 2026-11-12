import { DashboardShell } from "@/app/components/dashboard-shell";
import { CustomerRequestList } from "@/app/components/customer-request-list";
import { dashboardNav } from "@/app/data/mockData";

export default function CustomerCustomRequestsPage() {
  return (
    <DashboardShell title="Custom requests" subtitle="Review, track, and respond to bespoke project updates." nav={dashboardNav.customer}>
      <CustomerRequestList />
    </DashboardShell>
  );
}

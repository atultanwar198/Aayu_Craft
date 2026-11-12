import { DashboardShell } from "@/app/components/dashboard-shell";
import { CustomerOrdersPanel } from "@/app/components/customer-commerce";
import { dashboardNav } from "@/app/data/mockData";

export default function CustomerOrdersPage() {
  return (
    <DashboardShell title="Orders" subtitle="Track every handmade order and delivery milestone." nav={dashboardNav.customer}>
      <CustomerOrdersPanel />
    </DashboardShell>
  );
}

import { DashboardShell } from "@/app/components/dashboard-shell";
import { CartPanel } from "@/app/components/customer-commerce";
import { dashboardNav } from "@/app/data/mockData";

export default function CustomerCartPage() {
  return (
    <DashboardShell title="Cart" subtitle="Review items before checkout." nav={dashboardNav.customer}>
      <CartPanel />
    </DashboardShell>
  );
}

import { DashboardShell } from "@/app/components/dashboard-shell";
import { ArtisanQuotationForm } from "@/app/components/request-workflow";
import { dashboardNav } from "@/app/data/mockData";

export default function ArtisanRequestsPage() {
  return (
    <DashboardShell title="Requests" subtitle="Review incoming client custom work inquiries." nav={dashboardNav.artisan}>
      <ArtisanQuotationForm />
    </DashboardShell>
  );
}

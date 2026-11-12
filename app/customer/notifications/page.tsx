import { DashboardShell } from "@/app/components/dashboard-shell";
import { dashboardNav } from "@/app/data/mockData";

export default function CustomerNotificationsPage() {
  return (
    <DashboardShell title="Notifications" subtitle="Latest updates from artisans and the platform." nav={dashboardNav.customer}>
      <div className="space-y-4">
        {[
          "Ananya Sharma sent a quotation for your custom wall hanging.",
          "Your order has shipped and is on the way.",
          "A product you saved is back in stock.",
        ].map((item) => (
          <div key={item} className="rounded-[24px] border border-[var(--color-border)] bg-[#F9F7F3] p-5 text-sm text-[var(--color-text)]/70">{item}</div>
        ))}
      </div>
    </DashboardShell>
  );
}

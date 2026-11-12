import { DashboardShell } from "@/app/components/dashboard-shell";
import { customerOrders, dashboardNav } from "@/app/data/mockData";

export default function ArtisanOrdersPage() {
  return (
    <DashboardShell title="Orders" subtitle="Track active commissions and custom orders." nav={dashboardNav.artisan}>
      <div className="space-y-4">
        {customerOrders.map((order) => (
          <div key={order.id} className="flex items-center justify-between rounded-[24px] border border-[var(--color-border)] bg-[#F9F7F3] p-5">
            <div>
              <div className="text-xs uppercase tracking-[0.14em] text-[var(--color-primary)]">{order.id}</div>
              <div className="mt-2 font-display text-2xl font-bold">{order.item}</div>
            </div>
            <span className="rounded-full bg-[rgba(168,93,66,0.12)] px-3 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-primary)]">{order.status}</span>
          </div>
        ))}
      </div>
    </DashboardShell>
  );
}

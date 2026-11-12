import Link from "next/link";
import { ArrowRight, Bell, Clock3, PackageCheck, ShoppingBag } from "lucide-react";
import { DashboardShell } from "@/app/components/dashboard-shell";
import { dashboardNav, customerOrders } from "@/app/data/mockData";

const stats = [
  { label: "Wishlist", value: "18" },
  { label: "Cart", value: "4" },
  { label: "Orders", value: "12" },
  { label: "Custom requests", value: "6" },
];

export default function CustomerDashboardPage() {
  return (
    <DashboardShell title="Customer dashboard" subtitle="Track orders, requests, and artisan matches." nav={dashboardNav.customer}>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-[24px] border border-[var(--color-border)] bg-[#F9F7F3] p-5">
            <div className="text-sm text-[var(--color-text)]/60">{stat.label}</div>
            <div className="mt-3 font-display text-4xl font-bold">{stat.value}</div>
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[24px] border border-[var(--color-border)] bg-[#F9F7F3] p-5">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-[var(--color-primary)]"><ShoppingBag size={18} /> Recent orders</div>
            <Link href="/customer/orders" className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-primary)]">View all <ArrowRight size={15} /></Link>
          </div>
          <div className="mt-5 space-y-4">
            {customerOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between rounded-2xl bg-white p-4">
                <div>
                  <div className="font-semibold">{order.item}</div>
                  <div className="mt-1 text-sm text-[var(--color-text)]/65">{order.artisan}</div>
                </div>
                <div className="text-right">
                  <div className="font-semibold">₹{order.total.toLocaleString("en-IN")}</div>
                  <div className="mt-1 text-xs uppercase tracking-[0.12em] text-[var(--color-primary)]">{order.status}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[24px] border border-[var(--color-border)] bg-[#F9F7F3] p-5">
          <div className="flex items-center gap-2 text-[var(--color-primary)]"><Bell size={18} /> Upcoming reminders</div>
          <div className="mt-5 space-y-4">
            <div className="rounded-2xl bg-white p-4">
              <div className="flex items-center gap-2 text-sm text-[var(--color-text)]/60"><Clock3 size={14} /> Quotation review</div>
              <div className="mt-2 font-semibold">Custom tray request</div>
              <div className="mt-1 text-sm text-[var(--color-text)]/65">Due in 2 days</div>
            </div>
            <div className="rounded-2xl bg-white p-4">
              <div className="flex items-center gap-2 text-sm text-[var(--color-text)]/60"><PackageCheck size={14} /> Production update</div>
              <div className="mt-2 font-semibold">Rangoli Clay Vase</div>
              <div className="mt-1 text-sm text-[var(--color-text)]/65">Final quality check underway</div>
            </div>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}

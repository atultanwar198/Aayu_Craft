import { DashboardShell } from "@/app/components/dashboard-shell";
import { dashboardNav } from "@/app/data/mockData";

const stats = [
  { label: "Sales", value: "₹2.4L" },
  { label: "Orders", value: "42" },
  { label: "Pending requests", value: "7" },
  { label: "Ratings", value: "4.9" },
];

export default function ArtisanDashboardPage() {
  return (
    <DashboardShell title="Artisan dashboard" subtitle="Manage orders, requests, and shop performance." nav={dashboardNav.artisan}>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-[24px] border border-[var(--color-border)] bg-[#F9F7F3] p-5">
            <div className="text-sm text-[var(--color-text)]/60">{stat.label}</div>
            <div className="mt-3 font-display text-4xl font-bold">{stat.value}</div>
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-[24px] border border-[var(--color-border)] bg-[#F9F7F3] p-5">
          <div className="font-display text-2xl font-bold">Recent requests</div>
          <div className="mt-4 space-y-4">
            {[
              ["Custom handwoven shawl", "Pending"],
              ["Wooden nameplate", "Quoted"],
              ["Clay planter set", "Approved"],
            ].map(([title, status]) => (
              <div key={title} className="flex items-center justify-between rounded-2xl bg-white p-4">
                <div className="font-medium">{title}</div>
                <span className="rounded-full bg-[rgba(168,93,66,0.12)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-primary)]">{status}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[24px] border border-[var(--color-border)] bg-[#F9F7F3] p-5">
          <div className="font-display text-2xl font-bold">Production timeline</div>
          <div className="mt-6 space-y-4">
            {[
              ["Design approval", "Done"],
              ["Material sourcing", "In progress"],
              ["Delivery", "Scheduled"],
            ].map(([label, state]) => (
              <div key={label} className="flex items-center justify-between rounded-2xl bg-white p-4">
                <div>{label}</div>
                <div className="text-sm text-[var(--color-text)]/65">{state}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}

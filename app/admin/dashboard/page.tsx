import { DashboardShell } from "@/app/components/dashboard-shell";
import {
  adminStats,
  customRequests,
  dashboardNav,
  latestRegistrations,
  recentActivity,
} from "@/app/data/mockData";

export default function AdminDashboardPage() {
  return (
    <DashboardShell
      title="Admin dashboard"
      subtitle="Monitor platform performance, requests, and artisan health."
      nav={dashboardNav.admin}
    >
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {adminStats.map((item) => (
          <div
            key={item.label}
            className="rounded-[24px] border border-[var(--color-border)] bg-[#F9F7F3] p-5"
          >
            <div className="text-sm text-[var(--color-text)]/60">
              {item.label}
            </div>
            <div className="mt-3 font-display text-4xl font-bold">
              {item.value}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[24px] border border-[var(--color-border)] bg-[#F9F7F3] p-5">
          <div className="font-display text-2xl font-bold">
            Request analytics
          </div>
          <div className="mt-6 flex h-40 items-end gap-3">
            {[55, 78, 70, 90, 82, 96].map((value, index) => (
              <div
                key={index}
                className="flex flex-1 flex-col items-center gap-2"
              >
                <div
                  className="w-full rounded-t-2xl bg-[linear-gradient(180deg,#D6B77A,#A85D42)]"
                  style={{ height: `${value}%` }}
                />
                <span className="text-xs text-[var(--color-text)]/60">
                  M{index + 1}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[24px] border border-[var(--color-border)] bg-[#F9F7F3] p-5">
          <div className="font-display text-2xl font-bold">
            Platform activity
          </div>
          <div className="mt-5 space-y-3">
            {recentActivity.map((item) => (
              <div
                key={item}
                className="rounded-2xl bg-white p-3 text-sm text-[var(--color-text)]/70"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-2">
        <div className="rounded-[24px] border border-[var(--color-border)] bg-[#F9F7F3] p-5">
          <div className="font-display text-2xl font-bold">
            Latest registrations
          </div>
          <div className="mt-5 space-y-3">
            {latestRegistrations.map((person) => (
              <div
                key={person.name}
                className="flex items-center justify-between rounded-2xl bg-white p-3"
              >
                <div>
                  <div className="font-medium">{person.name}</div>
                  <div className="text-sm text-[var(--color-text)]/60">
                    {person.role}
                  </div>
                </div>
                <span className="rounded-full bg-[rgba(168,93,66,0.1)] px-3 py-1 text-xs uppercase tracking-[0.12em] text-[var(--color-primary)]">
                  New
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[24px] border border-[var(--color-border)] bg-[#F9F7F3] p-5">
          <div className="font-display text-2xl font-bold">Custom requests</div>
          <div className="mt-5 space-y-3">
            {customRequests.map((request) => (
              <div key={request.id} className="rounded-2xl bg-white p-3">
                <div className="flex items-center justify-between gap-2">
                  <div className="font-medium">{request.title}</div>
                  <span className="text-xs uppercase tracking-[0.14em] text-[var(--color-primary)]">
                    {request.status}
                  </span>
                </div>
                <div className="mt-2 text-sm text-[var(--color-text)]/60">
                  {request.customerName} • {request.category}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}

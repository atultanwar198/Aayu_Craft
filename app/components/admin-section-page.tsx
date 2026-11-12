"use client";

import { useState } from "react";
import { artisans, categories, customerOrders, dashboardNav, latestRegistrations, products } from "@/app/data/mockData";
import { DashboardShell } from "@/app/components/dashboard-shell";
import { useMarketplaceStore } from "@/app/stores/useMarketplaceStore";

const listings = {
  artisans: {
    title: "Artisans",
    subtitle: "Review artisan profiles, specialties, and public visibility.",
    rows: artisans.map((item) => [item.name, item.specialty, item.location, `${item.rating} rating`]),
  },
  verification: {
    title: "Artisan verification",
    subtitle: "Review artisan onboarding and verification requests.",
    rows: [
      ["Niyati Arts Studio", "Decorative Art", "Jaipur", "Documents submitted"],
      ["Srishti & Co.", "Paper Craft", "Pune", "Awaiting review"],
      ["Nila Craft House", "Handloom", "Kochi", "Documents submitted"],
    ],
  },
  categories: {
    title: "Categories",
    subtitle: "Marketplace craft categories and descriptions.",
    rows: categories.map((item) => [item.name, item.description, "Active", "Public"]),
  },
  products: {
    title: "Products",
    subtitle: "Review listings and product visibility.",
    rows: products.map((item) => [item.title, item.artisan, item.category, `₹${item.price.toLocaleString("en-IN")}`]),
  },
  orders: {
    title: "Orders",
    subtitle: "Monitor marketplace orders and fulfillment status.",
    rows: customerOrders.map((item) => [item.id, item.item, item.artisan, item.status]),
  },
  reviews: {
    title: "Reviews",
    subtitle: "Moderate customer feedback and resolve reported reviews.",
    rows: [
      ["REV-183", "Kavya Menon", "Ananya Sharma", "5 stars · Verified purchase"],
      ["REV-184", "Rohit Sen", "Meera Patel", "4 stars · Verified purchase"],
    ],
  },
  reports: {
    title: "Reports",
    subtitle: "Platform performance snapshots for the current period.",
    rows: [
      ["Gross merchandise value", "₹18,42,000", "↑ 12.4%", "This month"],
      ["Completed orders", "890", "↑ 8.2%", "This month"],
      ["Custom requests", "481", "↑ 16.1%", "This month"],
      ["Average rating", "4.8 / 5", "Stable", "This month"],
    ],
  },
  notifications: {
    title: "Notifications",
    subtitle: "Platform alerts and operational updates.",
    rows: [
      ["Verification queue", "3 artisan profiles need review", "Today", "Action required"],
      ["Custom requests", "63 requests pending admin review", "Today", "Action required"],
      ["Platform update", "Monthly marketplace report is ready", "Yesterday", "Informational"],
    ],
  },
};

type ListingKey = keyof typeof listings;

export function AdminSectionPage({ section }: { section: ListingKey | "users" | "settings" }) {
  const [decisions, setDecisions] = useState<Record<string, string>>({});
  const [settings, setSettings] = useState({ verification: true, requestAlerts: true, newArtisans: false });
  const reviews = useMarketplaceStore((state) => state.reviews);

  if (section === "settings") {
    return (
      <DashboardShell title="Settings" subtitle="Configure platform review and notification preferences." nav={dashboardNav.admin}>
        <div className="space-y-3">
          {([
            ["verification", "Require artisan verification before listing"],
            ["requestAlerts", "Notify admins when custom requests arrive"],
            ["newArtisans", "Allow new artisan registrations"],
          ] as const).map(([key, label]) => (
            <label key={key} className="flex items-center justify-between gap-4 rounded-2xl border border-[var(--color-border)] bg-[#F9F7F3] p-4">
              <span className="text-sm font-medium">{label}</span>
              <input type="checkbox" checked={settings[key]} onChange={(event) => setSettings({ ...settings, [key]: event.target.checked })} />
            </label>
          ))}
          <p className="text-xs text-[var(--color-text)]/60">Demo settings remain local to this page.</p>
        </div>
      </DashboardShell>
    );
  }

  const data = section === "users"
    ? {
        title: "Users",
        subtitle: "Registered customers and artisan accounts.",
        rows: latestRegistrations.map((person) => [person.name, person.role, "Active", "Recently joined"]),
      }
    : section === "reviews"
      ? { ...listings.reviews, rows: reviews.map((review) => [review.id, review.customer, review.artisan, `${review.rating} stars · ${review.comment}`]) }
      : listings[section];

  return (
    <DashboardShell title={data.title} subtitle={data.subtitle} nav={dashboardNav.admin}>
      <div className="overflow-x-auto rounded-[24px] border border-[var(--color-border)]">
        <table className="w-full min-w-[640px] border-collapse text-left text-sm">
          <thead className="bg-[#F3EDE2] text-xs uppercase tracking-[0.12em] text-[var(--color-text)]/60">
            <tr>{["Details", "Information", "Location / Category", "Status / Value", ...(section === "verification" ? ["Decision"] : [])].map((heading) => <th key={heading} className="px-4 py-3 font-semibold">{heading}</th>)}</tr>
          </thead>
          <tbody>
            {data.rows.map((row) => {
              const rowId = row.join("|");
              return (
                <tr key={rowId} className="border-t border-[var(--color-border)] bg-white">
                  {row.map((cell, index) => <td key={`${rowId}-${index}`} className="px-4 py-4">{cell}</td>)}
                  {section === "verification" && (
                    <td className="px-4 py-4">
                      {decisions[rowId] ? <span className="font-semibold text-[var(--color-secondary)]">{decisions[rowId]}</span> : (
                        <div className="flex gap-2">
                          <button type="button" onClick={() => setDecisions({ ...decisions, [rowId]: "Approved" })} className="rounded-full bg-[var(--color-secondary)] px-3 py-1.5 text-xs font-semibold text-white">Approve</button>
                          <button type="button" onClick={() => setDecisions({ ...decisions, [rowId]: "Rejected" })} className="rounded-full border border-[var(--color-border)] px-3 py-1.5 text-xs font-semibold">Reject</button>
                        </div>
                      )}
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-xs text-[var(--color-text)]/60">Mock data for the frontend prototype; connect an authorized API before using real customer or artisan records.</p>
    </DashboardShell>
  );
}

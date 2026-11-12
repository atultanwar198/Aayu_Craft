import Link from "next/link";
import { DashboardShell } from "@/app/components/dashboard-shell";
import { dashboardNav, products } from "@/app/data/mockData";

export default function CustomerProductsPage() {
  return (
    <DashboardShell title="Products" subtitle="Your curated marketplace collection." nav={dashboardNav.customer}>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {products.map((product) => (
          <Link key={product.id} href={`/products/${product.id}`} className="overflow-hidden rounded-[24px] border border-[var(--color-border)] bg-[#F9F7F3]">
            <img src={product.image} alt={product.title} className="h-56 w-full object-cover" />
            <div className="p-5">
              <div className="text-xs uppercase tracking-[0.14em] text-[var(--color-primary)]">{product.category}</div>
              <h3 className="mt-2 font-display text-2xl font-bold">{product.title}</h3>
              <p className="mt-2 text-sm text-[var(--color-text)]/65">₹{product.price.toLocaleString("en-IN")}</p>
            </div>
          </Link>
        ))}
      </div>
    </DashboardShell>
  );
}

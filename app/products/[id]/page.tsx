import Link from "next/link";
import { ArrowLeft, ShieldCheck, Star } from "lucide-react";
import { SiteHeader } from "@/app/components/site-header";
import { SiteFooter } from "@/app/components/site-footer";
import { ProductActions } from "@/app/components/product-actions";
import { products } from "@/app/data/mockData";

export function generateStaticParams() {
  return products.map((product) => ({ id: product.id }));
}

export default function ProductDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const product = products.find((item) => item.id === id) ?? products[0];

  return (
    <div className="bg-[var(--color-background)] text-[var(--color-text)]">
      <SiteHeader />
      <main className="section-shell py-14">
        <Link
          href="/products"
          className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-primary)]"
        >
          <ArrowLeft size={16} /> Back to products
        </Link>

        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="card-surface overflow-hidden p-4">
            <img
              src={product.image}
              alt={product.title}
              className="h-[540px] w-full rounded-[24px] object-cover"
            />
          </div>

          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-primary)]">
              {product.category}
            </div>
            <h1 className="mt-3 font-display text-5xl font-bold">
              {product.title}
            </h1>
            <div className="mt-4 flex items-center gap-2 text-sm text-[var(--color-text)]/70">
              <span className="flex items-center gap-1 text-[var(--color-accent)]">
                <Star size={14} fill="currentColor" /> 4.8
              </span>
              <span>Handmade by {product.artisan}</span>
            </div>

            <div className="mt-6 flex items-end gap-3">
              <span className="text-3xl font-bold">
                ₹{product.price.toLocaleString("en-IN")}
              </span>
              <span className="text-xl text-[var(--color-text)]/50 line-through">
                ₹{product.originalPrice.toLocaleString("en-IN")}
              </span>
            </div>

            <ProductActions productId={product.id} />

            <div className="mt-8 card-surface p-5">
              <div className="flex items-center gap-2 text-sm font-semibold text-[var(--color-secondary)]">
                <ShieldCheck size={16} /> Secure checkout
              </div>
              <p className="mt-4 text-sm leading-6 text-[var(--color-text)]/70">
                {product.description}
              </p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <div>
                  <div className="text-xs uppercase tracking-[0.16em] text-[var(--color-text)]/50">
                    Materials
                  </div>
                  <p className="mt-2 text-sm text-[var(--color-text)]/75">
                    {product.materials.join(", ")}
                  </p>
                </div>
                <div>
                  <div className="text-xs uppercase tracking-[0.16em] text-[var(--color-text)]/50">
                    Dimensions
                  </div>
                  <p className="mt-2 text-sm text-[var(--color-text)]/75">
                    {product.dimensions}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

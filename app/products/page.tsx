"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Suspense } from "react";
import { ArrowRight, Heart, Star } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { SiteHeader } from "@/app/components/site-header";
import { SiteFooter } from "@/app/components/site-footer";
import { categories, products } from "@/app/data/mockData";
import { useMarketplaceStore } from "@/app/stores/useMarketplaceStore";

function ProductListing() {
  const searchParams = useSearchParams();
  const categoryFromUrl = searchParams.get("category") ?? "All";
  const [selectedCategory, setSelectedCategory] = useState(categoryFromUrl);
  const [sortBy, setSortBy] = useState("popular");
  const addToCart = useMarketplaceStore((state) => state.addToCart);
  const toggleWishlist = useMarketplaceStore((state) => state.toggleWishlist);
  const wishlist = useMarketplaceStore((state) => state.wishlist);
  const filteredProducts = useMemo(() => {
    const listed = selectedCategory === "All" ? [...products] : products.filter((product) => product.category === selectedCategory);
    return listed.sort((first, second) => sortBy === "price-low" ? first.price - second.price : sortBy === "price-high" ? second.price - first.price : Number(second.featured) - Number(first.featured));
  }, [selectedCategory, sortBy]);

  return (
    <div className="bg-[var(--color-background)] text-[var(--color-text)]">
      <SiteHeader />
      <main className="section-shell py-14">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div><p className="eyebrow">Curated collection</p><h1 className="section-title mt-3">Handmade products</h1></div>
          <label className="flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-white px-4 py-2 text-sm">Sort by
            <select value={sortBy} onChange={(event) => setSortBy(event.target.value)} className="bg-transparent outline-none"><option value="popular">Popular</option><option value="price-low">Price: Low to High</option><option value="price-high">Price: High to Low</option></select>
          </label>
        </div>
        <div className="mb-8 flex flex-wrap gap-2">
          {["All", ...categories.map((category) => category.name)].map((category) => <button key={category} type="button" onClick={() => setSelectedCategory(category)} className={`rounded-full px-4 py-2 text-sm font-medium ${selectedCategory === category ? "bg-[var(--color-primary)] text-white" : "border border-[var(--color-border)] bg-white"}`}>{category}</button>)}
        </div>
        {filteredProducts.length ? <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {filteredProducts.map((product) => (
            <article key={product.id} className="card-surface overflow-hidden">
              <Link href={`/products/${product.id}`}><img src={product.image} alt={product.title} className="h-64 w-full object-cover" /></Link>
              <div className="p-4">
                <div className="flex items-center justify-between text-xs uppercase tracking-[0.12em] text-[var(--color-text)]/60"><span>{product.category}</span><span className="flex items-center gap-1 text-[var(--color-accent)]"><Star size={12} fill="currentColor" />4.8</span></div>
                <Link href={`/products/${product.id}`}><h2 className="mt-2 font-display text-xl font-bold">{product.title}</h2></Link>
                <p className="mt-1 text-sm text-[var(--color-text)]/65">By {product.artisan}</p>
                <p className="mt-3 text-lg font-bold">₹{product.price.toLocaleString("en-IN")}</p>
                <div className="mt-4 flex gap-2">
                  <button type="button" onClick={() => addToCart(product.id)} className="btn-primary flex-1">Add to cart</button>
                  <button type="button" onClick={() => toggleWishlist(product.id)} aria-label={wishlist.includes(product.id) ? "Remove from wishlist" : "Add to wishlist"} className="rounded-full border border-[var(--color-border)] bg-white p-3 text-[var(--color-primary)]"><Heart size={17} fill={wishlist.includes(product.id) ? "currentColor" : "none"} /></button>
                </div>
                <Link href={`/products/${product.id}`} className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-[var(--color-primary)]">Details <ArrowRight size={14} /></Link>
              </div>
            </article>
          ))}
        </div> : <p className="rounded-2xl border border-[var(--color-border)] bg-white p-6 text-sm">No products currently match this category. Explore all handmade products instead.</p>}
      </main>
      <SiteFooter />
    </div>
  );
}

export default function ProductsPage() {
  return <Suspense fallback={<div className="section-shell py-20 text-sm">Loading handmade collection…</div>}><ProductListing /></Suspense>;
}

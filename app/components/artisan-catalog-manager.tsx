"use client";

import { useState } from "react";
import { useMarketplaceStore } from "@/app/stores/useMarketplaceStore";
import { products } from "@/app/data/mockData";

export function ArtisanProductsManager() {
  const artisanProducts = useMarketplaceStore((state) => state.artisanProducts);
  const removeProduct = useMarketplaceStore((state) => state.removeArtisanProduct);
  const allProducts = [...artisanProducts, ...products.filter((product) => product.artisan === "Ananya Sharma")];
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {allProducts.map((product) => (
        <article key={product.id} className="rounded-[24px] border border-[var(--color-border)] bg-[#F9F7F3] p-4">
          <img src={product.image} alt={product.title} className="h-48 w-full rounded-[20px] object-cover" />
          <div className="mt-4 flex items-start justify-between gap-3">
            <div><h2 className="font-display text-xl font-bold">{product.title}</h2><p className="mt-1 text-sm text-[var(--color-text)]/65">₹{product.price.toLocaleString("en-IN")} · Available</p></div>
            {artisanProducts.some((item) => item.id === product.id) && <button type="button" onClick={() => removeProduct(product.id)} className="text-sm font-semibold text-[var(--color-primary)]">Delete</button>}
          </div>
        </article>
      ))}
    </div>
  );
}

export function AddArtisanProductForm() {
  const addProduct = useMarketplaceStore((state) => state.addArtisanProduct);
  const [message, setMessage] = useState("");

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const title = String(formData.get("title") ?? "").trim();
    const image = String(formData.get("image") ?? "").trim();
    const price = Number(formData.get("price"));
    const category = String(formData.get("category") ?? "").trim();
    if (title.length < 3 || !image.startsWith("https://") || !Number.isFinite(price) || price <= 0 || !category) {
      setMessage("Enter a title, secure image URL, category, and price above zero.");
      return;
    }
    addProduct({
      id: `artisan-${Date.now()}`,
      title,
      artisan: "Ananya Sharma",
      category,
      price,
      originalPrice: price,
      image,
      description: "A handmade piece by Ananya Sharma.",
      materials: [],
      dimensions: "Made to order",
    });
    event.currentTarget.reset();
    setMessage("Product saved to your local artisan catalog.");
  };

  return (
    <form onSubmit={submit} className="max-w-2xl space-y-4 rounded-[24px] border border-[var(--color-border)] bg-[#F9F7F3] p-6">
      <label className="block text-sm font-medium">Product title<input name="title" required minLength={3} className="mt-2 w-full rounded-xl border border-[var(--color-border)] bg-white px-3 py-2.5" /></label>
      <label className="block text-sm font-medium">Category<input name="category" required className="mt-2 w-full rounded-xl border border-[var(--color-border)] bg-white px-3 py-2.5" /></label>
      <label className="block text-sm font-medium">Price (₹)<input name="price" type="number" min="1" required className="mt-2 w-full rounded-xl border border-[var(--color-border)] bg-white px-3 py-2.5" /></label>
      <label className="block text-sm font-medium">Image URL<input name="image" type="url" required placeholder="https://..." className="mt-2 w-full rounded-xl border border-[var(--color-border)] bg-white px-3 py-2.5" /></label>
      {message && <p role="status" className="text-sm text-[var(--color-primary)]">{message}</p>}
      <button className="btn-primary" type="submit">Add product</button>
    </form>
  );
}

export function ArtisanPortfolioManager() {
  const portfolioItems = useMarketplaceStore((state) => state.portfolioItems);
  const addPortfolio = useMarketplaceStore((state) => state.addPortfolioItem);
  const removePortfolio = useMarketplaceStore((state) => state.removePortfolioItem);
  const [message, setMessage] = useState("");
  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const title = String(data.get("title") ?? "").trim();
    const image = String(data.get("image") ?? "").trim();
    if (title.length < 2 || !image.startsWith("https://")) {
      setMessage("Enter a title and a valid secure image URL.");
      return;
    }
    addPortfolio({ title, image });
    event.currentTarget.reset();
    setMessage("Portfolio item added.");
  };
  return (
    <div className="space-y-6">
      <form onSubmit={submit} className="grid gap-3 rounded-[24px] border border-[var(--color-border)] bg-[#F9F7F3] p-5 md:grid-cols-[1fr_2fr_auto]">
        <input name="title" required placeholder="Work title" className="rounded-xl border border-[var(--color-border)] bg-white px-3 py-2.5" />
        <input name="image" type="url" required placeholder="Image URL (https://...)" className="rounded-xl border border-[var(--color-border)] bg-white px-3 py-2.5" />
        <button type="submit" className="btn-primary">Add work</button>
        {message && <p role="status" className="text-sm text-[var(--color-primary)] md:col-span-3">{message}</p>}
      </form>
      <div className="grid gap-4 md:grid-cols-3">
        {portfolioItems.map((item) => (
          <article key={item.id} className="rounded-[24px] border border-[var(--color-border)] bg-[#F9F7F3] p-4">
            <img src={item.image} alt={item.title} className="h-48 w-full rounded-[20px] object-cover" />
            <div className="mt-3 flex items-center justify-between gap-2"><h2 className="font-semibold">{item.title}</h2><button type="button" onClick={() => removePortfolio(item.id)} className="text-sm font-semibold text-[var(--color-primary)]">Delete</button></div>
          </article>
        ))}
        {portfolioItems.length === 0 && <p className="text-sm text-[var(--color-text)]/65">Add portfolio items to showcase your studio work.</p>}
      </div>
    </div>
  );
}

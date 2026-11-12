"use client";

import Link from "next/link";
import { useState } from "react";
import { products } from "@/app/data/mockData";
import { useMarketplaceStore } from "@/app/stores/useMarketplaceStore";

export function CartPanel() {
  const cart = useMarketplaceStore((state) => state.cart);
  const removeFromCart = useMarketplaceStore((state) => state.removeFromCart);
  const setCartQuantity = useMarketplaceStore((state) => state.setCartQuantity);
  const checkout = useMarketplaceStore((state) => state.checkout);
  const [checkoutMessage, setCheckoutMessage] = useState("");
  const items = Object.entries(cart)
    .map(([id, quantity]) => ({ product: products.find((item) => item.id === id), quantity }))
    .filter((entry): entry is { product: (typeof products)[number]; quantity: number } => Boolean(entry.product));
  const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  if (!items.length) {
    return <div className="rounded-[24px] border border-[var(--color-border)] bg-[#F9F7F3] p-8 text-center"><p>Your cart is empty.</p><Link href="/products" className="btn-primary mt-4">Explore products</Link></div>;
  }

  return (
    <div className="space-y-4">
      {items.map(({ product, quantity }) => (
        <div key={product.id} className="flex flex-col gap-4 rounded-[24px] border border-[var(--color-border)] bg-[#F9F7F3] p-4 sm:flex-row sm:items-center">
          <img src={product.image} alt={product.title} className="h-28 w-full rounded-2xl object-cover sm:w-32" />
          <div className="flex-1"><Link href={`/products/${product.id}`} className="font-display text-xl font-bold">{product.title}</Link><p className="mt-1 text-sm text-[var(--color-text)]/65">₹{product.price.toLocaleString("en-IN")} · {product.artisan}</p></div>
          <div className="flex items-center gap-2">
            <label className="sr-only" htmlFor={`quantity-${product.id}`}>Quantity for {product.title}</label>
            <input id={`quantity-${product.id}`} aria-label={`Quantity for ${product.title}`} type="number" min="1" value={quantity} onChange={(event) => setCartQuantity(product.id, Number(event.target.value))} className="w-20 rounded-xl border border-[var(--color-border)] bg-white px-3 py-2" />
            <button type="button" onClick={() => removeFromCart(product.id)} className="btn-secondary">Remove</button>
          </div>
        </div>
      ))}
      <div className="flex flex-col items-start justify-between gap-4 rounded-[24px] border border-[var(--color-border)] bg-white p-5 sm:flex-row sm:items-center">
        <div><p className="text-sm text-[var(--color-text)]/60">Subtotal</p><p className="font-display text-3xl font-bold">₹{total.toLocaleString("en-IN")}</p></div>
        <button type="button" onClick={() => setCheckoutMessage(checkout() ? "Demo order placed. No payment was collected." : "Your cart is empty.")} className="btn-primary">Place demo order</button>
      </div>
      {checkoutMessage && <p role="status" className="rounded-xl bg-[#E8EFE3] p-3 text-sm text-[#405638]">{checkoutMessage}</p>}
    </div>
  );
}

export function CustomerOrdersPanel() {
  const orders = useMarketplaceStore((state) => state.orders);
  const reviews = useMarketplaceStore((state) => state.reviews);
  const addReview = useMarketplaceStore((state) => state.addReview);
  const currentUser = useMarketplaceStore((state) => state.currentUser);
  const [ratings, setRatings] = useState<Record<string, number>>({});
  const [comments, setComments] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState<string[]>([]);
  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <article key={order.id} className="rounded-[24px] border border-[var(--color-border)] bg-[#F9F7F3] p-5">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div><div className="text-xs uppercase tracking-[0.14em] text-[var(--color-primary)]">{order.id}</div><h2 className="mt-2 font-display text-2xl font-bold">{order.item}</h2><p className="mt-1 text-sm text-[var(--color-text)]/65">{order.artisan}</p></div>
            <div className="text-right"><div className="text-xl font-bold">₹{order.total.toLocaleString("en-IN")}</div><div className="mt-2 rounded-full bg-[rgba(168,93,66,0.12)] px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-primary)]">{order.status}</div></div>
          </div>
          {order.status === "Delivered" && !submitted.includes(order.id) && !reviews.some((review) => review.artisan === order.artisan && review.customer === (currentUser?.name ?? "Aisha Mehra")) && (
            <div className="mt-5 border-t border-[var(--color-border)] pt-4">
              <label className="block text-sm font-medium">Rate this purchase
                <select value={ratings[order.id] ?? 0} onChange={(event) => setRatings({ ...ratings, [order.id]: Number(event.target.value) })} className="ml-3 rounded-xl border border-[var(--color-border)] bg-white px-3 py-2">
                  <option value={0}>Choose rating</option>{[5, 4, 3, 2, 1].map((rating) => <option key={rating} value={rating}>{rating} stars</option>)}
                </select>
              </label>
              <textarea value={comments[order.id] ?? ""} onChange={(event) => setComments({ ...comments, [order.id]: event.target.value })} rows={2} placeholder="Share your experience (at least 8 characters)" className="mt-3 w-full rounded-xl border border-[var(--color-border)] bg-white px-3 py-2.5 text-sm" />
              <button type="button" disabled={!ratings[order.id] || (comments[order.id] ?? "").trim().length < 8} onClick={() => {
                addReview({ customer: currentUser?.name ?? "Aisha Mehra", artisan: order.artisan, rating: ratings[order.id], comment: (comments[order.id] ?? "").trim() });
                setSubmitted([...submitted, order.id]);
              }} className="btn-primary mt-3 disabled:cursor-not-allowed disabled:opacity-50">Submit review</button>
            </div>
          )}
          {submitted.includes(order.id) && <p role="status" className="mt-4 text-sm text-[var(--color-secondary)]">Thanks—your review was saved.</p>}
        </article>
      ))}
    </div>
  );
}

export function WishlistPanel() {
  const wishlist = useMarketplaceStore((state) => state.wishlist);
  const toggleWishlist = useMarketplaceStore((state) => state.toggleWishlist);
  const saved = products.filter((product) => wishlist.includes(product.id));

  if (!saved.length) {
    return <div className="rounded-[24px] border border-[var(--color-border)] bg-[#F9F7F3] p-8 text-center"><p>Your wishlist is empty.</p><Link href="/products" className="btn-primary mt-4">Discover products</Link></div>;
  }

  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {saved.map((product) => (
        <article key={product.id} className="rounded-[24px] border border-[var(--color-border)] bg-[#F9F7F3] p-4">
          <Link href={`/products/${product.id}`}><img src={product.image} alt={product.title} className="h-48 w-full rounded-[20px] object-cover" /></Link>
          <h2 className="mt-4 font-display text-2xl font-bold">{product.title}</h2>
          <div className="mt-2 text-sm text-[var(--color-text)]/65">₹{product.price.toLocaleString("en-IN")}</div>
          <button type="button" onClick={() => toggleWishlist(product.id)} className="btn-secondary mt-4">Remove from wishlist</button>
        </article>
      ))}
    </div>
  );
}

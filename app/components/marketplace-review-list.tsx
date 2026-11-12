"use client";

import { useMarketplaceStore } from "@/app/stores/useMarketplaceStore";

export function MarketplaceReviewList() {
  const reviews = useMarketplaceStore((state) => state.reviews);
  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <article key={review.id} className="rounded-[24px] border border-[var(--color-border)] bg-[#F9F7F3] p-5">
          <div className="flex items-center justify-between gap-3"><h2 className="font-display text-2xl font-bold">{review.customer}</h2><span className="text-[var(--color-accent)]" aria-label={`${review.rating} out of 5 stars`}>{"★".repeat(review.rating)}</span></div>
          <p className="mt-1 text-xs text-[var(--color-text)]/60">About {review.artisan}</p>
          <p className="mt-3 text-sm leading-6 text-[var(--color-text)]/70">{review.comment}</p>
        </article>
      ))}
    </div>
  );
}

"use client";

import Link from "next/link";
import { Heart, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { useMarketplaceStore } from "@/app/stores/useMarketplaceStore";

export function ProductActions({ productId }: { productId: string }) {
  const addToCart = useMarketplaceStore((state) => state.addToCart);
  const toggleWishlist = useMarketplaceStore((state) => state.toggleWishlist);
  const isWishlisted = useMarketplaceStore((state) => state.wishlist.includes(productId));
  const [added, setAdded] = useState(false);

  return (
    <div>
      <div className="mt-8 flex flex-wrap gap-4">
        <button type="button" onClick={() => { addToCart(productId); setAdded(true); }} className="btn-primary">
          <ShoppingBag size={17} /> {added ? "Added to cart" : "Add to cart"}
        </button>
        <button type="button" onClick={() => toggleWishlist(productId)} className="btn-secondary">
          <Heart size={17} fill={isWishlisted ? "currentColor" : "none"} /> {isWishlisted ? "Saved" : "Add to wishlist"}
        </button>
      </div>
      {added && <p role="status" className="mt-3 text-sm text-[var(--color-secondary)]">Item added. <Link href="/customer/cart" className="font-semibold underline">View cart</Link></p>}
    </div>
  );
}

"use client";

import { useEffect } from "react";
import { useMarketplaceStore } from "@/app/stores/useMarketplaceStore";

export function MarketplaceHydration() {
  useEffect(() => {
    void useMarketplaceStore.persist.rehydrate();
  }, []);

  return null;
}

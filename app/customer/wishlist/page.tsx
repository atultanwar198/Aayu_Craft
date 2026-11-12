import { DashboardShell } from "@/app/components/dashboard-shell";
import { WishlistPanel } from "@/app/components/customer-commerce";
import { dashboardNav } from "@/app/data/mockData";

export default function CustomerWishlistPage() {
  return (
    <DashboardShell title="Wishlist" subtitle="Save your favorite handmade treasures." nav={dashboardNav.customer}>
      <WishlistPanel />
    </DashboardShell>
  );
}

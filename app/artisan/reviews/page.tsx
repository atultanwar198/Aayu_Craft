import { DashboardShell } from "@/app/components/dashboard-shell";
import { MarketplaceReviewList } from "@/app/components/marketplace-review-list";
import { dashboardNav } from "@/app/data/mockData";

export default function ArtisanReviewsPage() {
  return (
    <DashboardShell title="Reviews" subtitle="Customer feedback and overall satisfaction." nav={dashboardNav.artisan}>
      <MarketplaceReviewList />
    </DashboardShell>
  );
}

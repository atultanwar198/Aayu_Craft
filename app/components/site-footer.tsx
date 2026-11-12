import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--color-border)] bg-[#F3EDE2]">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 lg:grid-cols-4 lg:px-8">
        <div>
          <div className="font-[family-name:var(--font-playfair)] text-3xl font-bold text-[var(--color-text)]">
            AayuCraft
          </div>
          <p className="mt-4 max-w-xs text-sm text-[var(--color-text)]/80">
            Where creativity meets craftsmanship, connecting exceptional makers
            with people who value handmade stories.
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-[var(--color-text)]">
            Quick Links
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-[var(--color-text)]/80">
            <li>
              <Link href="/explore-artisans">Explore artisans</Link>
            </li>
            <li>
              <Link href="/products">Products</Link>
            </li>
            <li>
              <Link href="/categories">Categories</Link>
            </li>
            <li>
              <Link href="/about">About us</Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-[var(--color-text)]">Support</h3>
          <ul className="mt-4 space-y-2 text-sm text-[var(--color-text)]/80">
            <li>
              <Link href="/contact">Contact</Link>
            </li>
            <li>
              <Link href="/login">Login</Link>
            </li>
            <li>
              <Link href="/register">Register</Link>
            </li>
            <li>
              <Link href="/customer/dashboard">Customer dashboard</Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-[var(--color-text)]">Contact</h3>
          <ul className="mt-4 space-y-2 text-sm text-[var(--color-text)]/80">
            <li>hello@aayucraft.com</li>
            <li>+91 98138 64477</li>
            <li>Dharuhera, Haryana</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-[var(--color-border)] px-6 py-4 text-center text-sm text-[var(--color-text)]/70 lg:px-8">
        © 2026 AayuCraft. All rights reserved.
      </div>
    </footer>
  );
}

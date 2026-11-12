"use client";

import Link from "next/link";
import { Menu, ShoppingBag, Sparkles, X } from "lucide-react";
import { useState } from "react";
import { useMarketplaceStore } from "@/app/stores/useMarketplaceStore";

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const cartCount = useMarketplaceStore((state) => Object.values(state.cart).reduce((sum, quantity) => sum + quantity, 0));
  const links = [
    { href: "/", label: "Home" },
    { href: "/explore-artisans", label: "Explore Artisans" },
    { href: "/categories", label: "Categories" },
    { href: "/products", label: "Products" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--color-border)] bg-[rgba(250,247,240,0.9)] backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-primary)] text-lg text-white shadow-sm">
            <Sparkles size={18} />
          </div>
          <div>
            <div className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-[var(--color-text)]">AayuCraft</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium text-[var(--color-text)] md:flex">
          {links.map((link) => <Link key={link.href} href={link.href} className="transition hover:text-[var(--color-primary)]">{link.label}</Link>)}
        </nav>

        <div className="flex items-center gap-3">
          <Link href="/customer/cart" className="relative rounded-full border border-[var(--color-border)] bg-white p-2" aria-label={`Cart, ${cartCount} items`}>
            <ShoppingBag size={18} />
            {cartCount > 0 && <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[var(--color-primary)] px-1 text-[10px] font-bold text-white">{cartCount}</span>}
          </Link>
          <button onClick={() => setMenuOpen(!menuOpen)} className="inline-flex rounded-full border border-[var(--color-border)] bg-white p-2 md:hidden" aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen}>
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
          <Link href="/login" className="btn-secondary hidden sm:inline-flex">Login</Link>
          <Link href="/register" className="btn-primary hidden sm:inline-flex">Register</Link>
        </div>
      </div>
      {menuOpen && <nav className="border-t border-[var(--color-border)] bg-[var(--color-background)] px-6 py-3 md:hidden">{links.map((link) => <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)} className="block rounded-xl px-3 py-2 text-sm font-medium hover:bg-white">{link.label}</Link>)}<div className="mt-2 flex gap-2"><Link href="/login" onClick={() => setMenuOpen(false)} className="btn-secondary">Login</Link><Link href="/register" onClick={() => setMenuOpen(false)} className="btn-primary">Register</Link></div></nav>}
    </header>
  );
}

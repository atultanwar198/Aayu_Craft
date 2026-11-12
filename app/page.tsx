import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  HeartHandshake,
  Palette,
  Sparkles,
} from "lucide-react";
import { SiteHeader } from "@/app/components/site-header";
import { SiteFooter } from "@/app/components/site-footer";
import { artisans, categories, products } from "@/app/data/mockData";

export default function HomePage() {
  return (
    <div className="bg-[var(--color-background)] text-[var(--color-text)]">
      <SiteHeader />

      <main>
        {/* Hero Section */}

        <section className="section-shell grid items-center gap-10 pb-20 pt-14 lg:grid-cols-[1.1fr_0.9fr] lg:pt-20">
          <div>
            <span className="eyebrow">Curated handmade stories</span>
            <h1 className="mt-5 max-w-xl font-display text-5xl font-bold leading-[1.05] tracking-tight text-[var(--color-text)] md:text-6xl">
              Good things are made by hand.
            </h1>
            <p className="mt-5 max-w-lg text-lg leading-8 text-[var(--color-text)]/75">
              Explore unique handmade creations from talented independent
              artisans and bring home pieces designed with craftsmanship,
              culture, and care.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/explore-artisans" className="btn-primary">
                Explore Artisans <ArrowRight size={18} />
              </Link>
              <Link href="/register" className="btn-secondary">
                Become an Artisan
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="card-surface overflow-hidden p-3">
              <img
                src="/images/Owner.png"
                alt="Handmade artisan textiles"
                className="h-[560px] w-full rounded-[24px] object-cover"
              />
            </div>
            <div className="absolute -bottom-5 left-4 rounded-[20px] border border-[var(--color-border)] bg-white p-4 shadow-xl">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-[#F7EEDC] p-2 text-[var(--color-primary)]">
                  <Palette size={18} />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-[0.15em] text-[var(--color-text)]/60">
                    Featured maker
                  </div>
                  <div className="font-semibold">Atul Tanwar</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Section */}

        <section className="section-shell pb-20">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <p className="eyebrow">Shop by craft</p>
              <h2 className="section-title mt-3">Explore the artistry</h2>
            </div>
            <Link
              href="/categories"
              className="text-sm font-semibold text-[var(--color-primary)]"
            >
              View all categories
            </Link>
          </div>

          {/* Categories Cards */}

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {categories.map((category) => (
              <div
                key={category.id}
                className="group relative min-h-[320px] overflow-hidden rounded-2xl bg-cover bg-center p-6 transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                style={{
                  backgroundImage: `url(${category.image})`,
                }}
              >
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black/50 transition group-hover:bg-black/60" />

                {/* Content */}
                <div className="relative z-10 flex h-full flex-col">
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-2xl"
                    style={{
                      background: `${category.accent}33`,
                      color: category.accent,
                    }}
                  >
                    <category.icon size={24} strokeWidth={1.8} />
                  </div>
                  <div className="mt-auto">
                    <h3 className="text-2xl font-display font-bold text-white">
                      {category.name}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-white/80">
                      {category.description}
                    </p>

                    <Link
                      href="/categories"
                      className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-white"
                    >
                      Explore <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Artisans */}
        <section className="bg-[#F3EDE2] py-20">
          <div className="section-shell">
            <div className="mb-8 flex items-end justify-between gap-4">
              <div>
                <p className="eyebrow">Meet the makers</p>
                <h2 className="section-title mt-3">Featured artisans</h2>
              </div>
              <Link
                href="/explore-artisans"
                className="text-sm font-semibold text-[var(--color-primary)]"
              >
                See all artisans
              </Link>
            </div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {artisans.map((artisan) => (
                <Link
                  key={artisan.id}
                  href={`/artisans/${artisan.id}`}
                  className="card-surface overflow-hidden transition hover:-translate-y-1 hover:shadow-xl"
                >
                  <img
                    src={artisan.profileImage}
                    alt={artisan.name}
                    className="h-72 w-full object-cover"
                  />
                  <div className="p-5">
                    <div className="flex items-center justify-between gap-2">
                      <div>
                        <h3 className="text-xl font-display font-bold text-[var(--color-text)]">
                          {artisan.name}
                        </h3>
                        <p className="text-sm text-[var(--color-text)]/65">
                          {artisan.specialty}
                        </p>
                      </div>
                    </div>
                    <p className="mt-3 text-sm text-[var(--color-text)]/70">
                      {artisan.location}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Trending Products */}
        <section className="section-shell py-20">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <p className="eyebrow">Best sellers</p>
              <h2 className="section-title mt-3">Trending handmade products</h2>
            </div>
            <Link
              href="/products"
              className="text-sm font-semibold text-[var(--color-primary)]"
            >
              Browse full collection
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {products.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.id}`}
                className="card-surface overflow-hidden transition hover:-translate-y-1 hover:shadow-xl"
              >
                <img
                  src={product.image}
                  alt={product.title}
                  className="h-72 w-full object-cover"
                />
                <div className="p-5">
                  <div className="flex items-center justify-between text-xs uppercase tracking-[0.15em] text-[var(--color-text)]/60">
                    <span>{product.category}</span>
                    <span>By {product.artisan}</span>
                  </div>
                  <h3 className="mt-3 text-xl font-display font-bold">
                    {product.title}
                  </h3>
                  <div className="mt-4 flex items-center gap-2">
                    <span className="text-xl font-bold text-[var(--color-text)]">
                      ₹{product.price.toLocaleString("en-IN")}
                    </span>
                    <span className="text-sm text-[var(--color-text)]/50 line-through">
                      ₹{product.originalPrice.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Custom Craft */}
        <section className="bg-[#F9F4EC] py-20">
          <div className="section-shell grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="card-surface overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80"
                alt="Customer custom request"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex flex-col justify-center">
              <p className="eyebrow">Custom craftsmanship</p>
              <h2 className="section-title mt-3">
                Dream It. Request It. We&apos;ll Help Make It.
              </h2>
              <p className="mt-5 max-w-xl text-lg leading-8 text-[var(--color-text)]/75">
                Share your idea, material preferences, dimensions, and
                inspiration. Our team helps match you with the perfect artisan
                for your one-of-a-kind creation.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="/register" className="btn-primary">
                  Request a custom piece
                </Link>
                <Link
                  href="/customer/custom-requests"
                  className="btn-secondary"
                >
                  Explore process
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* How Work */}
        <section className="section-shell py-20">
          <div className="mb-8 text-center">
            <p className="eyebrow">How it works</p>
            <h2 className="section-title mt-3">
              A seamless handmade buying journey
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Discover",
                text: "Browse artisan profiles, categories, and curated handmade collections.",
                icon: <Sparkles size={20} />,
              },
              {
                title: "Connect",
                text: "Shortlist makers, ask questions, and submit custom requests with clarity.",
                icon: <HeartHandshake size={20} />,
              },
              {
                title: "Receive",
                text: "Approve quotations, track progress, and enjoy a quality handcrafted piece.",
                icon: <BadgeCheck size={20} />,
              },
            ].map((step, index) => (
              <div key={step.title} className="card-surface p-6 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#F7EEDC] text-[var(--color-primary)]">
                  {step.icon}
                </div>
                <div className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-primary)]">
                  0{index + 1}
                </div>
                <h3 className="mt-3 text-2xl font-display font-bold">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-[var(--color-text)]/70">
                  {step.text}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="section-shell pb-20">
          <div className="card-surface flex flex-col items-center justify-between gap-6 bg-[linear-gradient(135deg,#F7EEDC,#F1EBE2)] px-8 py-10 text-center lg:flex-row lg:text-left">
            <div>
              <p className="eyebrow">Become an artisan</p>
              <h2 className="mt-3 font-display text-4xl font-bold text-[var(--color-text)]">
                Share your craft with the world.
              </h2>
            </div>
            <Link href="/register" className="btn-primary">
              Join AayuCraft
            </Link>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

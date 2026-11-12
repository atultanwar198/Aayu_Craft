import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SiteHeader } from "@/app/components/site-header";
import { SiteFooter } from "@/app/components/site-footer";
import { categories } from "@/app/data/mockData";

export default function CategoriesPage() {
  return (
    <div className="bg-[var(--color-background)] text-[var(--color-text)]">
      <SiteHeader />
      <main className="section-shell py-14">
        <p className="eyebrow">Handpicked categories</p>
        <h1 className="section-title mt-3">Browse by craft</h1>
        <div className="grid gap-5 mt-4 md:grid-cols-2 xl:grid-cols-3">
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
      </main>
      <SiteFooter />
    </div>
  );
}

"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight, MapPin, Search } from "lucide-react";
import { SiteHeader } from "@/app/components/site-header";
import { SiteFooter } from "@/app/components/site-footer";
import { artisans, categories } from "@/app/data/mockData";

export default function ExploreArtisansPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, setSearch] = useState("");
  const filteredArtisans = useMemo(
    () =>
      artisans.filter((artisan) => {
        const categoryMatches =
          selectedCategory === "All" ||
          artisan.specialty
            .toLowerCase()
            .includes(selectedCategory.toLowerCase());
        const queryMatches =
          `${artisan.name} ${artisan.location} ${artisan.specialty}`
            .toLowerCase()
            .includes(search.toLowerCase());
        return categoryMatches && queryMatches;
      }),
    [search, selectedCategory],
  );

  return (
    <div className="bg-[var(--color-background)] text-[var(--color-text)]">
      <SiteHeader />
      <main className="section-shell py-14">
        <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow">Artisan community</p>
            <h1 className="section-title mt-3">Explore artisans</h1>
          </div>
          <label className="relative block w-full max-w-md">
            <span className="sr-only">
              Search artisans by name, location or craft
            </span>
            <Search
              size={18}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-text)]/50"
            />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search artisan, city, or craft"
              className="w-full rounded-full border border-[var(--color-border)] bg-white py-3 pl-11 pr-4 text-sm outline-none"
            />
          </label>
        </div>
        <div className="mb-8 flex flex-wrap gap-2">
          {["All", ...categories.map((category) => category.name)].map(
            (category) => (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                className={`rounded-full px-4 py-2 text-sm font-medium ${selectedCategory === category ? "bg-[var(--color-primary)] text-white" : "border border-[var(--color-border)] bg-white"}`}
              >
                {category}
              </button>
            ),
          )}
        </div>
        {filteredArtisans.length ? (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredArtisans.map((artisan) => (
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
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h2 className="font-display text-2xl font-bold">
                        {artisan.name}
                      </h2>
                      <p className="text-sm text-[var(--color-text)]/65">
                        {artisan.specialty}
                      </p>
                    </div>
                  </div>
                  <p className="mt-3 flex items-center gap-2 text-sm text-[var(--color-text)]/65">
                    <MapPin size={14} />
                    {artisan.location}
                  </p>
                  <p className="mt-3 line-clamp-2 text-sm leading-6 text-[var(--color-text)]/70">
                    {artisan.bio}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-primary)]">
                    View profile <ArrowRight size={15} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="rounded-2xl border border-[var(--color-border)] bg-white p-6 text-sm">
            No artisans match these filters. Try another craft or search term.
          </p>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}

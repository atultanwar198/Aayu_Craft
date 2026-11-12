import Link from "next/link";
import { ArrowLeft, MapPin, Star } from "lucide-react";
import { SiteHeader } from "@/app/components/site-header";
import { SiteFooter } from "@/app/components/site-footer";
import { artisans } from "@/app/data/mockData";

export function generateStaticParams() {
  return artisans.map((artisan) => ({ id: artisan.id }));
}

export default function ArtisanDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const artisan = artisans.find((item) => item.id === id) ?? artisans[0];

  return (
    <div className="bg-[var(--color-background)] text-[var(--color-text)]">
      <SiteHeader />
      <main className="section-shell py-14">
        <Link
          href="/explore-artisans"
          className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-primary)]"
        >
          <ArrowLeft size={16} /> Back to artisans
        </Link>

        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="card-surface overflow-hidden">
            <img
              src={artisan.profileImage}
              alt={artisan.name}
              className="h-[620px] w-full object-cover"
            />
          </div>
          <div>
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="eyebrow">Featured artisan</p>
                <h1 className="mt-3 font-display text-5xl font-bold">
                  {artisan.name}
                </h1>
              </div>
              <div className="flex items-center gap-1 rounded-full bg-[#F7EFD8] px-3 py-2 text-sm font-medium text-[var(--color-primary)]">
                <Star size={14} fill="currentColor" /> {artisan.rating}
              </div>
            </div>
            <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-[var(--color-text)]/70">
              <span className="flex items-center gap-2">
                <MapPin size={15} /> {artisan.location}
              </span>
              <span>{artisan.specialty}</span>
              <span>{artisan.experience} experience</span>
            </div>
            <p className="mt-6 text-lg leading-8 text-[var(--color-text)]/75">
              {artisan.bio}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {artisan.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-[var(--color-border)] bg-white px-3 py-2 text-sm font-medium text-[var(--color-text)]/70"
                >
                  {skill}
                </span>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <button type="button" className="btn-primary">
                Send inquiry
              </button>
              <button type="button" className="btn-secondary">
                Message artisan
              </button>
            </div>

            <div className="mt-12">
              <h2 className="font-display text-3xl font-bold">Portfolio</h2>
              <div className="mt-5 grid gap-4 md:grid-cols-3">
                {artisan.portfolio.map((image, index) => (
                  <img
                    key={`${image}-${index}`}
                    src={image}
                    alt={`${artisan.name} portfolio ${index + 1}`}
                    className="h-48 w-full rounded-[24px] object-cover"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

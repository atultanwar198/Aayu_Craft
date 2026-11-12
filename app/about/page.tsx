import Link from "next/link";
import { HeartHandshake, Leaf, Sparkles } from "lucide-react";
import { SiteHeader } from "@/app/components/site-header";
import { SiteFooter } from "@/app/components/site-footer";

export default function AboutPage() {
  return (
    <div className="bg-[var(--color-background)] text-[var(--color-text)]">
      <SiteHeader />
      <main>
        <section className="section-shell grid items-center gap-10 py-14 lg:grid-cols-2">
          <div>
            <p className="eyebrow">Our story</p>
            <h1 className="section-title mt-3">
              Crafted with culture, care, and community.
            </h1>
            <p className="mt-5 text-lg leading-8 text-[var(--color-text)]/75">
              AayuCraft connects independent makers with people who value the
              materials, meaning, and artistry behind handmade work. We make it
              easier to discover craft, meet its makers, and commission
              something personal.
            </p>
            <Link href="/explore-artisans" className="btn-primary mt-7">
              Meet our artisans
            </Link>
          </div>
          <div className="card-surface overflow-hidden p-3">
            <img
              src="/images/Owner.png"
              alt="Artisan working with handmade textiles"
              className="h-[480px] w-full rounded-[24px] object-cover"
            />
          </div>
        </section>
        <section className="section-shell grid gap-5 pb-16 md:grid-cols-3">
          {[
            {
              title: "Fair partnerships",
              text: "We help artisans tell their story and connect directly with customers.",
              icon: <HeartHandshake />,
            },
            {
              title: "Mindful making",
              text: "We celebrate thoughtful materials, considered production, and lasting pieces.",
              icon: <Leaf />,
            },
            {
              title: "Personal craft",
              text: "Custom requests bring individual ideas to life with the right skilled maker.",
              icon: <Sparkles />,
            },
          ].map((item) => (
            <article key={item.title} className="card-surface p-6">
              <div className="text-[var(--color-primary)]">{item.icon}</div>
              <h2 className="mt-4 font-display text-2xl font-bold">
                {item.title}
              </h2>
              <p className="mt-2 text-sm leading-6 text-[var(--color-text)]/70">
                {item.text}
              </p>
            </article>
          ))}
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

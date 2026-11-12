import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { SiteHeader } from "@/app/components/site-header";
import { SiteFooter } from "@/app/components/site-footer";
import { ContactForm } from "@/app/components/contact-form";

export default function ContactPage() {
  return (
    <div className="bg-[var(--color-background)] text-[var(--color-text)]">
      <SiteHeader />
      <main className="section-shell py-14">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="card-surface p-8">
            <p className="eyebrow">Contact us</p>
            <h1 className="section-title mt-3">
              We would love to hear from you.
            </h1>
            <div className="mt-8 space-y-5 text-sm text-[var(--color-text)]/75">
              <div className="flex items-center gap-3">
                <Mail size={18} className="text-[var(--color-primary)]" />{" "}
                hello@aayucraft.com
              </div>
              <div className="flex items-center gap-3">
                <Phone size={18} className="text-[var(--color-primary)]" /> +91
                98138 64477
              </div>
              <div className="flex items-center gap-3">
                <MapPin size={18} className="text-[var(--color-primary)]" />{" "}
                Dharuhera, Haryana
              </div>
            </div>
          </div>

          <div className="card-surface p-8">
            <ContactForm />
            <Link
              href="/"
              className="mt-4 inline-block text-sm font-semibold text-[var(--color-primary)]"
            >
              Back to home
            </Link>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

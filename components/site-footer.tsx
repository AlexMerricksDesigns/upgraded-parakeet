import Link from "next/link";

import { siteConfig } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-stone-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-10 text-sm text-stone-600 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-semibold text-stone-950">{siteConfig.name}</p>
          <p>{siteConfig.tagline}</p>
        </div>

        <div className="flex flex-wrap gap-4">
          <Link href="/work" className="hover:text-stone-950">
            Work
          </Link>
          <Link href="/shop" className="hover:text-stone-950">
            Shop
          </Link>
          <Link href="/journal" className="hover:text-stone-950">
            Journal
          </Link>
          <Link href="/contact" className="hover:text-stone-950">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}

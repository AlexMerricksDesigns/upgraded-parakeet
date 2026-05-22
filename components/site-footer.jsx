import Link from "next/link";

import { siteConfig } from "@/app/site";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div>
          <strong>{siteConfig.name}</strong>
          <p>{siteConfig.tagline}</p>
        </div>

        <div className="site-footer__links">
          <Link href="/work">Work</Link>
          <Link href="/shop">Shop</Link>
          <Link href="/journal">Journal</Link>
          <Link href="/contact">Contact</Link>
        </div>
      </div>
    </footer>
  );
}

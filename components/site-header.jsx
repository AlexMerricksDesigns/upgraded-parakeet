import Link from "next/link";

import { siteConfig } from "@/app/site";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link href="/" className="brand">
          {siteConfig.shortName}
        </Link>
        <nav aria-label="Main navigation">
          <ul className="nav">
            {siteConfig.navigation.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}

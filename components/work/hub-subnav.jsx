"use client";

import Link from "next/link";

/**
 * Horizontal subsection nav for category hub pages (anchor links).
 * @param {{ items: { id: string; title: string }[] }} props
 */
export function HubSubnav({ items }) {
  if (!items?.length) return null;

  return (
    <nav className="hub-subnav" aria-label="Section navigation">
      <ul className="hub-subnav__list">
        {items.map((item) => (
          <li key={item.id}>
            <Link href={`#${item.id}`} className="hub-subnav__pill">
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

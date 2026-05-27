"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
}

export function FeaturedGalleryStrip({ items = [], intervalMs = 6500 }) {
  const safeItems = useMemo(() => (Array.isArray(items) ? items : []), [items]);
  const canRotate = safeItems.length > 1;
  const [activeIndex, setActiveIndex] = useState(() =>
    safeItems.length ? Math.floor(Math.random() * safeItems.length) : 0
  );

  useEffect(() => {
    if (!canRotate) return;
    if (prefersReducedMotion()) return;

    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % safeItems.length);
    }, intervalMs);

    return () => window.clearInterval(interval);
  }, [canRotate, intervalMs, safeItems.length]);

  if (safeItems.length === 0) return null;

  return (
    <section className="card photography-featured-strip" aria-label="Featured photographs">
      <div className="photography-featured-strip__media" aria-hidden="true">
        {safeItems.map((item, idx) => (
          <Image
            key={item.slug ?? `${idx}`}
            src={item.image}
            alt=""
            fill
            sizes="(min-width: 900px) 70vw, 100vw"
            priority={idx === activeIndex}
            className={`photography-featured-strip__img${
              idx === activeIndex ? " is-active" : ""
            }`}
          />
        ))}
      </div>

      <div className="photography-featured-strip__body">
        <p className="eyebrow photography-featured-strip__eyebrow">Featured</p>
        <p className="photography-featured-strip__title">
          {safeItems[activeIndex]?.title ?? "Photograph"}
        </p>
      </div>
    </section>
  );
}


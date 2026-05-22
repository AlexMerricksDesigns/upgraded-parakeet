"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
}

function normalizeImages(images) {
  if (!images) return [];
  const list = Array.isArray(images) ? images : [images];
  return list.filter(Boolean);
}

function HeroBackground({ mediaType, images, activeIndex }) {
  const src = images[activeIndex] ?? images[0] ?? "";

  if (!src) return null;

  if (mediaType === "video") {
    return (
      <video
        className="hero__bg-img"
        autoPlay
        loop
        muted
        playsInline
        aria-hidden="true"
      >
        <source src={src} type="video/webm" />
      </video>
    );
  }

  return (
    <Image
      alt=""
      src={src}
      fill
      priority
      sizes="100vw"
      className="hero__bg-img"
    />
  );
}

function HeroAction({ action }) {
  const className = action.variant === "ghost" ? "btn btn-ghost" : "btn";

  if (action.href) {
    return (
      <Link href={action.href} className={className}>
        {action.label}
      </Link>
    );
  }

  return (
    <button type="button" className={className} onClick={action.onClick}>
      {action.label}
    </button>
  );
}

export function PageHero({
  eyebrow,
  title,
  description,
  images,
  mediaType = "image",
  actions = [],
  credit,
  heroRef,
  titleId = "page-hero-title",
}) {
  const safeImages = useMemo(() => normalizeImages(images), [images]);
  const canRotate =
    mediaType === "image" && safeImages.length > 1;
  const [activeIndex, setActiveIndex] = useState(() =>
    safeImages.length ? Math.floor(Math.random() * safeImages.length) : 0,
  );

  useEffect(() => {
    if (!canRotate) return;
    if (prefersReducedMotion()) return;

    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % safeImages.length);
    }, 6500);

    return () => window.clearInterval(interval);
  }, [canRotate, safeImages.length]);

  return (
    <section className="hero" ref={heroRef}>
      <div className="hero__bg">
        <HeroBackground
          mediaType={mediaType}
          images={safeImages}
          activeIndex={activeIndex}
        />
      </div>

      <div className="hero__inner">
        {eyebrow ? <p className="eyebrow hero__eyebrow">{eyebrow}</p> : null}
        <h1 id={titleId} className="hero__title">
          {title}
        </h1>
        {description ? <p className="hero__desc">{description}</p> : null}

        {actions.length > 0 ? (
          <div className="btn-row hero__actions">
            {actions.map((action) => (
              <HeroAction key={action.label} action={action} />
            ))}
          </div>
        ) : null}

        {credit ? <p className="hero__credit">{credit}</p> : null}
      </div>
    </section>
  );
}

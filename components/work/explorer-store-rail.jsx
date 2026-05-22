"use client";

import Image from "next/image";

import { LinkAffordance } from "@/components/link-affordance";
import { getLinkAriaLabel, resolveLinkKind } from "@/lib/link-kind";

const LINK_CONTEXT = "content";

function StoreProductCard({ product, className = "", ...anchorProps }) {
  const resolved = resolveLinkKind(product.href, { context: LINK_CONTEXT });
  const a11y = getLinkAriaLabel(product.name, resolved);

  return (
    <a
      href={product.href}
      className={`explorer-store-rail__card${className ? ` ${className}` : ""}`}
      target="_blank"
      rel="noreferrer"
      aria-label={a11y}
      {...anchorProps}
    >
      <div className="explorer-store-rail__media">
        {product.image ? (
          <Image src={product.image} alt="" fill sizes="200px" />
        ) : null}
      </div>
      <div className="explorer-store-rail__body">
        <LinkAffordance
          kind={resolved.kind}
          label={resolved.label}
          showBadge
          showExternalIcon={resolved.openInNewTab}
          badgePosition="card"
        />
        <p className="explorer-store-rail__name">{product.name}</p>
        <p className="card-link__summary">{product.summary}</p>
        {product.price ? (
          <p className="explorer-store-rail__price">{product.price}</p>
        ) : null}
      </div>
    </a>
  );
}

/**
 * Right sticky store rail on /work.
 *
 * @param {{
 *   products: object[];
 *   title: string;
 *   dualLayout?: boolean;
 *   activeIndex?: number;
 *   onSelectIndex?: (index: number) => void;
 *   carouselEnabled?: boolean;
 * }} props
 */
export function ExplorerStoreRail({
  products,
  title,
  dualLayout = false,
  activeIndex = 0,
  onSelectIndex,
  carouselEnabled = false,
}) {
  if (!products?.length) return null;

  const visibleProducts = dualLayout ? products.slice(0, 2) : products;
  const showDots = carouselEnabled && products.length > 1;

  return (
    <aside className="explorer-store-rail" aria-label="From the store">
      <div className="explorer-store-rail__sticky">
        <h2 className="explorer-store-rail__title">{title}</h2>
        <div
          className={`explorer-store-rail__stage${dualLayout ? " explorer-store-rail__stage--dual" : ""}`}
        >
          {dualLayout ? (
            visibleProducts.map((product) => (
              <StoreProductCard key={product.href} product={product} />
            ))
          ) : (
            visibleProducts.map((product, index) => {
              const isActive = index === activeIndex;
              return (
                <StoreProductCard
                  key={product.href}
                  product={product}
                  className={isActive ? "is-active" : ""}
                  aria-hidden={!isActive}
                  tabIndex={isActive ? 0 : -1}
                />
              );
            })
          )}
        </div>
        {showDots ? (
          <div
            className="explorer-store-rail__dots"
            role="tablist"
            aria-label="Store highlights"
          >
            {products.map((product, index) => (
              <button
                key={product.href}
                type="button"
                role="tab"
                aria-selected={index === activeIndex}
                aria-label={`Show ${product.name}`}
                className={`explorer-store-rail__dot${index === activeIndex ? " is-active" : ""}`}
                onClick={() => onSelectIndex?.(index)}
              />
            ))}
          </div>
        ) : null}
      </div>
    </aside>
  );
}

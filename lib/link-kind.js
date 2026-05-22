import { workCollectionSlugs } from "@/app/link-routes";
import { WORK_CATEGORIES } from "@/app/work/categories-data.js";

/** @typedef {'content' | 'shop' | 'nav' | 'default'} LinkContext */

/** @typedef {'external' | 'shop' | 'journal' | 'workProject' | 'workCollection' | 'workIndex' | 'site'} LinkKind */

const KIND_LABELS = {
  external: "External",
  shop: "Shop",
  journal: "Journal",
  workProject: "Project",
  workCollection: "Collection",
  workIndex: "Explorer",
  site: "",
};

function getCategoryTitle(categoryId) {
  return WORK_CATEGORIES.find((c) => c.id === categoryId)?.title ?? categoryId;
}

function workProjectLabel(categoryId) {
  return `Project · ${getCategoryTitle(categoryId)}`;
}

function workCollectionLabel(categoryId) {
  return `Collection · ${getCategoryTitle(categoryId)}`;
}

/**
 * @param {string} href
 * @param {{ kind?: LinkKind, context?: LinkContext }} [options]
 */
export function resolveLinkKind(href, options = {}) {
  const context = options.context ?? "default";
  const override = options.kind;

  if (!href) {
    return {
      kind: "site",
      label: "",
      external: false,
      openInNewTab: false,
    };
  }

  const isExternal =
    href.startsWith("http://") ||
    href.startsWith("https://") ||
    href.startsWith("mailto:");

  if (isExternal) {
    return {
      kind: "external",
      label: KIND_LABELS.external,
      external: true,
      openInNewTab: true,
    };
  }

  if (override) {
    return buildKind(override, context, href);
  }

  const path = href.split("?")[0].split("#")[0];

  if (path === "/shop" || path.startsWith("/shop/")) {
    return buildKind("shop", context, href);
  }

  if (path.startsWith("/journal/")) {
    return buildKind("journal", context, href);
  }

  if (path === "/journal") {
    return buildKind("journal", context, href);
  }

  if (path === "/work" || path === "/work/archive") {
    return buildKind("workIndex", context, href);
  }

  const nestedWork = path.match(/^\/work\/([^/]+)\/(projects|journal|products)\/([^/]+)$/);
  if (nestedWork) {
    const [, categoryId, segment] = nestedWork;
    if (segment === "journal") {
      return buildKind("journal", context, href);
    }
    if (segment === "products") {
      return buildKind("shop", context, href);
    }
    return buildKind("workProject", context, href, workProjectLabel(categoryId));
  }

  const workMatch = path.match(/^\/work\/([^/]+)$/);
  if (workMatch) {
    const categoryId = workMatch[1];
    if (workCollectionSlugs.includes(categoryId)) {
      return buildKind(
        "workCollection",
        context,
        href,
        workCollectionLabel(categoryId)
      );
    }
  }

  return buildKind("site", context, href);
}

/**
 * @param {LinkKind} kind
 * @param {LinkContext} context
 */
function buildKind(kind, context, href, labelOverride) {
  const external = false;
  let openInNewTab = false;

  if (kind === "shop" && context === "content") {
    openInNewTab = true;
  }

  return {
    kind,
    label: labelOverride ?? KIND_LABELS[kind] ?? "",
    external,
    openInNewTab,
    href,
  };
}

/**
 * @param {string} href
 * @param {{ kind?: LinkKind, context?: LinkContext, title?: string }} resolved
 */
export function getLinkAriaLabel(title, resolved) {
  const name = title?.trim() || resolved.label || "Link";
  if (resolved.openInNewTab) {
    if (resolved.kind === "shop") {
      return `${name} (Shop, opens in new tab)`;
    }
    if (resolved.kind === "external") {
      return `${name} (opens in new tab)`;
    }
    return `${name} (opens in new tab)`;
  }
  if (resolved.label && resolved.kind !== "site" && resolved.kind !== "workIndex") {
    return `${name} (${resolved.label})`;
  }
  return name;
}

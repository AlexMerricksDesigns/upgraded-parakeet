/**
 * Dynamic imports for per-page content modules.
 * Slugs must match categories-data / manifests.
 */

export async function loadWorkProject(slug) {
  try {
    const mod = await import(`@/content/work/projects/${slug}.js`);
    return mod.page ?? null;
  } catch {
    return null;
  }
}

export async function loadWorkProduct(slug) {
  try {
    const mod = await import(`@/content/work/products/${slug}.js`);
    return mod.page ?? null;
  } catch {
    return null;
  }
}

export async function loadJournalPost(slug) {
  try {
    const mod = await import(`@/content/journal/posts/${slug}.js`);
    return mod.page ?? null;
  } catch {
    return null;
  }
}

export async function loadCategoryHub(id) {
  try {
    const mod = await import(`@/content/work/categories/${id}.js`);
    return mod.page ?? null;
  } catch {
    return null;
  }
}

export async function loadCategorySubpage(categoryId, subpath) {
  try {
    const mod = await import(
      `@/content/work/categories/${categoryId}/${subpath}.js`
    );
    return mod.page ?? null;
  } catch {
    return null;
  }
}

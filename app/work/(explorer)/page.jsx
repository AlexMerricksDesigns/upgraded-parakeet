import shopManifest from "@/app/shop/manifest.json";
import { getExplorerChronicleItems } from "@/app/work/categories";
import { WORK_CATEGORIES } from "@/app/work/categories-data.js";
import { categoryPath } from "@/lib/work-paths";

import { WorkExplorerClient } from "./work-explorer-client";

function getAllStoreProducts() {
  return shopManifest
    .filter((p) => p.published !== false)
    .map((p) => ({
      ...p,
      image:
        p.image && p.image !== "[Placeholder image]" ? p.image : null,
    }));
}

function getExplorerCategories() {
  return WORK_CATEGORIES.map((cat) => ({
    id: cat.id,
    title: cat.title,
    href: categoryPath(cat.id),
  }));
}

/** /work — Work Explorer */
export default function WorkPage() {
  const chronicle = getExplorerChronicleItems();
  const storeProducts = getAllStoreProducts();
  const categories = getExplorerCategories();

  return (
    <WorkExplorerClient
      chronicle={chronicle}
      storeProducts={storeProducts}
      categories={categories}
    />
  );
}

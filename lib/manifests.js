import workManifest from "@/app/work/manifest.json";
import journalManifest from "@/app/journal/manifest.json";
import shopManifest from "@/app/shop/manifest.json";

export function getWorkProjects() {
  return workManifest.filter((item) => item.status === "published");
}

export function getJournalPosts() {
  return journalManifest.filter((item) => item.status === "published");
}

export function getShopProducts() {
  return shopManifest.filter((item) => item.published !== false);
}

export function getWorkBySlug(slug) {
  return workManifest.find((item) => item.slug === slug);
}

export function getJournalBySlug(slug) {
  return journalManifest.find((item) => item.slug === slug);
}

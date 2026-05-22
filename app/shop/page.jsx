import { getShopProducts } from "@/lib/manifests";

import { ShopPageClient } from "./shop-page-client";

export const metadata = {
  title: "Shop",
};

export default function ShopPage() {
  const products = getShopProducts();

  return <ShopPageClient products={products} />;
}

import { PageSection } from "@/components/page-section";
import { products } from "@/content/site";

export default function ShopPage() {
  return (
    <PageSection
      eyebrow="Shop"
      title="A first shelf for products, editions, and experiments."
      intro="Use this page to shape the offer before connecting checkout. Each product can start as a rough idea, then graduate into something ready to sell."
    >
      <div className="grid gap-6 md:grid-cols-3">
        {products.map((product) => (
          <article
            className="flex min-h-72 flex-col rounded-[2rem] border border-stone-200 bg-white p-6 shadow-sm"
            key={product.name}
          >
            <p className="text-sm uppercase tracking-[0.3em] text-stone-500">
              {product.status}
            </p>
            <h2 className="mt-5 text-2xl font-semibold text-stone-950">
              {product.name}
            </h2>
            <p className="mt-4 flex-1 text-stone-600">{product.description}</p>
            <div className="mt-8 flex items-center justify-between border-t border-stone-200 pt-5">
              <span className="font-medium text-stone-950">{product.price}</span>
              <span className="rounded-full bg-stone-100 px-3 py-1 text-sm text-stone-600">
                {product.status}
              </span>
            </div>
          </article>
        ))}
      </div>
    </PageSection>
  );
}

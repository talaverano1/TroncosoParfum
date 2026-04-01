import AnimatedSection from "@/app/components/ui/AnimatedSection";
import ProductCard from "@/app/components/ui/ProductCard";
import { products } from "@/app/data/products";

export default function Bestsellers() {
  const bestsellers = products.filter((p) => p.isBestseller);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <AnimatedSection className="text-center mb-14">
          <p className="text-gold text-sm uppercase tracking-[0.2em] mb-3">
            Los favoritos de nuestros clientes
          </p>
          <h2 className="font-[family-name:var(--font-heading)] text-3xl md:text-4xl font-bold text-black">
            Más vendidos
          </h2>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {bestsellers.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

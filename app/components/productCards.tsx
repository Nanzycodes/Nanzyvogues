// src/components/ProductCard.tsx
import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/app/types/product";

// "Props" describes what this component receives: one product
type Props = { product: Product };

export default function ProductCard ({ product }: Props) {
  return (
    <Link href={`/shop/${product.category}/${product.slug}`} className="group block">
      {/* "relative" + "aspect-square" gives a square box for the image to fill */}
      <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
        <Image
          src={product.image}
          alt={product.name} // describes the image for screen readers and Google
          fill // image fills the square box above
          // Tells the browser how wide the image is at each screen size,
          // so it downloads a small file on phones
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
          className="object-cover transition group-hover:scale-105"
        />
        {/* Show a "Sold out" badge only when inStock is false */}
        {!product.inStock && (
          <span className="absolute left-2 top-2 rounded bg-black px-2 py-1 text-xs text-white">
            Sold out
          </span>
        )}
      </div>

      <h2 className="mt-2 font-medium">{product.name}</h2>
      {/* toLocaleString() adds commas: 35000 becomes 35,000 */}
      <p className="text-sm text-gray-600">₦{product.price.toLocaleString()}</p>
    </Link>
  );
}
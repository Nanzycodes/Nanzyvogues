// prisma/seed.ts. buildiing our real product sets
import { prisma } from "@/app/lib/Prisma"; 


const products = [
  {
    slug: "classic-leather-slides",
    name: "Classic Leather Slides",
    category: "slides",
    price: 12000,
    description: "Soft leather slides for everyday wear.",
    image: "https://placehold.co/600x600/png?text=Slides",
    inStock: true,
  },
  {
    slug: "street-runner-sneakers",
    name: "Street Runner Sneakers",
    category: "sneakers",
    price: 35000,
    description: "Lightweight sneakers with a cushioned sole.",
    image: "https://placehold.co/600x600/png?text=Sneakers",
    inStock: true,
  },
  {
    slug: "ankara-print-shirt",
    name: "Ankara Print Shirt",
    category: "clothes",
    price: 18000,
    description: "Bold Ankara print, tailored fit.",
    image: "https://placehold.co/600x600/png?text=Shirt",
    inStock: true,
  },
  {
    slug: "slim-fit-chinos",
    name: "Slim Fit Chinos",
    category: "trousers",
    price: 22000,
    description: "Stretch cotton chinos that work for office and weekends.",
    image: "https://placehold.co/600x600/png?text=Chinos",
    inStock: false,
  },
  {
    slug: "cotton-joggers",
    name: "Cotton Joggers",
    category: "trousers",
    price: 15000,
    description: "Comfortable joggers with an elastic waist.",
    image: "https://placehold.co/600x600/png?text=Joggers",
    inStock: true,
  },
  {
    slug: "canvas-tote-bag",
    name: "Canvas Tote Bag",
    category: "general",
    price: 8000,
    description: "Strong canvas tote for daily use.",
    image: "https://placehold.co/600x600/png?text=Tote",
    inStock: true,
  },
] as const;

async function main() {
  for (const product of products) {
    await prisma.product.upsert({
      where: { slug: product.slug }, // look for a product with this slug
      update: {},                    // if it already exists, leave it alone
      create: product,               // if it doesn't exist, add it
    });
  }
  console.log(`Seeded ${products.length} products`);
}

main()
  .catch((error) => console.error(error))
  .finally(() => prisma.$disconnect()); // close the connection when finished
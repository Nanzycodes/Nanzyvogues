// script.ts  (temporary, we'll delete it afterwards)
import { prisma } from "@/app/lib/Prisma";

async function main() {
  // count() asks the database "how many products are in the table?"
  const count = await prisma.product.count();
  console.log("Products in database:", count);
}

main()
  .catch((error) => console.error(error))
  .finally(() => prisma.$disconnect()); 
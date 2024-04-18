import prisma from "@/lib/prismaClient";

export const fetchProducts = async () => {
  return await prisma.products.findMany();
}
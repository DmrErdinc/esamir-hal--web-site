import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { ProductForm } from "@/components/admin/ProductForm";

export const metadata: Metadata = { title: "Yeni Ürün" };

export default async function YeniUrunPage() {
  const categories = await prisma.category.findMany({
    where: { isActive: true },
    orderBy: [{ parentId: "asc" }, { order: "asc" }],
    select: { id: true, name: true, slug: true, parentId: true },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold font-sans text-gray-900">Yeni Ürün</h1>
      </div>
      <ProductForm categories={categories} />
    </div>
  );
}

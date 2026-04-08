import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { CategoryForm } from "@/components/admin/CategoryForm";

export const metadata: Metadata = { title: "Yeni Kategori" };

export default async function YeniKategoriPage() {
  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
    select: { id: true, name: true, parentId: true },
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold font-sans text-gray-900">Yeni Kategori</h1>
      <CategoryForm categories={categories} />
    </div>
  );
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { CategoryForm } from "@/components/admin/CategoryForm";

export const metadata: Metadata = { title: "Kategori Düzenle" };

interface Props { params: Promise<{ id: string }> }

export default async function KategoriEditPage({ params }: Props) {
  const { id } = await params;
  const [category, categories] = await Promise.all([
    prisma.category.findUnique({ where: { id } }),
    prisma.category.findMany({ orderBy: { name: "asc" }, select: { id: true, name: true, parentId: true } }),
  ]);

  if (!category) notFound();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/kategoriler" className="text-gray-400 hover:text-gray-600 transition-colors">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-2xl font-semibold font-sans text-gray-900">{category.name}</h1>
      </div>
      <CategoryForm categories={categories} category={category} />
    </div>
  );
}

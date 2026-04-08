import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { BlogCategoriesManager } from "@/components/admin/BlogCategoriesManager";

export const metadata: Metadata = { title: "Blog Kategorileri" };

export default async function BlogKategorilerPage() {
  const categories = await prisma.blogCategory.findMany({
    orderBy: { name: "asc" },
    include: { _count: { select: { posts: true } } },
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold font-sans text-gray-900">Blog Kategorileri</h1>
      <BlogCategoriesManager categories={categories} />
    </div>
  );
}

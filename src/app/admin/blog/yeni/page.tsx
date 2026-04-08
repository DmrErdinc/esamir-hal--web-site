import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { BlogPostForm } from "@/components/admin/BlogPostForm";

export const metadata: Metadata = { title: "Yeni Yazı" };

export default async function YeniBlogPage() {
  const categories = await prisma.blogCategory.findMany({ orderBy: { name: "asc" } });
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold font-sans text-gray-900">Yeni Blog Yazısı</h1>
      <BlogPostForm categories={categories} />
    </div>
  );
}

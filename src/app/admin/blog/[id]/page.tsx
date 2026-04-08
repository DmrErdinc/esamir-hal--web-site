import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { BlogPostForm } from "@/components/admin/BlogPostForm";

export const metadata: Metadata = { title: "Yazı Düzenle" };

interface Props { params: Promise<{ id: string }> }

export default async function BlogEditPage({ params }: Props) {
  const { id } = await params;
  const [post, categories] = await Promise.all([
    prisma.blogPost.findUnique({ where: { id } }),
    prisma.blogCategory.findMany({ orderBy: { name: "asc" } }),
  ]);

  if (!post) notFound();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/blog" className="text-gray-400 hover:text-gray-600 transition-colors">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-2xl font-semibold font-sans text-gray-900 truncate">{post.title}</h1>
      </div>
      <BlogPostForm categories={categories} post={post} />
    </div>
  );
}

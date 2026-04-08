import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, ArrowLeft, ArrowRight } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { formatDate, getImageUrl, absoluteUrl } from "@/lib/utils";
import { Breadcrumb } from "@/components/shared/Breadcrumb";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await prisma.blogPost.findUnique({
    where: { slug, isPublished: true },
  });
  if (!post) return { title: "Yazı Bulunamadı" };
  return {
    title: post.seoTitle || post.title,
    description: post.seoDesc || post.excerpt || undefined,
    openGraph: {
      title: post.seoTitle || post.title,
      description: post.seoDesc || post.excerpt || undefined,
      images: post.coverImage ? [absoluteUrl(post.coverImage)] : [],
      type: "article",
      publishedTime: post.publishedAt?.toISOString(),
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;

  const post = await prisma.blogPost.findUnique({
    where: { slug, isPublished: true },
    include: { category: true },
  });

  if (!post) notFound();

  const related = await prisma.blogPost.findMany({
    where: {
      isPublished: true,
      categoryId: post.categoryId,
      id: { not: post.id },
    },
    take: 3,
    orderBy: { publishedAt: "desc" },
    include: { category: true },
  });

  const breadcrumbs = [
    { label: "Ana Sayfa", href: "/" },
    { label: "Blog", href: "/blog" },
    ...(post.category ? [{ label: post.category.name, href: `/blog?kategori=${post.category.slug}` }] : []),
    { label: post.title },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative bg-brand-800 py-24 lg:py-32">
        {post.coverImage && (
          <Image
            src={getImageUrl(post.coverImage)}
            alt={post.title}
            fill
            className="object-cover opacity-20"
            sizes="100vw"
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-900/60 via-brand-800/40 to-transparent" />
        <div className="container-brand relative z-10 max-w-3xl">
          <Breadcrumb items={breadcrumbs} className="text-cream-400 mb-6" />
          {post.category && (
            <p className="text-overline text-gold-light mb-4">{post.category.name}</p>
          )}
          <h1 className="font-serif text-3xl md:text-5xl text-cream-50 font-light leading-tight mb-6">
            {post.title}
          </h1>
          <div className="flex items-center gap-4 text-sm font-sans text-cream-300">
            {post.authorName && <span>Yazar: {post.authorName}</span>}
            {post.publishedAt && (
              <span className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" />
                {formatDate(post.publishedAt)}
              </span>
            )}
            {post.readTime && (
              <span className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" />
                {post.readTime} dk okuma
              </span>
            )}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding bg-cream-50">
        <div className="container-brand">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Article */}
            <article className="lg:col-span-8">
              {post.excerpt && (
                <p className="font-serif text-xl text-brand-600 font-light italic leading-relaxed mb-8 pb-8 border-b border-cream-200">
                  {post.excerpt}
                </p>
              )}
              <div className="prose-brand max-w-none whitespace-pre-wrap">
                {post.content}
              </div>

              {/* Back */}
              <div className="mt-12 pt-8 border-t border-cream-200">
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 text-sm font-sans text-brand-600 hover:text-brand-800 transition-colors group"
                >
                  <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                  Tüm Yazılara Dön
                </Link>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="lg:col-span-4">
              <div className="sticky top-24 space-y-8">
                {/* Related */}
                {related.length > 0 && (
                  <div>
                    <h2 className="font-serif text-lg text-brand-800 font-light mb-5 pb-3 border-b border-cream-200">
                      İlgili Yazılar
                    </h2>
                    <div className="space-y-5">
                      {related.map((r) => (
                        <Link key={r.id} href={`/blog/${r.slug}`} className="group flex gap-3">
                          <div className="relative w-16 h-16 flex-shrink-0 bg-cream-200 overflow-hidden">
                            {r.coverImage && (
                              <Image
                                src={getImageUrl(r.coverImage)}
                                alt={r.title}
                                fill
                                sizes="64px"
                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                            )}
                          </div>
                          <div>
                            <p className="font-sans text-sm text-brand-700 group-hover:text-gold transition-colors line-clamp-2 leading-snug">
                              {r.title}
                            </p>
                            {r.publishedAt && (
                              <p className="text-xs text-brand-400 font-sans mt-1">
                                {formatDate(r.publishedAt)}
                              </p>
                            )}
                          </div>
                        </Link>
                      ))}
                    </div>
                    <Link
                      href="/blog"
                      className="inline-flex items-center gap-1 mt-5 text-xs font-sans text-gold hover:text-gold-dark transition-colors"
                    >
                      Tüm Yazılar <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                )}

                {/* CTA */}
                <div className="bg-brand-800 p-6 text-cream-50">
                  <h3 className="font-serif text-lg font-light mb-2">Koleksiyonu Keşfet</h3>
                  <p className="text-xs font-sans text-cream-300 leading-relaxed mb-4">
                    Premium İran halıları ve aksesuarlar.
                  </p>
                  <Link
                    href="/kategoriler"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-gold text-cream-50 text-xs font-sans rounded-sm hover:bg-gold-dark transition-colors"
                  >
                    Koleksiyon <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}

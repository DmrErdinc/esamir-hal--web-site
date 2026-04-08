import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { formatDate, getImageUrl } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Blog",
  description: "ESAMIR blog — İran halısı, iç mimarlık ve dekorasyon hakkında bilgiler.",
};

const PER_PAGE = 12;

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ sayfa?: string; kategori?: string }>;
}) {
  const sp = await searchParams;
  const page = Number(sp.sayfa) || 1;
  const skip = (page - 1) * PER_PAGE;

  const where = {
    isPublished: true,
    ...(sp.kategori ? { category: { slug: sp.kategori } } : {}),
  };

  const [posts, total, categories] = await Promise.all([
    prisma.blogPost.findMany({
      where,
      include: { category: true },
      orderBy: { publishedAt: "desc" },
      take: PER_PAGE,
      skip,
    }),
    prisma.blogPost.count({ where }),
    prisma.blogCategory.findMany({ orderBy: { name: "asc" } }),
  ]);

  const totalPages = Math.ceil(total / PER_PAGE);
  const featured = posts[0];
  const rest = posts.slice(1);

  return (
    <>
      <section className="bg-cream-100 py-20">
        <div className="container-brand text-center">
          <p className="text-overline mb-4">Bilgi & İlham</p>
          <h1 className="heading-display text-brand-800 mb-4">Blog</h1>
          <div className="gold-divider mb-6" />
          <p className="text-brand-500 font-sans max-w-lg mx-auto">
            İran halısı, iç mimarlık ve dekorasyon dünyasından yazılar, ipuçları ve ilham.
          </p>
        </div>
      </section>

      <section className="section-padding bg-cream-50">
        <div className="container-brand">
          {/* Category filter */}
          {categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-10">
              <Link
                href="/blog"
                className={`px-4 py-2 text-sm font-sans rounded-sm border transition-colors ${
                  !sp.kategori ? "bg-brand-700 text-cream-50 border-brand-700" : "border-cream-300 text-brand-600 hover:border-brand-700"
                }`}
              >
                Tümü
              </Link>
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/blog?kategori=${cat.slug}`}
                  className={`px-4 py-2 text-sm font-sans rounded-sm border transition-colors ${
                    sp.kategori === cat.slug ? "bg-brand-700 text-cream-50 border-brand-700" : "border-cream-300 text-brand-600 hover:border-brand-700"
                  }`}
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          )}

          {posts.length === 0 ? (
            <div className="text-center py-20">
              <p className="font-serif text-2xl text-brand-400 font-light">Henüz yazı yok.</p>
            </div>
          ) : (
            <>
              {/* Featured post */}
              {featured && page === 1 && !sp.kategori && (
                <article className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16 pb-16 border-b border-cream-200">
                  <Link href={`/blog/${featured.slug}`} className="group">
                    <div className="relative aspect-[16/10] bg-cream-200 overflow-hidden">
                      {featured.coverImage ? (
                        <Image
                          src={getImageUrl(featured.coverImage)}
                          alt={featured.title}
                          fill
                          sizes="50vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          priority
                        />
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-cream-200 to-brand-100" />
                      )}
                    </div>
                  </Link>
                  <div className="flex flex-col justify-center">
                    {featured.category && (
                      <p className="text-overline mb-3">{featured.category.name}</p>
                    )}
                    <Link href={`/blog/${featured.slug}`}>
                      <h2 className="font-serif text-3xl md:text-4xl text-brand-800 font-light leading-tight hover:text-gold transition-colors mb-4">
                        {featured.title}
                      </h2>
                    </Link>
                    {featured.excerpt && (
                      <p className="text-brand-500 font-sans leading-relaxed mb-6 line-clamp-3">
                        {featured.excerpt}
                      </p>
                    )}
                    <div className="flex items-center gap-4 text-xs font-sans text-brand-400 mb-6">
                      {featured.publishedAt && (
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {formatDate(featured.publishedAt)}
                        </span>
                      )}
                      {featured.readTime && (
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {featured.readTime} dk okuma
                        </span>
                      )}
                    </div>
                    <Link
                      href={`/blog/${featured.slug}`}
                      className="inline-flex items-center gap-2 text-sm font-sans font-medium text-brand-700 hover:text-brand-900 border-b border-brand-300 pb-1 hover:border-brand-700 transition-colors group w-fit"
                    >
                      Yazıyı Oku <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </article>
              )}

              {/* Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {(page === 1 && !sp.kategori ? rest : posts).map((post) => (
                  <article key={post.id} className="group">
                    <Link href={`/blog/${post.slug}`}>
                      <div className="relative aspect-[16/10] bg-cream-200 overflow-hidden mb-4">
                        {post.coverImage ? (
                          <Image
                            src={getImageUrl(post.coverImage)}
                            alt={post.title}
                            fill
                            sizes="33vw"
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        ) : (
                          <div className="absolute inset-0 bg-gradient-to-br from-cream-200 to-brand-100 flex items-center justify-center">
                            <span className="font-serif text-brand-300 text-sm">ESAMIR</span>
                          </div>
                        )}
                        {post.category && (
                          <span className="absolute top-3 left-3 px-2.5 py-1 bg-brand-800/80 text-cream-50 text-xs font-sans backdrop-blur-sm">
                            {post.category.name}
                          </span>
                        )}
                      </div>
                    </Link>
                    <div className="flex items-center gap-3 text-xs font-sans text-brand-400 mb-2">
                      {post.publishedAt && (
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {formatDate(post.publishedAt)}
                        </span>
                      )}
                      {post.readTime && (
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {post.readTime} dk
                        </span>
                      )}
                    </div>
                    <Link href={`/blog/${post.slug}`}>
                      <h3 className="font-serif text-xl text-brand-800 font-light hover:text-gold transition-colors line-clamp-2 mb-2">
                        {post.title}
                      </h3>
                    </Link>
                    {post.excerpt && (
                      <p className="text-sm font-sans text-brand-500 line-clamp-3">{post.excerpt}</p>
                    )}
                  </article>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-12">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                    <Link
                      key={p}
                      href={`/blog?sayfa=${p}${sp.kategori ? `&kategori=${sp.kategori}` : ""}`}
                      className={`w-9 h-9 flex items-center justify-center text-sm font-sans rounded-sm border transition-colors ${
                        p === page ? "bg-brand-700 text-cream-50 border-brand-700" : "border-cream-300 text-brand-600 hover:border-brand-700"
                      }`}
                    >
                      {p}
                    </Link>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
}

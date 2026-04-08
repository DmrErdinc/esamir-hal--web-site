import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { getImageUrl } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Kategoriler",
  description:
    "ESAMIR koleksiyonu — İpek halı, akrilik halı, kırlent, vazo ve biblo kategorileri.",
};

export default async function KategorilerPage() {
  const categories = await prisma.category.findMany({
    where: { isActive: true, parentId: null },
    include: {
      children: {
        where: { isActive: true },
        orderBy: { order: "asc" },
      },
      _count: { select: { products: true } },
    },
    orderBy: { order: "asc" },
  });

  // Flatten: show parent categories, with subcategory count
  const allVisible = categories;

  return (
    <>
      {/* Hero */}
      <section className="bg-cream-100 py-16 lg:py-24">
        <div className="container-brand text-center">
          <p className="text-overline mb-4">Koleksiyonumuz</p>
          <h1 className="heading-display text-brand-800 mb-4">Koleksiyonlar</h1>
          <div className="gold-divider mb-6" />
          <p className="text-brand-500 font-sans max-w-xl mx-auto leading-relaxed">
            El dokuması İran halılarından premium aksesuarlara uzanan koleksiyonumuzu keşfedin.
          </p>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="section-padding bg-cream-50">
        <div className="container-brand">
          {allVisible.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-brand-400 font-sans">Henüz kategori bulunmuyor.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {allVisible.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/kategoriler/${cat.slug}`}
                  className="group block bg-white overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300"
                >
                  {/* Image */}
                  <div className="relative aspect-[4/3] bg-cream-200 overflow-hidden">
                    {cat.coverImage ? (
                      <Image
                        src={getImageUrl(cat.coverImage)}
                        alt={cat.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : cat.bannerImage ? (
                      <Image
                        src={getImageUrl(cat.bannerImage)}
                        alt={cat.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-cream-300 via-cream-200 to-brand-100" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-900/50 via-transparent to-transparent" />

                    {/* Product count badge */}
                    <div className="absolute top-3 right-3">
                      <span className="bg-white/90 backdrop-blur-sm text-brand-700 text-xs font-sans font-medium px-2 py-1 rounded-sm">
                        {cat._count.products} ürün
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h2 className="font-serif text-xl text-brand-800 font-light mb-1 group-hover:text-gold transition-colors">
                      {cat.name}
                    </h2>
                    {cat.description ? (
                      <p className="text-sm font-sans text-brand-500 line-clamp-2 leading-relaxed">
                        {cat.description}
                      </p>
                    ) : null}

                    {/* Sub categories */}
                    {cat.children.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {cat.children.slice(0, 4).map((sub) => (
                          <span key={sub.id} className="text-xs font-sans text-brand-500 bg-cream-100 px-2 py-0.5 rounded-sm">
                            {sub.name}
                          </span>
                        ))}
                        {cat.children.length > 4 && (
                          <span className="text-xs font-sans text-brand-400 px-1">+{cat.children.length - 4}</span>
                        )}
                      </div>
                    )}

                    <div className="flex items-center gap-1.5 mt-4 text-xs font-sans text-gold font-medium">
                      Koleksiyonu Gör <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { getImageUrl, formatPrice } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { getSettings, DEFAULT_SETTINGS } from "@/lib/settings";
import { WhatsAppProductButton } from "@/components/shared/WhatsAppProductButton";

export const metadata: Metadata = {
  title: "Tüm Ürünler",
  description: "ESAMIR ürün koleksiyonu — İpek halı, akrilik halı ve premium aksesuarlar.",
};

interface SearchParams {
  kategori?: string;
  sayfa?: string;
}

const PER_PAGE = 24;

export default async function UrunlerPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const sp = await searchParams;
  const page = Number(sp.sayfa) || 1;
  const skip = (page - 1) * PER_PAGE;

  // Resolve category filter — include sub-categories of the matched parent
  let catIdFilter: { categoryId?: { in: string[] } } = {};
  if (sp.kategori) {
    const matchedCat = await prisma.category.findFirst({
      where: { slug: sp.kategori, isActive: true },
      include: { children: { where: { isActive: true }, select: { id: true } } },
    });
    if (matchedCat) {
      const ids = [matchedCat.id, ...matchedCat.children.map((c) => c.id)];
      catIdFilter = { categoryId: { in: ids } };
    }
  }

  const [products, total, categories, settings] = await Promise.all([
    prisma.product.findMany({
      where: { isActive: true, ...catIdFilter },
      include: {
        images: { where: { isCover: true }, take: 1 },
        category: { select: { name: true, slug: true } },
      },
      orderBy: [{ isFeatured: "desc" }, { createdAt: "desc" }],
      take: PER_PAGE,
      skip,
    }),
    prisma.product.count({ where: { isActive: true, ...catIdFilter } }),
    prisma.category.findMany({
      where: { isActive: true },
      orderBy: [{ parentId: "asc" }, { order: "asc" }],
      select: { id: true, name: true, slug: true, parentId: true },
    }),
    getSettings(),
  ]);

  const merged = { ...DEFAULT_SETTINGS, ...settings };
  const totalPages = Math.ceil(total / PER_PAGE);

  const parentCats = categories.filter((c) => !c.parentId);
  const childCats = categories.filter((c) => c.parentId);
  // Which parent is "active"? Either direct slug match or parent of selected child
  const selectedChild = childCats.find((c) => c.slug === sp.kategori);
  const activeParent = parentCats.find((c) =>
    c.slug === sp.kategori || (selectedChild && selectedChild.parentId === c.id)
  );
  // Show sibling sub-pills when a parent (or its child) is selected
  const activeSubs = activeParent
    ? childCats.filter((c) => c.parentId === activeParent.id)
    : [];

  return (
    <>
      {/* Hero */}
      <section className="bg-cream-100 py-10 md:py-14 lg:py-20">
        <div className="container-brand text-center px-4">
          <p className="text-overline mb-2 md:mb-3 tracking-[0.2em] md:tracking-[0.25em]">Ürünler</p>
          <h1 className="heading-display text-brand-800 mb-2 md:mb-3 text-2xl sm:text-3xl md:text-4xl lg:text-5xl">Tüm Ürünler</h1>
          <div className="gold-divider mb-3 md:mb-5" />
          <p className="text-brand-500 font-sans text-xs md:text-sm">{total} ürün</p>
        </div>
      </section>

      <section className="section-padding bg-cream-50">
        <div className="container-brand px-4">

          {/* Horizontal Category Filter */}
          <div className="mb-6 md:mb-8 lg:mb-10">
            {/* Parent categories */}
            <div className="flex flex-wrap gap-1.5 md:gap-2 mb-2 md:mb-3">
              <Link
                href="/urunler"
                className={`px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm font-sans rounded-sm border transition-colors ${
                  !sp.kategori
                    ? "bg-brand-700 text-cream-50 border-brand-700"
                    : "border-cream-300 text-brand-600 hover:border-brand-600 hover:text-brand-800 bg-white"
                }`}
              >
                Tümü
              </Link>
              {parentCats.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/urunler?kategori=${cat.slug}`}
                  className={`px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm font-sans rounded-sm border transition-colors ${
                    activeParent?.id === cat.id
                      ? "bg-brand-700 text-cream-50 border-brand-700"
                      : "border-cream-300 text-brand-600 hover:border-brand-600 hover:text-brand-800 bg-white"
                  }`}
                >
                  {cat.name}
                </Link>
              ))}
            </div>

            {/* Sub-category pills (shown when a parent is active and has children) */}
            {activeParent && activeSubs.length > 0 && (
              <div className="flex flex-wrap gap-1 md:gap-1.5 pl-1.5 md:pl-2 border-l-2 border-brand-200">
                <Link
                  href={`/urunler?kategori=${activeParent.slug}`}
                  className={`px-2 md:px-3 py-0.5 md:py-1 text-[10px] md:text-xs font-sans rounded-sm transition-colors ${
                    sp.kategori === activeParent.slug
                      ? "bg-brand-600 text-white"
                      : "text-brand-500 hover:text-brand-700 bg-cream-200"
                  }`}
                >
                  Tümü
                </Link>
                {activeSubs.map((sub) => (
                  <Link
                    key={sub.id}
                    href={`/urunler?kategori=${sub.slug}`}
                    className={`px-2 md:px-3 py-0.5 md:py-1 text-[10px] md:text-xs font-sans rounded-sm transition-colors ${
                      sp.kategori === sub.slug
                        ? "bg-brand-600 text-white"
                        : "text-brand-500 hover:text-brand-700 bg-cream-200"
                    }`}
                  >
                    {sub.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Product Grid */}
          {products.length === 0 ? (
            <div className="text-center py-16 md:py-24 px-4">
              <p className="font-serif text-xl md:text-2xl text-brand-300 font-light mb-2">
                Bu kategoride ürün bulunmuyor.
              </p>
              <Link href="/urunler" className="text-xs md:text-sm font-sans text-brand-500 hover:text-brand-700 underline">
                Tüm ürünleri gör
              </Link>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4 lg:gap-6">
                {products.map((product) => {
                  const img = product.images[0];
                  return (
                    <div key={product.id} className="card-product group">
                      <Link href={`/urunler/${product.slug}`}>
                        <div className="relative aspect-[3/4] bg-cream-100 overflow-hidden rounded-sm">
                          {img ? (
                            <Image
                              src={getImageUrl(img.url)}
                              alt={img.alt || product.name}
                              fill
                              sizes="(max-width: 640px) 50vw, (max-width: 1280px) 33vw, 25vw"
                              className="object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                          ) : (
                            <div className="absolute inset-0 bg-cream-200 flex items-center justify-center">
                              <span className="font-serif text-brand-300 text-xs tracking-widest">ESAMIR</span>
                            </div>
                          )}
                          <div className="absolute top-2 left-2 md:top-3 md:left-3 flex flex-col gap-1">
                            {product.isNew && <Badge variant="new" className="text-[10px] md:text-xs px-2 py-0.5">Yeni</Badge>}
                            {product.isFeatured && <Badge variant="featured" className="text-[10px] md:text-xs px-2 py-0.5">Öne Çıkan</Badge>}
                          </div>
                        </div>
                      </Link>
                      <div className="p-3 md:p-4">
                        {product.category && (
                          <p className="text-[10px] md:text-xs font-sans text-brand-400 uppercase tracking-wider mb-1">
                            {product.category.name}
                          </p>
                        )}
                        <Link href={`/urunler/${product.slug}`}>
                          <h3 className="font-serif text-sm md:text-base text-brand-800 font-light hover:text-gold transition-colors line-clamp-2">
                            {product.name}
                          </h3>
                        </Link>
                        {product.showPrice && product.price && (
                          <p className="text-base md:text-lg font-serif text-gold mt-2 font-semibold">
                            {formatPrice(Number(product.price))}
                          </p>
                        )}
                        <div className="mt-2 md:mt-3">
                          <WhatsAppProductButton
                            phone={merged.whatsapp || merged.phone || ""}
                            productName={product.name}
                            productSlug={product.slug}
                            size="sm"
                            fullWidth
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-1.5 md:gap-2 mt-10 md:mt-14">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                    <Link
                      key={p}
                      href={`/urunler?${sp.kategori ? `kategori=${sp.kategori}&` : ""}sayfa=${p}`}
                      className={`w-8 h-8 md:w-9 md:h-9 flex items-center justify-center text-xs md:text-sm font-sans rounded-sm border transition-colors ${
                        p === page
                          ? "bg-brand-700 text-cream-50 border-brand-700"
                          : "border-cream-300 text-brand-600 hover:border-brand-700 hover:text-brand-800"
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

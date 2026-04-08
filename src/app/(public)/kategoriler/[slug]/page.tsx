import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { getImageUrl } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { WhatsAppProductButton } from "@/components/shared/WhatsAppProductButton";
import { getSettings, DEFAULT_SETTINGS } from "@/lib/settings";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const cat = await prisma.category.findFirst({ where: { slug } });
  if (!cat) return { title: "Kategori Bulunamadı" };
  return {
    title: cat.seoTitle || cat.name,
    description: cat.seoDesc || cat.description || undefined,
    openGraph: {
      title: cat.seoTitle || cat.name,
      description: cat.seoDesc || cat.description || undefined,
      images: cat.coverImage ? [cat.coverImage] : [],
    },
  };
}

export default async function KategoriDetailPage({ params }: Props) {
  const { slug } = await params;

  const [cat, settings] = await Promise.all([
    prisma.category.findFirst({
      where: { slug, isActive: true },
      include: {
        parent: true,
        children: { where: { isActive: true }, orderBy: { order: "asc" } },
      },
    }),
    getSettings(),
  ]);

  if (!cat) notFound();

  const merged = { ...DEFAULT_SETTINGS, ...settings };

  // Include products from sub-categories too (when viewing a parent)
  const categoryIds = [cat.id, ...cat.children.map((c) => c.id)];

  const products = await prisma.product.findMany({
    where: { categoryId: { in: categoryIds }, isActive: true },
    include: {
      images: { where: { isCover: true }, take: 1 },
      category: { select: { name: true, slug: true } },
    },
    orderBy: [{ isFeatured: "desc" }, { createdAt: "desc" }],
  });

  const breadcrumbs = [
    { label: "Ana Sayfa", href: "/" },
    { label: "Kategoriler", href: "/kategoriler" },
    ...(cat.parent ? [{ label: cat.parent.name, href: `/kategoriler/${cat.parent.slug}` }] : []),
    { label: cat.name },
  ];

  return (
    <>
      {/* Banner */}
      <section className="relative bg-brand-800 py-20 lg:py-28 overflow-hidden">
        {cat.bannerImage && (
          <Image src={getImageUrl(cat.bannerImage)} alt={cat.name} fill className="object-cover opacity-30" sizes="100vw" />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-900/60 to-brand-800/30" />
        <div className="container-brand relative z-10">
          <Breadcrumb items={breadcrumbs} className="mb-6 text-cream-400" />
          <h1 className="font-serif text-4xl md:text-5xl text-cream-50 font-light leading-tight">
            {cat.name}
          </h1>
          {cat.description && (
            <p className="mt-3 text-cream-300 font-sans max-w-xl leading-relaxed">
              {cat.description}
            </p>
          )}
        </div>
      </section>

      {/* Sub categories */}
      {cat.children.length > 0 && (
        <section className="bg-cream-100 py-8 border-b border-cream-200">
          <div className="container-brand flex flex-wrap gap-3">
            <Link
              href={`/kategoriler/${cat.slug}`}
              className="px-4 py-2 bg-brand-700 text-cream-50 text-sm font-sans rounded-sm"
            >
              Tümü
            </Link>
            {cat.children.map((sub) => (
              <Link
                key={sub.id}
                href={`/kategoriler/${sub.slug}`}
                className="px-4 py-2 border border-brand-300 text-brand-600 text-sm font-sans rounded-sm hover:border-brand-700 hover:text-brand-800 transition-colors"
              >
                {sub.name}
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Products */}
      <section className="section-padding bg-cream-50">
        <div className="container-brand">
          <div className="flex items-center justify-between mb-8">
            <p className="text-sm font-sans text-brand-400">{products.length} ürün</p>
          </div>

          {products.length === 0 ? (
            <div className="text-center py-24">
              <p className="font-serif text-2xl text-brand-400 font-light mb-3">
                Bu kategoride henüz ürün bulunmuyor.
              </p>
              <Link href="/kategoriler" className="text-sm font-sans text-gold hover:text-gold-dark transition-colors">
                Tüm kategorilere dön
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
              {products.map((product) => {
                const img = product.images[0];
                return (
                  <div key={product.id} className="card-product group">
                    <Link href={`/urunler/${product.slug}`}>
                      <div className="relative aspect-[3/4] bg-cream-100 overflow-hidden">
                        {img ? (
                          <Image
                            src={getImageUrl(img.url)}
                            alt={img.alt || product.name}
                            fill
                            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        ) : (
                          <div className="absolute inset-0 bg-cream-200 flex items-center justify-center">
                            <span className="font-serif text-brand-300 text-xs">ESAMIR</span>
                          </div>
                        )}
                        <div className="absolute top-3 left-3 flex flex-col gap-1">
                          {product.isNew && <Badge variant="new">Yeni</Badge>}
                          {product.isFeatured && <Badge variant="featured">Öne Çıkan</Badge>}
                        </div>
                      </div>
                    </Link>
                    <div className="p-4">
                      <Link href={`/urunler/${product.slug}`}>
                        <h3 className="font-serif text-base text-brand-800 font-light leading-snug hover:text-gold transition-colors line-clamp-2">
                          {product.name}
                        </h3>
                      </Link>
                      {product.shortDesc && (
                        <p className="text-xs font-sans text-brand-400 mt-1 line-clamp-2">{product.shortDesc}</p>
                      )}
                      <div className="mt-3">
                        <WhatsAppProductButton
                          phone={merged.whatsapp || merged.phone || ""}
                          productName={product.name}
                          productSlug={product.slug}
                          size="sm"
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {cat.promoText && (
        <section className="section-padding-sm bg-cream-100">
          <div className="container-brand max-w-3xl mx-auto text-center">
            <p className="font-sans text-brand-600 leading-relaxed">{cat.promoText}</p>
          </div>
        </section>
      )}
    </>
  );
}

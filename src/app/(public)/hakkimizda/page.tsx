import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getSettings, DEFAULT_SETTINGS } from "@/lib/settings";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Hakkımızda",
  description:
    "ESAMIR hakkında bilgi edinin. İran halısı ve iç mimarlık konusundaki 20 yıllık deneyimimiz ve hikayemiz.",
};

export default async function HakkimizdaPage() {
  const settings = await getSettings();
  const merged = { ...DEFAULT_SETTINGS, ...settings };

  const heroOverline = merged.about_hero_overline || "Hikayemiz";
  const heroTitle = merged.about_hero_title || "Hakkımızda";
  const heroBg = merged.about_hero_bg || "/images/about-bg.jpg";

  const storyOverline = merged.about_story_overline || "ESAMIR";
  const storyTitle = merged.about_story_title || "Zarafeti Yaşam Alanlarına Taşıyoruz";
  const storyText1 = merged.about_story_text1 || "ESAMIR, İran'ın köklü halı dokuma geleneğine derin saygı duyarak kurulmuş, premium yaşam alanı çözümleri sunan bir markadır. 20 yılı aşkın deneyimimizle, her evin ve her mekanın ruhuna uygun özgün koleksiyonlar sunmaktayız.";
  const storyText2 = merged.about_story_text2 || "Adımız Farsça'da \"güvenli, huzurlu\" anlamına gelen ESAMIR, bu ismin özüne sadık kalarak müşterilerimize yalnızca ürün değil; güven, estetik ve kalıcı değer sunmayı hedefler.";
  const storyText3 = merged.about_story_text3 || "Her halı bir sanat eseridir; her aksesuar bir hikaye anlatır. Biz bu hikayeleri sizin evinizde yaşatmak için buradayız.";
  const storyImage = merged.about_story_image || "/images/about-story.jpg";

  const philosophyOverline = merged.about_philosophy_overline || "İç Mimarlık Felsefemiz";
  const philosophyTitle = merged.about_philosophy_title || "Mekan, Anlam Kazanır";
  const philosophyDesc = merged.about_philosophy_desc || "İç mimarlık yaklaşımımız, mekânın yalnızca fiziksel boyutunu değil, duygusal ve estetik katmanlarını da göz önünde bulundurur.";

  const philosophyItems = [
    {
      title: merged.about_philosophy_item1_title || "Kişiselleştirilmiş Tasarım",
      desc: merged.about_philosophy_item1_desc || "Her müşterimizin yaşam tarzı, beğeni ve ihtiyaçlarına özgü çözümler geliştiriyoruz.",
      num: merged.about_philosophy_item1_num || "01",
    },
    {
      title: merged.about_philosophy_item2_title || "Kalıcı Estetik",
      desc: merged.about_philosophy_item2_desc || "Moda değil; zamansız, kalıcı ve değer katan estetik seçimler yapıyoruz.",
      num: merged.about_philosophy_item2_num || "02",
    },
    {
      title: merged.about_philosophy_item3_title || "Kusursuz Harmoni",
      desc: merged.about_philosophy_item3_desc || "Halı, aksesuar ve mobilya arasındaki dengeyi titizlikle kurarak bütünlük yaratıyoruz.",
      num: merged.about_philosophy_item3_num || "03",
    },
  ];

  const heritageOverline = merged.about_heritage_overline || "İran Halısı Geleneği";
  const heritageTitle = merged.about_heritage_title || "Asırların Birikimiyle Dokunan Sanat";
  const heritageText1 = merged.about_heritage_text1 || "İran halısı, binlerce yıllık bir dokuma geleneğinin ve kültürel zenginliğin ürünüdür. Her halı; rengiyle, deseniyle ve malzeme kalitesiyle bir medeniyetin izlerini taşır.";
  const heritageText2 = merged.about_heritage_text2 || "Koleksiyonumuzdaki her parça, İran'ın farklı bölgelerindeki usta ellerden çıkmıştır. İpek, yün ve özel karışım ipliklerle dokunan bu halılar; hem dekoratif hem de uzun ömürlü yatırım değeri taşır.";
  const heritageImg1 = merged.about_heritage_img1 || "/images/carpet-1.jpg";
  const heritageImg2 = merged.about_heritage_img2 || "/images/carpet-2.jpg";

  const stats = [
    { number: merged.about_stat1_number || "500+", label: merged.about_stat1_label || "Tamamlanan Proje" },
    { number: merged.about_stat2_number || "20+", label: merged.about_stat2_label || "Yıllık Deneyim" },
    { number: merged.about_stat3_number || "1000+", label: merged.about_stat3_label || "Ürün Çeşidi" },
    { number: merged.about_stat4_number || "98%", label: merged.about_stat4_label || "Müşteri Memnuniyeti" },
  ];

  const ctaTitle = merged.about_cta_title || "Birlikte Yaratın";
  const ctaDesc = merged.about_cta_desc || "Projeniz için ücretsiz danışmanlık ve showroom ziyareti için iletişime geçin.";
  const ctaPrimaryLabel = merged.about_cta_primary_label || "İletişime Geçin";
  const ctaPrimaryHref = merged.about_cta_primary_href || "/iletisim";
  const ctaSecondaryLabel = merged.about_cta_secondary_label || "Koleksiyonu İncele";
  const ctaSecondaryHref = merged.about_cta_secondary_href || "/kategoriler";

  return (
    <>
      {/* Hero */}
      <section className="relative bg-brand-800 py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: `url('${heroBg}')` }} />
        <div className="container-brand relative z-10 text-center">
          <p className="text-overline text-gold-light mb-4">{heroOverline}</p>
          <h1 className="font-serif text-5xl md:text-6xl text-cream-50 font-light leading-tight">
            {heroTitle}
          </h1>
        </div>
      </section>

      {/* Brand Story */}
      <section className="section-padding bg-cream-50">
        <div className="container-brand">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-overline mb-4">{storyOverline}</p>
              <h2 className="heading-lg text-brand-800 mb-4">
                {storyTitle}
              </h2>
              <div className="gold-divider-left mb-8" />
              <div className="space-y-4 text-brand-600 font-sans leading-relaxed">
                <p>{storyText1}</p>
                <p>{storyText2}</p>
                <p>{storyText3}</p>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/5] relative bg-cream-200 overflow-hidden">
                <Image
                  src={storyImage}
                  alt="ESAMIR Marka Hikayesi"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-48 h-48 border border-gold/30" />
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-cream-200" />
            </div>
          </div>
        </div>
      </section>

      {/* Interior Design Philosophy */}
      <section className="section-padding bg-white">
        <div className="container-brand">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <p className="text-overline mb-4">{philosophyOverline}</p>
            <h2 className="heading-lg text-brand-800 mb-4">
              {philosophyTitle}
            </h2>
            <div className="gold-divider mb-6" />
            <p className="text-brand-500 font-sans leading-relaxed">
              {philosophyDesc}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {philosophyItems.map((item) => (
              <div key={item.num} className="relative pl-8 border-l border-gold/30">
                <span className="absolute top-0 left-0 -translate-x-1/2 -translate-y-0.5 font-serif text-6xl text-gold/10 font-light leading-none select-none">
                  {item.num}
                </span>
                <h3 className="font-serif text-xl text-brand-800 font-light mb-3">
                  {item.title}
                </h3>
                <p className="text-sm font-sans text-brand-500 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Iranian Carpet Heritage */}
      <section className="section-padding bg-cream-100">
        <div className="container-brand">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="aspect-[3/4] relative bg-cream-200 overflow-hidden">
                  <Image src={heritageImg1} alt="İran Halısı" fill className="object-cover" sizes="25vw" />
                </div>
                <div className="aspect-[3/4] relative bg-brand-200 overflow-hidden mt-8">
                  <Image src={heritageImg2} alt="İpek Halı" fill className="object-cover" sizes="25vw" />
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <p className="text-overline mb-4">{heritageOverline}</p>
              <h2 className="heading-lg text-brand-800 mb-4">
                {heritageTitle}
              </h2>
              <div className="gold-divider-left mb-8" />
              <div className="space-y-4 text-brand-600 font-sans leading-relaxed">
                <p>{heritageText1}</p>
                <p>{heritageText2}</p>
              </div>
              <div className="mt-8 grid grid-cols-3 gap-4">
                {[
                  { label: "İpek Halı", href: "/kategoriler/ipek-hali" },
                  { label: "Akrilik", href: "/kategoriler/akrilik-hali" },
                  { label: "Aksesuar", href: "/kategoriler/aksesuar" },
                ].map((cat) => (
                  <Link
                    key={cat.href}
                    href={cat.href}
                    className="p-3 border border-brand-200 text-center text-sm font-sans text-brand-600 hover:border-gold hover:text-gold transition-colors rounded-sm"
                  >
                    {cat.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="section-padding-sm bg-brand-800 text-cream-50">
        <div className="container-brand">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="font-serif text-4xl text-gold-light font-light mb-2">
                  {stat.number}
                </p>
                <p className="text-sm font-sans text-cream-300">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding-sm bg-cream-50">
        <div className="container-brand text-center">
          <h2 className="heading-md text-brand-800 mb-4">{ctaTitle}</h2>
          <p className="text-brand-500 font-sans mb-8 max-w-lg mx-auto">
            {ctaDesc}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={ctaPrimaryHref}
              className="btn-primary rounded-sm"
            >
              {ctaPrimaryLabel} <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href={ctaSecondaryHref}
              className="btn-outline rounded-sm"
            >
              {ctaSecondaryLabel}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

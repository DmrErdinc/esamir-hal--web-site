import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle } from "lucide-react";
import { getSettings, DEFAULT_SETTINGS } from "@/lib/settings";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = {
  title: "İç Mimarlık Hizmetleri",
  description:
    "ESAMIR iç mimarlık yaklaşımı, hizmetleri ve yaşam alanı tasarım felsefesi. Profesyonel danışmanlık için iletişime geçin.",
};

export default async function IcMimarlikPage() {
  const settings = await getSettings();
  const s = { ...DEFAULT_SETTINGS, ...settings };

  // Services
  const services = [1, 2, 3, 4, 5, 6]
    .map((num) => ({
      title: s[`interior_page_service${num}_title`] || "",
      desc: s[`interior_page_service${num}_desc`] || "",
      icon: s[`interior_page_service${num}_icon`] || `0${num}`,
    }))
    .filter((service) => service.title);

  // Process Steps
  const processSteps = [1, 2, 3, 4, 5]
    .map((num) => ({
      title: s[`interior_page_step${num}_title`] || "",
      desc: s[`interior_page_step${num}_desc`] || "",
    }))
    .filter((step) => step.title);

  // Features
  const features = (s.interior_page_approach_features || "")
    .split("\n")
    .map((f) => f.trim())
    .filter(Boolean);
  return (
    <>
      {/* Hero */}
      <section className="relative bg-brand-800 py-28 lg:py-36 overflow-hidden">
        {s.interior_page_hero_bg && (
          <div className="absolute inset-0 opacity-25">
            <Image
              src={s.interior_page_hero_bg}
              alt="İç Mimarlık Hero"
              fill
              className="object-cover"
              priority
            />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-900/70 to-brand-800/40" />
        <div className="container-brand relative z-10">
          <div className="max-w-2xl">
            <p className="text-overline text-gold-light mb-4">
              {s.interior_page_hero_overline || "Hizmetlerimiz"}
            </p>
            <h1 className="font-serif text-5xl md:text-6xl text-cream-50 font-light leading-tight mb-6">
              {s.interior_page_hero_title || "İç Mimarlık &"}
              <br />
              <span className="italic text-cream-200">
                {s.interior_page_hero_title_italic || "Tasarım Danışmanlığı"}
              </span>
            </h1>
            <p className="text-cream-300 font-sans leading-relaxed text-lg max-w-xl">
              {s.interior_page_hero_desc || "Yaşam alanlarınızı sizin için tasarlıyor, halı ve aksesuar seçimlerinden uygulama sürecine kadar yanınızda oluyoruz."}
            </p>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="section-padding bg-cream-50">
        <div className="container-brand">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-overline mb-4">
                {s.interior_page_approach_overline || "Yaklaşımımız"}
              </p>
              <h2 className="heading-lg text-brand-800 mb-4">
                {s.interior_page_approach_title || "Her Mekan Bir Kimlik Taşır"}
              </h2>
              <div className="gold-divider-left mb-8" />
              <div className="space-y-4 text-brand-600 font-sans leading-relaxed">
                {s.interior_page_approach_text1 && <p>{s.interior_page_approach_text1}</p>}
                {s.interior_page_approach_text2 && <p>{s.interior_page_approach_text2}</p>}
              </div>
              {features.length > 0 && (
                <ul className="mt-8 space-y-3">
                  {features.map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm font-sans text-brand-700">
                      <CheckCircle className="h-4 w-4 text-gold flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              )}
              <div className="mt-10">
                <Link
                  href={s.interior_page_approach_cta_url || "/iletisim"}
                  className="btn-primary rounded-sm inline-flex items-center gap-2"
                >
                  {s.interior_page_approach_cta || "Danışmanlık Talep Et"} <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
            <div className="relative grid grid-cols-2 gap-4">
              <div className="aspect-[3/4] relative bg-cream-200 overflow-hidden">
                {s.interior_page_approach_img1 ? (
                  <Image src={s.interior_page_approach_img1} alt="İç Mimarlık" fill className="object-cover" sizes="25vw" />
                ) : (
                  <div className="w-full h-full bg-cream-200" />
                )}
              </div>
              <div className="aspect-[3/4] relative bg-brand-100 overflow-hidden mt-8">
                {s.interior_page_approach_img2 ? (
                  <Image src={s.interior_page_approach_img2} alt="Tasarım" fill className="object-cover" sizes="25vw" />
                ) : (
                  <div className="w-full h-full bg-brand-100" />
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      {services.length > 0 && (
        <section className="section-padding bg-white">
          <div className="container-brand">
            <div className="text-center mb-14">
              <p className="text-overline mb-4">
                {s.interior_page_services_overline || "Neler Yapıyoruz"}
              </p>
              <h2 className="heading-lg text-brand-800 mb-4">
                {s.interior_page_services_title || "Hizmetlerimiz"}
              </h2>
              <div className="gold-divider" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service) => (
                <div key={service.title} className="p-8 border border-cream-200 hover:border-gold/40 hover:shadow-card transition-all group">
                  <span className="font-serif text-5xl text-gold/20 font-light block mb-4 group-hover:text-gold/40 transition-colors">
                    {service.icon}
                  </span>
                  <h3 className="font-serif text-xl text-brand-800 font-light mb-3">{service.title}</h3>
                  <p className="text-sm font-sans text-brand-500 leading-relaxed">{service.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Process */}
      {processSteps.length > 0 && (
        <section className="section-padding bg-cream-100">
          <div className="container-brand">
            <div className="text-center mb-14">
              <p className="text-overline mb-4">
                {s.interior_page_process_overline || "Nasıl Çalışırız"}
              </p>
              <h2 className="heading-lg text-brand-800 mb-4">
                {s.interior_page_process_title || "Süreç"}
              </h2>
              <div className="gold-divider" />
            </div>
            <div className="max-w-3xl mx-auto">
              <div className="relative">
                <div className="absolute left-5 top-5 bottom-5 w-px bg-gold/20 hidden md:block" />
                <div className="space-y-8">
                  {processSteps.map((step, i) => (
                    <div key={step.title} className="flex gap-6 items-start">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-brand-800 text-cream-50 flex items-center justify-center font-serif text-sm font-light z-10">
                        {i + 1}
                      </div>
                      <div className="pt-1">
                        <h3 className="font-serif text-lg text-brand-800 font-light mb-1">{step.title}</h3>
                        <p className="text-sm font-sans text-brand-500 leading-relaxed">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="section-padding-sm bg-brand-800">
        <div className="container-brand text-center">
          <h2 className="font-serif text-3xl text-cream-50 font-light mb-4">
            {s.interior_page_cta_title || "Projenizi Konuşalım"}
          </h2>
          <p className="text-cream-300 font-sans mb-8 max-w-md mx-auto">
            {s.interior_page_cta_desc || "Ücretsiz danışmanlık görüşmesi için bizimle iletişime geçin."}
          </p>
          <Link
            href={s.interior_page_cta_url || "/iletisim"}
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-gold text-cream-50 text-sm font-sans font-medium tracking-wide hover:bg-gold-dark transition-colors rounded-sm"
          >
            {s.interior_page_cta_button || "İletişime Geçin"} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}

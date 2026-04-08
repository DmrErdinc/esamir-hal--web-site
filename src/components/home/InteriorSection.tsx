"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { getImageUrl } from "@/lib/utils";

interface InteriorSectionProps {
  settings: Record<string, string>;
}

export function InteriorSection({ settings: s }: InteriorSectionProps) {
  const img1 = s.interior_image1 || "/images/interior-1.jpg";
  const img2 = s.interior_image2 || "/images/interior-2.jpg";

  const stats = [
    { number: s.interior_stat1_number || "500+", label: s.interior_stat1_label || "Tamamlanan Proje" },
    { number: s.interior_stat2_number || "20+",  label: s.interior_stat2_label || "Yıllık Deneyim" },
    { number: s.interior_stat3_number || "1000+", label: s.interior_stat3_label || "Ürün Çeşidi" },
    { number: s.interior_stat4_number || "98%",  label: s.interior_stat4_label || "Müşteri Memnuniyeti" },
  ];

  return (
    <section className="section-padding bg-cream-100">
      <div className="container-brand">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Images Grid */}
          <motion.div
            className="relative grid grid-cols-2 gap-4"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="aspect-[3/4] relative bg-cream-200 overflow-hidden">
              <Image
                src={getImageUrl(img1)}
                alt={s.interior_label || "İç Mimarlık"}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </div>
            <div className="aspect-[3/4] relative bg-brand-200 overflow-hidden mt-8">
              <Image
                src={getImageUrl(img2)}
                alt={s.interior_title || "Premium Koleksiyon"}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </div>
            <div className="absolute -bottom-4 -left-4 w-24 h-24 border border-gold/30" />
            <div className="absolute -top-4 -right-4 w-16 h-16 bg-gold/10" />
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-overline mb-5">{s.interior_label || "İç Mimarlık"}</p>
            <h2 className="heading-xl text-brand-800 mb-4">
              {s.interior_title || "Mekanı Sanata"}
              {s.interior_title_italic && (
                <>
                  <br />
                  <span className="italic text-brand-600">{s.interior_title_italic}</span>
                </>
              )}
            </h2>
            <div className="gold-divider-left mb-8" />
            <div className="space-y-4 text-brand-600 font-sans leading-relaxed">
              {s.interior_text1 && <p>{s.interior_text1}</p>}
              {s.interior_text2 && <p>{s.interior_text2}</p>}
            </div>

            {stats.some((st) => st.number) && (
              <div className="grid grid-cols-2 gap-6 mt-10 mb-10">
                {stats.map((stat) => (
                  <div key={stat.label}>
                    <p className="font-serif text-3xl text-gold font-light">{stat.number}</p>
                    <p className="text-sm font-sans text-brand-500 mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>
            )}

            {s.interior_cta_text && (
              <Link
                href={s.interior_cta_url || "/ic-mimarlik"}
                className="inline-flex items-center gap-2 text-sm font-sans font-medium text-brand-700 hover:text-brand-900 transition-colors group border-b border-brand-300 pb-1 hover:border-brand-700"
              >
                {s.interior_cta_text}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

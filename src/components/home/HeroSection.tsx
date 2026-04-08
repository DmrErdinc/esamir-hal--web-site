"use client";
import React from "react";
import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { getWhatsAppUrl } from "@/lib/utils";
import type { Settings } from "@/lib/settings";

interface HeroSectionProps {
  settings: Settings & Record<string, string>;
}

export function HeroSection({ settings }: HeroSectionProps) {
  const whatsapp = settings.whatsapp || settings.phone || "";
  const waUrl = whatsapp
    ? getWhatsAppUrl(whatsapp, "Merhaba, ESAMIR hakkında bilgi almak istiyorum.")
    : "#";

  const heroImage = settings.hero_image || '/images/hero-bg.jpg';
  const heroSubtitle = settings.hero_subtitle || 'Premium Koleksiyon';
  const heroTitle = settings.hero_title || 'Yaşam Alanlarına Zarafet Katın';
  const heroDescription = settings.hero_description || 'Seçkin İran halısı koleksiyonu, premium aksesuarlar ve profesyonel iç mimarlık danışmanlığı ile yaşam alanlarınızı baştan tasarlıyoruz.';
  const heroCtaLabel = settings.hero_cta_label || 'Koleksiyonu Keşfet';
  const heroCtaHref = settings.hero_cta_href || '/kategoriler';

  return (
    <section className="relative min-h-[80vh] md:min-h-[90vh] lg:min-h-screen flex items-center overflow-hidden bg-brand-900">
      {/* Background — CSS geometric pattern as base, image layered on top if available */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-900 via-brand-800 to-stone-dark" />
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
        style={{ backgroundImage: `url('${heroImage}')` }}
        onError={(e) => { (e.currentTarget as HTMLDivElement).style.display = "none"; }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-brand-900/70 via-brand-900/40 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-brand-900/40 via-transparent to-transparent" />

      {/* Content */}
      <div className="relative z-10 container-brand py-16 md:py-24 lg:py-32">
        <div className="max-w-2xl px-4 md:px-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-overline text-gold-light mb-4 md:mb-6 tracking-[0.2em] md:tracking-[0.25em]">
              {heroSubtitle}
            </p>
          </motion.div>

          <motion.h1
            className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light text-cream-50 leading-[1.1] md:leading-[1.05] mb-4 md:mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            {heroTitle}
          </motion.h1>

          <motion.p
            className="text-cream-300 text-base md:text-lg font-sans leading-relaxed mb-6 md:mb-10 max-w-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {heroDescription}
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-3 md:gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Button
              asChild
              size="lg"
              className="bg-cream-50 text-brand-800 hover:bg-cream-100 font-sans font-medium tracking-wide text-sm md:text-base"
            >
              <Link href={heroCtaHref}>
                {heroCtaLabel}
                <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </Button>

            {whatsapp && (
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-cream-300 text-cream-50 hover:bg-cream-50/10 hover:border-cream-100 font-sans text-sm md:text-base"
              >
                <a href={waUrl} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="h-4 w-4 mr-1" />
                  WhatsApp&apos;tan Yazın
                </a>
              </Button>
            )}
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-cream-50 to-transparent" />

      {/* Scroll indicator - hidden on mobile */}
      <motion.div
        className="hidden md:block absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <div className="w-[1px] h-12 bg-cream-200/40 mx-auto" />
      </motion.div>
    </section>
  );
}

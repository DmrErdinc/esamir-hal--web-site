"use client";
import React from "react";
import { Star, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import type { Settings } from "@/lib/settings";

interface GoogleReviewCTAProps {
  settings: Settings & Record<string, string>;
}

export function GoogleReviewCTA({ settings }: GoogleReviewCTAProps) {
  const link = settings.google_review_link;
  if (!link) return null;

  const title = settings.google_review_title || "Google'da Bizi Değerlendirin";
  const description =
    settings.google_review_description ||
    "Deneyiminizi paylaşarak diğer müşterilere yardımcı olun.";
  const buttonText = settings.google_review_button || "Değerlendirme Yap";

  return (
    <section className="section-padding-sm bg-cream-100">
      <div className="container-brand">
        <motion.div
          className="max-w-2xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-1 mb-5">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star
                key={s}
                className="h-6 w-6 text-gold fill-gold"
              />
            ))}
          </div>
          <h2 className="heading-md text-brand-800 mb-3">{title}</h2>
          <p className="text-brand-500 font-sans leading-relaxed mb-8 max-w-md mx-auto">
            {description}
          </p>
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-brand-700 text-cream-50 text-sm font-sans font-medium tracking-wide hover:bg-brand-800 transition-colors rounded-sm"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            {buttonText}
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

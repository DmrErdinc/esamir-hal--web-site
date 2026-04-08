"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import type { Category } from "@prisma/client";

interface FeaturedCategoriesProps {
  categories: Category[];
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function FeaturedCategories({ categories }: FeaturedCategoriesProps) {
  if (categories.length === 0) return null;

  return (
    <section className="section-padding bg-cream-50">
      <div className="container-brand">
        {/* Header */}
        <div className="text-center mb-14 lg:mb-18">
          <p className="text-overline mb-4">Koleksiyonumuz</p>
          <h2 className="heading-xl text-brand-800 mb-4">
            Öne Çıkan Kategoriler
          </h2>
          <div className="gold-divider" />
          <p className="mt-6 text-brand-500 font-sans max-w-xl mx-auto leading-relaxed">
            El dokuması İran halılarından modern aksesuarlara uzanan geniş
            koleksiyonumuzla yaşam alanlarınıza değer katın.
          </p>
        </div>

        {/* Grid */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
        >
          {categories.map((cat, index) => (
            <motion.div
              key={cat.id}
              variants={item}
              className={
                index === 0 && categories.length >= 4
                  ? "col-span-2 md:col-span-1 row-span-2"
                  : ""
              }
            >
              <Link
                href={`/kategoriler/${cat.slug}`}
                className="group block relative overflow-hidden bg-brand-100 aspect-[3/4]"
              >
                {cat.coverImage ? (
                  <Image
                    src={cat.coverImage}
                    alt={cat.name}
                    fill
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-cream-200 to-brand-200" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-900/60 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h3 className="font-serif text-xl text-cream-50 font-light mb-1">
                    {cat.name}
                  </h3>
                  {cat.description && (
                    <p className="text-cream-300 text-sm font-sans line-clamp-2 mb-2">
                      {cat.description}
                    </p>
                  )}
                  <span className="flex items-center gap-1 text-gold-light text-xs font-sans uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Keşfet <ArrowRight className="h-3 w-3" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link
            href="/kategoriler"
            className="inline-flex items-center gap-2 text-sm font-sans font-medium text-brand-600 hover:text-brand-800 transition-colors group"
          >
            Tüm kategorileri görüntüle
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}

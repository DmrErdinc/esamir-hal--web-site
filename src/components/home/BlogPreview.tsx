"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { formatDate, getImageUrl } from "@/lib/utils";
import type { Settings } from "@/lib/settings";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  coverImage: string | null;
  publishedAt: Date | null;
  readTime: number | null;
  category: { name: string; slug: string } | null;
}

interface BlogPreviewProps {
  posts: BlogPost[];
  settings: Settings & Record<string, string>;
}

export function BlogPreview({ posts, settings }: BlogPreviewProps) {
  if (posts.length === 0) return null;

  return (
    <section className="section-padding bg-cream-50">
      <div className="container-brand px-4">
        {/* Header */}
        <div className="flex items-end justify-between mb-8 md:mb-12">
          <div>
            <p className="text-overline mb-2 md:mb-3 tracking-[0.2em] md:tracking-[0.25em]">{settings.blog_section_subtitle || "Blog"}</p>
            <h2 className="heading-xl text-brand-800 mb-2 text-2xl sm:text-3xl md:text-4xl lg:text-5xl">{settings.blog_section_title || "Son Yazılar"}</h2>
            <div className="gold-divider-left" />
          </div>
          <Link
            href="/blog"
            className="hidden sm:flex items-center gap-2 text-sm font-sans text-brand-600 hover:text-brand-800 transition-colors group"
          >
            Tümünü Gör
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 md:gap-6 lg:gap-8">
          {posts.map((post, i) => (
            <motion.article
              key={post.id}
              className="group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              {/* Image */}
              <Link href={`/blog/${post.slug}`}>
                <div className="relative aspect-[16/10] bg-cream-200 overflow-hidden mb-4 md:mb-5 rounded-sm">
                  {post.coverImage ? (
                    <Image
                      src={getImageUrl(post.coverImage)}
                      alt={post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-cream-200 to-brand-100 flex items-center justify-center">
                      <span className="font-serif text-brand-400 text-sm">ESAMIR Blog</span>
                    </div>
                  )}
                  {post.category && (
                    <div className="absolute top-2 left-2 md:top-3 md:left-3">
                      <span className="px-2 md:px-2.5 py-0.5 md:py-1 bg-brand-800/80 text-cream-50 text-[10px] md:text-xs font-sans rounded-sm backdrop-blur-sm">
                        {post.category.name}
                      </span>
                    </div>
                  )}
                </div>
              </Link>

              {/* Meta */}
              <div className="flex items-center gap-2 md:gap-3 text-[10px] md:text-xs font-sans text-brand-400 mb-2 md:mb-3">
                {post.publishedAt && (
                  <span className="flex items-center gap-0.5 md:gap-1">
                    <Calendar className="h-2.5 w-2.5 md:h-3 md:w-3" />
                    {formatDate(post.publishedAt)}
                  </span>
                )}
                {post.readTime && (
                  <span className="flex items-center gap-0.5 md:gap-1">
                    <Clock className="h-2.5 w-2.5 md:h-3 md:w-3" />
                    {post.readTime} dk okuma
                  </span>
                )}
              </div>

              {/* Title */}
              <Link href={`/blog/${post.slug}`}>
                <h3 className="font-serif text-lg md:text-xl text-brand-800 font-light leading-snug hover:text-gold transition-colors mb-2 line-clamp-2">
                  {post.title}
                </h3>
              </Link>

              {post.excerpt && (
                <p className="text-xs md:text-sm font-sans text-brand-500 leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>
              )}

              <Link
                href={`/blog/${post.slug}`}
                className="inline-flex items-center gap-1 md:gap-1.5 mt-3 md:mt-4 text-[10px] md:text-xs font-sans text-gold hover:text-gold-dark transition-colors group/link"
              >
                Devamını Oku
                <ArrowRight className="h-3 w-3 md:h-3.5 md:w-3.5 group-hover/link:translate-x-0.5 transition-transform" />
              </Link>
            </motion.article>
          ))}
        </div>

        {/* Mobile CTA */}
        <div className="text-center mt-6 md:mt-8 sm:hidden">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs md:text-sm font-sans text-brand-600 hover:text-brand-800 transition-colors group"
          >
            Tüm yazıları gör
            <ArrowRight className="h-3.5 w-3.5 md:h-4 md:w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}

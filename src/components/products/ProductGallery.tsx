"use client";
import React, { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ZoomIn, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { getImageUrl } from "@/lib/utils";

interface ProductImage {
  id: string;
  url: string;
  alt: string | null;
}

interface ProductGalleryProps {
  images: ProductImage[];
  productName: string;
}

export function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  if (images.length === 0) {
    return (
      <div className="aspect-square bg-cream-200 flex items-center justify-center">
        <span className="font-serif text-brand-300 text-lg">ESAMIR</span>
      </div>
    );
  }

  const active = images[activeIdx];

  function prev() {
    setActiveIdx((i) => (i === 0 ? images.length - 1 : i - 1));
  }
  function next() {
    setActiveIdx((i) => (i === images.length - 1 ? 0 : i + 1));
  }

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative aspect-square bg-cream-100 overflow-hidden group">
        <Image
          src={getImageUrl(active.url)}
          alt={active.alt || productName}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover"
          priority
        />

        {/* Zoom button */}
        <button
          onClick={() => setLightboxOpen(true)}
          className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-sm rounded-sm opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
          aria-label="Büyüt"
        >
          <ZoomIn className="h-4 w-4 text-brand-700" />
        </button>

        {/* Nav arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 p-2 bg-white/80 backdrop-blur-sm rounded-sm opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
            >
              <ChevronLeft className="h-4 w-4 text-brand-700" />
            </button>
            <button
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-white/80 backdrop-blur-sm rounded-sm opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
            >
              <ChevronRight className="h-4 w-4 text-brand-700" />
            </button>
          </>
        )}

        {/* Dots */}
        {images.length > 1 && (
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIdx(i)}
                className={cn(
                  "w-1.5 h-1.5 rounded-full transition-all",
                  i === activeIdx ? "bg-brand-700 w-4" : "bg-brand-300"
                )}
              />
            ))}
          </div>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {images.map((img, i) => (
            <button
              key={img.id}
              onClick={() => setActiveIdx(i)}
              className={cn(
                "flex-shrink-0 w-16 h-16 relative overflow-hidden border-2 transition-all",
                i === activeIdx ? "border-brand-700" : "border-transparent hover:border-cream-300"
              )}
            >
              <Image
                src={getImageUrl(img.url)}
                alt={img.alt || productName}
                fill
                sizes="64px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            className="absolute top-4 right-4 p-2 text-white hover:text-cream-300 transition-colors"
            onClick={() => setLightboxOpen(false)}
          >
            <X className="h-6 w-6" />
          </button>

          {images.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); prev(); }}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 text-white hover:text-cream-300"
              >
                <ChevronLeft className="h-8 w-8" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); next(); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 text-white hover:text-cream-300"
              >
                <ChevronRight className="h-8 w-8" />
              </button>
            </>
          )}

          <div
            className="relative max-w-3xl max-h-[85vh] w-full h-full"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={getImageUrl(active.url)}
              alt={active.alt || productName}
              fill
              className="object-contain"
              sizes="90vw"
            />
          </div>
        </div>
      )}
    </div>
  );
}

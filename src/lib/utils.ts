import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import slugify from "slugify";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateSlug(text: string): string {
  return slugify(text, {
    lower: true,
    strict: true,
    locale: "tr",
    trim: true,
  });
}

export function formatPrice(
  price: number | null | undefined,
  currency = "TRY"
): string {
  if (price === null || price === undefined) return "";
  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

export function formatDate(date: Date | string | null | undefined): string {
  if (!date) return "";
  const d = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat("tr-TR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(d);
}

export function formatDateShort(date: Date | string | null | undefined): string {
  if (!date) return "";
  const d = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat("tr-TR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(d);
}

export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + "…";
}

export function getWhatsAppUrl(phone: string, message: string): string {
  const cleaned = phone.replace(/[^0-9]/g, "");
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${cleaned}?text=${encoded}`;
}

export function getProductWhatsAppMessage(
  productName: string,
  productUrl: string
): string {
  return `Merhaba, ESAMIR sitesindeki şu ürün hakkında bilgi almak istiyorum: ${productName} - ${productUrl}`;
}

export const PLACEHOLDER_IMAGE = "/images/placeholder.svg";

export function getImageUrl(url: string | null | undefined): string {
  if (!url) return PLACEHOLDER_IMAGE;
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  if (url.startsWith("/")) return url;
  return `/${url}`;
}

export function calcReadTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

export function safeJson<T>(value: unknown, fallback: T): T {
  if (value === null || value === undefined) return fallback;
  if (typeof value === "object") return value as T;
  if (typeof value === "string") {
    try {
      return JSON.parse(value) as T;
    } catch {
      return fallback;
    }
  }
  return fallback;
}

export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

export function absoluteUrl(path: string): string {
  const base =
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

import React from "react";
import { cn } from "@/lib/utils";

type BadgeVariant = "active" | "inactive" | "draft" | "published" | "new" | "featured";

const variants: Record<BadgeVariant, string> = {
  active: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200",
  inactive: "bg-gray-100 text-gray-500 ring-1 ring-gray-200",
  draft: "bg-amber-50 text-amber-700 ring-1 ring-amber-200",
  published: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200",
  new: "bg-blue-50 text-blue-700 ring-1 ring-blue-200",
  featured: "bg-purple-50 text-purple-700 ring-1 ring-purple-200",
};

const labels: Record<BadgeVariant, string> = {
  active: "Aktif",
  inactive: "Pasif",
  draft: "Taslak",
  published: "Yayında",
  new: "Yeni",
  featured: "Öne Çıkan",
};

export function StatusBadge({ variant, label }: { variant: BadgeVariant; label?: string }) {
  return (
    <span className={cn("inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium", variants[variant])}>
      <span className={cn("w-1.5 h-1.5 rounded-full mr-1.5", {
        "bg-emerald-500": variant === "active" || variant === "published",
        "bg-gray-400": variant === "inactive",
        "bg-amber-500": variant === "draft",
        "bg-blue-500": variant === "new",
        "bg-purple-500": variant === "featured",
      })} />
      {label ?? labels[variant]}
    </span>
  );
}

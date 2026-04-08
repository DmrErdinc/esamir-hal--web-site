"use client";
import React from "react";
import { MessageCircle } from "lucide-react";
import { getWhatsAppUrl, getProductWhatsAppMessage, absoluteUrl } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface WhatsAppProductButtonProps {
  phone: string;
  productName: string;
  productSlug: string;
  className?: string;
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
}

export function WhatsAppProductButton({
  phone,
  productName,
  productSlug,
  className,
  size = "md",
  fullWidth = false,
}: WhatsAppProductButtonProps) {
  if (!phone) return null;

  const productUrl = absoluteUrl(`/urunler/${productSlug}`);
  const message = getProductWhatsAppMessage(productName, productUrl);
  const url = getWhatsAppUrl(phone, message);

  const sizeClasses = {
    sm: "py-2 px-3 text-xs gap-1.5",
    md: "py-2.5 px-4 text-sm gap-2",
    lg: "py-3.5 px-6 text-sm gap-2",
  };

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex items-center justify-center font-sans font-medium rounded-sm",
        "bg-[#25D366] text-white hover:bg-[#22c35e] active:bg-[#1da851]",
        "transition-colors duration-200",
        sizeClasses[size],
        fullWidth && "w-full",
        className
      )}
    >
      <MessageCircle className={cn(size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4")} />
      WhatsApp ile Sor
    </a>
  );
}

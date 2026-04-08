"use client";
import React, { useState, useTransition } from "react";
import { Trash2, Star, ToggleLeft, ToggleRight, Loader2 } from "lucide-react";
import { deleteProduct, toggleProductActive, toggleProductFeatured } from "@/actions/products";
import { toast } from "sonner";

interface AdminProductActionsProps {
  productId: string;
  productName: string;
  isActive: boolean;
  isFeatured: boolean;
}

export function AdminProductActions({ productId, productName, isActive, isFeatured }: AdminProductActionsProps) {
  const [isPending, startTransition] = useTransition();
  const [confirmDelete, setConfirmDelete] = useState(false);

  function handleToggleActive() {
    startTransition(async () => {
      const res = await toggleProductActive(productId, !isActive) as any;
      if (res.error) toast.error(res.error);
      else toast.success(isActive ? "Ürün pasife alındı." : "Ürün aktive edildi.");
    });
  }

  function handleToggleFeatured() {
    startTransition(async () => {
      const res = await toggleProductFeatured(productId, !isFeatured) as any;
      if (res.error) toast.error(res.error);
      else toast.success(isFeatured ? "Öne çıkan kaldırıldı." : "Öne çıkana eklendi.");
    });
  }

  function handleDelete() {
    if (!confirmDelete) {
      setConfirmDelete(true);
      setTimeout(() => setConfirmDelete(false), 3000);
      return;
    }
    startTransition(async () => {
      const res = await deleteProduct(productId) as any;
      if (res.error) toast.error(res.error);
      else toast.success(`"${productName}" silindi.`);
      setConfirmDelete(false);
    });
  }

  return (
    <>
      <button
        onClick={handleToggleFeatured}
        disabled={isPending}
        className={`p-1.5 transition-colors ${isFeatured ? "text-gold" : "text-gray-400 hover:text-gold"}`}
        title={isFeatured ? "Öne çıkandan kaldır" : "Öne çıkara ekle"}
      >
        <Star className={`h-4 w-4 ${isFeatured ? "fill-gold" : ""}`} />
      </button>
      <button
        onClick={handleToggleActive}
        disabled={isPending}
        className="p-1.5 text-gray-400 hover:text-brand-700 transition-colors"
        title={isActive ? "Pasife al" : "Aktive et"}
      >
        {isActive ? <ToggleRight className="h-4 w-4 text-green-600" /> : <ToggleLeft className="h-4 w-4" />}
      </button>
      <button
        onClick={handleDelete}
        disabled={isPending}
        className={`p-1.5 transition-colors ${confirmDelete ? "text-red-600 animate-pulse" : "text-gray-400 hover:text-red-600"}`}
        title={confirmDelete ? "Onaylamak için tekrar tıklayın" : "Sil"}
      >
        {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
      </button>
    </>
  );
}

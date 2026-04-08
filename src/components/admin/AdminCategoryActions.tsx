"use client";
import React, { useState, useTransition } from "react";
import { Trash2, ToggleLeft, ToggleRight, Loader2 } from "lucide-react";
import { deleteCategory, toggleCategoryActive } from "@/actions/categories";
import { toast } from "sonner";

interface AdminCategoryActionsProps {
  categoryId: string;
  categoryName: string;
  isActive: boolean;
}

export function AdminCategoryActions({ categoryId, categoryName, isActive }: AdminCategoryActionsProps) {
  const [isPending, startTransition] = useTransition();
  const [confirmDelete, setConfirmDelete] = useState(false);

  function handleToggleActive() {
    startTransition(async () => {
      const res = await toggleCategoryActive(categoryId, !isActive) as any;
      if (res.error) toast.error(res.error);
      else toast.success(isActive ? "Kategori pasife alındı." : "Kategori aktive edildi.");
    });
  }

  function handleDelete() {
    if (!confirmDelete) {
      setConfirmDelete(true);
      setTimeout(() => setConfirmDelete(false), 3000);
      return;
    }
    startTransition(async () => {
      const res = await deleteCategory(categoryId) as any;
      if (res.error) toast.error(res.error);
      else toast.success(`"${categoryName}" silindi.`);
      setConfirmDelete(false);
    });
  }

  return (
    <>
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

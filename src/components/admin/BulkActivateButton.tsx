"use client";
import React, { useTransition } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { bulkActivateAllProducts } from "@/actions/products";

export function BulkActivateButton({ count }: { count: number }) {
  const [isPending, startTransition] = useTransition();

  function handleActivate() {
    startTransition(async () => {
      const res = await bulkActivateAllProducts() as any;
      if (res?.error) toast.error(res.error);
      else toast.success(`${count} ürün aktif hale getirildi.`);
    });
  }

  return (
    <button
      onClick={handleActivate}
      disabled={isPending}
      className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-600 text-white text-xs font-semibold rounded-lg hover:bg-amber-700 transition-colors disabled:opacity-60"
    >
      {isPending && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
      Tümünü Yayınla
    </button>
  );
}

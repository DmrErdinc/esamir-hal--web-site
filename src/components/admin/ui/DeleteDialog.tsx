"use client";
import React, { useState } from "react";
import { Trash2, AlertTriangle, Loader2 } from "lucide-react";

interface DeleteDialogProps {
  title?: string;
  description?: string;
  onConfirm: () => Promise<void>;
  trigger?: React.ReactNode;
}

export function DeleteDialog({
  title = "Silmek istediğinize emin misiniz?",
  description = "Bu işlem geri alınamaz.",
  onConfirm,
  trigger,
}: DeleteDialogProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleConfirm() {
    setLoading(true);
    try {
      await onConfirm();
      setOpen(false);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <span onClick={() => setOpen(true)} className="cursor-pointer">
        {trigger ?? (
          <button className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors">
            <Trash2 className="h-4 w-4" />
          </button>
        )}
      </span>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => !loading && setOpen(false)} />
          <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-sm p-6 z-10">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="h-5 w-5 text-red-600" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
                <p className="text-xs text-gray-500 mt-1">{description}</p>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setOpen(false)}
                disabled={loading}
                className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors disabled:opacity-50"
              >
                İptal
              </button>
              <button
                onClick={handleConfirm}
                disabled={loading}
                className="flex-1 px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
                Sil
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

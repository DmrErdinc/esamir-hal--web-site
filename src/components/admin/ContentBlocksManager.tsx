"use client";
import React, { useState, useTransition } from "react";
import { Loader2, Save, Eye, EyeOff, GripVertical } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { updateSettings } from "@/actions/settings";
import { cn } from "@/lib/utils";

interface ContentBlocksManagerProps {
  settings: Record<string, string>;
}

type Block = {
  id: string;
  label: string;
  visibilityKey?: string;
  fields: {
    key: string;
    label: string;
    type: "text" | "textarea" | "url";
    placeholder?: string;
    hint?: string;
  }[];
};

const BLOCKS: Block[] = [
  {
    id: "header_banner",
    label: "📢 Duyuru Bandı (Header)",
    visibilityKey: "header_announcement_active",
    fields: [
      { key: "header_announcement", label: "Duyuru Metni", type: "text", placeholder: "Ücretsiz kargo kampanyamız devam ediyor..." },
    ],
  },
  {
    id: "hero",
    label: "🏠 Hero Bölümü (Ana Sayfa Başlık)",
    visibilityKey: undefined,
    fields: [
      { key: "hero_subtitle", label: "Üst Etiket", type: "text", placeholder: "Premium Koleksiyon" },
      { key: "hero_title", label: "Ana Başlık", type: "text" },
      { key: "hero_description", label: "Açıklama", type: "textarea" },
      { key: "hero_cta_label", label: "Buton Metni", type: "text" },
      { key: "hero_cta_href", label: "Buton Linki", type: "url", placeholder: "/kategoriler" },
    ],
  },
  {
    id: "about",
    label: "🏢 Hakkımızda Bölümü",
    fields: [
      { key: "about_title", label: "Başlık", type: "text" },
      { key: "about_description", label: "İçerik", type: "textarea" },
    ],
  },
  {
    id: "whatsapp_cta",
    label: "💬 WhatsApp CTA Bölümü",
    fields: [
      { key: "whatsapp_cta_title", label: "Başlık", type: "text" },
      { key: "whatsapp_cta_description", label: "Açıklama", type: "textarea" },
      { key: "whatsapp_cta_button", label: "Buton Metni", type: "text" },
    ],
  },
  {
    id: "google_review",
    label: "⭐ Google Değerlendirme Bölümü",
    visibilityKey: "google_review_show",
    fields: [
      { key: "google_review_title", label: "Başlık", type: "text" },
      { key: "google_review_description", label: "Açıklama", type: "textarea" },
      { key: "google_review_button", label: "Buton Metni", type: "text" },
      { key: "google_review_link", label: "Google Review URL", type: "url", hint: "https://g.page/r/..." },
    ],
  },
  {
    id: "blog_preview",
    label: "📝 Blog Önizleme Bölümü",
    visibilityKey: "blog_show_homepage",
    fields: [
      { key: "blog_section_title", label: "Bölüm Başlığı", type: "text", placeholder: "Son Yazılar" },
      { key: "blog_section_subtitle", label: "Alt Başlık", type: "text", placeholder: "Blog" },
    ],
  },
];

export function ContentBlocksManager({ settings: initialSettings }: ContentBlocksManagerProps) {
  const [s, setS] = useState<Record<string, string>>(initialSettings);
  const [openBlock, setOpenBlock] = useState<string | null>("hero");
  const [isPending, startTransition] = useTransition();

  const set = (key: string, value: string) => setS((prev) => ({ ...prev, [key]: value }));
  const isVisible = (key?: string) => !key || s[key] === "true";
  const toggleVisible = (key: string) => set(key, s[key] === "true" ? "false" : "true");

  function handleSave() {
    startTransition(async () => {
      const res = await updateSettings(s) as any;
      if (res?.error) toast.error(res.error);
      else toast.success("İçerik blokları kaydedildi.");
    });
  }

  return (
    <div className="space-y-3">
      {BLOCKS.map((block) => {
        const isOpen = openBlock === block.id;
        const visible = isVisible(block.visibilityKey);

        return (
          <div key={block.id} className="bg-white rounded-xl border border-gray-100 overflow-hidden">
            <button
              type="button"
              onClick={() => setOpenBlock(isOpen ? null : block.id)}
              className="w-full flex items-center gap-3 px-5 py-4 text-left hover:bg-gray-50/50 transition-colors"
            >
              <GripVertical className="h-4 w-4 text-gray-300 flex-shrink-0" />
              <span className="flex-1 text-sm font-semibold text-gray-800">{block.label}</span>
              {block.visibilityKey && (
                <span
                  onClick={(e) => { e.stopPropagation(); toggleVisible(block.visibilityKey!); }}
                  className={cn(
                    "flex items-center gap-1 text-xs px-2.5 py-1 rounded-full font-medium transition-colors",
                    visible ? "bg-emerald-50 text-emerald-700" : "bg-gray-100 text-gray-500"
                  )}
                >
                  {visible ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
                  {visible ? "Görünür" : "Gizli"}
                </span>
              )}
              <span className={cn("text-gray-400 text-xs transition-transform", isOpen && "rotate-180")}>▾</span>
            </button>

            {isOpen && (
              <div className="px-5 pb-5 space-y-4 border-t border-gray-50">
                <div className="pt-4 grid gap-4 sm:grid-cols-2">
                  {block.fields.map((field) => (
                    <div key={field.key} className={cn("space-y-1.5", field.type === "textarea" && "sm:col-span-2")}>
                      <label className="block text-sm font-medium text-gray-700">{field.label}</label>
                      {field.type === "textarea" ? (
                        <Textarea
                          value={s[field.key] || ""}
                          onChange={(e) => set(field.key, e.target.value)}
                          rows={3}
                          placeholder={field.placeholder}
                        />
                      ) : (
                        <Input
                          type={field.type}
                          value={s[field.key] || ""}
                          onChange={(e) => set(field.key, e.target.value)}
                          placeholder={field.placeholder}
                        />
                      )}
                      {field.hint && <p className="text-xs text-gray-400">{field.hint}</p>}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      })}

      <div className="sticky bottom-0 bg-white/90 backdrop-blur-sm border-t border-gray-100 -mx-4 lg:-mx-6 px-4 lg:px-6 py-3 flex justify-end">
        <button
          type="button"
          onClick={handleSave}
          disabled={isPending}
          className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white text-sm font-semibold rounded-xl hover:bg-slate-800 transition-colors disabled:opacity-50"
        >
          {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          Tümünü Kaydet
        </button>
      </div>
    </div>
  );
}

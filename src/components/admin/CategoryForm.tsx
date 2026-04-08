"use client";
import React, { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { createCategory, updateCategory } from "@/actions/categories";
import { generateSlug } from "@/lib/utils";
import { MediaPickerModal } from "@/components/admin/MediaPickerModal";

interface CategoryFormProps {
  categories?: { id: string; name: string; parentId: string | null }[];
  category?: any;
}

export function CategoryForm({ categories = [], category }: CategoryFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [showPicker, setShowPicker] = useState<"cover" | "banner" | null>(null);

  const [form, setForm] = useState({
    name: category?.name || "",
    slug: category?.slug || "",
    description: category?.description || "",
    parentId: category?.parentId || "",
    coverImage: category?.coverImage || "",
    bannerImage: category?.bannerImage || "",
    promoText: category?.promoText || "",
    isActive: category?.isActive ?? true,
    isFeatured: category?.isFeatured ?? false,
    seoTitle: category?.seoTitle || "",
    seoDesc: category?.seoDesc || "",
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    startTransition(async () => {
      const data = { ...form, parentId: form.parentId || null };
      const res = category
        ? await updateCategory(category.id, data) as any
        : await createCategory(data) as any;

      if (res.error) toast.error(res.error);
      else {
        toast.success(category ? "Kategori güncellendi." : "Kategori oluşturuldu.");
        router.push("/admin/kategoriler");
        router.refresh();
      }
    });
  }

  const parents = categories.filter((c) => !c.parentId && c.id !== category?.id);

  return (
    <>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-gray-200 rounded-sm p-6 space-y-4">
            <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">Temel Bilgiler</h2>
            <div className="space-y-2">
              <Label htmlFor="name">Ad *</Label>
              <Input
                id="name"
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value, slug: !category ? generateSlug(e.target.value) : f.slug }))}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="slug">Slug *</Label>
              <Input id="slug" value={form.slug} onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Açıklama</Label>
              <Textarea id="description" value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} rows={3} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="promoText">Promosyon Metni</Label>
              <Textarea id="promoText" value={form.promoText} onChange={(e) => setForm((f) => ({ ...f, promoText: e.target.value }))} rows={2} />
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-sm p-6 space-y-4">
            <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">SEO</h2>
            <div className="space-y-2">
              <Label htmlFor="seoTitle">SEO Başlık</Label>
              <Input id="seoTitle" value={form.seoTitle} onChange={(e) => setForm((f) => ({ ...f, seoTitle: e.target.value }))} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="seoDesc">SEO Açıklama</Label>
              <Textarea id="seoDesc" value={form.seoDesc} onChange={(e) => setForm((f) => ({ ...f, seoDesc: e.target.value }))} rows={2} />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white border border-gray-200 rounded-sm p-6 space-y-4">
            <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">Görseller</h2>
            <div>
              <Label className="text-xs mb-2 block">Kapak Görseli</Label>
              {form.coverImage ? (
                <div className="relative aspect-video bg-gray-100 overflow-hidden mb-2">
                  <img src={form.coverImage} alt="cover" className="w-full h-full object-cover" />
                  <button type="button" onClick={() => setForm((f) => ({ ...f, coverImage: "" }))} className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-sm text-xs">✕</button>
                </div>
              ) : null}
              <button type="button" onClick={() => setShowPicker("cover")} className="w-full py-2 border-2 border-dashed border-gray-300 text-sm text-gray-400 hover:border-brand-400 transition-colors rounded-sm">
                {form.coverImage ? "Değiştir" : "Görsel Seç"}
              </button>
            </div>
            <div>
              <Label className="text-xs mb-2 block">Banner Görseli</Label>
              {form.bannerImage ? (
                <div className="relative aspect-video bg-gray-100 overflow-hidden mb-2">
                  <img src={form.bannerImage} alt="banner" className="w-full h-full object-cover" />
                  <button type="button" onClick={() => setForm((f) => ({ ...f, bannerImage: "" }))} className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-sm text-xs">✕</button>
                </div>
              ) : null}
              <button type="button" onClick={() => setShowPicker("banner")} className="w-full py-2 border-2 border-dashed border-gray-300 text-sm text-gray-400 hover:border-brand-400 transition-colors rounded-sm">
                {form.bannerImage ? "Değiştir" : "Görsel Seç"}
              </button>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-sm p-6 space-y-4">
            <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">Üst Kategori</h2>
            <select
              value={form.parentId}
              onChange={(e) => setForm((f) => ({ ...f, parentId: e.target.value }))}
              className="w-full h-10 px-3 text-sm border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
            >
              <option value="">Ana Kategori</option>
              {parents.map((p) => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
          </div>

          <div className="bg-white border border-gray-200 rounded-sm p-6 space-y-4">
            <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">Ayarlar</h2>
            {[
              { key: "isActive", label: "Aktif" },
              { key: "isFeatured", label: "Öne Çıkan" },
            ].map(({ key, label }) => (
              <div key={key} className="flex items-center justify-between">
                <Label className="text-sm text-gray-700">{label}</Label>
                <Switch checked={form[key as keyof typeof form] as boolean} onCheckedChange={(v) => setForm((f) => ({ ...f, [key]: v }))} />
              </div>
            ))}
          </div>

          <div className="flex gap-3">
            <Button type="button" variant="outline" onClick={() => router.back()} className="flex-1">İptal</Button>
            <Button type="submit" disabled={isPending} className="flex-1 bg-brand-700 hover:bg-brand-800 text-white">
              {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : (category ? "Güncelle" : "Kaydet")}
            </Button>
          </div>
        </div>
      </form>

      {showPicker && (
        <MediaPickerModal
          onSelect={(urls) => {
            setForm((f) => ({ ...f, [showPicker === "cover" ? "coverImage" : "bannerImage"]: urls[0] }));
            setShowPicker(null);
          }}
          onClose={() => setShowPicker(null)}
        />
      )}
    </>
  );
}

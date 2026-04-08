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
import { createBlogPost, updateBlogPost } from "@/actions/blog";
import { generateSlug } from "@/lib/utils";
import { MediaPickerModal } from "@/components/admin/MediaPickerModal";

interface BlogCategory { id: string; name: string }
interface BlogPostFormProps {
  categories: BlogCategory[];
  post?: any;
}

export function BlogPostForm({ categories, post }: BlogPostFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [showPicker, setShowPicker] = useState(false);

  const [form, setForm] = useState({
    title: post?.title || "",
    slug: post?.slug || "",
    excerpt: post?.excerpt || "",
    content: post?.content || "",
    coverImage: post?.coverImage || "",
    categoryId: post?.categoryId || "",
    authorName: post?.authorName || "",
    isPublished: post?.isPublished ?? false,
    isFeatured: post?.isFeatured ?? false,
    seoTitle: post?.seoTitle || "",
    seoDesc: post?.seoDesc || "",
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    startTransition(async () => {
      const data = { ...form, categoryId: form.categoryId || null };
      const res = post
        ? await updateBlogPost(post.id, data) as any
        : await createBlogPost(data) as any;

      if (res.error) toast.error(res.error);
      else {
        toast.success(post ? "Yazı güncellendi." : "Yazı oluşturuldu.");
        router.push("/admin/blog");
        router.refresh();
      }
    });
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-gray-200 rounded-sm p-6 space-y-4">
            <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">Yazı</h2>
            <div className="space-y-2">
              <Label htmlFor="title">Başlık *</Label>
              <Input
                id="title"
                value={form.title}
                onChange={(e) => setForm((f) => ({
                  ...f,
                  title: e.target.value,
                  slug: !post ? generateSlug(e.target.value) : f.slug,
                }))}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="slug">Slug *</Label>
              <Input id="slug" value={form.slug} onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="excerpt">Özet</Label>
              <Textarea id="excerpt" value={form.excerpt} onChange={(e) => setForm((f) => ({ ...f, excerpt: e.target.value }))} rows={2} placeholder="Blog kartında görüntülenecek kısa özet" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="content">İçerik *</Label>
              <Textarea id="content" value={form.content} onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))} rows={16} required placeholder="Yazı içeriği..." className="font-mono text-sm" />
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
            <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">Kapak Görseli</h2>
            {form.coverImage ? (
              <div className="relative aspect-video bg-gray-100 overflow-hidden">
                <img src={form.coverImage} alt="cover" className="w-full h-full object-cover" />
                <button type="button" onClick={() => setForm((f) => ({ ...f, coverImage: "" }))} className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-sm text-xs">✕</button>
              </div>
            ) : null}
            <button type="button" onClick={() => setShowPicker(true)} className="w-full py-2 border-2 border-dashed border-gray-300 text-sm text-gray-400 hover:border-brand-400 transition-colors rounded-sm">
              {form.coverImage ? "Değiştir" : "Görsel Seç"}
            </button>
          </div>

          <div className="bg-white border border-gray-200 rounded-sm p-6 space-y-4">
            <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">Kategori & Yazar</h2>
            <select
              value={form.categoryId}
              onChange={(e) => setForm((f) => ({ ...f, categoryId: e.target.value }))}
              className="w-full h-10 px-3 text-sm border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
            >
              <option value="">Kategori seçin</option>
              {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
            <div className="space-y-2">
              <Label htmlFor="authorName">Yazar</Label>
              <Input id="authorName" value={form.authorName} onChange={(e) => setForm((f) => ({ ...f, authorName: e.target.value }))} placeholder="Yazar adı" />
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-sm p-6 space-y-4">
            <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">Ayarlar</h2>
            {[
              { key: "isPublished", label: "Yayınla" },
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
              {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : (post ? "Güncelle" : "Kaydet")}
            </Button>
          </div>
        </div>
      </form>

      {showPicker && (
        <MediaPickerModal
          onSelect={(urls) => { setForm((f) => ({ ...f, coverImage: urls[0] })); setShowPicker(false); }}
          onClose={() => setShowPicker(false)}
        />
      )}
    </>
  );
}

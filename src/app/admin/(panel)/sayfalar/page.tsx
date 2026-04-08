import type { Metadata } from "next";
import Link from "next/link";
import { Plus, Pencil, Eye, AlignLeft } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";
import { StatusBadge } from "@/components/admin/ui/StatusBadge";

export const metadata: Metadata = { title: "Sayfalar" };

export default async function AdminSayfalarPage() {
  const pages = await prisma.page.findMany({ orderBy: { order: "asc" } });

  return (
    <div className="space-y-5 max-w-5xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center">
            <AlignLeft className="h-4.5 w-4.5 text-slate-600" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-gray-900">Sayfa Yönetimi</h1>
            <p className="text-sm text-gray-500">{pages.length} sayfa</p>
          </div>
        </div>
        <Link
          href="/admin/sayfalar/yeni"
          className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white text-sm font-semibold rounded-xl hover:bg-slate-800 transition-colors"
        >
          <Plus className="h-4 w-4" />
          Yeni Sayfa
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/80">
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Başlık</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden sm:table-cell">Slug</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Durum</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">Güncelleme</th>
                <th className="text-right px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">İşlem</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {pages.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-5 py-16 text-center">
                    <p className="text-sm text-gray-400">Henüz sayfa eklenmemiş.</p>
                    <Link href="/admin/sayfalar/yeni" className="mt-3 inline-block text-xs font-medium text-slate-700 underline">İlk sayfayı ekle</Link>
                  </td>
                </tr>
              ) : pages.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-5 py-3.5">
                    <p className="font-semibold text-gray-900 text-sm">{p.title}</p>
                    <p className="text-xs text-gray-400 mt-0.5 sm:hidden">/{p.slug}</p>
                  </td>
                  <td className="px-5 py-3.5 hidden sm:table-cell">
                    <code className="text-xs text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded">/{p.slug}</code>
                  </td>
                  <td className="px-5 py-3.5">
                    <StatusBadge variant={p.isPublished ? "published" : "draft"} />
                  </td>
                  <td className="px-5 py-3.5 text-xs text-gray-400 hidden md:table-cell">{formatDate(p.updatedAt)}</td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center justify-end gap-1">
                      <Link href={`/${p.slug}`} target="_blank" className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors" title="Görüntüle">
                        <Eye className="h-4 w-4" />
                      </Link>
                      <Link href={`/admin/sayfalar/${p.id}`} className="p-1.5 text-gray-400 hover:text-slate-900 hover:bg-gray-100 rounded-lg transition-colors" title="Düzenle">
                        <Pencil className="h-4 w-4" />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

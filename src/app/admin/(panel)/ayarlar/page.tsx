import type { Metadata } from "next";
import { SlidersHorizontal } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { SettingsForm } from "@/components/admin/SettingsForm";
import { DEFAULT_SETTINGS } from "@/lib/settings";

export const metadata: Metadata = { title: "Site Ayarları" };

export default async function AdminAyarlarPage() {
  const rows = await prisma.siteSetting.findMany();
  const settings = rows.reduce<Record<string, string>>((acc, r) => {
    if (r.value !== null) acc[r.key] = r.value;
    return acc;
  }, {});
  const merged = { ...DEFAULT_SETTINGS, ...settings };

  return (
    <div className="space-y-5 max-w-4xl">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center">
          <SlidersHorizontal className="h-4.5 w-4.5 text-slate-600" />
        </div>
        <div>
          <h1 className="text-xl font-semibold text-gray-900">Site Ayarları</h1>
          <p className="text-sm text-gray-500">Tüm site içeriklerini ve ayarlarını buradan yönetin</p>
        </div>
      </div>
      <SettingsForm settings={merged} />
    </div>
  );
}

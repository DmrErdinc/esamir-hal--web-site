import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { MediaManager } from "@/components/admin/MediaManager";

export const metadata: Metadata = { title: "Medya Yöneticisi" };

export default async function AdminMedyaPage() {
  const assets = await prisma.mediaAsset.findMany({
    orderBy: { createdAt: "desc" },
    take: 200,
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold font-sans text-gray-900">Medya Yöneticisi</h1>
      <MediaManager initialAssets={assets} />
    </div>
  );
}

"use server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";

export async function updateSettings(data: Record<string, string>) {
  await requireAuth();

  const entries = Object.entries(data).filter(([, v]) => v !== undefined);

  await Promise.all(
    entries.map(([key, value]) =>
      prisma.siteSetting.upsert({
        where: { key },
        update: { value },
        create: { key, value },
      })
    )
  );

  // Revalidate all pages that use settings
  revalidatePath("/", "layout");
  revalidatePath("/ic-mimarlik");
  revalidatePath("/hakkimizda");
  revalidatePath("/iletisim");
  
  return { success: true };
}

export async function updateSingleSetting(key: string, value: string) {
  await requireAuth();
  await prisma.siteSetting.upsert({
    where: { key },
    update: { value },
    create: { key, value },
  });
  revalidatePath("/", "layout");
  return { success: true };
}

export async function deleteSetting(key: string) {
  await requireAuth();
  await prisma.siteSetting.delete({ where: { key } });
  revalidatePath("/admin/ayarlar");
  return { success: true };
}

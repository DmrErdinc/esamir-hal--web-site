"use server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";
import { categorySchema } from "@/lib/validations";
import { generateSlug } from "@/lib/utils";

export async function createCategory(data: FormData | Record<string, unknown>) {
  await requireAuth();
  const raw = data instanceof FormData ? Object.fromEntries(data) : data;
  const parsed = categorySchema.safeParse(raw);
  if (!parsed.success) return { error: parsed.error.errors[0]?.message };

  const slug = parsed.data.slug || generateSlug(parsed.data.name);
  const existing = await prisma.category.findUnique({ where: { slug } });
  if (existing) return { error: "Bu slug zaten kullanılıyor." };

  const category = await prisma.category.create({
    data: { ...parsed.data, slug },
  });

  revalidatePath("/kategoriler");
  revalidatePath("/admin/kategoriler");
  return { success: true, category };
}

export async function updateCategory(id: string, data: FormData | Record<string, unknown>) {
  await requireAuth();
  const raw = data instanceof FormData ? Object.fromEntries(data) : data;
  const parsed = categorySchema.safeParse(raw);
  if (!parsed.success) return { error: parsed.error.errors[0]?.message };

  const slug = parsed.data.slug || generateSlug(parsed.data.name);
  const conflict = await prisma.category.findFirst({ where: { slug, id: { not: id } } });
  if (conflict) return { error: "Bu slug başka bir kategori tarafından kullanılıyor." };

  const category = await prisma.category.update({
    where: { id },
    data: { ...parsed.data, slug },
  });

  revalidatePath("/kategoriler");
  revalidatePath(`/kategoriler/${slug}`);
  revalidatePath("/admin/kategoriler");
  return { success: true, category };
}

export async function deleteCategory(id: string) {
  await requireAuth();
  const cat = await prisma.category.findUnique({ where: { id }, include: { _count: { select: { products: true, children: true } } } });
  if (!cat) return { error: "Kategori bulunamadı." };
  if (cat._count.products > 0) return { error: "Bu kategoride ürünler var. Önce ürünleri taşıyın veya silin." };
  if (cat._count.children > 0) return { error: "Bu kategorinin alt kategorileri var. Önce alt kategorileri silin." };

  await prisma.category.delete({ where: { id } });
  revalidatePath("/kategoriler");
  revalidatePath("/admin/kategoriler");
  return { success: true };
}

export async function toggleCategoryActive(id: string, isActive: boolean) {
  await requireAuth();
  await prisma.category.update({ where: { id }, data: { isActive } });
  revalidatePath("/kategoriler");
  revalidatePath("/admin/kategoriler");
  return { success: true };
}

export async function reorderCategories(ids: string[]) {
  await requireAuth();
  await Promise.all(ids.map((id, order) => prisma.category.update({ where: { id }, data: { order } })));
  revalidatePath("/kategoriler");
  revalidatePath("/admin/kategoriler");
  return { success: true };
}

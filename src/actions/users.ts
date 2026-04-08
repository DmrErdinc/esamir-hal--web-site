"use server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";
import { userSchema } from "@/lib/validations";
import { hashPassword } from "@/lib/auth";

export async function createUser(data: Record<string, unknown>) {
  const session = await requireAuth();
  if (session.role !== "ADMIN") return { error: "Yetkisiz işlem." };

  const parsed = userSchema.safeParse(data);
  if (!parsed.success) return { error: parsed.error.errors[0]?.message };

  const existing = await prisma.user.findUnique({ where: { email: parsed.data.email } });
  if (existing) return { error: "Bu e-posta adresi zaten kullanılıyor." };

  const hashed = await hashPassword(parsed.data.password as string);
  const user = await prisma.user.create({
    data: {
      name: parsed.data.name,
      email: parsed.data.email,
      password: hashed,
      role: (parsed.data.role as "ADMIN" | "EDITOR") || "EDITOR",
    },
    select: { id: true, name: true, email: true, role: true, createdAt: true },
  });

  revalidatePath("/admin/kullanicilar");
  return { success: true, user };
}

export async function updateUser(id: string, data: Record<string, unknown>) {
  const session = await requireAuth();
  if (session.role !== "ADMIN" && session.id !== id) return { error: "Yetkisiz işlem." };

  const { password, ...rest } = data;
  const updateData: Record<string, unknown> = { ...rest };

  if (password && typeof password === "string" && password.length >= 8) {
    updateData.password = await hashPassword(password);
  }

  const user = await prisma.user.update({
    where: { id },
    data: updateData as any,
    select: { id: true, name: true, email: true, role: true },
  });

  revalidatePath("/admin/kullanicilar");
  return { success: true, user };
}

export async function deleteUser(id: string) {
  const session = await requireAuth();
  if (session.role !== "ADMIN") return { error: "Yetkisiz işlem." };
  if (session.id === id) return { error: "Kendinizi silemezsiniz." };

  await prisma.user.delete({ where: { id } });
  revalidatePath("/admin/kullanicilar");
  return { success: true };
}

export async function toggleUserActive(id: string, isActive: boolean) {
  const session = await requireAuth();
  if (session.role !== "ADMIN") return { error: "Yetkisiz işlem." };

  await prisma.user.update({ where: { id }, data: { isActive } });
  revalidatePath("/admin/kullanicilar");
  return { success: true };
}

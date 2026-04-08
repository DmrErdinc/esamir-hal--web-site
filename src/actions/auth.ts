"use server";
import { redirect } from "next/navigation";
import { loginUser, clearSession, getSession } from "@/lib/auth";
import { loginSchema } from "@/lib/validations";

export async function loginAction(formData: FormData) {
  const raw = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const parsed = loginSchema.safeParse(raw);
  if (!parsed.success) {
    return { error: parsed.error.errors[0]?.message || "Geçersiz form verisi." };
  }

  const result = await loginUser(parsed.data.email, parsed.data.password);
  if (result.error) {
    return { error: result.error };
  }

  redirect("/admin");
}

export async function logoutAction() {
  await clearSession();
  redirect("/admin/login");
}

export async function getCurrentUser() {
  return getSession();
}

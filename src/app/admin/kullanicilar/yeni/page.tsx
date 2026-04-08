import type { Metadata } from "next";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { UserForm } from "@/components/admin/UserForm";

export const metadata: Metadata = { title: "Yeni Kullanıcı" };

export default async function YeniKullaniciPage() {
  const session = await getSession();
  if (session?.role !== "ADMIN") redirect("/admin/kullanicilar");

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold font-sans text-gray-900">Yeni Kullanıcı</h1>
      <UserForm />
    </div>
  );
}

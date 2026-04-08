import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { UserForm } from "@/components/admin/UserForm";

export const metadata: Metadata = { title: "Kullanıcı Düzenle" };

interface Props { params: Promise<{ id: string }> }

export default async function KullaniciEditPage({ params }: Props) {
  const [{ id }, session] = await Promise.all([params, getSession()]);
  if (session?.role !== "ADMIN" && session?.id !== id) redirect("/admin");

  const user = await prisma.user.findUnique({
    where: { id },
    select: { id: true, name: true, email: true, role: true },
  });

  if (!user) notFound();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/kullanicilar" className="text-gray-400 hover:text-gray-600 transition-colors">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-2xl font-semibold font-sans text-gray-900">{user.name || user.email}</h1>
      </div>
      <UserForm user={user} />
    </div>
  );
}

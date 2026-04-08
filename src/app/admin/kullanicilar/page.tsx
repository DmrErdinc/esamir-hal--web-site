import type { Metadata } from "next";
import Link from "next/link";
import { Plus, Pencil } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";
import { getSession } from "@/lib/auth";
import { AdminUserActions } from "@/components/admin/AdminUserActions";

export const metadata: Metadata = { title: "Kullanıcılar" };

export default async function AdminKullanicilarPage() {
  const [users, session] = await Promise.all([
    prisma.user.findMany({
      orderBy: { createdAt: "asc" },
      select: { id: true, name: true, email: true, role: true, isActive: true, createdAt: true },
    }),
    getSession(),
  ]);

  const isAdmin = session?.role === "ADMIN";

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold font-sans text-gray-900">Kullanıcılar</h1>
          <p className="text-sm text-gray-500">{users.length} kullanıcı</p>
        </div>
        {isAdmin && (
          <Link
            href="/admin/kullanicilar/yeni"
            className="inline-flex items-center gap-2 px-4 py-2 bg-brand-700 text-white text-sm font-sans rounded-sm hover:bg-brand-800"
          >
            <Plus className="h-4 w-4" />
            Yeni Kullanıcı
          </Link>
        )}
      </div>

      <div className="bg-white border border-gray-200 rounded-sm overflow-hidden">
        <table className="w-full text-sm font-sans">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="text-left px-4 py-3 text-xs text-gray-500 font-medium uppercase tracking-wider">Kullanıcı</th>
              <th className="text-left px-4 py-3 text-xs text-gray-500 font-medium uppercase tracking-wider">Rol</th>
              <th className="text-left px-4 py-3 text-xs text-gray-500 font-medium uppercase tracking-wider">Durum</th>
              <th className="text-left px-4 py-3 text-xs text-gray-500 font-medium uppercase tracking-wider">Oluşturulma</th>
              {isAdmin && <th className="text-right px-4 py-3 text-xs text-gray-500 font-medium uppercase tracking-wider">İşlemler</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {users.map((u) => (
              <tr key={u.id} className="hover:bg-gray-50">
                <td className="px-4 py-3">
                  <p className="font-medium text-gray-800">{u.name || "—"}</p>
                  <p className="text-xs text-gray-400">{u.email}</p>
                </td>
                <td className="px-4 py-3">
                  <span className={`text-xs px-2 py-0.5 rounded-sm font-medium ${u.role === "ADMIN" ? "bg-purple-100 text-purple-700" : "bg-blue-100 text-blue-700"}`}>
                    {u.role === "ADMIN" ? "Yönetici" : "Editör"}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className={`text-xs px-2 py-0.5 rounded-sm ${u.isActive ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                    {u.isActive ? "Aktif" : "Pasif"}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-400 text-xs">{formatDate(u.createdAt)}</td>
                {isAdmin && (
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/admin/kullanicilar/${u.id}`} className="p-1.5 text-gray-400 hover:text-brand-700">
                        <Pencil className="h-4 w-4" />
                      </Link>
                      <AdminUserActions userId={u.id} userName={u.name || u.email} isActive={u.isActive} currentUserId={session?.id || ""} />
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

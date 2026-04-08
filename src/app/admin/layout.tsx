export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { AdminShell } from "@/components/admin/AdminShell";

export const metadata: Metadata = {
  title: { default: "Admin Panel", template: "%s — ESAMIR Admin" },
  robots: { index: false, follow: false },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") ?? "";

  if (pathname.startsWith("/admin/login")) {
    return <>{children}</>;
  }

  const session = await getSession();
  if (!session) redirect("/admin/login");

  return <AdminShell user={session}>{children}</AdminShell>;
}

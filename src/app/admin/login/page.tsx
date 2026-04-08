import type { Metadata } from "next";
import { LoginForm } from "@/components/admin/LoginForm";

export const metadata: Metadata = {
  title: "Admin Girişi — ESAMIR",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-10">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-lg">
            <span className="text-white font-serif text-base font-bold">E</span>
          </div>
          <div>
            <p className="text-white font-semibold tracking-wide text-lg leading-none">ESAMIR</p>
            <p className="text-slate-400 text-xs mt-0.5 tracking-widest uppercase">Yönetim Paneli</p>
          </div>
        </div>

        {/* Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl">
          <h2 className="text-lg font-semibold text-white mb-1">Hoş geldiniz</h2>
          <p className="text-sm text-slate-400 mb-7">Hesabınıza giriş yapın</p>
          <LoginForm />
        </div>

        <p className="text-center text-xs text-slate-600 mt-6">
          © {new Date().getFullYear()} ESAMIR. Tüm hakları saklıdır.
        </p>
      </div>
    </div>
  );
}

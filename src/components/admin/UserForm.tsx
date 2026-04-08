"use client";
import React, { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { createUser, updateUser } from "@/actions/users";

interface UserFormProps {
  user?: { id: string; name: string | null; email: string; role: string };
}

export function UserForm({ user }: UserFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    password: "",
    role: user?.role || "EDITOR",
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    startTransition(async () => {
      const data: any = { ...form };
      if (!data.password) delete data.password;

      const res = user
        ? await updateUser(user.id, data) as any
        : await createUser(data) as any;

      if (res.error) toast.error(res.error);
      else {
        toast.success(user ? "Kullanıcı güncellendi." : "Kullanıcı oluşturuldu.");
        router.push("/admin/kullanicilar");
        router.refresh();
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-sm p-6 max-w-md space-y-5">
      <div className="space-y-2">
        <Label htmlFor="name">Ad Soyad</Label>
        <Input id="name" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} placeholder="Ad Soyad" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">E-posta *</Label>
        <Input id="email" type="email" value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} required placeholder="email@ornek.com" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">{user ? "Yeni Şifre (değiştirmek istemiyorsanız boş bırakın)" : "Şifre *"}</Label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            value={form.password}
            onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
            required={!user}
            placeholder="En az 8 karakter"
            className="pr-10"
          />
          <button type="button" onClick={() => setShowPassword((v) => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="role">Rol</Label>
        <select
          id="role"
          value={form.role}
          onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))}
          className="w-full h-10 px-3 text-sm border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
        >
          <option value="EDITOR">Editör</option>
          <option value="ADMIN">Yönetici</option>
        </select>
      </div>

      <div className="flex gap-3 pt-2">
        <Button type="button" variant="outline" onClick={() => router.back()} className="flex-1">İptal</Button>
        <Button type="submit" disabled={isPending} className="flex-1 bg-brand-700 hover:bg-brand-800 text-white">
          {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : (user ? "Güncelle" : "Oluştur")}
        </Button>
      </div>
    </form>
  );
}

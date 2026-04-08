"use client";
import React, { useState, useTransition } from "react";
import { Trash2, ToggleLeft, ToggleRight, Loader2 } from "lucide-react";
import { deleteUser, toggleUserActive } from "@/actions/users";
import { toast } from "sonner";

interface AdminUserActionsProps {
  userId: string;
  userName: string;
  isActive: boolean;
  currentUserId: string;
}

export function AdminUserActions({ userId, userName, isActive, currentUserId }: AdminUserActionsProps) {
  const [isPending, startTransition] = useTransition();
  const [confirmDelete, setConfirmDelete] = useState(false);
  const isSelf = userId === currentUserId;

  function handleToggleActive() {
    startTransition(async () => {
      const res = await toggleUserActive(userId, !isActive) as any;
      if (res.error) toast.error(res.error);
      else toast.success(isActive ? "Kullanıcı pasife alındı." : "Kullanıcı aktive edildi.");
    });
  }

  function handleDelete() {
    if (!confirmDelete) {
      setConfirmDelete(true);
      setTimeout(() => setConfirmDelete(false), 3000);
      return;
    }
    startTransition(async () => {
      const res = await deleteUser(userId) as any;
      if (res.error) toast.error(res.error);
      else toast.success(`"${userName}" silindi.`);
      setConfirmDelete(false);
    });
  }

  return (
    <>
      <button
        onClick={handleToggleActive}
        disabled={isPending || isSelf}
        className="p-1.5 text-gray-400 hover:text-brand-700 transition-colors disabled:opacity-30"
        title={isSelf ? "Kendinizi pasife alamazsınız" : isActive ? "Pasife al" : "Aktive et"}
      >
        {isActive ? <ToggleRight className="h-4 w-4 text-green-600" /> : <ToggleLeft className="h-4 w-4" />}
      </button>
      <button
        onClick={handleDelete}
        disabled={isPending || isSelf}
        className={`p-1.5 transition-colors disabled:opacity-30 ${confirmDelete ? "text-red-600 animate-pulse" : "text-gray-400 hover:text-red-600"}`}
        title={isSelf ? "Kendinizi silemezsiniz" : confirmDelete ? "Onaylamak için tekrar tıklayın" : "Sil"}
      >
        {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
      </button>
    </>
  );
}

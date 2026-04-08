"use client";
import React, { useState, useTransition } from "react";
import { Trash2, Eye, EyeOff, Loader2 } from "lucide-react";
import { deleteBlogPost, togglePublish } from "@/actions/blog";
import { toast } from "sonner";

interface AdminBlogActionsProps {
  postId: string;
  postTitle: string;
  isPublished: boolean;
}

export function AdminBlogActions({ postId, postTitle, isPublished }: AdminBlogActionsProps) {
  const [isPending, startTransition] = useTransition();
  const [confirmDelete, setConfirmDelete] = useState(false);

  function handleTogglePublish() {
    startTransition(async () => {
      const res = await togglePublish(postId, !isPublished) as any;
      if (res.error) toast.error(res.error);
      else toast.success(isPublished ? "Yazı taslağa alındı." : "Yazı yayınlandı.");
    });
  }

  function handleDelete() {
    if (!confirmDelete) {
      setConfirmDelete(true);
      setTimeout(() => setConfirmDelete(false), 3000);
      return;
    }
    startTransition(async () => {
      const res = await deleteBlogPost(postId) as any;
      if (res.error) toast.error(res.error);
      else toast.success(`"${postTitle}" silindi.`);
      setConfirmDelete(false);
    });
  }

  return (
    <>
      <button
        onClick={handleTogglePublish}
        disabled={isPending}
        className="p-1.5 text-gray-400 hover:text-brand-700 transition-colors"
        title={isPublished ? "Taslağa al" : "Yayınla"}
      >
        {isPublished ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4 text-green-500" />}
      </button>
      <button
        onClick={handleDelete}
        disabled={isPending}
        className={`p-1.5 transition-colors ${confirmDelete ? "text-red-600 animate-pulse" : "text-gray-400 hover:text-red-600"}`}
        title={confirmDelete ? "Onaylamak için tekrar tıklayın" : "Sil"}
      >
        {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
      </button>
    </>
  );
}

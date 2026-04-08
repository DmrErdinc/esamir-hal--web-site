import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  icon?: React.ElementType;
  title: string;
  description?: string;
  action?: { label: string; href: string };
  className?: string;
}

export function EmptyState({ icon: Icon, title, description, action, className }: EmptyStateProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center py-16 px-4 text-center", className)}>
      {Icon && (
        <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center mb-4">
          <Icon className="h-6 w-6 text-gray-400" />
        </div>
      )}
      <h3 className="text-sm font-semibold text-gray-900 mb-1">{title}</h3>
      {description && <p className="text-xs text-gray-500 max-w-xs">{description}</p>}
      {action && (
        <Link
          href={action.href}
          className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 bg-slate-900 text-white text-xs font-medium rounded-lg hover:bg-slate-800 transition-colors"
        >
          {action.label}
        </Link>
      )}
    </div>
  );
}

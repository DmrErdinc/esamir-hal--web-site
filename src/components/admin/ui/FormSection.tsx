import React from "react";
import { cn } from "@/lib/utils";

interface FormSectionProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

export function FormSection({ title, description, children, className }: FormSectionProps) {
  return (
    <div className={cn("bg-white rounded-xl border border-gray-100 overflow-hidden", className)}>
      <div className="px-5 py-4 border-b border-gray-50">
        <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
        {description && <p className="text-xs text-gray-500 mt-0.5">{description}</p>}
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}

interface FieldGroupProps {
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
}

export function FieldGroup({ label, hint, error, required, children, className }: FieldGroupProps) {
  return (
    <div className={cn("space-y-1.5", className)}>
      <label className="block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {children}
      {hint && !error && <p className="text-xs text-gray-400">{hint}</p>}
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}

export function FormRow({ children, cols = 2 }: { children: React.ReactNode; cols?: 1 | 2 | 3 }) {
  const colClass = { 1: "grid-cols-1", 2: "grid-cols-1 sm:grid-cols-2", 3: "grid-cols-1 sm:grid-cols-3" }[cols];
  return <div className={cn("grid gap-4", colClass)}>{children}</div>;
}

export function FormActions({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100 mt-6">
      {children}
    </div>
  );
}

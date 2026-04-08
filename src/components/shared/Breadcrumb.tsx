import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className={cn("flex items-center flex-wrap gap-1", className)}>
      {items.map((item, i) => (
        <React.Fragment key={i}>
          {i > 0 && <ChevronRight className="h-3 w-3 opacity-50 flex-shrink-0" />}
          {item.href ? (
            <Link
              href={item.href}
              className="text-xs font-sans hover:opacity-80 transition-opacity"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-xs font-sans opacity-70">{item.label}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}

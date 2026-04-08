import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sm text-sm font-medium font-sans ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-brand-700 text-cream-50 hover:bg-brand-800 active:bg-brand-900 tracking-wide",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-brand-700 text-brand-700 bg-transparent hover:bg-brand-700 hover:text-cream-50 tracking-wide",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-cream-200 hover:text-brand-800 text-brand-600",
        link: "text-gold underline-offset-4 hover:underline hover:text-gold-dark",
        gold: "bg-gold text-cream-50 hover:bg-gold-dark tracking-wide",
        cream: "bg-cream-100 text-brand-700 border border-cream-300 hover:bg-cream-200",
      },
      size: {
        default: "h-11 px-8 py-2",
        sm: "h-9 rounded-sm px-4 text-xs",
        lg: "h-12 rounded-sm px-10",
        xl: "h-14 rounded-sm px-12 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };

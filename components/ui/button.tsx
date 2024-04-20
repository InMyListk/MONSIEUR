import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 uppercase tracking-wide",
  {
    variants: {
      variant: {
        default:
          "bg-white text-black border-slate-200 border-2 hover:border-slate-100 text-slate-500 ",
        primary:
          "bg-purple-400 hover:bg-purple-400/90 text-primary-foreground border-purple-500 ",
        primaryOutline: "bg-white text-purple-500 hover:bg-slate-100",
        secondary:
          "bg-green-500 hover:bg-green-500/90 text-primary-foreground border-green-600",
        secondaryOutline: "bg-white text-green-500 hover:bg-slate-100",
        danger:
          "bg-rose-500 hover:bg-rose-500/90 text-primary-foreground border-rose-600",
        dangerOutline: "bg-white text-rose-500 hover:bg-slate-100",
        super:
          "bg-indigo-500 hover:bg-indigo-500/90 text-primary-foreground border-indigo-600",
        superOutline: "bg-white text-indigo-500 hover:bg-slate-100",
        ghost:
          "bg-transparent border-0 text-slate-500 border-transparent hover:bg-slate-100",
        sidebar:
          "bg-transparent border-transparent text-slate-500 border-2 hover:bg-purple-500/10 transition-none normal-case",
        sidebarOutline:
          "bg-purple-500/15 text-purple-700 hover:bg-purple-500/15 transition-none normal-case	",
      },
      size: {
        default: "h-11 px-4 py-2",
        sm: "h-9 px-3",
        lg: "h-12 px-8",
        icon: "h-10 w-10",
        rounded: "rounded-full",
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

import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/utils/cnFunc";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ring-inset tracking-tight",
  {
    variants: {
      variant: {
        default:
          "bg-primary-500/10 text-primary-500 ring-primary-500/20 dark:text-primary-400",
        secondary: "bg-secondary text-secondary-foreground ring-secondary/30",
        destructive: "bg-destructive/10 text-destructive ring-destructive/20",
        outline: "bg-transparent text-foreground ring-border",
        warning:
          "bg-yellow-400/10 text-yellow-700 ring-yellow-500/20 dark:text-yellow-400",
        info:
          "bg-accent/10 text-accent-dark ring-accent/20 dark:text-accent",
        indigo:
          "bg-primary-500/15 text-primary-500 ring-primary-500/20 dark:text-primary-400",
        cyan: "bg-accent/15 text-accent-dark ring-accent/20 dark:text-accent",
        success:
          "bg-green-400/10 text-green-700 ring-green-400/20 dark:text-green-400",
        muted:
          "bg-neutral-100 text-neutral-600 ring-neutral-300/30 dark:bg-neutral-800 dark:text-neutral-300 dark:ring-neutral-700",
        gradient:
          "text-white ring-0 [background:var(--volta-gradient)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

function Badge({ className, variant, ...props }) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };

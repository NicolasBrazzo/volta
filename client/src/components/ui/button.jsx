import * as React from "react"
import { cva } from "class-variance-authority";
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-lg text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2 active:translate-y-px disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-primary-600 text-white shadow-sm hover:bg-primary-700",
        outline:
          "border border-primary-600 text-primary-600 bg-transparent hover:bg-primary-50 dark:border-primary-400 dark:text-primary-400 dark:hover:bg-primary-900/30",
        ghost:
          "text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800",
        accent: "bg-accent-DEFAULT text-white hover:bg-accent-DEFAULT/90",
        destructive:
          "bg-red-500/10 text-red-600 hover:bg-red-500/20 dark:bg-red-500/20 dark:hover:bg-red-500/30",
        link: "text-primary-600 underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-8 gap-1.5 px-3",
        default: "h-10 gap-1.5 px-4",
        lg: "h-12 gap-2 px-5 text-base",
        icon: "size-10",
        "icon-sm": "size-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props} />
  );
}

export { Button, buttonVariants }

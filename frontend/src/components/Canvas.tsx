import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

export function Canvas({ ref, className, ...props }: ComponentProps<'canvas'>) {
  return (
    <canvas
      ref={ref}
      className={cn(className, 'canvas-zoom rounded-md border-2 dark:border-gray-600 bg-transparent shadow-xl')}
      {...props}
    />
  )
}
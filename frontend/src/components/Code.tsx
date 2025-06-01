import type { PropsWithChildren } from "react";

export function Code({children}: PropsWithChildren) {
  return (
    <code className="bg-primary text-secondary p-2 rounded-sm font-mono whitespace-pre-wrap text-sm block">{children}</code>
  )
}
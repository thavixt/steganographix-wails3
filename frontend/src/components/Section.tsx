import type { PropsWithChildren } from "react";
import { Label } from "./ui/label";

export function Section({ children, title }: PropsWithChildren<{ title?: string }>) {
  return (
    <section className='flex flex-col gap-4 items-center justify-start'>
      {title && <Label>{title}</Label>}
      {children}
    </section>
  )
}
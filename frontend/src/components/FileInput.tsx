import type { ComponentProps } from "react";

export function FileInput({ className, name, label, ...props }: ComponentProps<'input'> & { label: string }) {
  return (
    <div className="flex flex-col items-start gap-1">
      <label htmlFor={name}>{label}:</label>
      <input className="flex flex-col gap-2 bg-secondary rounded-md p-2 cursor-pointer disabled:cursor-none border border-transparent hover:border-primary" type="file" name={name} id={`${name}-input`} {...props}></input>
    </div>
  )
}
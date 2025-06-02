import type { ComponentProps } from "react";

export function FileInput({ className, name, label, ...props }: ComponentProps<'input'> & { label?: string }) {
  return (
    <div className="flex flex-col items-start gap-1">
      {label ? <label htmlFor={name}>{label}:</label> : null}
      <input className="text-sm font-medium p-2 bg-primary text-secondary rounded-md p-1 cursor-pointer disabled:cursor-none border border-transparent hover:border-primary" type="file" name={name} id={`${name}-input`} {...props}></input>
    </div>
  )
}
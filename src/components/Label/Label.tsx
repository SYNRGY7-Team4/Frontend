import { LabelProps } from "./types"

export default function Label({ children, htmlFor, ...props }: LabelProps) {
  return (
    <label className='text-primary-blue' htmlFor={htmlFor} {...props}>
      {children}
    </label>
  )
}

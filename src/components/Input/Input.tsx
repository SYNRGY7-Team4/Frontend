import React from "react"

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        className={`w-full bg-neutral-02 py-3 px-5 rounded-lg focus:outline-primary-blue border ${className}`}
        ref={ref}
        {...props}
      />
    )
  }
)

export default Input

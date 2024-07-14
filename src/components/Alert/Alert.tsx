import { cva } from "class-variance-authority"
import { AlertProps } from "./types"
import cn from "@/utils/cn"

const alertVariant = cva(
  "w-full border rounded-md text-sm py-1.5 px-2.5 flex items-center gap-2 mb-3",
  {
    variants: {
      variant: {
        success: "border-secondary-green text-secondary-green",
        danger: "border-secondary-red text-secondary-red",
      },
    },
    defaultVariants: {
      variant: "success",
    },
  }
)

export default function Alert({
  variant,
  children,
  className,
  leadingIcon,
}: AlertProps) {
  return (
    <div className={cn(alertVariant({ variant, className }))}>
      {leadingIcon} {children}
    </div>
  )
}

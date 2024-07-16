import { cva } from "class-variance-authority"
import { AlertProps } from "./types"
import cn from "@/utils/cn"
import { MdCheckCircleOutline, MdClose, MdWarningAmber } from "react-icons/md"
import { useState } from "react"

const alertVariant = cva(
  "relative w-[calc(100%-3rem)] max-w-[450px] rounded-lg bg-neutral-01 p-11 flex flex-col items-center gap-2 mb-3 text-3xl font-bold tracking-tight text-center",
  {
    variants: {
      variant: {
        success: "text-secondary-green",
        danger: "text-secondary-red",
      },
    },
    defaultVariants: {
      variant: "success",
    },
  }
)

export default function Alert({ className, variant, children }: AlertProps) {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <div
      className={`${
        isOpen ? "block" : "hidden"
      } fixed z-10 top-0 left-0 w-full h-full bg-neutral-09/35 grid place-items-center`}
    >
      <div className={cn(alertVariant({ className, variant }))}>
        <button
          type='button'
          aria-label='Tutup'
          className='absolute top-5 left-5'
          onClick={() => setIsOpen(false)}
        >
          <MdClose size={48} color='#1C1B1F' />
        </button>
        {variant === "danger" && <MdWarningAmber size={132} />}
        {variant === "success" && <MdCheckCircleOutline size={132} />}
        <p>{children}</p>
      </div>
    </div>
  )
}

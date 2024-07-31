import { useEffect } from "react";
import { cva } from "class-variance-authority";
import { AlertProps } from "./types";
import cn from "@/utils/cn";
import { MaterialSymbol } from "react-material-symbols";
import "react-material-symbols/rounded";

const alertVariant = cva(
  "relative w-[calc(100%-3rem)] max-w-[450px] rounded-xl bg-neutral-01 p-11 flex flex-col items-center gap-2 mb-3 text-3xl font-bold tracking-tight text-center",
  {
    variants: {
      variant: {
        success: "text-secondary-green",
        danger: "text-secondary-red",
        primary: "text-primary-darkBlue",
      },
    },
    defaultVariants: {
      variant: "success",
    },
  }
);

export default function Alert({
  className,
  variant,
  children,
  isOpen,
  onClose,
  autoDismiss = false,
  showCloseButton = true,
}: AlertProps & { autoDismiss?: boolean; showCloseButton?: boolean }) {
  useEffect(() => {
    if (autoDismiss && isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [autoDismiss, isOpen, onClose]);

  return (
    <div
      className={`${
        isOpen ? "block" : "hidden"
      } fixed z-10 top-0 left-0 w-full h-full bg-neutral-09/35 grid place-items-center`}
    >
      <div className={cn(alertVariant({ className, variant }))}>
        {showCloseButton && (
          <button
            type="button"
            aria-label="Tutup"
            className="absolute top-5 right-5"
            onClick={onClose}
          >
            <MaterialSymbol
              icon="close"
              size={48}
              title="close"
              color="#1C1B1F"
            />
          </button>
        )}
        {variant === "danger" && (
          <MaterialSymbol icon="warning" size={132} title="warning" />
        )}
        {variant === "success" && (
          <MaterialSymbol
            fill
            icon="new_releases"
            size={132}
            title="new_releases"
          />
        )}
        {variant === "primary" && (
          <MaterialSymbol
            fill
            icon="preliminary"
            size={132}
            title="preliminary"
          />
        )}
        <div className="w-full">{children}</div>
      </div>
    </div>
  );
}

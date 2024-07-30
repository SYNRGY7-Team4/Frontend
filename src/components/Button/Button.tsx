import { cva } from "class-variance-authority";
import { ButtonProps } from "./types";
import cn from "../../utils/cn";

const buttonVariant = cva("rounded-xl", {
  variants: {
    variant: {
      primary:
        "font-semibold text-white hover:shadow-md hover:opacity-80 transition duration-300 ease-in-out bg-primary-blue w-[203px] h-12",
      secondary:
        "font-semibold text-primary-blue hover:shadow-md hover:opacity-80 transition duration-300 ease-in-out border-2 border-primary-blue w-[203px] h-12",
      gradient:
        "font-semibold text-white hover:shadow-md hover:opacity-80 transition duration-300 ease-in-out bg-gradient-to-t from-primary-darkBlue to-primary-blue ue w-[203px] h-12",
    },
    size: {
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
      xl: "text-xl",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "sm",
  },
});

const Button: React.FC<ButtonProps> = ({
  children,
  disabled,
  className,
  variant,
  size,
  type = 'button', // Set default value for type
  ...props
}: ButtonProps) => {
  return (
    <button
      {...props}
      type={type}
      disabled={disabled}
      className={cn(buttonVariant({ variant, size, className }))}
    >
      {children}
    </button>
  );
};

export default Button;

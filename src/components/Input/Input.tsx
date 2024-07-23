import React from "react";
type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  className?: string;
};

const Input: React.ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { className, ...props },
  ref
) => {
  return (
    <input
      className={`w-full bg-neutral-02 py-3 px-5 rounded-lg focus:outline-primary-blue ${className}`}
      ref={ref}
      {...props}
    />
  );
};

export default React.forwardRef(Input);

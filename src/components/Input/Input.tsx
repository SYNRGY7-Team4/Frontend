type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  className?: string;
};

export default function Input({ className, ...props }: InputProps) {
  return (
    <input
      className={`w-full bg-neutral-02 py-3 px-5 rounded-lg focus:outline-primary-blue ${className}`}
      {...props}
    />
  );
}

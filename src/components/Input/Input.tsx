export default function Input({
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className='w-full bg-neutral-02 py-3 px-5 rounded-lg focus:outline-primary-blue'
      {...props}
    />
  )
}

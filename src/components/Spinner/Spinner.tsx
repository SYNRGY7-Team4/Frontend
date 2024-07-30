import spinner from "@/assets/spinner.svg"

export default function Spinner() {
  return (
    <div className='fixed z-10 top-0 left-0 w-full h-full bg-neutral-09/35 grid place-items-center'>
      <div className='w-[280px] h-[156px] bg-neutral-01 rounded-lg grid place-items-center'>
        <img src={spinner} className='animate-spin' alt='Loading' />
      </div>
    </div>
  )
}

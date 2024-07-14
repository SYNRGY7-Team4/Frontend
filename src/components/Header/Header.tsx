import logo from "@/assets/logo.png"

export default function Header() {
  return (
    <header className='px-8 h-[73px] md:px-14 md:h-[94px] flex items-center bg-neutral-01'>
      <div className='w-[78px] md:w-[120px]'>
        <img src={logo} alt='Lumi Logo' />
      </div>
    </header>
  )
}

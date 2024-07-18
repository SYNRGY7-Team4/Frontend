import logo from "@/assets/logo.png"
import { Link } from "react-router-dom"

export default function Header() {
  return (
    <header className='px-8 h-[73px] md:px-14 md:h-[94px] flex items-center justify-between bg-neutral-01'>
      <div className='w-[78px] md:w-[120px]'>
        <img src={logo} alt='Lumi Logo' />
      </div>
      <nav className='flex items-center gap-x-8'>
        <Link
          to='#'
          className='text-neutral-09 font-bold text-lg tracking-wide'
        >
          Bantuan
        </Link>
        <Link
          to='#'
          className='text-neutral-09 font-bold text-lg tracking-wide'
        >
          Info Perusahaan
        </Link>
      </nav>
    </header>
  )
}

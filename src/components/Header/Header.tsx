import logo from "@/assets/logo.png"

export default function Header() {
  return (
    <header className='px-8 h-[73px] md:px-[83px] md:h-[94px] flex items-center bg-neutral-01'>
      <div className='w-full flex justify-between'>
        <img src={logo} alt='Lumi Logo' className="w-[78px] md:w-[120px]"  />
        <div className="flex items-center gap-8 font-bold text-[24px] text-[#1C1C1C]">
          <p>Bantuan</p>
          <p>Info Perusahaan</p>
        </div>
      </div>
    </header>
  )
}

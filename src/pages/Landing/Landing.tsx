import Footer from "@/components/Footer/Footer";
import lumiLetters from "@/assets/lumi_letters.svg";
import lumiMascot from "@/assets/lumi_mascot.svg";
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <>
      <header className='container lg:h-[163px] mx-auto px-6 py-12 lg:py-0 flex items-center'>
        <Link to='/'>
          <img
            src={lumiLetters}
            className='w-36 lg:w-auto'
            alt='Logo Lumi Bank'
          />
        </Link>
      </header>
      <main className='container min-h-[calc(100vh-163px-75px)] mx-auto px-6 py-12 flex flex-col lg:flex-row lg:items-center gap-14'>
        <div className='flex-shrink-0 self-center'>
          <img src={lumiMascot} alt='Mascot Lumi Bank' />
        </div>
        <div className=''>
          <h1 className='text-7xl lg:text-[90px] font-bold leading-none mb-6'>
            Sinari Perjalanan Finansialmu
          </h1>
          <p className='text-[34px] font-bold text-[#76A7FF] mb-9'>
            Rasakan mudahnya bertransaksi bersama Lumi
          </p>
          <div className='flex flex-col md:flex-row items-center gap-9'>
            <Link
              to='/download'
              className='w-full xl:w-[406px] h-[103px] grid place-items-center rounded-3xl text-[32px] text-white bg-primary-blue'
              aria-label='Download Lumi'
            >
              Download Lumi
            </Link>
            <Link
              to='/login'
              className='w-full xl:w-[406px] h-[103px] grid place-items-center rounded-3xl text-[32px] text-primary-blue border-2 border-primary-blue'
              aria-label='Bergabung Sekarang'
            >
              Bergabung Sekarang
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

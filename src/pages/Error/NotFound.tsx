import FooterDashboard from "@/components/Footer/FooterDasboard"
import Header from "@/components/Header/HeaderDasboard"
import notFound from "@/assets/404.svg"
import { Link } from "react-router-dom"

export default function NotFound() {
  return (
    <>
      <Header />
      <main className='w-full h-screen px-6 grid place-items-center'>
        <div className='flex flex-col items-center'>
          <img
            src={notFound}
            className='mb-10'
            alt='Ikon halaman tidak ditemukan'
          />
          <h1 className='font-bold text-[32px] text-center mb-6'>
            Halaman tidak ditemukan
          </h1>
          <Link
            to='/dashboard'
            className='w-[min(100%,328px)] py-3 bg-primary-blue rounded-lg text-center text-white'
            role='button'
            aria-label='Tombol kembali ke dashboard'
          >
            Kembali ke dashboard
          </Link>
        </div>
      </main>
      <FooterDashboard />
    </>
  )
}

import FooterDashboard from "@/components/Footer/FooterDasboard"
import Header from "@/components/Header/HeaderDasboard"
import SaldoCard from "@/components/SaldoCard/SaldoCard"
import TransaksiTerbaruCard from "@/components/TransaksiTerbaruCard/TransaksiTerbaruCard"
import BayarCard from "@/components/BayarCard/BayarCard"
import RiwayatTransaksiTable from "@/components/RiwayatTransaksiTable/RiwayatTransaksiTable"

export default function Dashboard() {
  return (
    <>
      <Header />
      <main className='w-[min(100%,1056px)] px-6 lg:mx-auto lg:px-0 py-10'>
        <h1 className='text-4xl font-bold mb-1'>Halo, Tunas Bangsa</h1>
        <p className='mb-8'>Terakhir Masuk: 13 Juli 2024 19:30</p>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[minmax(0,_1fr)_minmax(0,_1fr)_minmax(384px,_1fr)] gap-7'>
          <div className=''>
            <SaldoCard />
          </div>

          <div className=''>
            <TransaksiTerbaruCard />
          </div>

          <div className='md:col-span-2 lg:col-span-1'>
            <BayarCard />
          </div>

          <div className='md:col-span-2 lg:col-span-3'>
            <RiwayatTransaksiTable />
          </div>
        </div>
      </main>
      <FooterDashboard />
    </>
  )
}

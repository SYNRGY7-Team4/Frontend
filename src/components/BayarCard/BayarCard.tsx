import {
  MdOutlineAddToHomeScreen,
  MdOutlineBolt,
  MdOutlineWallet,
  MdOutlineWifi,
} from "react-icons/md"
import { Link } from "react-router-dom"

export default function BayarCard() {
  return (
    <div className='w-full h-full bg-neutral-01 p-6 rounded-lg shadow-02 flex flex-col gap-y-2.5'>
      <h2 className='text-2xl font-bold'>Bayar</h2>
      <div className='h-full flex items-center justify-center'>
        <div className='grid grid-cols-2 gap-2 md:grid-cols-4'>
          <Link
            to='#'
            className='flex flex-col items-center bg-neutral-01 rounded-xl border border-neutral-02 shadow-02 p-2 w-20 h-20 hover:scale-105 transition duration-150 ease-in-out'
          >
            <MdOutlineBolt size={40} />
            <p>Listrik</p>
          </Link>
          <Link
            to='#'
            className='flex flex-col items-center bg-neutral-01 rounded-xl border border-neutral-02 shadow-02 p-2 w-20 h-20 hover:scale-105 transition duration-150 ease-in-out'
          >
            <MdOutlineAddToHomeScreen size={40} />
            <p>Pulsa</p>
          </Link>
          <Link
            to='#'
            className='flex flex-col items-center bg-neutral-01 rounded-xl border border-neutral-02 shadow-02 p-2 w-20 h-20 hover:scale-105 transition duration-150 ease-in-out'
          >
            <MdOutlineWifi size={40} />
            <p>Data</p>
          </Link>
          <Link
            to='#'
            className='flex flex-col items-center bg-neutral-01 rounded-xl border border-neutral-02 shadow-02 p-2 w-20 h-20 hover:scale-105 transition duration-150 ease-in-out'
          >
            <MdOutlineWallet size={40} />
            <p>e-Wallet</p>
          </Link>
        </div>
      </div>
    </div>
  )
}

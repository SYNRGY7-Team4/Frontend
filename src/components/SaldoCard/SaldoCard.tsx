import { MdVisibility } from "react-icons/md"
import balanceCardAccent from "@/assets/balance_card_accent.svg"

export default function SaldoCard() {
  return (
    <div className='w-full h-full bg-neutral-01 p-6 rounded-lg shadow-02 flex flex-col gap-y-2.5'>
      <h2 className='text-2xl font-bold'>Saldo</h2>
      <div
        className='w-full max-w-[300px] h-[200px] self-center px-5 py-9 rounded-xl shadow-02 flex flex-col justify-center text-neutral-01 relative overflow-hidden'
        style={{
          backgroundImage: `url(${balanceCardAccent}), linear-gradient(119.69deg, #0066AE 15.4%, #0A3967 84.03%)`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "contain",
        }}
      >
        <p className='text-2xl font-bold mb-1.5'>Tunas Bangsa</p>
        <p className='mb-3'>7293 **** **** 9283</p>
        <div className='flex items-center gap-x-4'>
          <p className='text-2xl font-bold'>Rp. 3.492.203</p>
          <button type='button'>
            <MdVisibility size={20} color='#B7B9C8' />
          </button>
        </div>
        <span className='absolute bottom-2 right-4'>BCA</span>
      </div>
    </div>
  )
}

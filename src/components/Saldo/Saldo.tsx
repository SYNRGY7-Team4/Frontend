import blueCloud from '@/assets/saldo-blue-cloud.svg'
import j1 from '@/assets/saldo-J-1.svg' 
import j2 from '@/assets/saldo-J-2.svg'
import i from '@/assets/saldo-I.svg' 
import { IoEye } from 'react-icons/io5'
import { IconContext } from 'react-icons'
import Button from '../Button/Button'

export default function Saldo(){
  return(
    <div className="px-8 w-[302px] h-[230px] shadow-03 rounded-[10px] flex flex-col justify-center gap-2 bg-neutral-01">
      <h1 className=" font-bold text-lg md:text-xl">Saldo Saya</h1>
      <div className="overflow-hidden shadow-03 border-none w-[238px] h-[153px] relative bg-custom-gradient rounded-[15px]">
        <img className='absolute top-0 left-0' src={blueCloud} alt="" />
        <img className='absolute top-0 right-14' src={j1} alt="" />
        <img className='absolute top-0 right-6' src={j2} alt="" />
        <img className='absolute top-0 right-0' src={i} alt="" />

        <p className='absolute bottom-3 right-4 text-neutral-01 font-normal text-xs'>Lumi</p>

        <div className='h-full w-full gap-1 flex flex-col justify-center p-5'>
          <p className='font-bold text-lg md:text-xl text-neutral-01 tracking-normal'>Nur Afina</p>

          <div className='flex gap-2 items-center'>
            <p className='font-normal text-sm text-neutral-01'>7293109283</p>
            <Button className='w-fit h-fit hover:shadow-none bg-transparent'>
              <IconContext.Provider value={{ color: "#B7B9C8", size: "14px",  }}>
                <IoEye />
              </IconContext.Provider>
            </Button>
            
          </div>

          <div className='flex gap-2 items-center'>
            <p className='font-bold text-lg md:text-xl text-neutral-01 tracking-wide'>Rp 3.492.203</p>
            <Button className='w-fit h-fit hover:shadow-none bg-transparent'>
              <IconContext.Provider value={{ color: "#B7B9C8", size: "20px",  }}>
                <IoEye />
              </IconContext.Provider>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
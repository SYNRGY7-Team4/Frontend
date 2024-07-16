import bgAuth from "@/assets/bg-auth.jpg"
import { Link } from "react-router-dom"
import Button from "@/components/Button/Button"
import Header from "@/components/Header/Header"
import Footer from "@/components/Footer/Footer"
import Input from "@/components/Input/Input"
import Label from "@/components/Label/Label"

export default function AturPin() {
  return (
    <>
      <Header />
      <main
        className='w-full h-[calc(100vh-73px-75px)] md:h-[calc(100vh-94px-75px)] bg-cover bg-center'
        style={{ backgroundImage: `url(${bgAuth})` }}
      >
        <div className='container mx-auto pr-[120px] flex items-center justify-center md:justify-end h-full py-[152px]'>
          <div className='bg-neutral-01 px-8 pt-12 md:px-14 rounded-lg w-[450px] h-[480px]'>
            <h1 className='mb-10 text-3xl text-primary-blue font-bold'>
              Atur Pin
            </h1>
            <form className='flex flex-col gap-y-8'>
              <div className='flex flex-col gap-y-3'>
                <div className='flex flex-col gap-y-1'>
                  <Label htmlFor='pin'>Pin</Label>
                  <Input
                    type="password"
                    id='pin'
                    placeholder='Pin'
                    aria-label='Pin'
                  />
                </div>
                <div className='flex flex-col gap-y-1'>
                  <Label htmlFor='konfirm-pin'>Konfirmasi Pin</Label>
                  <Input
                    type='password'
                    id='konfirm-pin'
                    placeholder='Konfirmasi Ulang Pin'
                    aria-label='Konfirmasi Ulang Pin'
                  />
                </div>
                
              </div>
              <div className='flex flex-col gap-y-2 items-center'>
                <Button aria-label='Tombol Lanjut'>Lanjut</Button>
                
              </div>    
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

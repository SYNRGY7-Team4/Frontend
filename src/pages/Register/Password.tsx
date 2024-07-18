import bgAuth from "@/assets/bg-auth.jpg"
import Button from "@/components/Button/Button"
import Header from "@/components/Header/Header"
import Footer from "@/components/Footer/Footer"
import Input from "@/components/Input/Input"
import Label from "@/components/Label/Label"
import eyeOpen from "@/assets/eye-open.svg"
import eyeClose from "@/assets/eye-closed.svg"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function Password() {
  const [visibility, setVisibility] = useState({
    password: false,
    confirmPassword: false
  });

  const toggleVisibility = (event: React.MouseEvent<HTMLButtonElement>, field: 'password' | 'confirmPassword') => {
    event.preventDefault()

    setVisibility(prevVisibility => ({
      ...prevVisibility,
      [field]: !prevVisibility[field]
    }));
  }

  const navigate = useNavigate();
  const next = () => {
    navigate('/register/ktp');
  }

  return (
    <>
      <Header />
      <main
        className='w-full min-h-[828px] h-[calc(100vh-73px-75px)] md:h-[calc(100vh-94px-75px)] bg-cover bg-center'
        style={{ backgroundImage: `url(${bgAuth})` }}
      >
        <div className='container mx-auto px-6 flex items-center justify-center md:justify-end h-full'>
          <div className='bg-neutral-01 px-8 py-14 md:px-14 rounded-lg w-[450px] min-h-[480px]' >
            <h1 className='mb-10 text-3xl text-primary-blue font-bold'>
              Buat Password
            </h1>
            <form className='flex flex-col gap-y-8'>
              <div className='flex flex-col gap-y-3'>
                <div className='flex flex-col gap-y-1'>
                  <Label htmlFor='password'>Password</Label>
                  <div className="flex relative">
                    <Input
                      className="w-full bg-neutral-02 py-3 pl-5 pr-10 rounded-lg focus:outline-primary-blue"
                      type={visibility.password ? 'text' : 'password'}
                      id='password'
                      placeholder='Password'
                      aria-label='Masukkan Password Anda'
                      required
                    />
                    <Button onClick={(event) => toggleVisibility(event, 'password')} className="absolute right-[10px] flex items-center w-fit h-full hover:shadow-none bg-transparent">
                      <img 
                        src={visibility.password ? eyeClose : eyeOpen} 
                        alt="eye-open" 
                        className="w-[25px] cursor-pointer z-1"/>
                    </Button>
                  </div>
                </div>
                <div className='flex flex-col gap-y-1'>
                  <Label htmlFor='confirm-password'>Ulangi Password</Label>
                  <div className="flex relative">
                    <Input
                      className="w-full bg-neutral-02 py-3 pl-5 pr-10 rounded-lg focus:outline-primary-blue"
                      type={visibility.confirmPassword? 'text' : 'password'}
                      id='confirm-password'
                      placeholder='Ulangi Password'
                      aria-label='Masukkan Ulang Password Anda'
                      required
                    />
                    <Button onClick={(event) => toggleVisibility(event, 'confirmPassword')} className="absolute right-[10px] flex items-center w-fit h-full hover:shadow-none bg-transparent">
                      <img 
                        src={visibility.confirmPassword ? eyeClose : eyeOpen} 
                        alt="eye-open" 
                        className="w-[25px] cursor-pointer z-1"/>
                    </Button>
                  </div>
                </div>
              </div>
              <div className='flex flex-col items-center'>
                <Button aria-label='Tombol Lanjut' className='my-9' onClick={next}>
                  Lanjut
                </Button>
              </div>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

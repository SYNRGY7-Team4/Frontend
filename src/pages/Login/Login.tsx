import bgAuth from "@/assets/bg-auth.jpg"
import { Link } from "react-router-dom"
import Button from "@/components/Button/Button"
import Header from "@/components/Header/Header"
import Footer from "@/components/Footer/Footer"
import Input from "@/components/Input/Input"
import Label from "@/components/Label/Label"

export default function Login() {
  return (
    <>
      <Header />
      <main
        className='w-full min-h-[828px] h-[calc(100vh-73px-75px)] md:h-[calc(100vh-94px-75px)] bg-cover bg-center'
        style={{ backgroundImage: `url(${bgAuth})` }}
      >
        <div className='container mx-auto px-6 flex items-center justify-center md:justify-end h-full'>
          <div className='bg-neutral-01 px-8 py-14 md:px-14 rounded-lg w-[450px]'>
            <h1 className='mb-10 text-3xl text-primary-blue font-bold'>
              Selamat Datang,
            </h1>
            <form className='flex flex-col gap-y-8'>
              <div className='flex flex-col gap-y-3'>
                <div className='flex flex-col gap-y-1'>
                  <Label htmlFor='email'>Email</Label>
                  <Input
                    type='email'
                    id='email'
                    placeholder='*****@email.com'
                    aria-label='Masukkan email Anda'
                  />
                </div>
                <div className='flex flex-col gap-y-1'>
                  <Label htmlFor='password'>Password</Label>
                  <Input
                    type='password'
                    id='password'
                    placeholder='Password'
                    aria-label='Masukkan password Anda'
                  />
                </div>
                <div className='flex justify-end'>
                  <Link
                    to='/forgot-password'
                    className='text-primary-blue'
                    aria-label='Link menuju halaman lupa password'
                  >
                    Lupa password?
                  </Link>
                </div>
              </div>
              <div className='flex flex-col gap-y-2 items-center'>
                <Button aria-label='Tombol masuk'>Masuk</Button>
                <p>
                  Belum punya akun?{" "}
                  <Link
                    to='/register'
                    className='text-primary-blue'
                    aria-label='Link menuju halaman register'
                  >
                    Registrasi
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

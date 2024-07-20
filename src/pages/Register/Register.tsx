import React, { useState } from 'react';
import bgAuth from "@/assets/bg-auth.jpg"
import { Link } from "react-router-dom"
import Button from "@/components/Button/Button"
import Header from "@/components/Header/Header"
import Footer from "@/components/Footer/Footer"
import Input from "@/components/Input/Input"
import Label from "@/components/Label/Label"
import PhoneNumberInput from "@/components/Input/PhoneNumberInput";

const Register: React.FC = () => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [errors, setErrors] = useState<{ email: string; phone: string }>({ email: '', phone: '' });

  const validateEmail = (email: string) => {
    if (!email) {
      return 'Email tidak boleh kosong';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      return 'Email harus mengandung simbol @';
    }
    return '';
  };

  const validatePhone = (phone: string) => {
    if (!phone) {
      return 'Nomor handphone tidak boleh kosong';
    } else if (!/^\d{11,13}$/.test(phone)) {
      return 'Nomor handphone harus terdiri dari 11-13 angka';
    }
    return '';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const emailError = validateEmail(email);
    const phoneError = validatePhone(phone);

    if (emailError || phoneError) {
      setErrors({ email: emailError, phone: phoneError });
    } else {
      // Lakukan submit form
      console.log('Form submitted', { email, phone });
    }
  };

  return (
    <>
      <Header />
      <main
        className='w-full h-[calc(100vh-73px-75px)] md:h-[calc(100vh-94px-75px)] bg-cover bg-center'
        style={{ backgroundImage: `url(${bgAuth})` }}
      >
        <div className='container mx-auto px-6 flex items-center justify-center md:justify-end h-full'>
          <div className='bg-neutral-01 px-8 py-14 md:px-14 rounded-lg w-[450px]'>
            <h1 className='mb-10 text-3xl text-primary-blue font-bold'>
              Selamat Datang,
            </h1>
            <form className='flex flex-col gap-y-8' onSubmit={handleSubmit}>
              <div className='flex flex-col gap-y-3'>
                <div className='flex flex-col gap-y-1'>
                  <Label htmlFor='email'>Email</Label>
                  <Input
                    type='email'
                    id='email'
                    placeholder='*****@email.com'
                    aria-label='Masukkan email Anda'
                    className='w-full bg-neutral-02 py-3 px-5 rounded-lg focus:outline-primary-blue'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {errors.email && <p className='text-red-500 text-sm'>{errors.email}</p>}
                </div>
                <div className='flex flex-col gap-y-1'>
                  <PhoneNumberInput
                    id='phoneNumber'
                    placeholder='Masukkan nomor handphone anda!'
                    ariaLabel='Masukkan nomor handphone anda!'
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                  {errors.phone && <p className='text-red-500 text-sm'>{errors.phone}</p>}
                </div>
              </div>
              <div className='flex flex-col gap-y-2 items-center'>
                <Button type='submit' aria-label='Tombol register'>Register</Button>
                <p>
                  Sudah punya akun?{' '}
                  <Link
                    to='/login'
                    className='text-primary-blue'
                    aria-label='Link menuju halaman login'
                  >
                    Login
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Register;
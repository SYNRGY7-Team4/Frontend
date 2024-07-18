import { useState, useRef, useEffect } from "react";
import bgAuth from "@/assets/bg-auth.jpg";
import Button from "@/components/Button/Button";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import Label from "@/components/Label/Label";

let currentOTPIndex: number = 0;

export default function Verification_OTP() {
    const [otp, setOtp] = useState(new Array(6).fill(''));
    const [activeOTPIndex, setActiveOTPIndex] = useState(0);
    const [counter, setCounter] = useState(60);
  
    const inputRef = useRef<HTMLInputElement>(null);
  
    const handleOnChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = target;
      const newOTP: string[] = [...otp];
      newOTP[currentOTPIndex] = value.substring(value.length - 1);
  
      if (!value) {
        setActiveOTPIndex(currentOTPIndex - 1);
      } else {
        setActiveOTPIndex(currentOTPIndex + 1);
      }
  
      setOtp(newOTP);
    };
  
    const handleOnKeyDown = (
      e: React.KeyboardEvent<HTMLInputElement>,
      index: number
    ) => {
      currentOTPIndex = index;
      if (e.key === 'Backspace') {
        setActiveOTPIndex(currentOTPIndex - 1);
      }
    };
  
    useEffect(() => {
      inputRef.current?.focus();
    }, [activeOTPIndex]);

    useEffect(() => {
        if (counter > 0) {
          const timer = setTimeout(() => setCounter(counter - 1), 1000);
          return () => clearTimeout(timer);
        }
      }, [counter]);

    const minutes = Math.floor(counter / 60);
    const seconds = counter % 60;

    const formattedTime = `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;

    return (
        <>
            <Header />
            <main
                className='w-full min-h-[828px] h-[calc(100vh-73px-75px)] md:h-[calc(100vh-94px-75px)] bg-cover bg-center'
                style={{ backgroundImage: `url(${bgAuth})` }}
            >
                <div className='container mx-auto px-6 flex items-center justify-center md:justify-end h-full'>
                <div className='bg-neutral-01 px-8 py-14 md:px-14 rounded-lg w-[450px]'>
                        <h1 className='mb-4 text-3xl text-primary-blue font-bold'>
                            Verifikasi 
                        </h1>
                        <form className='flex flex-col gap-y-8'>
                            <div className='flex flex-col gap-y-3'>
                                <div className='flex flex-col gap-y-6'>
                                    <Label htmlFor='otp' className='text-black'>
                                        Kode OTP telah dikirimkan ke 0812 **** **89, masukkan kode dibawah ini untuk melanjutkan
                                    </Label>
                                    <div id='otp' className='flex justify-start items-center space-x-2' aria-label='Masukkan OTP Anda'>
                                    {otp.map((_, index) => (
                                        <div key={index}>
                                            <input
                                                type='number' 
                                                aria-label={`Digit OTP ${index + 1}`}
                                                aria-required='true'
                                                maxLength={1}
                                                ref={activeOTPIndex === index ? inputRef : null}
                                                className='w-6 h-6 md:w-11 md:h-11 border-b-2 rounded bg-transparent outline-none text-center font-semibold text-xl border-neutral-03 focus:border-gray-700 focus:text-gray-700 text-gray-400 transition [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
                                                onChange={handleOnChange}
                                                onKeyDown={(e) => handleOnKeyDown(e, index)}
                                                value={otp[index]}
                                            />
                                        </div>
                                    ))}
                                    </div>
                                </div>
                            </div>
                            <div className='flex flex-col gap-y-8 items-center'>
                                <div className='text-center'>
                                    <p className='text-sm'>{formattedTime}</p>
                                    <Button aria-label='Tombol kirim ulang kode OTP' className='border-0 outline-none bg-transparent text-sm text-primary-blue'>Kirim kode ulang</Button>
                                </div>
                                <div>
                                    <Button aria-label='Tombol lanjut'>Lanjut</Button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}

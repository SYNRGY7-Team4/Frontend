import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import bgAuth from "@/assets/bg-auth.jpg";
import Button from "@/components/Button/Button";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import Label from "@/components/Label/Label";
import Alert from "@/components/Alert/Alert";
import { otpSchema, OTPInput } from "@/validation/OTPSchema";

let currentOTPIndex: number = 0;

export default function Verification_OTP() {
    const [otp, setOtp] = useState(new Array(6).fill(''));
    const [activeOTPIndex, setActiveOTPIndex] = useState(0);
    const [minutes, setMinutes] = useState(1);
    const [seconds, setSeconds] = useState(0);
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const [alertStatus, setAlertStatus] = useState<"success" | "danger" | undefined>(undefined);
    const [alertMessage, setAlertMessage] = useState("");
  
    const inputRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    const { handleSubmit, formState: { errors }, setValue } = useForm<OTPInput>({
      resolver: zodResolver(otpSchema),
      defaultValues: { otp: new Array(6).fill('') }
    });
  
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
      setValue('otp', newOTP);
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
  
    const resendOTP = () => {
        setMinutes(1);
        setSeconds(30);
    }

    useEffect(() => {
      inputRef.current?.focus();
    }, [activeOTPIndex]);

    useEffect(() => {
        const interval = setInterval(() => {
            if(seconds > 0){
                setSeconds(seconds - 1);
            }

            if(seconds === 0){
                if(minutes === 0){
                    clearInterval(interval);
                } else {
                    setSeconds(59);
                    setMinutes(minutes - 1);
                }
            }
        }, 1000);
        return () => {
            clearInterval(interval);
        }
    }, [minutes, seconds]);

    useEffect(() => {
        if (Object.keys(errors).length > 0) {
          setAlertStatus("danger");
          setAlertMessage(errors.otp?.message as string || "Terjadi error");
          setIsAlertOpen(true);
        }
      }, [errors]);
    
    const handleCloseAlert = () => {
        setIsAlertOpen(false);
    };
    
    const onSubmit: SubmitHandler<OTPInput> = (data) => {
        const userOTPInput = parseInt(data.otp.join(''), 10);
        if(userOTPInput == 222222){
            setAlertStatus("success");
            setAlertMessage("OTP verified successfully!");
            setIsAlertOpen(true);
            navigate('/register/password')
        }
        else{
            setAlertStatus("danger");
            setAlertMessage("Kode OTP Salah");
            setIsAlertOpen(true);
        }
        
    };

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
                        <form className='flex flex-col gap-y-8' onSubmit={handleSubmit(onSubmit)}>
                            <div className='flex flex-col gap-y-3'>
                                <div className='flex flex-col gap-y-8 sm:gap-y-6'>
                                    <Label htmlFor='otp' className='text-black'>
                                        Kode OTP telah dikirimkan ke 0812 **** **89, masukkan kode dibawah ini untuk melanjutkan
                                    </Label>
                                    <div id='otp' className='flex justify-center items-center space-x-2' aria-label='Masukkan OTP Anda'>
                                    {otp.map((_, index) => (
                                        <div key={index}>
                                            <input
                                                type='number' 
                                                aria-label={`Digit OTP ${index + 1}`}
                                                aria-required='true'
                                                maxLength={1}
                                                ref={activeOTPIndex === index ? inputRef : null}
                                                className='w-8 sm:w-11 sm:h-11 border-b-2 rounded bg-transparent outline-none text-center font-semibold text-xl border-neutral-03 focus:border-gray-700 focus:text-gray-700 text-gray-400 transition [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
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
                                    <p className='text-sm'>
                                        {minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}
                                    </p>
                                    <Button typeof="button" disabled={seconds > 0 || minutes > 0} aria-label='Tombol kirim ulang kode OTP' className={`border-0 outline-none bg-transparent text-sm ${seconds>0||minutes>0?"text-neutral-03":"text-primary-blue"} hover:shadow-none`} onClick={resendOTP}>Kirim kode ulang</Button>
                                </div>
                                <div>
                                    <Button id="btnLanjut" typeof="submit" aria-label='Tombol lanjut'>Lanjut</Button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
            <Footer />
            <Alert 
                className="" 
                variant={alertStatus} 
                isOpen={isAlertOpen} 
                onClose={handleCloseAlert}
            >
                {alertMessage}
            </Alert>
        </>
    );
}
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import bgAuth from "@/assets/bg-auth.jpg";
import Button from "@/components/Button/Button";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import Label from "@/components/Label/Label";
import Alert from "@/components/Alert/Alert";
import { otpSchema, OTPInput } from "@/pages/ResetPassword/OTP/OTPSchema";
import { useLoading } from "@/hooks/useLoading";
import SpinnerWrapper from "@/components/Spinner/SpinnerWrapper";
import { MdArrowBack } from "react-icons/md";
import {
  CheckOTPResetPasswordAPI,
  SendOTPResetPasswordAPI,
} from "@/services/authServices";
import { useResetPasswordStore } from "@/store/ResetPasswordStore";

let currentOTPIndex: number = 0;

export default function Verification_OTP() {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [activeOTPIndex, setActiveOTPIndex] = useState(0);
  const [minutes, setMinutes] = useState(1);
  const [seconds, setSeconds] = useState(0);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [alertVariant, setAlertVariant] = useState<
    "success" | "danger" | undefined
  >(undefined);
  const [alertMessage, setAlertMessage] = useState("");
  const setField = useResetPasswordStore((state) => state.setField);
  const { ...formData } = useResetPasswordStore();

  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { isLoading, withLoading } = useLoading();

  const {
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<OTPInput>({
    resolver: zodResolver(otpSchema),
    defaultValues: { otp: new Array(6).fill("") },
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
    setValue("otp", newOTP);
  };

  const handleOnKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    currentOTPIndex = index;
    if (e.key === "Backspace") {
      setActiveOTPIndex(currentOTPIndex - 1);
    }
  };

  const resendOTP = () => {
    if (formData.email) {
      SendOTPResetPasswordAPI({
        ...formData,
        otp: "",
        newPassword: "",
      });
    } else {
      setAlertVariant("danger");
      setAlertMessage("Silahkan masukkan ulang email anda");
      setIsAlertOpen(true);
    }

    setMinutes(1);
    setSeconds(0);
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [activeOTPIndex]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }

      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(interval);
        } else {
          setSeconds(59);
          setMinutes(minutes - 1);
        }
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [minutes, seconds]);

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      setAlertVariant("danger");
      setAlertMessage((errors.otp?.message as string) || "Terjadi error");
      setIsAlertOpen(true);
    }
  }, [errors]);

  const handleCloseAlert = () => {
    setIsAlertOpen(false);
    if (alertMessage === "Silahkan masukkan ulang email anda") {
      navigate("/reset/forgot-password");
    }
  };

  const onSubmit = (data: OTPInput) => {
    const userOTPInput = data.otp.join("");

    withLoading(async () => {
      const response = await CheckOTPResetPasswordAPI({
        ...formData,
        otp: userOTPInput,
        newPassword: "",
      });

      if (response?.success === false) {
        setAlertVariant("danger");
        setAlertMessage("Kode OTP Salah");
        setIsAlertOpen(true);
      } else if (response?.success === true) {
        setField("otp", userOTPInput);
        navigate("/reset/new-password");
      }
    });
  };

  return (
    <>
      <SpinnerWrapper isLoading={isLoading}>
        <Header />
        <main
          className="w-full min-h-[828px] h-[calc(100vh-73px-75px)] md:h-[calc(100vh-94px-75px)] bg-cover bg-center"
          style={{ backgroundImage: `url(${bgAuth})` }}
        >
          <div className="container mx-auto px-6 flex items-center justify-center md:justify-end h-full">
            <div className="bg-neutral-01 px-8 py-8 md:px-14 rounded-lg w-[450px] min-h-[480px]">
              <Button
                className="w-fit h-fit my-4 text-primary-darkBlue bg-transparent"
                aria-label="Tombol kembali"
                onClick={() => {
                  navigate("/reset/forgot-password");
                }}
              >
                <MdArrowBack size={22} />
              </Button>
              <h1 className="mb-4 text-3xl text-primary-blue font-bold">
                Verifikasi
              </h1>
              <form
                className="flex flex-col gap-y-8"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="flex flex-col gap-y-3">
                  <div className="flex flex-col gap-y-8 sm:gap-y-6">
                    <Label htmlFor="otp" className="text-black">
                      Masukkan kode 6 digit yang Anda terima di email Anda
                    </Label>
                    <div
                      id="otp"
                      className="flex justify-center items-center space-x-2"
                      aria-label="Masukkan OTP Anda"
                    >
                      {otp.map((_, index) => (
                        <div key={index}>
                          <input
                            type="number"
                            aria-label={`Digit OTP ${index + 1}`}
                            aria-required="true"
                            maxLength={1}
                            ref={activeOTPIndex === index ? inputRef : null}
                            className="w-8 sm:w-11 sm:h-11 border-b-2 rounded bg-transparent outline-none text-center font-semibold text-xl border-neutral-03 focus:border-gray-700 focus:text-gray-700 text-gray-400 transition [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            onChange={handleOnChange}
                            onKeyDown={(e) => handleOnKeyDown(e, index)}
                            value={otp[index]}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-y-8 items-center">
                  <div className="text-center">
                    <p className="text-sm">
                      {minutes < 10 ? `0${minutes}` : minutes}:
                      {seconds < 10 ? `0${seconds}` : seconds}
                    </p>
                    <Button
                      typeof="button"
                      disabled={seconds > 0 || minutes > 0}
                      aria-label="Tombol kirim ulang kode OTP"
                      className={`border-0 outline-none bg-transparent text-sm ${
                        seconds > 0 || minutes > 0
                          ? "text-neutral-03"
                          : "text-primary-blue"
                      } hover:shadow-none`}
                      onClick={resendOTP}
                    >
                      Kirim kode ulang
                    </Button>
                  </div>
                  <div>
                    <Button
                      id="btnOTPLanjut"
                      typeof="submit"
                      aria-label="Tombol lanjut"
                    >
                      Lanjut
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </main>
        <Footer />

        <Alert
          variant={alertVariant}
          isOpen={isAlertOpen}
          autoDismiss={false}
          onClose={handleCloseAlert}
          showCloseButton={true}
        >
          <p aria-label={alertMessage}>{alertMessage}</p>
        </Alert>
      </SpinnerWrapper>
    </>
  );
}

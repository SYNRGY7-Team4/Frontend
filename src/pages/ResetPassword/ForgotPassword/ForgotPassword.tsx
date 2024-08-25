import bgAuth from "@/assets/bg-auth.jpg";
import Button from "@/components/Button/Button";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import Input from "@/components/Input/Input";
import Label from "@/components/Label/Label";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { MdArrowBack } from "react-icons/md";
import { useResetPasswordStore } from "@/store/ResetPasswordStore";
import SpinnerWrapper from "@/components/Spinner/SpinnerWrapper";
import { useLoading } from "@/hooks/useLoading";
import Alert from "@/components/Alert/Alert";
import { useState } from "react";
import { SendOTPResetPasswordAPI } from "@/services/authServices";

// Define the schema for validation
const ForgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: "Input email tidak boleh kosong",
    })
    .email("Harap isi dengan email yang valid"),
});

type TForgotPasswordSchema = z.infer<typeof ForgotPasswordSchema>;

// // Define the API URL
// const apiUrl =
//   "https://lumibank-backend-edqo6jv53q-et.a.run.app/api/forget-password/send";

// // Define the function to send OTP
// const sendOtp = async (email: string) => {
//   try {
//     const response = await axios.post(
//       apiUrl,
//       { email },
//       {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }
//     );
//     return response.data;
//   } catch (error) {
//     if (axios.isAxiosError(error)) {
// setErrorMsg("Email atau Password Salah");
// setIsStatus("danger");
// setIsOpen(true);
//     } else {
//       console.error("Unexpected error:", error);
//       throw new Error("An unexpected error occurred");
//     }
//   }
// };

export default function ForgotPassword() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isStatus, setIsStatus] = useState<
    "success" | "danger" | "primary" | undefined
  >(undefined);
  const [errorMsg, setErrorMsg] = useState<string>("");

  const setField = useResetPasswordStore((state) => state.setField);

  const { isLoading, withLoading } = useLoading();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TForgotPasswordSchema>({
    resolver: zodResolver(ForgotPasswordSchema),
  });

  const onSubmit = async (data: TForgotPasswordSchema) => {
    setField("email", data.email);
    try {
      withLoading(async () => {
        const response = await SendOTPResetPasswordAPI({
          email: data.email,
          otp: "",
          newPassword: "",
        });

        if (response?.success == false) {
          setErrorMsg("Email tidak terdaftar");
          setIsStatus("danger");
          setIsOpen(true);
        } else {
          reset();
          navigate("/reset/otp"); // Redirect to OTP verification page
        }
      });
    } catch (error) {
      // Display error to user
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error("An unexpected error occurred");
      }
    }
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
              <div className="mb-8">
                <Button
                  className="w-fit h-fit my-4 text-primary-darkBlue bg-transparent"
                  aria-label="Tombol kembali"
                  onClick={() => {
                    navigate("/login");
                  }}
                >
                  <MdArrowBack size={22} />
                </Button>
                <h1 className="mb-2 text-3xl text-primary-blue font-bold">
                  Lupa Password
                </h1>
                <p>
                  Masukkan email Anda untuk proses verifikasi, kami akan
                  mengirimkan kode 6 digit ke email Anda.
                </p>
              </div>

              <form
                className="flex flex-col gap-y-8"
                onSubmit={handleSubmit(onSubmit)}
                aria-live="assertive"
              >
                <div className="flex flex-col gap-y-3">
                  <div className="flex flex-col gap-y-1">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      type="email"
                      id="email"
                      placeholder="Email"
                      aria-label="Email"
                      aria-required="true"
                      aria-invalid={errors.email ? "true" : "false"}
                      aria-describedby={
                        errors.email ? "email-error" : undefined
                      }
                      {...register("email")}
                      className={`${
                        errors.email
                          ? "focus:outline-secondary-red border-secondary-red"
                          : ""
                      }`}
                    />
                    {errors.email && (
                      <span
                        id="email-error"
                        className="text-red-500 text-sm"
                        aria-live="polite"
                      >
                        {errors.email.message}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex flex-col gap-y-2 items-center">
                  <Button
                    id="btnForgotPasswordLanjut"
                    aria-label="Tombol Lanjut"
                    className="my-9"
                  >
                    Lanjut
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </main>
        <Footer />
        <Alert
          variant={isStatus}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          showCloseButton={true}
          autoDismiss={false}
        >
          {errorMsg}
        </Alert>
      </SpinnerWrapper>
    </>
  );
}

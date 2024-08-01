import bgAuth from "@/assets/bg-auth.jpg";
import { Link, useNavigate } from "react-router-dom";
import Button from "@/components/Button/Button";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import Input from "@/components/Input/Input";
import Label from "@/components/Label/Label";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axiosInstance from "@/axios/axios";
import { AxiosError } from "axios";
import { useState } from "react";
import { TIsStatus } from "./types";
import Alert from "@/components/Alert/Alert";
import { useLoading } from "@/hooks/useLoading";
import SpinnerWrapper from "@/components/Spinner/SpinnerWrapper";

const loginSchema = z.object({
  email: z
    .string({
      required_error: "Input email tidak boleh kosong",
    })
    .email("Harap isi dengan email yang valid"),
  password: z
    .string({
      required_error: "Input password tidak boleh kosong",
    })
    .regex(
      new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,15}$/),
      "Password harus terdiri dari 8-15 karakter dan harus mengandung kombinasi huruf dan angka"
    ),
});

type TLoginSchema = z.infer<typeof loginSchema>;

export default function Login() {
  const navigate = useNavigate();
  const { isLoading, withLoading } = useLoading();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isStatus, setIsStatus] = useState<TIsStatus>(undefined);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TLoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: TLoginSchema) => {
    try {
      const formData = new FormData();
      formData.append("email", data.email);
      formData.append("password", data.password);

      await withLoading(async () => {
        await axiosInstance.post("/auth/login", formData);

        reset();
        navigate("/dashboard");
      });
    } catch (err) {
      if (err instanceof AxiosError) {
        if (err.response?.data) {
          setErrorMsg("Email atau Password Salah");
          setIsStatus("danger");
          setIsOpen(true);
        } else console.log(err.message);
      }
    }
  };

  return (
    <SpinnerWrapper isLoading={isLoading}>
      <Header />
      <main
        className="w-full min-h-[828px] h-[calc(100vh-73px-75px)] md:h-[calc(100vh-94px-75px)] bg-cover bg-center"
        style={{ backgroundImage: `url(${bgAuth})` }}
      >
        <div className="container mx-auto px-6 flex items-center justify-center md:justify-end h-full">
          <div className="bg-neutral-01 px-8 py-14 md:px-14 rounded-lg w-[450px]">
            <h1 className="mb-10 text-3xl text-primary-blue font-bold">
              Selamat Datang,
            </h1>
            <form
              className="flex flex-col gap-y-8"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="flex flex-col gap-y-3">
                <div className="flex flex-col gap-y-1">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    type="email"
                    id="email"
                    placeholder="*****@email.com"
                    aria-label="Masukkan email Anda"
                    {...register("email")}
                    className={`${
                      errors.email
                        ? "focus:outline-secondary-red border-secondary-red"
                        : ""
                    }`}
                  />
                  {errors.email && (
                    <span
                      className="text-red-500 text-sm"
                      aria-label={errors.email.message}
                    >
                      {errors.email.message}
                    </span>
                  )}
                </div>
                <div className="flex flex-col gap-y-1">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    type="password"
                    id="password"
                    placeholder="Password"
                    aria-label="Masukkan password Anda"
                    {...register("password")}
                    className={`${
                      errors.password
                        ? "focus:outline-secondary-red border-secondary-red"
                        : ""
                    }`}
                  />
                  {errors.password && (
                    <span
                      className="text-red-500 text-sm"
                      aria-label={errors.password.message}
                    >
                      {errors.password.message}
                    </span>
                  )}
                </div>
                <div className="flex justify-end">
                  <Link
                    to="/reset/forgot-password"
                    className="text-primary-blue"
                    aria-label="Link menuju halaman lupa password"
                  >
                    Lupa password?
                  </Link>
                </div>
              </div>
              <div className="flex flex-col gap-y-2 items-center">
                <Button id="btnLogin" aria-label="Tombol masuk">
                  Masuk
                </Button>
                <p>
                  Belum punya akun?{" "}
                  <Link
                    to="/register"
                    className="text-primary-blue"
                    aria-label="Link menuju halaman register"
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
      <Alert
        variant={isStatus}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        showCloseButton={false}
        autoDismiss={true}
      >
        {errorMsg}
      </Alert>
    </SpinnerWrapper>
  );
}

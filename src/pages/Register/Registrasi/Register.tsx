import bgAuth from "@/assets/bg-auth.jpg";
import { Link, useNavigate } from "react-router-dom";
import Button from "@/components/Button/Button";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import Input from "@/components/Input/Input";
import Label from "@/components/Label/Label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MaterialSymbol } from "react-material-symbols";
import "react-material-symbols/rounded";
import { useRegistrationStore } from "@/store/RegisterStore";
import { useLoading } from "@/hooks/useLoading";
import SpinnerWrapper from "@/components/Spinner/SpinnerWrapper";
import { RegisterSchema, TRegisterSchema } from "./RegisterSchema";

export default function Register() {
  const setField = useRegistrationStore((state) => state.setField);
  const navigate = useNavigate();
  const { isLoading, withLoading } = useLoading();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TRegisterSchema>({
    resolver: zodResolver(RegisterSchema),
  });

  const onSubmit = async (data: TRegisterSchema) => {
    setField("emailRegister", data.emailRegister);
    setField("no_hp", data.phoneNumber);

    withLoading(async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      navigate("/register/otp");
    });
    reset();
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
            <div className="bg-neutral-01 px-8 py-14 md:px-14 rounded-lg w-[450px] min-h-[480px]">
              <h1 className="mb-10 text-3xl text-primary-blue font-bold">
                Selamat Datang,
              </h1>
              <form
                className="flex flex-col gap-y-8"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="flex flex-col gap-y-3">
                  <div className="flex flex-col gap-y-1">
                    <div className="flex items-center gap-1">
                      <Label htmlFor="emailRegister">emailRegister</Label>
                      {errors.emailRegister && (
                        <span className="text-secondary-red flex items-center">
                          <MaterialSymbol icon="error" title="error" />
                        </span>
                      )}
                    </div>
                    <Input
                      type="emailRegister"
                      id="emailRegister"
                      placeholder="*****@emailRegister.com"
                      aria-label="Masukkan emailRegister Anda"
                      {...register("emailRegister")}
                      className={`${
                        errors.emailRegister
                          ? "focus:outline-secondary-red border-secondary-red"
                          : ""
                      }`}
                    />
                    {errors.emailRegister && (
                      <span
                        className="text-red-500 text-sm"
                        aria-label={errors.emailRegister.message}
                      >
                        {errors.emailRegister.message}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col gap-y-1">
                    <div className="flex items-center gap-1">
                      <Label
                        htmlFor="phoneNumber"
                        aria-labelledby="phoneNumber"
                      >
                        No Hp
                      </Label>
                      {errors.phoneNumber && (
                        <span className="text-secondary-red flex items-center">
                          <MaterialSymbol icon="error" title="error" />
                        </span>
                      )}
                    </div>

                    <div className="relative">
                      <div
                        className={`h-fit pointer-events-none absolute inset-y-0 left-0 py-[13px] flex items-center pl-5 ${
                          errors.phoneNumber
                            ? "focus:outline-secondary-red border-secondary-red "
                            : ""
                        }`}
                      >
                        <span className="">+62</span>
                      </div>
                      <Input
                        type="number"
                        id="phoneNumber"
                        placeholder="812 3456 7890"
                        aria-label="Masukkan nomor handphone anda!"
                        {...register("phoneNumber")}
                        className={`block pl-12 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${
                          errors.phoneNumber
                            ? "focus:outline-secondary-red border-secondary-red"
                            : ""
                        }`}
                      />
                      {errors.phoneNumber && (
                        <span
                          className="text-red-500 text-sm"
                          aria-label={errors.phoneNumber.message}
                        >
                          {errors.phoneNumber.message}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-y-2 items-center">
                  <Button
                    id="btnRegister"
                    type="submit"
                    aria-label="Tombol register"
                  >
                    Lanjut
                  </Button>
                  <p>
                    Sudah punya akun?{" "}
                    <Link
                      to="/login"
                      className="text-primary-blue"
                      aria-label="Link menuju halaman login"
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
      </SpinnerWrapper>
    </>
  );
}

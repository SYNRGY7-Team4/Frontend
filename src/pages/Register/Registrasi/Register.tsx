import bgAuth from "@/assets/bg-auth.jpg";
import { Link, useNavigate } from "react-router-dom";
import Button from "@/components/Button/Button";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import Input from "@/components/Input/Input";
import Label from "@/components/Label/Label";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MaterialSymbol } from "react-material-symbols";
import "react-material-symbols/rounded";
import { useRegistrationStore } from "@/store/RegisterStore";
import { useLoading } from "@/hooks/useLoading";
import SpinnerWrapper from "@/components/Spinner/SpinnerWrapper";
import { RegisterSchema, TRegisterSchema } from "./RegisterSchema";
import {
  checkRegisterDataAPI,
  sendOTPRegisterAPI,
} from "@/services/authServices";
import { useState } from "react";
import Alert from "@/components/Alert/Alert";

export default function Register() {
  const { email, no_hp } = useRegistrationStore((state) => state);
  const setField = useRegistrationStore((state) => state.setField);

  const navigate = useNavigate();
  const { isLoading, withLoading } = useLoading();

  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [alertVariant, setAlertVariant] = useState<
    "success" | "danger" | "primary" | undefined
  >(undefined);
  const [alertMessage, setAlertMessage] = useState("");

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TRegisterSchema>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      emailRegister: email || "",
      phoneNumber: no_hp || "",
    },
  });

  const getErrorMessage = (emailResponse: any, hpResponse: any) => {
    if (emailResponse?.success === false) {
      return emailResponse?.message;
    } else if (hpResponse?.success === false) {
      return hpResponse?.message;
    }
  };

  const onSubmit = async (data: TRegisterSchema) => {
    setField("email", data.emailRegister);
    setField("no_hp", data.phoneNumber);

    withLoading(async () => {
      const emailResponse = await checkRegisterDataAPI(
        "email",
        data.emailRegister
      );
      const hpResponse = await checkRegisterDataAPI("no_hp", data.phoneNumber);

      if (emailResponse?.success === false || hpResponse?.success === false) {
        setAlertVariant("danger");
        setAlertMessage(getErrorMessage(emailResponse, hpResponse));
        setIsAlertOpen(true);
        reset();
      } else if (
        emailResponse?.success === true ||
        hpResponse?.success === true
      ) {
        const resposnsee = await sendOTPRegisterAPI({
          email: data.emailRegister,
          otp: "",
        });

        console.log(resposnsee);

        navigate("/register/otp");
        reset();
      } else {
        setAlertVariant("danger");
        setAlertMessage(emailResponse?.message || hpResponse?.message);
        setIsAlertOpen(true);
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
                      <Label htmlFor="emailRegister">Email</Label>
                      {errors.emailRegister && (
                        <span className="text-secondary-red flex items-center">
                          <MaterialSymbol icon="error" title="error" />
                        </span>
                      )}
                    </div>
                    <Controller
                      name="emailRegister"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <Input
                          type="emailRegister"
                          id="emailRegister"
                          placeholder="*****@email.com"
                          aria-label="Masukkan email Anda"
                          aria-invalid={errors.emailRegister ? "true" : "false"}
                          aria-describedby={
                            errors.emailRegister
                              ? "emailRegister-error"
                              : undefined
                          }
                          className={`${
                            errors.emailRegister
                              ? "focus:outline-secondary-red border-secondary-red"
                              : ""
                          }`}
                          {...field}
                        />
                      )}
                    />
                    {errors.emailRegister && (
                      <span
                        id="emailRegister-error"
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
                      <Controller
                        name="phoneNumber"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                          <Input
                            type="text"
                            id="phoneNumber"
                            placeholder="812 3456 7890"
                            aria-label="Masukkan nomor handphone anda!"
                            aria-invalid={errors.phoneNumber ? "true" : "false"}
                            aria-describedby={
                              errors.phoneNumber
                                ? "phoneNumber-error"
                                : undefined
                            }
                            className={`block pl-12 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${
                              errors.phoneNumber
                                ? "focus:outline-secondary-red border-secondary-red"
                                : ""
                            }`}
                            {...field}
                            onChange={(e) =>
                              field.onChange(
                                e.target.value.replace(/[^0-9]/g, "")
                              )
                            }
                          />
                        )}
                      />
                      {errors.phoneNumber && (
                        <span
                          id="phoneNumber-error"
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
        <Alert
          variant={alertVariant}
          isOpen={isAlertOpen}
          autoDismiss={false}
          onClose={() => {
            setIsAlertOpen(false);
          }}
          showCloseButton={true}
        >
          {alertMessage}
        </Alert>
      </SpinnerWrapper>
    </>
  );
}

import bgAuth from "@/assets/bg-auth.jpg";
import Button from "@/components/Button/Button";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import Input from "@/components/Input/Input";
import Label from "@/components/Label/Label";
import { useState } from "react";
import { RiErrorWarningLine } from "react-icons/ri";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { IconContext } from "react-icons";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { IPasswordInput } from "./types";
import { useNavigate } from "react-router-dom";
import { useRegistrationStore } from "@/store/RegisterStore";
import { useLoading } from "@/hooks/useLoading";
import SpinnerWrapper from "@/components/Spinner/SpinnerWrapper";

export default function NewPassword() {
  const setField = useRegistrationStore((state) => state.setField);
  const { isLoading, withLoading } = useLoading();
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IPasswordInput>({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const [visibility, setVisibility] = useState({
    password: false,
    confirmPassword: false,
  });

  const toggleVisibility = (
    event: React.MouseEvent<HTMLButtonElement>,
    field: "password" | "confirmPassword"
  ) => {
    event.preventDefault();

    setVisibility((prevVisibility) => ({
      ...prevVisibility,
      [field]: !prevVisibility[field],
    }));
  };

  const onSubmit: SubmitHandler<IPasswordInput> = (data) => {
    console.log({ data });
    setField("password", data.password);
    setField("confirm_password", data.confirmPassword);

    withLoading(async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      navigate("/register/data-diri");
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
                Buat Password Baru
              </h1>
              <form
                className="flex flex-col gap-y-8"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="flex flex-col gap-y-3">
                  <div className="flex flex-col gap-y-1">
                    <div className="flex gap-1 items-center">
                      <Label htmlFor="password">Password</Label>
                      {errors.password ? (
                        <IconContext.Provider
                          value={{ size: "13px", color: "#CB3A31" }}
                        >
                          <RiErrorWarningLine />
                        </IconContext.Provider>
                      ) : null}
                    </div>
                    <Controller
                      name="password"
                      control={control}
                      render={({ field }) => (
                        <div className=" w-full flex relative">
                          <Input
                            className={`w-full bg-neutral-02 py-3 pl-5 pr-12 rounded-lg ${
                              errors.password
                                ? "focus:outline-secondary-red"
                                : "focus:outline-primary-blue"
                            } `}
                            type={visibility.password ? "text" : "password"}
                            id="password"
                            placeholder="Password"
                            aria-label="Masukkan Password Baru Anda"
                            autoComplete="off"
                            {...field}
                          />
                          <div className="absolute right-[15px] flex items-center h-full">
                            <Button
                              onClick={(event) =>
                                toggleVisibility(event, "password")
                              }
                              className=" w-fit h-fit hover:shadow-none bg-transparent"
                            >
                              <IconContext.Provider
                                value={{ color: "#B7B9C8", size: "25px" }}
                              >
                                {visibility.password ? <IoEyeOff /> : <IoEye />}
                              </IconContext.Provider>
                            </Button>
                          </div>
                        </div>
                      )}
                      rules={{
                        required: "Input password tidak boleh kosong",
                        pattern: {
                          value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,15}$/,
                          message:
                            "Password harus terdiri dari 8-15 karakter dan harus mengandung kombinasi huruf dan angka",
                        },
                      }}
                    />
                    {errors.password && (
                      <p className="text-secondary-red text-[12px]">
                        {errors.password.message}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col gap-y-1">
                    <div className="flex gap-1 items-center">
                      <Label htmlFor="password">Confirm Password</Label>
                      {errors.confirmPassword && (
                        <IconContext.Provider
                          value={{ size: "13px", color: "#CB3A31" }}
                        >
                          <RiErrorWarningLine />
                        </IconContext.Provider>
                      )}
                    </div>
                    <Controller
                      name="confirmPassword"
                      control={control}
                      render={({ field }) => (
                        <div className=" w-full flex relative">
                          <Input
                            className={`w-full bg-neutral-02 py-3 pl-5 pr-12 rounded-lg ${
                              errors.password
                                ? "focus:outline-secondary-red"
                                : "focus:outline-primary-blue"
                            } `}
                            type={
                              visibility.confirmPassword ? "text" : "password"
                            }
                            id="confirmPassword"
                            placeholder="Password"
                            aria-label="Masukkan Kembali Password Baru Anda"
                            autoComplete="off"
                            {...field}
                          />
                          <div className="absolute right-[15px] flex items-center h-full">
                            <Button
                              onClick={(event) =>
                                toggleVisibility(event, "confirmPassword")
                              }
                              className=" w-fit h-fit hover:shadow-none bg-transparent"
                            >
                              <IconContext.Provider
                                value={{ color: "#B7B9C8", size: "25px" }}
                              >
                                {visibility.confirmPassword ? (
                                  <IoEyeOff />
                                ) : (
                                  <IoEye />
                                )}
                              </IconContext.Provider>
                            </Button>
                          </div>
                        </div>
                      )}
                      rules={{
                        required:
                          "Input Konfirmasi password tidak boleh kosong",
                        validate: (value) =>
                          value === control._formValues.password ||
                          "Konfirmasi password dan password tidak sama",
                      }}
                    />
                    {errors.confirmPassword && (
                      <p className="text-secondary-red text-[12px]">
                        {errors.confirmPassword.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  <Button
                    id="btnPasswordLanjut"
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
      </SpinnerWrapper>
    </>
  );
}

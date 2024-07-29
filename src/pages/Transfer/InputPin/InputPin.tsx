import Button from "@/components/Button/Button";
import FooterDashboard from "@/components/Footer/FooterDasboard";
import Header from "@/components/Header/HeaderDasboard";
import Input from "@/components/Input/Input";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { IconContext } from "react-icons";
import { IoEye, IoEyeOff } from "react-icons/io5";

type TPinInput = {
  pin: number;
};

const InputPin = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TPinInput>({
    defaultValues: {
      pin: undefined,
    },
  });

  const [visibility, setVisibility] = useState(false);

  const toggleVisibility = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    setVisibility(!visibility);
  };

  const onSubmit: SubmitHandler<TPinInput> = (data) => {
    console.log({ data });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow w-[min(100%,1056px)] px-6 lg:mx-auto lg:px-0 py-10 mb-20">
        <h1 className="text-4xl font-bold mb-8">Transfer ke BCA</h1>

        <div className="w-full h-full bg-neutral-01 p-6 pb-20 rounded-lg shadow-02 flex flex-col items-center gap-y-2.5">
          <h2 className="text-3xl font-bold text-primary-darkBlue">
            Masukkan Pin Anda
          </h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-y-1 my-3">
              <Controller
                name="pin"
                control={control}
                render={({ field }) => (
                  <div className="w-64 flex relative">
                    <Input
                      id="pin"
                      type={visibility ? "number" : "password"}
                      placeholder="Pin"
                      aria-label="Pin"
                      className={
                        errors.pin
                          ? "border-2 border-secondary-red focus:outline-secondary-red"
                          : ""
                      }
                      {...field}
                    />
                    <div className="absolute right-[15px] flex items-center h-full">
                      <Button
                        id="visiblePin"
                        onClick={(event) => toggleVisibility(event)}
                        className=" w-fit h-fit hover:shadow-none bg-transparent"
                      >
                        <IconContext.Provider
                          value={{ color: "#B7B9C8", size: "25px" }}
                        >
                          {visibility ? <IoEyeOff /> : <IoEye />}
                        </IconContext.Provider>
                      </Button>
                    </div>
                  </div>
                )}
                rules={{
                  required: "Input pin kosong",
                }}
              />
              {errors.pin && (
                <p className="text-secondary-red">{errors.pin.message}</p>
              )}
            </div>
            <div className="text-center my-10">
              <Button id="btnTransfer" aria-label="Tombol transfer">
                Transfer
              </Button>
            </div>
          </form>
        </div>
      </main>
      <FooterDashboard />
    </div>
  );
};

export default InputPin;

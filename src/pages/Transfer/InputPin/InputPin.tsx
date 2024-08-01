import Button from "@/components/Button/Button";
import FooterDashboard from "@/components/Footer/FooterDasboard";
import Header from "@/components/Header/HeaderDasboard";
import Input from "@/components/Input/Input";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { IconContext } from "react-icons";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { TIsStatus, TPinInput } from "./types";
import Alert from "@/components/Alert/Alert";

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
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isStatus, setIsStatus] = useState<TIsStatus>(undefined);

  const toggleVisibility = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    setVisibility(!visibility);
  };

  const onSubmit: SubmitHandler<TPinInput> = (data) => {
    setIsOpen(true);

    if (+data.pin === 123) {
      return setIsStatus("success");
    }

    setIsStatus("danger");
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
                      type={visibility ? "text" : "password"}
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
      <Alert
        className="p-8"
        variant={isStatus}
        isOpen={isOpen}
        autoDismiss={false}
        onClose={() => setIsOpen(false)}
        showCloseButton={true}
      >
        {isStatus === "danger" ? (
          <p>Pin Salah</p>
        ) : (
          <>
            <h1>Transfer Berhasil</h1>
            <div className="text-neutral-09 text-base font-medium">
              <span>13 Juli 2024 22:30:19 WIB</span>
            </div>
            <div className="my-8 text-base font-medium">
              <table className="w-full">
                <tr className="align-top">
                  <td className="w-2/4 text-neutral-03 text-left">
                    No Referensi
                  </td>
                  <td className="text-neutral-09 text-right pb-2">
                    12982928391
                  </td>
                </tr>
                <tr className="align-top">
                  <td className="text-neutral-03 text-left">
                    Nomor Rekening Tujuan
                  </td>
                  <td className="text-neutral-09 text-right pb-2">
                    Nostalgia Inside Out 321456987102
                  </td>
                </tr>
                <tr className="align-top">
                  <td className="text-neutral-03 text-left">Bank Tujuan</td>
                  <td className="text-neutral-09 text-right pb-2">
                    Bank Central Asia
                  </td>
                </tr>
                <tr className="align-top">
                  <td className="text-neutral-03 text-left">Jumlah Transfer</td>
                  <td className="text-neutral-09 text-right pb-2">
                    Rp 500.000
                  </td>
                </tr>
                <tr className="align-top">
                  <td className="text-neutral-03 text-left">Waktu Proses</td>
                  <td className="text-neutral-09 text-right pb-2">Realtime</td>
                </tr>
                <tr className="align-top">
                  <td className="text-neutral-03 text-left">Berita</td>
                  <td className="text-neutral-09 text-right">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </td>
                </tr>
              </table>
            </div>
            <Button id="btnOke" className="w-full py-0" aria-label="Tombol oke">
              Oke
            </Button>
          </>
        )}
      </Alert>
    </div>
  );
};

export default InputPin;

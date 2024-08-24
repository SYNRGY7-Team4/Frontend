import Button from "@/components/Button/Button";
import FooterDashboard from "@/components/Footer/FooterDasboard";
import Header from "@/components/Header/HeaderDasboard";
import Input from "@/components/Input/Input";
import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { IconContext } from "react-icons";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { IDataSuccess, TIsStatus, TPinInput } from "./types";
import Alert from "@/components/Alert/Alert";
import { useNavigate } from "react-router-dom";
import axiosInstance from "@/axios/axios";
import { useUserStore } from "@/store/UserStore";
import useTransferStore, {
  selectState,
  selectReset,
} from "@/store/TransferStore";
import { checkPin } from "@/utils/checkPin";
import currencyFormat from "@/utils/currencyFormat";
import dateTiemFormat from "@/utils/dateTimeFormat";
import { AxiosError } from "axios";
import { useLoading } from "@/hooks/useLoading";
import SpinnerWrapper from "@/components/Spinner/SpinnerWrapper";

const InputPin = () => {
  const navigate = useNavigate();
  const { isLoading, withLoading } = useLoading();
  const state = useTransferStore(selectState);
  const resetState = useTransferStore(selectReset);
  const { userData, fetchUserData } = useUserStore();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TPinInput>({
    defaultValues: {
      pin: "",
    },
  });
  const [dataSucces, setDataSuccess] = useState<IDataSuccess>();
  const [userPin, setUserPin] = useState<string>("");
  const [bankTujuan, setBankTujuan] = useState<string>("");

  useEffect(() => {
    if (!userData) {
      fetchUserData();
    }
    if (userData) {
      setUserPin(userData.account_pin.toString());
    }
  }, [fetchUserData, userData]);

  const [visibility, setVisibility] = useState(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isStatus, setIsStatus] = useState<TIsStatus>(undefined);
  const [isMessage, setIsMessage] = useState<string>("");

  const toggleVisibility = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    setVisibility(!visibility);
  };

  const onSubmit: SubmitHandler<TPinInput> = async (data) => {
    setIsStatus(undefined);
    if ((await checkPin(data.pin, userPin)) === false) {
      setIsMessage("Pin Salah");
      setIsStatus("danger");
      setIsOpen(true);
      return;
    }

    try {
      withLoading(async () => {
        const res = state.datetime
          ? await axiosInstance.post("/transaction/schedule", {
              ...state,
              pin: data.pin,
            })
          : await axiosInstance.post("/transaction/transfer", {
              ...state,
              pin: data.pin,
            });

        setDataSuccess(res.data.data);
        setBankTujuan(state.bankTo);
        setIsStatus("success");
        setIsOpen(true);
        resetState();
      });
    } catch (err) {
      if (err instanceof AxiosError) {
        if (err.response?.data) {
          setIsMessage(err.response.data.errors);
          setIsStatus("danger");
          setIsOpen(true);
        } else console.log({ error: err.message });
      }
    }
  };

  const onCloseSuccess = () => {
    setIsOpen(false);
    navigate("/transfer");
  };

  return (
    <SpinnerWrapper isLoading={isLoading}>
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
                        type="text"
                        placeholder="Pin"
                        aria-label="Pin"
                        className={`
                        ${
                          errors.pin
                            ? "border-2 border-secondary-red focus:outline-secondary-red"
                            : ""
                        }
                          ${visibility ? "" : "text-security-disc"}
                      `}
                        {...field}
                        onChange={(e) =>
                          field.onChange(e.target.value.replace(/[^0-9]/g, ""))
                        }
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
                    required: "Input pin tidak boleh kosong",
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
          onClose={
            isStatus === "danger"
              ? () => setIsOpen(false)
              : () => onCloseSuccess()
          }
          showCloseButton={true}
        >
          {isStatus === "danger" ? (
            <p>{isMessage}</p>
          ) : (
            <>
              <h1>Transfer Berhasil</h1>
              <div className="text-neutral-09 text-base font-medium">
                <span>{dateTiemFormat(new Date())} WIB</span>
              </div>
              <div className="my-8 text-base font-medium">
                <table className="w-full">
                  <tbody>
                    <tr className="align-top">
                      <td className="w-2/4 text-neutral-03 text-left">
                        No Referensi
                      </td>
                      <td className="text-neutral-09 text-right pb-2">
                        {dataSucces?.referenceNumber}
                      </td>
                    </tr>
                    <tr className="align-top">
                      <td className="text-neutral-03 text-left">
                        Nomor Rekening Tujuan
                      </td>
                      <td className="text-neutral-09 text-right pb-2">
                        {dataSucces?.nameAccountTo} <br />{" "}
                        {dataSucces?.accountTo}
                      </td>
                    </tr>
                    <tr className="align-top">
                      <td className="text-neutral-03 text-left">Bank Tujuan</td>
                      <td className="text-neutral-09 text-right pb-2">
                        {bankTujuan}
                      </td>
                    </tr>
                    <tr className="align-top">
                      <td className="text-neutral-03 text-left">
                        Jumlah Transfer
                      </td>
                      <td className="text-neutral-09 text-right pb-2">
                        {dataSucces?.amount &&
                          currencyFormat(dataSucces.amount, "id-ID", "IDR")}
                      </td>
                    </tr>
                    <tr className="align-top">
                      <td className="text-neutral-03 text-left">
                        Waktu Proses
                      </td>
                      <td className="text-neutral-09 text-right pb-2">
                        {dataSucces?.status === "pending"
                          ? dateTiemFormat(new Date(dataSucces.datetime))
                          : dateTiemFormat(new Date())}{" "}
                        WIB
                      </td>
                    </tr>
                    <tr className="align-top">
                      <td className="text-neutral-03 text-left">Berita</td>
                      <td className="text-neutral-09 text-right">
                        {dataSucces?.description}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <Button
                id="btnOke"
                className="w-full py-0"
                aria-label="Tombol oke"
                onClick={() => onCloseSuccess()}
              >
                Oke
              </Button>
            </>
          )}
        </Alert>
      </div>
    </SpinnerWrapper>
  );
};

export default InputPin;

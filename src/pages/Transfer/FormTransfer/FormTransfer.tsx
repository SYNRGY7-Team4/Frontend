import FooterDashboard from "@/components/Footer/FooterDasboard";
import Header from "@/components/Header/HeaderDasboard";
import currencyFormat from "@/utils/currencyFormat";
import { IFormTransfer } from "./types";
import { useEffect, useState } from "react";

import Alert from "@/components/Alert/Alert";
import Button from "@/components/Button/Button";
import { useUserStore } from "@/store/UserStore";
import { useNavigate } from "react-router-dom";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { axiosNode } from "@/axios/axios";
import Label from "@/components/Label/Label";
import Input from "@/components/Input/Input";
import useTransferStore, {
  selectSetField,
  selectState,
} from "@/store/TransferStore";
import { useLoading } from "@/hooks/useLoading";
import SpinnerWrapper from "@/components/Spinner/SpinnerWrapper";
import { AxiosError } from "axios";

const TransferForm: React.FC = () => {
  const navigate = useNavigate();
  const { isLoading, withLoading } = useLoading();
  const state = useTransferStore(selectState);
  const setField = useTransferStore(selectSetField);
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<IFormTransfer>({
    defaultValues: {
      accountFrom: state.accountFrom || "",
      accountTo: state.accountTo || "",
      amount: state.amount.replace(/\B(?=(\d{3})+(?!\d))/g, ".") || "",
      description: state.description || "",
      datetime: state.datetime || "",
      bankTo: state.bankTo || "",
    },
  });
  const [saldo, setSaldo] = useState<number>(0);
  const [userName, setUserName] = useState<string>("");
  const [userAccountNumber, setUserAccountNumber] = useState<string>("");

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [msgError, setMsgError] = useState<string>("");
  const { userData, balance, fetchUserData, fetchBalance } = useUserStore();

  useEffect(() => {
    if (!userData) {
      fetchUserData();
    }
    if (userData && userData.account_number) {
      fetchBalance(userData.account_number);
      setUserName(userData.name);
      setValue("accountFrom", userData.account_number.toString());
      setUserAccountNumber(userData.account_number.toString());
    }
    if (balance !== null) setSaldo(balance);
  }, [userData, balance]);

  const onSubmit: SubmitHandler<IFormTransfer> = (data) => {
    const amountValue = data.amount.replace(/\./g, "");

    withLoading(async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      if (data.accountFrom === data.accountTo) {
        setMsgError("Tidak Dapat Transfer Ke Rekening Anda");
        setIsOpen(true);
        return;
      }

      try {
        await axiosNode.get(`account/?accountNumber=${data.accountTo}`);

        if (+amountValue > +saldo) {
          setMsgError("Saldo Tidak Cukup");
          setIsOpen(true);
          return;
        } else if (+amountValue < 1000 || +amountValue > 25000000) {
          setMsgError("Nominal Transfer Hanya bole 1 Ribu Sampai 25 Juta");
          setIsOpen(true);
          return;
        }

        setField({ ...data, amount: amountValue });
        navigate("/transfer/input-pin");
      } catch (err) {
        if (err instanceof AxiosError) {
          if (err.response?.status === 400) {
            setMsgError("Nomor Rekening Tujuan Tidak Valid");
            setIsOpen(true);
            return;
          } else {
            setMsgError(err.message);
            setIsOpen(true);
          }
        }
      }
    });
  };

  return (
    <SpinnerWrapper isLoading={isLoading}>
      <Header />
      <main className="flex-grow w-[min(100%,1056px)] px-6 lg:mx-auto lg:px-0 py-10 mb-20">
        <h1 className="text-4xl font-bold mb-8">Transfer ke BCA</h1>

        <div className="w-full h-full bg-neutral-01 p-6 rounded-lg shadow-02 mb-8">
          <h2 className="text-2xl font-bold mb-3">
            Saldo : {currencyFormat(saldo, "id-ID", "IDR")}
          </h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
              <div className="w-full">
                <Label htmlFor="accountTo">Rekening Tujuan</Label>
                <Controller
                  name="accountTo"
                  control={control}
                  render={({ field }) => (
                    <Input
                      id="accountTo"
                      type="text"
                      placeholder="No rekening tujuan"
                      aria-label="Masukkan no rekening tujuan"
                      className={`w-full h-[42px] !bg-neutral-01 border-neutral-03 ${
                        errors.accountTo
                          ? "border-2 border-secondary-red focus:outline-secondary-red"
                          : ""
                      }`}
                      {...field}
                      onChange={(e) =>
                        field.onChange(e.target.value.replace(/[^0-9]/g, ""))
                      }
                    />
                  )}
                  rules={{
                    required: "Rekening tujuan tidak boleh kosong",
                  }}
                />
                {errors.accountTo && (
                  <p className="text-secondary-red">
                    {errors.accountTo.message}
                  </p>
                )}
              </div>
              <div className="w-full">
                <Label htmlFor="bankTujuan">Bank Tujuan</Label>
                <Controller
                  name="bankTo"
                  control={control}
                  render={({ field }) => (
                    <select
                      id="bankTo"
                      className={`w-full h-[42px] !bg-neutral-01 border-neutral-03 rounded-lg px-4 ${
                        errors.bankTo
                          ? "border-2 border-secondary-red focus:outline-secondary-red"
                          : " focus:outline-primary-blue border appearance-none focus:ring-primary-blue focus:border-primary-blue block"
                      }`}
                      aria-label="Jenis Transaksi"
                      {...field}
                    >
                      <option value="" disabled>
                        Pilih bank tujuan
                      </option>
                      <option value="Bank Central Asia">
                        BCA - Bank Central Asia
                      </option>
                      <option value="Bank Negara Indonesia">
                        BNI - Bank Negara Indonesia
                      </option>
                      <option value="Bank Rakyat Indonesia">
                        BRI - Bank Rakyat Indonesia
                      </option>
                      <option value="Bank Mandiri">
                        Mandiri - Bank Mandiri
                      </option>
                    </select>
                  )}
                  rules={{
                    required: "Bank tujuan tidak boleh kosong",
                  }}
                />
                {errors.bankTo && (
                  <p className="text-secondary-red">{errors.bankTo.message}</p>
                )}
              </div>
              <div className="w-full">
                <Label htmlFor="accountTo">Dari Rekening</Label>
                <div className="mt-1 block w-full px-3 py-2 border border-neutral-03 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                  {`${userAccountNumber} - ${userName}`}
                </div>
              </div>
              <div className="w-full">
                <Label htmlFor="amount">Nominal</Label>
                <div className="relative">
                  <div className="h-fit pointer-events-none absolute inset-y-0 left-0 py-[10px] flex items-center pl-5">
                    <span>Rp.</span>
                  </div>
                  <Controller
                    name="amount"
                    control={control}
                    render={({ field }) => (
                      <Input
                        id="amount"
                        type="text"
                        placeholder="xxx.xxx"
                        aria-label="Masukkan nominal"
                        className={`w-full block pl-12 h-[42px] !bg-neutral-01 border-neutral-03 ${
                          errors.amount
                            ? "border-2 border-secondary-red focus:outline-secondary-red"
                            : ""
                        }`}
                        {...field}
                        onChange={(e) => {
                          field.onChange(
                            e.target.value
                              .replace(/[^0-9]/g, "")
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ".")
                          );
                        }}
                      />
                    )}
                    rules={{
                      required: "Nominal tidak boleh kosong",
                    }}
                  />
                </div>
                {errors.amount && (
                  <p className="text-secondary-red">{errors.amount.message}</p>
                )}
              </div>
              <div className="w-full">
                <Label htmlFor="description">Berita</Label>
                <Controller
                  name="description"
                  control={control}
                  render={({ field }) => (
                    <textarea
                      rows={2}
                      id="description"
                      placeholder="Isi Berita"
                      aria-label="Masukkan berita"
                      className={`w-full !bg-neutral-01 border-neutral-03 py-2 px-3 rounded-lg focus:outline-primary-blue border  ${
                        errors.description
                          ? "border-2 border-secondary-red focus:outline-secondary-red"
                          : ""
                      }`}
                      {...field}
                    ></textarea>
                  )}
                  rules={{
                    required: "Berita tidak boleh kosong",
                  }}
                />
                {errors.description && (
                  <p className="text-secondary-red">
                    {errors.description.message}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="amount">Waktu Transfer</Label>
                <div className="w-60">
                  <Controller
                    name="datetime"
                    control={control}
                    render={({ field }) => (
                      <Input
                        id="datetime"
                        type="datetime-local"
                        aria-label="Masukkan waktu transfer"
                        className={`h-[42px] !bg-neutral-01 border-neutral-03 ${
                          errors.datetime
                            ? "border-2 border-secondary-red focus:outline-secondary-red"
                            : ""
                        }`}
                        {...field}
                        min={`${new Date().toISOString().slice(0, 16)}`}
                      />
                    )}
                    // rules={{
                    //   required: "Input tanggal lahir tidak boleh kosong",
                    // }}
                  />
                  {errors.datetime && (
                    <p className="text-secondary-red">
                      {errors.datetime.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="mt-10 text-center">
              <Button id="btnLanjut" aria-label="Tombol lanjut">
                Lanjut
              </Button>
            </div>
          </form>
        </div>
      </main>
      <FooterDashboard />
      <Alert
        className="p-8"
        variant="danger"
        isOpen={isOpen}
        autoDismiss={false}
        onClose={() => setIsOpen(false)}
        showCloseButton={true}
      >
        {msgError}
      </Alert>
    </SpinnerWrapper>
  );
};

export default TransferForm;

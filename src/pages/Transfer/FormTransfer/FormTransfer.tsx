import FooterDashboard from "@/components/Footer/FooterDasboard";
import Header from "@/components/Header/HeaderDasboard";
import currencyFormat from "@/utils/currencyFormat";
import { IAccount, IFormTransfer } from "./types";
import { useEffect, useState } from "react";

import Select from "react-select";
import Alert from "@/components/Alert/Alert";
import Button from "@/components/Button/Button";
import { useUserStore } from "@/store/UserStore";
import { useNavigate } from "react-router-dom";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import axiosInstance from "@/axios/axios";
import Label from "@/components/Label/Label";
import Input from "@/components/Input/Input";

const bankOptions = [
  { value: "bca", label: "BCA - Bank Central Asia" },
  { value: "bni", label: "BNI - Bank Negara Indonesia" },
  { value: "bri", label: "BRI - Bank Rakyat Indonesia" },
  { value: "mandiri", label: "Mandiri - Bank Mandiri" },
];

const TransferForm: React.FC = () => {
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<IFormTransfer>({
    defaultValues: {
      accountFrom: "",
      accountTo: "",
      amount: 0,
      description: "",
      pin: "",
    },
  });
  const [saldo, setSaldo] = useState<number>(0);
  const [userName, setUserName] = useState<string>("");
  const [userAccountNumber, setUserAccountNumber] = useState<string>("");

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [msgError, setMsgError] = useState<string>("");
  const { userData, balance, fetchUserData } = useUserStore();
  const [accountList, setAccountLit] = useState<IAccount[]>([]);

  useEffect(() => {
    if (!userData) {
      fetchUserData();
    }
    if (userData) {
      setUserName(userData.name);
      setValue("accountFrom", userData.account_number.toString());
      setUserAccountNumber(userData.account_number.toString());
    }
    if (balance !== null) {
      setSaldo(balance);
    }
  }, [fetchUserData, userData]);

  const getAllAccount = async () => {
    try {
      const { data } = await axiosInstance.get("/account-list");

      console.log({ data });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllAccount();
  }, []);

  const onSubmit: SubmitHandler<IFormTransfer> = (data) => {
    console.log({ data });
    // if (rekeningTujuan != +formData.accountNumber) {
    //   setMsgError("Nomor Rekening Tidak Valid");
    //   setIsOpen(true);
    //   return;
    // } else if (+formData.amount > saldo) {
    //   setMsgError("Saldo Tidak Cukup");
    //   setIsOpen(true);
    //   return;
    // }
    navigate("/transfer/input-pin", { state: data });
  };

  return (
    <>
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
                      className={`w-full h-[42px] !bg-neutral-01 ${
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
                <select
                  id="bankTujuan"
                  className="w-full h-[42px] bg-neutral-01 px-5 rounded-lg focus:outline-primary-blue border border-primary-blue appearance-none focus:ring-primary-blue focus:border-primary-blue block"
                  aria-label="Jenis Transaksi"
                >
                  <option value="bca">BCA - Bank Central Asia</option>
                  <option value="bni">BNI - Bank Negara Indonesia</option>
                  <option value="bri">BRI - Bank Rakyat Indonesia</option>
                  <option value="mandiri">Mandiri - Bank Mandiri</option>
                </select>
              </div>
              <div className="w-full">
                <Label htmlFor="accountTo">Rekening Tujuan</Label>
                <div className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                  {`${userAccountNumber} - ${userName}`}
                </div>
              </div>
              <div className="w-full">
                <Label htmlFor="amount">Nominal</Label>
                <Controller
                  name="amount"
                  control={control}
                  render={({ field }) => (
                    <Input
                      id="amount"
                      type="text"
                      placeholder="xxx.xxx"
                      aria-label="Masukkan nominal"
                      className={`w-full h-[42px] !bg-neutral-01 ${
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
                    required: "Nominal tidak boleh kosong",
                  }}
                />
                {errors.accountTo && (
                  <p className="text-secondary-red">
                    {errors.accountTo.message}
                  </p>
                )}
              </div>
              <div className="w-full">
                <Label htmlFor="amount">Berita</Label>
                <Controller
                  name="description"
                  control={control}
                  render={({ field }) => (
                    <textarea
                      rows={2}
                      id="description"
                      placeholder="Isi Berita"
                      aria-label="Masukkan berita"
                      className={`w-full !bg-neutral-01 py-2 px-3 rounded-lg focus:outline-primary-blue border  ${
                        errors.accountTo
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
                {errors.accountTo && (
                  <p className="text-secondary-red">
                    {errors.accountTo.message}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="amount">Waktu Transfer</Label>
                <div className="mt-1">
                  <button
                    type="button"
                    className="w-40 px-4 py-2 border border-primary-blue text-neutral-09 rounded-md shadow-sm bg-blue-100 text-blue-700"
                    aria-label="Waktu transfer sekarang"
                  >
                    Sekarang
                  </button>
                </div>
              </div>
            </div>
            <div className="mt-3 text-center">
              <Button id="btnLanjut" aria-label="Tombol lanjut">
                Lanjut
              </Button>
            </div>
          </form>
        </div>
      </main>
      {/* <main className="flex-grow w-[min(100%,1056px)] px-6 lg:mx-auto lg:px-0 py-10 mb-20">
        <h2 className="text-2xl font-semibold max-w-md mx-auto mt-10 p-6">
          Transfer Antar Bank
        </h2>
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow-02">
          <div className="mb-4">
            <span className="text-lg font-bold" aria-label="Saldo anda">
              Saldo : {currencyFormat(saldo, "id-ID", "IDR")}
            </span>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="accountTo"
                  className="block text-sm font-medium text-gray-700"
                >
                  Rekening Tujuan
                </label>
                <input
                  type="text"
                  id="accountTo"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  aria-label="Masukkan nomor rekening tujuan transfer"
                  {...register("accountTo")}
                />
              </div>
              <div>
                <label
                  htmlFor="bank"
                  className="block text-sm font-medium text-gray-700"
                >
                  Bank Tujuan
                </label>
                <Select
                  id="bank"
                  name="bank"
                  options={bankOptions}
                  className="mt-1 block w-full"
                  aria-label="Pilih bank tujuan transfer"
                />
              </div>
              <div>
                <label
                  htmlFor="accountNumber"
                  className="block text-sm font-medium text-gray-700"
                >
                  Dari Rekening
                </label>
                <div className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                  {`${userAccountNumber} - ${userName}`}
                </div>
              </div>
              <div>
                <label
                  htmlFor="amount"
                  className="block text-sm font-medium text-gray-700"
                >
                  Nominal
                </label>
                <input
                  type="number"
                  id="amount"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Masukkan nominal transfer"
                  aria-label="Masukkan nominal transfer"
                  {...register("amount")}
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700"
                >
                  Berita
                </label>
                <textarea
                  id="description"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  aria-label="Masukkan berita transfer(optional)"
                  {...register("description")}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Waktu Transfer
                </label>
                <div className="mt-1">
                  <button
                    type="button"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-blue-100 text-blue-700"
                    aria-label="Waktu transfer sekarang"
                  >
                    Sekarang
                  </button>
                </div>
              </div>
            </div>
            <div className="mt-4 text-center">
              <Button id="btnTransferLanjut" aria-label="Tombol lanjut">
                Lanjut
              </Button>
            </div>
          </form>
        </div>
      </main> */}
      <FooterDashboard />
      <Alert
        className="p-8"
        variant="danger"
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        showCloseButton={true}
      >
        {msgError}
      </Alert>
    </>
  );
};

export default TransferForm;

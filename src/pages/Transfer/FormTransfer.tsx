import FooterDashboard from "@/components/Footer/FooterDasboard";
import Header from "@/components/Header/HeaderDasboard";
import currencyFormat from "@/utils/currencyFormat";
import { useEffect, useState } from "react";

import Select from "react-select";
import Alert from "@/components/Alert/Alert";
import Button from "@/components/Button/Button";
import { useUserStore } from "@/store/UserStore";
import { useNavigate } from "react-router-dom";

const bankOptions = [
  { value: "bca", label: "BCA - Bank Central Asia" },
  { value: "bni", label: "BNI - Bank Negara Indonesia" },
  { value: "bri", label: "BRI - Bank Rakyat Indonesia" },
  { value: "mandiri", label: "Mandiri - Bank Mandiri" },
  // Add more bank options as needed
];
const rekeningTujuan = 11111;
const saldo = 2000000;

const TransferForm: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    accountNumber: "",
    bank: { value: "bca", label: "BCA - Bank Central Asia" },
    amount: "",
    message: "",
  });
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [msgError, setMsgError] = useState<string>("");
  const { userData, fetchUserData } = useUserStore();

  useEffect(() => {
    if (!userData) {
      fetchUserData();
    }
  }, [fetchUserData, userData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    let newValue = value;
    if (type === "text") {
      newValue = value.replace(/[^0-9]/g, "");
    }
    setFormData((formData) => ({
      ...formData,
      [name]: newValue,
    }));
  };

  const handleSelectChange = (selectedOption: any) => {
    setFormData({ ...formData, bank: selectedOption });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (rekeningTujuan != +formData.accountNumber) {
      setMsgError("Nomor Rekening Tidak Valid");
      setIsOpen(true);
      return;
    } else if (+formData.amount > saldo) {
      setMsgError("Saldo Tidak Cukup");
      setIsOpen(true);
      return;
    }
    navigate("/transfer/input-pin");
  };

  return (
    <>
      <Header />
      <main className="flex-grow w-[min(100%,1056px)] px-6 lg:mx-auto lg:px-0 py-10 mb-20">
        <h2 className="text-2xl font-semibold max-w-md mx-auto mt-10 p-6">
          Transfer Antar Bank
        </h2>
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow-02">
          <div className="mb-4">
            <span className="text-lg font-bold" aria-label="Saldo anda">
              Saldo : {currencyFormat(saldo, "id-ID", "IDR")}
            </span>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="accountNumber"
                  className="block text-sm font-medium text-gray-700"
                >
                  Rekening Tujuan
                </label>
                <input
                  type="text"
                  id="accountNumber"
                  name="accountNumber"
                  value={formData.accountNumber}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  aria-label="Masukkan nomor rekening tujuan transfer"
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
                  value={formData.bank}
                  onChange={handleSelectChange}
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
                <input
                  type="text"
                  id="accountNumber"
                  name="accountNumber"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  defaultValue={userData.account_number}
                  aria-label="Nomor rekening anda"
                />
              </div>
              <div>
                <label
                  htmlFor="amount"
                  className="block text-sm font-medium text-gray-700"
                >
                  Nominal
                </label>
                <input
                  type="text"
                  id="amount"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Masukkan nominal transfer"
                  aria-label="Masukkan nominal transfer"
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
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  aria-label="Masukkan berita transfer(optional)"
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
      </main>
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

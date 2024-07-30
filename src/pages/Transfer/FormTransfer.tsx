import FooterDashboard from "@/components/Footer/FooterDasboard"
import Header from "@/components/Header/HeaderDasboard"
import { useState } from "react";

import Select from 'react-select';

const TransferForm: React.FC = () => {
  const [formData, setFormData] = useState({
    accountNumber: '',
    bank: { value: 'bca', label: 'BCA - Bank Central Asia' },
    amount: '',
    message: '',
  });

  const bankOptions = [
    { value: 'bca', label: 'BCA - Bank Central Asia' },
    { value: 'bni', label: 'BNI - Bank Negara Indonesia' },
    { value: 'bri', label: 'BRI - Bank Rakyat Indonesia' },
    { value: 'mandiri', label: 'Mandiri - Bank Mandiri' },
    // Add more bank options as needed
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (selectedOption: any) => {
    setFormData({ ...formData, bank: selectedOption });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Transfer Data:', formData);
  };

  return (
    <>
    <Header />
    <h2 className="text-2xl font-semibold max-w-md mx-auto mt-10 p-6">Transfer Antar Bank</h2>
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow-md">
      <div className="mb-4">
        <span className="text-lg">Saldo : Rp 3.492.203</span>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="accountNumber" className="block text-sm font-medium text-gray-700">Rekening Tujuan</label>
            <input
              type="text"
              id="accountNumber"
              name="accountNumber"
              value={formData.accountNumber}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="bank" className="block text-sm font-medium text-gray-700">Bank Tujuan</label>
            <Select
              id="bank"
              name="bank"
              options={bankOptions}
              value={formData.bank}
              onChange={handleSelectChange}
              className="mt-1 block w-full"
            />
          </div>
          <div>
            <label htmlFor="accountNumber" className="block text-sm font-medium text-gray-700">Dari Rekening</label>
            <input
              type="text"
              id="accountNumber"
              name="accountNumber"
              value={formData.accountNumber}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Nominal</label>
            <input
              type="text"
              id="amount"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">Berita</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Waktu Transfer</label>
            <div className="mt-1">
              <button
                type="button"
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-blue-100 text-blue-700"
              >
                Sekarang
              </button>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Transfer
          </button>
        </div>
      </form>
    </div>
    <FooterDashboard />
    </>
  );
};

export default TransferForm;

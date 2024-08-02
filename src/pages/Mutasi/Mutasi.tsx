import HeaderDashboard from "@/components/Header/HeaderDasboard";
import FooterDashboard from "@/components/Footer/FooterDasboard";
import RiwayatTransaksiTable from "@/components/RiwayatTransaksiTable/RiwayatTransaksiTable";
import Input from "@/components/Input/Input";
import Button from "@/components/Button/Button";
import Label from "@/components/Label/Label";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

export default function Mutasi() {
  return (
    <>
      <HeaderDashboard />
      <main className="flex-grow w-[min(100%,1056px)] px-6 lg:mx-auto lg:px-0 py-10 mb-20">
        <h1 className="text-4xl font-bold mb-8">Mutasi</h1>

        <div className="w-full h-full bg-neutral-01 p-6 rounded-lg shadow-02 mb-8">
          <form className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="w-full">
              <Label htmlFor="jenisTransaksi">Jenis Transaksi</Label>
              <select
                id="jenisTransaksi"
                className="w-full h-[42px] bg-neutral-01 px-5 rounded-lg focus:outline-primary-blue border border-primary-blue focus:ring-primary-blue focus:border-primary-blue block dark:bg-neutral-01 dark:border-primary-blue dark:placeholder-gray-400 dark:text-black dark:focus:ring-primary-blue dark:focus:border-primary-blue"
                aria-label="Jenis Transaksi"
                value="semua"
              >
                <option selected value="semua">
                  Semua
                </option>
                <option value="debit">Uang Masuk</option>
                <option value="kredit">Uang Keluar</option>
              </select>
            </div>
            <div className="w-full">
              <Label htmlFor="dariTanggal">Dari Tanggal</Label>
              <Input
                id="dariTanggal"
                type="date"
                aria-label="Masukkan dari tanggal mutasi"
                className="w-full h-[42px] !bg-neutral-01 border-primary-blue !py-2"
              />
            </div>
            <div className="w-full">
              <Label htmlFor="sampaiTanggal">Sampai Tanggal</Label>
              <Input
                id="sampaiTanggal"
                type="date"
                aria-label="Masukkan sampai tanggal mutasi"
                className="w-full h-[42px] !bg-neutral-01 border-primary-blue !py-2"
              />
            </div>
            <div className="w-full flex items-end">
              <Button id="btnMutasi" aria-label="Tombol Mutasi" className="">
                Cari Mutasi
              </Button>
            </div>
          </form>
        </div>
        <div className="w-full h-full bg-neutral-01 p-6 rounded-lg shadow-02 flex flex-col gap-y-5">
          <RiwayatTransaksiTable />

          <div className="flex justify-end">
            <nav aria-label="Page navigation">
              <ul className="inline-flex items-center -space-x-px">
                <li>
                  <button className="py-2.5 px-3 ml-0 leading-tight text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700">
                    <IoIosArrowBack />
                  </button>
                </li>
                <li>
                  <a
                    href="#"
                    className="py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                  >
                    1
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                  >
                    2
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                  >
                    3
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                  >
                    4
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                  >
                    5
                  </a>
                </li>
                <li>
                  <button className="py-2.5 px-3 leading-tight text-gray-500 bg-white border rounded-r-lg border-gray-300 hover:bg-gray-100 hover:text-gray-700">
                    <IoIosArrowForward />
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </main>
      <FooterDashboard />
    </>
  );
}

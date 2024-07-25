import { Link } from "react-router-dom";
import {
  MdAddToHomeScreen,
  MdOutlineBolt,
  MdOutlineWallet,
  MdWifi,
} from "react-icons/md";

export default function Bayar() {
  return (
    <>
      <div className="my-20 w-full sm:w-[384px] h-auto sm:h-[230px] shadow-03 rounded-[10px] flex flex-col justify-start py-6 gap-3 sm:gap-10 bg-neutral-01">
        <h1 className="px-6 font-bold text-lg md:text-xl">Bayar</h1>
        <div className="flex-wrap flex justify-center gap-3">
          <Link
            to={"#"}
            className="w-[76px] shadow-02 rounded-lg bg-neutral-01 flex flex-col justify-center items-center py-4 hover:scale-110 transition duration-150 ease-out hover:ease-in"
            aria-label="Menu bayar listrik"
          >
            <MdOutlineBolt size={30} />
            <p className="text-sm">Listrik</p>
          </Link>
          <Link
            to={"#"}
            className="w-[76px] shadow-02 rounded-lg bg-neutral-01 flex flex-col justify-center items-center py-4 hover:scale-110 transition duration-150 ease-out hover:ease-in"
            aria-label="Menu beli pulsa"
          >
            <MdAddToHomeScreen size={30} />
            <p className="text-sm">Pulsa</p>
          </Link>
          <Link
            to={"#"}
            className="w-[76px] shadow-02 rounded-lg bg-neutral-01 flex flex-col justify-center items-center py-4 hover:scale-110 transition duration-150 ease-out hover:ease-in"
            aria-label="Menu beli data"
          >
            <MdWifi size={30} />
            <p className="text-sm">Data</p>
          </Link>
          <Link
            to={"#"}
            className="w-[76px] shadow-02 rounded-lg bg-neutral-01 flex flex-col justify-center items-center py-4 hover:scale-110 transition duration-150 ease-out hover:ease-in"
            aria-label="Menu top-up e-wallet"
          >
            <MdOutlineWallet size={30} />
            <p className="text-sm">e-Wallet</p>
          </Link>
        </div>
      </div>
    </>
  );
}

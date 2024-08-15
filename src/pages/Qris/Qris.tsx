import FooterDashboard from "@/components/Footer/FooterDasboard";
import Header from "@/components/Header/HeaderDasboard";
import Alert from "@/components/Alert/Alert";
import { useEffect, useState } from "react";
import { useUserStore } from "@/store/UserStore";
import QrisText from "@/assets/QRIS.svg";
import avatar from "@/assets/avatar.png";
import SpinnerWrapper from "@/components/Spinner/SpinnerWrapper";

export default function Qris() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [msgError] = useState<string>("");
  const { userData, qrCode, isLoading, fetchQRCode, fetchUserData } =
    useUserStore();

  useEffect(() => {
    if (!userData) {
      fetchUserData();
    }
  }, [fetchUserData, userData]);

  useEffect(() => {
    fetchQRCode();
  }, [fetchQRCode]);

  return (
    <>
      <SpinnerWrapper isLoading={isLoading}>
        <Header />
        <main className="flex-grow justify-center w-[min(100%,1056px)] px-6 lg:mx-auto lg:px-0 py-10 mb-20">
          <h2 className="text-2xl text-center font-semibold max-w-md mx-auto mt-10">
            Tunjukkan kode QR untuk menerima transfer
          </h2>
          <div className="max-w-md mx-auto mt-6 p-6 flex flex-col items-center">
            <div className="mb-10">
              <div className="flex items-center bg-neutral-01 border border-primary-darkBlue rounded-lg py-4 px-5 gap-4 overflow-auto">
                <img
                  src={avatar}
                  className="w-10 h-10 capitalize"
                  alt={`Avatar ${userData?.name}`}
                />
                <div className="">
                  <p className="text-lg">{userData?.name}</p>
                  <p className="text-gray-500">{userData?.account_number}</p>
                </div>
              </div>
            </div>
            <div className="">
              <img src={QrisText} alt="Teks QRIS" />
            </div>
            <div className="mb-4">
              {qrCode ? (
                <img src={qrCode} alt="Kode QRIS" />
              ) : (
                <div>Kode QRIS tidak tersedia</div>
              )}
            </div>
            <div className="text-center">
              <p className="text-sm md:text-xl font-semibold">
                QR hanya berlaku untuk 1 kali transaksi
              </p>
            </div>
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
      </SpinnerWrapper>
    </>
  );
}

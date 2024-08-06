import FooterDashboard from "@/components/Footer/FooterDasboard";
import Header from "@/components/Header/HeaderDasboard";
import SaldoCard from "@/components/SaldoCard/SaldoCard";
import TransaksiTerbaruCard from "@/components/TransaksiTerbaruCard/TransaksiTerbaruCard";
import BayarCard from "@/components/BayarCard/BayarCard";
import RiwayatTransaksiTable from "@/components/RiwayatTransaksiTable/RiwayatTransaksiTable";
import { useUserStore } from "@/store/UserStore";
import { useEffect, useState } from "react";
import SpinnerWrapper from "@/components/Spinner/SpinnerWrapper";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const { userData, isLoading, fetchUserData, fetchBalance, fetchMutations } = useUserStore();
  const [lastLogin, setLastLogin] = useState("");

  useEffect(() => {
    const now = new Date();
    const formattedDate = now.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
    const formattedTime = now.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
    });
    setLastLogin(`${formattedDate} ${formattedTime}`);
  }, []);

  useEffect(() => {
    if (!userData) {
      fetchUserData();
    }
  }, [fetchUserData, userData]);

  useEffect(() => {
    if (userData && userData.account_number) {
      fetchBalance(userData.account_number);
      fetchMutations(userData.account_number);
    }
  }, [userData, fetchBalance, fetchMutations]);

  return (
    <>
      <SpinnerWrapper isLoading={isLoading}>
        <Header />
        <main className="w-[min(100%,1056px)] px-6 lg:mx-auto lg:px-0 py-10">
          <h1 className="text-4xl font-bold mb-1 capitalize">
            Halo, {userData?.name}
          </h1>
          <p className="mb-8">Terakhir Masuk: {lastLogin} </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[minmax(0,_1fr)_minmax(0,_1fr)_minmax(384px,_1fr)] gap-7">
            <div className="">
              <SaldoCard />
            </div>

            <div className="">
              <TransaksiTerbaruCard />
            </div>

            <div className="md:col-span-2 lg:col-span-1">
              <BayarCard />
            </div>

            <div className="md:col-span-2 lg:col-span-3">
              <div className="w-full bg-neutral-01 p-6 rounded-lg shadow-02 flex flex-col gap-y-5">
                <div className="flex flex-col items-start sm:flex-row sm:items-center justify-between gap-3">
                  <h2 className="text-2xl font-bold">Riwayat Transaksi</h2>
                  <Link
                    to="/mutasi"
                    className="bg-primary-blue text-neutral-01 py-2 px-5 rounded-full"
                  >
                    Lihat Selengkapnya
                  </Link>
                </div>
                <RiwayatTransaksiTable />
              </div>
            </div>
          </div>
        </main>
        <FooterDashboard />
      </SpinnerWrapper>
    </>
  );
}

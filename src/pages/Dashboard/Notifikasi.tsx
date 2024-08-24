// src/pages/NotifikasiPage.tsx
import React from "react";
import FooterDasboard from "@/components/Footer/FooterDasboard";
import HeaderDasboard from "@/components/Header/HeaderDasboard";
import NotificationList, {
  Notification,
} from "@/components/Notifikasi/Notifikasi";

const notifications: Notification[] = [
  {
    id: 1,
    title: "Transfer Berhasil",
    description:
      "Kamu berhasil melakukan transfer ke BCA dengan nominal sebesar Rp. 10.000.",
    date: "19 Juli 2024 23:58 WIB",
  },
  {
    id: 2,
    title: "Transfer Berhasil",
    description:
      "Kamu berhasil melakukan transfer ke BCA dengan nominal sebesar Rp. 10.000.",
    date: "19 Juli 2024 23:58 WIB",
  },
  {
    id: 3,
    title: "Transfer Berhasil",
    description:
      "Kamu berhasil melakukan transfer ke BCA dengan nominal sebesar Rp. 10.000.",
    date: "19 Juli 2024 23:58 WIB",
  },
  {
    id: 4,
    title: "Transfer Berhasil",
    description:
      "Kamu berhasil melakukan transfer ke BCA dengan nominal sebesar Rp. 10.000.",
    date: "19 Juli 2024 23:58 WIB",
  },
  {
    id: 5,
    title: "Transfer Berhasil",
    description:
      "Kamu berhasil melakukan transfer ke BCA dengan nominal sebesar Rp. 10.000.",
    date: "19 Juli 2024 23:58 WIB",
  },
  {
    id: 6,
    title: "Transfer Berhasil",
    description:
      "Kamu berhasil melakukan transfer ke BCA dengan nominal sebesar Rp. 10.000.",
    date: "19 Juli 2024 23:58 WIB",
  },
];

const handleMarkAllAsRead = () => {
  alert("All notifications marked as read.");
};

const Notifikasi: React.FC = () => {
  return (
    <>
      <HeaderDasboard />
      <main className="flex-grow w-[min(100%,1056px)] px-6 lg:mx-auto lg:px-0 py-10 mb-20">
        <h1 className="text-4xl font-bold mb-8">Notifikasi</h1>
        <div className="mx-auto py-8 bg-white flex-grow w-[min(100%,1056px)] rounded-[10px] shadow-03">
          <NotificationList
            notifications={notifications}
            onMarkAllAsRead={handleMarkAllAsRead}
            maxRow={5}
            pagination
          />
        </div>
      </main>
      <FooterDasboard />
    </>
  );
};

export default Notifikasi;

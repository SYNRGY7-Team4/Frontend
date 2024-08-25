// src/pages/NotifikasiPage.tsx
import React, { useEffect, useState } from "react";
import FooterDasboard from "@/components/Footer/FooterDasboard";
import HeaderDasboard from "@/components/Header/HeaderDasboard";
import NotificationList, {
  Notification,
} from "@/components/Notifikasi/Notifikasi";
import axiosInstance from "@/axios/axios";
import axios from "axios";

const dummynotifications: Notification[] = [
  {
    id: 1,
    title: "Transfer Berhasil",
    body: "Kamu berhasil melakukan transfer ke BCA dengan nominal sebesar Rp. 10.000.",
    sentAt: "19 Juli 2024 23:58 WIB",
    read: false,
  },
  {
    id: 2,
    title: "Transfer Berhasil",
    body: "Kamu berhasil melakukan transfer ke BCA dengan nominal sebesar Rp. 10.000.",
    sentAt: "19 Juli 2024 23:58 WIB",
    read: false,
  },
  {
    id: 3,
    title: "Transfer Berhasil",
    body: "Kamu berhasil melakukan transfer ke BCA dengan nominal sebesar Rp. 10.000.",
    sentAt: "19 Juli 2024 23:58 WIB",
    read: false,
  },
  {
    id: 4,
    title: "Transfer Berhasil",
    body: "Kamu berhasil melakukan transfer ke BCA dengan nominal sebesar Rp. 10.000.",
    sentAt: "19 Juli 2024 23:58 WIB",
    read: false,
  },
  {
    id: 5,
    title: "Transfer Berhasil",
    body: "Kamu berhasil melakukan transfer ke BCA dengan nominal sebesar Rp. 10.000.",
    sentAt: "19 Juli 2024 23:58 WIB",
    read: false,
  },
  {
    id: 6,
    title: "Transfer Berhasil",
    body: "Kamu berhasil melakukan transfer ke BCA dengan nominal sebesar Rp. 10.000.",
    sentAt: "19 Juli 2024 23:58 WIB",
    read: false,
  },
];

const handledummy = () => {
  console.log("first");
};

const Notifikasi: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axiosInstance.get("/notification/");
        setNotifications(response.data);
        console.log("sdsdsdsdsds");
      } catch (error) {
        console.error("Failed to fetch notifications", error);
      }
    };

    fetchNotifications();
  }, []);

  const handleMarkAllAsRead = async () => {
    try {
      await axiosInstance.put("/notification/read/all");
      setNotifications((prevNotifications) =>
        prevNotifications.map((notification) => ({
          ...notification,
          read: true,
        }))
      );
      alert("All notifications marked as read.");
    } catch (error) {
      console.error("Failed to mark all notifications as read", error);
    }
  };

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

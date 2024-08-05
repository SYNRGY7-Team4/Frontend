// src/pages/NotifikasiPage.tsx
import React from "react";
import FooterDasboard from "@/components/Footer/FooterDasboard";
import HeaderDasboard from "@/components/Header/HeaderDasboard";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
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
          />
          <div className="flex justify-center md:justify-end mt-6 md:px-14">
            <nav aria-label="Page navigation">
              <ul className="inline-flex items-center text-sm md:text-base -space-x-px">
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
      <FooterDasboard />
    </>
  );
};

export default Notifikasi;

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

const NotifikasiPage: React.FC = () => {
  return (
    <>
      <HeaderDasboard />
      <main className="w-full min-h-[828px] h-[calc(100vh-73px-75px)] md:h-[calc(100vh-94px-75px)] bg-cover bg-center">
        <div className="flex flex-col pt-8">
          <div className="container mx-auto w-[1056px]">
            <h2 className="text-[32px] font-black mb-[35px] flex justify-start">
              Notifikasi
            </h2>
          </div>
          <div className="mx-auto py-8 bg-white w-[1056px] rounded-[10px] shadow-lg">
            <NotificationList
              notifications={notifications}
              onMarkAllAsRead={handleMarkAllAsRead}
            />
            <div className="flex justify-end mt-6 px-14">
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
        </div>
      </main>
      <FooterDasboard />
    </>
  );
};

export default NotifikasiPage;

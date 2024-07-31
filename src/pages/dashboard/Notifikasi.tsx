import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import transferIcon from "@/assets/vektor_transfer.png";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const notifications = [
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

export default function Notifikasi() {
  const handleMarkAllAsRead = () => {
    alert("All notifications marked as read.");
  };

  const renderNotifications = () => {
    return notifications.map((notification) => (
      <div
        key={notification.id}
        className="flex items-start justify-between py-4 px-16 border-b border-gray-200"
      >
        <div className="flex items-center">
          <img
            src={transferIcon}
            alt="icon"
            className="w-[40px] h-[40px] mr-4"
          />
          <div>
            <h4 className="text-[16px] font-bold text-black pb-1">
              {notification.title}
            </h4>
            <div className="text-[12px] font-bold text-[#B3B3B3]">
              <p>
                {notification.description} <br /> {notification.date}
              </p>
            </div>
          </div>
        </div>
      </div>
    ));
  };

  return (
    <>
      <Header />
      <main className="w-full min-h-[828px] h-[calc(100vh-73px-75px)] md:h-[calc(100vh-94px-75px)] bg-cover bg-center">
        <div className="flex flex-col pt-8">
          <div className="container mx-auto w-[1056px] ">
            <h2 className="text-[32px] font-black mb-[35px] flex justify-start">
              Notifikasi
            </h2>
          </div>
          <div className="container mx-auto py-8 bg-white w-[1056px] rounded-[10px] shadow-lg">
            <div className="bg-white rounded-lg">
              <div className="flex justify-end items-center mb-6 px-12">
                <button
                  onClick={handleMarkAllAsRead}
                  className="border border-1 rounded-xl border-[#0066AE] text-[#0066AE] px-10 py-2"
                >
                  Tandai Sudah Baca
                </button>
              </div>
              <div className="">{renderNotifications()}</div>
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
        </div>
      </main>

      <Footer />
    </>
  );
}

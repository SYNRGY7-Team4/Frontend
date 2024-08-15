import logo from "@/assets/logo.png";
import notifikasiEmptyState from "@/assets/no_notification.svg";
import { NavLink, useNavigate } from "react-router-dom";
import { MaterialSymbol } from "react-material-symbols";
import "react-material-symbols/rounded";
import { useState } from "react";
import NotificationList, { Notification } from "../Notifikasi/Notifikasi";
import Button from "../Button/Button";
import { useUserStore } from "@/store/UserStore";

export default function HeaderDashboard() {
  const navigate = useNavigate();
  const resetState = useUserStore((state) => state.resetState);

  const [isOpenMobileMenu, setOpenMobileMenu] = useState(false);
  const [isOpenDropdownNotifikasi, setOpenDropdownNotifikasi] = useState(false);

  const toggleDropdown = (dropdownType: string) => {
    switch (dropdownType) {
      case "notifikasi":
        setOpenDropdownNotifikasi((prev) => !prev);
        break;
      default:
        setOpenDropdownNotifikasi(false);
        break;
    }
  };

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
  ];

  const handleMarkAllAsRead = () => {
    alert("All notifications marked as read.");
  };

  const handleLogout = () => {
    localStorage.clear();
    resetState();

    navigate("/login");
  };

  return (
    <header className="flex flex-col">
      <div className="px-8 h-[73px] md:px-14 md:h-[84px] flex items-center justify-between bg-neutral-01">
        <NavLink to={"/dashboard"}>
          <div className="w-[78px] md:w-[100px]">
            <img src={logo} alt="Lumi Logo" />
          </div>
        </NavLink>
        <div
          className="text-3xl md:hidden flex items-center"
          onClick={() => setOpenMobileMenu(!isOpenMobileMenu)}
          aria-label="Tombol Menu Mobile"
        >
          {isOpenMobileMenu ? (
            <MaterialSymbol icon="close" title="close" />
          ) : (
            <MaterialSymbol icon="menu" title="menu" />
          )}
        </div>
        <nav className="hidden md:flex">
          <ul className="flex items-center gap-x-8">
            <li className="font-bold text-lg tracking-wide">
              <NavLink
                to="/dashboard"
                className={({ isActive }) => {
                  return isActive
                    ? "text-primary-darkBlue border-b-2 border-b-primary-darkBlue"
                    : "text-black relative w-fit block after:block after:content-[''] after:absolute after:h-[2px] after:bg-primary-darkBlue after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-left";
                }}
                aria-current="page"
              >
                Beranda
              </NavLink>
            </li>
            <li className="font-bold text-lg tracking-wide">
              <NavLink
                to="/transfer"
                className={({ isActive }) => {
                  return isActive
                    ? "text-primary-darkBlue border-b-2 border-b-primary-darkBlue"
                    : "text-black relative w-fit block after:block after:content-[''] after:absolute after:h-[2px] after:bg-primary-darkBlue after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-left";
                }}
                aria-current="page"
              >
                Transfer
              </NavLink>
            </li>
            <li className="font-bold text-lg tracking-wide">
              <NavLink
                to="/mutasi"
                className={({ isActive }) => {
                  return isActive
                    ? "text-primary-darkBlue border-b-2 border-b-primary-darkBlue"
                    : "text-black relative w-fit block after:block after:content-[''] after:absolute after:h-[2px] after:bg-primary-darkBlue after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-left";
                }}
                aria-current="page"
              >
                Mutasi
              </NavLink>
            </li>
            <li className="font-bold text-lg tracking-wide">
              <NavLink
                to="/qris"
                className={({ isActive }) => {
                  return isActive
                    ? "text-primary-darkBlue border-b-2 border-b-primary-darkBlue"
                    : "text-black relative w-fit block after:block after:content-[''] after:absolute after:h-[2px] after:bg-primary-darkBlue after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-left";
                }}
                aria-current="page"
              >
                QRIS
              </NavLink>
            </li>
            <li className="font-bold text-lg tracking-wide flex items-center">
              <NavLink to={"/profil"} aria-label="Menu profil">
                {({ isActive }) => (
                  <div
                    className={`w-fit block flex items-center ${
                      isActive
                        ? "text-primary-darkBlue border-b-2 border-b-primary-darkBlue"
                        : "text-black relative w-fit block after:block after:content-[''] after:absolute after:h-[2px] after:bg-primary-darkBlue after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-left after:bottom-0"
                    }`}
                  >
                    <MaterialSymbol
                      icon="account_circle"
                      size={24}
                      title="account_circle"
                    />
                  </div>
                )}
              </NavLink>
            </li>
            <li className="font-bold text-lg tracking-wide relative">
              <div className="cursor-pointer">
                <Button
                  className={`bg-transparent relative !flex !items-center relative w-fit h-fit block ${
                    location.pathname === "/notifikasi"
                      ? "text-primary-darkBlue border-b-2 border-b-primary-darkBlue"
                      : "after:block after:content-[''] after:absolute after:h-[1px] after:bg-primary-darkBlue after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-left after:bottom-[-2px]"
                  } `}
                  aria-label="Menu notifikasi"
                  onClick={() => toggleDropdown("notifikasi")}
                >
                  <MaterialSymbol
                    icon="notifications"
                    size={24}
                    title="notifications"
                    className="text-black"
                  />
                  <MaterialSymbol
                    fill
                    icon="circle"
                    size={6}
                    title="circle"
                    className="absolute top-0 right-0 text-secondary-red"
                  />
                </Button>
                {isOpenDropdownNotifikasi && (
                  <div className="bg-neutral-01 absolute w-[310px] rounded-lg shadow-02 z-50 py-2 right-0 text-primary-darkBlue">
                    <span className="text-lg border-b top-20 flex flex-col items-start p-2 w-full px-4">
                      Notifikasi
                    </span>
                    <div className="flex justify-around pt-3 text-center">
                      <div className="flex items-start justify-start">
                        {notifications ? (
                          <NotificationList
                            notifications={notifications}
                            compact={true}
                            onMarkAllAsRead={handleMarkAllAsRead}
                          />
                        ) : (
                          <img
                            src={notifikasiEmptyState}
                            alt="Tidak ada notifikasi"
                          />
                        )}
                      </div>
                    </div>
                    <div className={"text-sm text-center pt-2 pb-1 w-full"}>
                      <NavLink
                        to={"/notifikasi"}
                        aria-label="Ke halaman notifikasi"
                      >
                        Lihat Selengkapnya
                      </NavLink>
                    </div>
                  </div>
                )}
              </div>
            </li>
            <li className="font-bold text-lg tracking-wide">
              <button
                type="button"
                className="text-black relative w-fit block after:block after:content-[''] after:absolute after:h-[2px] after:bg-primary-darkBlue after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-left"
                onClick={handleLogout}
                aria-label="Menu keluar"
              >
                <div className="flex items-center space-x-2">
                  <MaterialSymbol icon="logout" size={24} title="logout" />
                  <p>Keluar</p>
                </div>
              </button>
            </li>
          </ul>
        </nav>
      </div>

      <div className="relative">
        <div className="w-full bg-primary-lightBlue blur-sm h-[60px]"></div>

        {/* Mobile Nav */}
        <nav
          className={`md:hidden absolute w-full duration-500 z-[100] bg-white shadow-02 ${
            isOpenMobileMenu ? "block" : "hidden"
          }`}
        >
          <ul className={`pl-4 pt-3 pb-8`}>
            <li className="py-3 px-3 text-l font-bold">
              <NavLink
                to="/dashboard"
                className={({ isActive }) => {
                  return isActive
                    ? "text-primary-darkBlue border-b-2 border-b-primary-darkBlue"
                    : "text-black relative w-fit block after:block after:content-[''] after:absolute after:h-[1px] after:bg-primary-darkBlue after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-left";
                }}
                aria-label="Menu beranda"
              >
                Beranda
              </NavLink>
            </li>
            <li className="py-3 px-3 text-l font-bold">
              <NavLink
                to="/transfer"
                className={({ isActive }) => {
                  return isActive
                    ? "text-primary-darkBlue border-b-2 border-b-primary-darkBlue"
                    : "text-black relative w-fit block after:block after:content-[''] after:absolute after:h-[1px] after:bg-primary-darkBlue after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-left";
                }}
                aria-label="Menu Transfer"
              >
                Transfer
              </NavLink>
            </li>
            <li className="py-3 px-3 text-l font-bold">
              <NavLink
                to="/mutasi"
                className={({ isActive }) => {
                  return isActive
                    ? "text-primary-darkBlue border-b-2 border-b-primary-darkBlue"
                    : "text-black relative w-fit block after:block after:content-[''] after:absolute after:h-[1px] after:bg-primary-darkBlue after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-left";
                }}
                aria-label="Menu Mutasi"
              >
                Mutasi
              </NavLink>
            </li>
            <li className="py-3 px-3 text-l font-bold">
              <NavLink
                to="/qris"
                className={({ isActive }) => {
                  return isActive
                    ? "text-primary-darkBlue border-b-2 border-b-primary-darkBlue"
                    : "text-black relative w-fit block after:block after:content-[''] after:absolute after:h-[1px] after:bg-primary-darkBlue after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-left";
                }}
                aria-label="Menu Mutasi"
              >
                QRIS
              </NavLink>
            </li>
            <li className="py-3 px-3 text-l font-bold">
              <NavLink
                to="/profil"
                className={({ isActive }) => {
                  return isActive
                    ? "text-primary-darkBlue border-b-2 border-b-primary-darkBlue"
                    : "text-black relative w-fit block after:block after:content-[''] after:absolute after:h-[1px] after:bg-primary-darkBlue after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-left";
                }}
                aria-label="Menu profil"
              >
                Profil
              </NavLink>
            </li>
            <li className="py-3 px-3 text-l font-bold">
              <NavLink
                to={"/notifikasi"}
                className={({ isActive }) => {
                  return isActive
                    ? "text-primary-darkBlue border-b-2 border-b-primary-darkBlue"
                    : "text-black relative w-fit block after:block after:content-[''] after:absolute after:h-[1px] after:bg-primary-darkBlue after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-left";
                }}
                aria-label="Menu notifikasi"
              >
                Notifikasi
              </NavLink>
            </li>
            <li className="py-3 px-3 text-l font-bold">
              <button
                type="button"
                className="text-black relative w-fit block after:block after:content-[''] after:absolute after:h-[1px] after:bg-primary-darkBlue after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-left"
                onClick={handleLogout}
                aria-label="Menu keluar"
              >
                Keluar
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

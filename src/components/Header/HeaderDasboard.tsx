import logo from "@/assets/logo.png";
import notifikasiEmptyState from "@/assets/no_notification.svg";
import { NavLink } from "react-router-dom";
import {
  MdLogout,
  MdOutlineAccountCircle,
  MdLens,
  MdKeyboardArrowDown,
  MdKeyboardArrowRight,
  MdMenu,
  MdOutlineClose,
  MdCreditCard,
  MdOutlineDescription,
  MdOutlineNotifications,
} from "react-icons/md";
import { useState } from "react";

export default function Header() {
  const [isOpenMobileMenu, setOpenMobileMenu] = useState(false);
  const [isOpenDropdownTransaksi, setOpenDropdownTransaksi] = useState(false);
  const [isOpenDropdownNotifikasi, setOpenDropdownNotifikasi] = useState(false);

  const toggleDropdown = (dropdownType) => {
    switch (dropdownType) {
      case "transaksi":
        setOpenDropdownTransaksi((prev) => !prev);
        setOpenDropdownNotifikasi(false); // Close notifikasi dropdown
        break;
      case "notifikasi":
        setOpenDropdownNotifikasi((prev) => !prev);
        setOpenDropdownTransaksi(false); // Close transaksi dropdown
        break;
      default:
        setOpenDropdownTransaksi(false);
        setOpenDropdownNotifikasi(false);
        break;
    }
  };

  return (
    <header className="flex flex-col">
      <div className="px-8  h-[73px] md:px-14 md:h-[84px] flex items-center justify-between bg-neutral-01">
        <NavLink to={"dashboard"}>
          <div className="w-[78px] md:w-[100px]">
            <img src={logo} alt="Lumi Logo" />
          </div>
        </NavLink>
        <div
          className="text-3xl md:hidden"
          onClick={() => setOpenMobileMenu(!isOpenMobileMenu)}
          aria-label="Tombol Menu Mobile"
        >
          {isOpenMobileMenu ? <MdOutlineClose /> : <MdMenu />}
        </div>
        <nav className="hidden md:flex">
          <ul className="flex items-center gap-x-8">
            <li className="font-bold text-lg tracking-wide">
              <NavLink
                to="/dashboard/notifikasi"
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
            <li className="font-bold text-lg tracking-wide relative">
              <div
                className={`cursor-pointer ${
                  location.pathname === "/transaksi/transfer"
                    ? "text-primary-darkBlue border-b-2 border-b-primary-darkBlue"
                    : "text-black relative w-fit block after:block after:content-[''] after:absolute after:h-[2px] after:bg-primary-darkBlue after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-left"
                }`}
                aria-label="Menu dropdown transaksi"
              >
                <div
                  className={`flex items-center space-x-2 `}
                  onClick={() => toggleDropdown("transaksi")}
                >
                  Transaksi
                  {!isOpenDropdownTransaksi ? (
                    <MdKeyboardArrowRight />
                  ) : (
                    <MdKeyboardArrowDown />
                  )}
                </div>
                {isOpenDropdownTransaksi && (
                  <div className="bg-neutral-01 absolute w-[310px] rounded-lg shadow-02 z-50 py-4 right-0 text-primary-darkBlue">
                    <span className="text-lg border-b top-20 flex flex-column items-start p-2 w-full px-4">
                      Transaksi
                    </span>
                    <div
                      className="flex justify-around px-4 py-3"
                      style={{ textAlign: "-webkit-center" }}
                    >
                      <NavLink
                        to="/transaksi/transfer"
                        aria-label="Menu transfer"
                      >
                        <MdCreditCard size={"40"} />
                        <span>Transfer</span>
                      </NavLink>
                      <NavLink to={"/mutasi"} aria-label="Menu mutasi rekening">
                        <MdOutlineDescription size={"40"} />
                        <span>Mutasi</span>
                      </NavLink>
                    </div>
                  </div>
                )}
              </div>
            </li>
            <li className="font-bold text-lg tracking-wide">
              <NavLink to={"/profil"} aria-label="Menu profil">
                {({ isActive }) => (
                  <div
                    className={`w-fit ${
                      isActive
                        ? "text-primary-darkBlue border-b-2 border-b-primary-darkBlue"
                        : "text-black relative w-fit block after:block after:content-[''] after:absolute after:h-[2px] after:bg-primary-darkBlue after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-left"
                    }`}
                  >
                    <MdOutlineAccountCircle size={"24"} />
                  </div>
                )}
              </NavLink>
            </li>
            <li className="font-bold text-lg tracking-wide relative">
              <div className="cursor-pointer" aria-label="Menu notifikasi">
                <div
                  className="relative"
                  aria-describedby="Icon notifikasi"
                  onClick={() => toggleDropdown("notifikasi")}
                >
                  <MdOutlineNotifications size={"24"} />
                  <MdLens
                    size={"6"}
                    className="absolute top-0 right-0 text-secondary-red"
                  />
                </div>
                {isOpenDropdownNotifikasi && (
                  <div className="bg-neutral-01 absolute w-[310px] rounded-lg shadow-02 z-50 py-4 right-0 text-primary-darkBlue">
                    <span className="text-lg border-b top-20 flex flex-column items-start p-2 w-full px-4">
                      Notifikasi
                    </span>
                    <div className="flex justify-around px-4 py-3 text-center">
                      <img
                        src={notifikasiEmptyState}
                        alt="Tidak ada notifikasi"
                      />
                    </div>
                    <div className={"text-lg text-center pt-3 border-t w-full"}>
                      <NavLink
                        to={"notifikasi"}
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
              <NavLink
                to={"#"}
                className="text-black relative w-fit block after:block after:content-[''] after:absolute after:h-[2px] after:bg-primary-darkBlue after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-left"
                aria-label="Menu keluar"
              >
                <div className="flex items-center space-x-2">
                  <MdLogout size={"20"} />
                  <p>Keluar</p>
                </div>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>

      <div className="relative">
        <div className="w-full bg-primary-lightBlue blur-sm h-[60px]"></div>

        {/* Mobile Nav */}
        <nav
          className={`md:hidden absolute w-full duration-500 bg-white shadow-02 ${
            isOpenMobileMenu ? "block" : "hidden"
          }`}
        >
          <ul className={`pl-4 pt-3 pb-8`}>
            <li className="py-3 px-3 text-l font-bold">
              <NavLink
                to="/"
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
              <div
                className={`cursor-pointer ${
                  location.pathname === "/transaksi/transfer"
                    ? "text-primary-darkBlue border-b-2 border-b-primary-darkBlue w-fit"
                    : "text-black relative w-fit block after:block after:content-[''] after:absolute after:h-[2px] after:bg-primary-darkBlue after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-left"
                }`}
                aria-label="Menu dropdown transaksi"
              >
                <div
                  className={`flex items-center space-x-2 `}
                  onClick={() => setOpenDropdownTransaksi((prev) => !prev)}
                >
                  Transaksi
                  {!isOpenDropdownTransaksi ? (
                    <MdKeyboardArrowRight />
                  ) : (
                    <MdKeyboardArrowDown />
                  )}
                </div>
              </div>
              {isOpenDropdownTransaksi && (
                <div className="bg-neutral-01 w-[310px] rounded-lg shadow-02 z-50 py-4 mt-2 right-0 text-primary-darkBlue">
                  <span className="text-lg border-b top-20 flex flex-column items-start p-2 w-full px-4">
                    Transaksi
                  </span>
                  <div
                    className="flex justify-around px-4 py-3"
                    style={{ textAlign: "-webkit-center" }}
                  >
                    <NavLink
                      to="/transaksi/transfer"
                      aria-label="Menu transfer"
                    >
                      <MdCreditCard size={"40"} />
                      <span>Transfer</span>
                    </NavLink>
                    <NavLink to={"/mutasi"} aria-label="Menu mutasi rekening">
                      <MdOutlineDescription size={"40"} />
                      <span>Mutasi</span>
                    </NavLink>
                  </div>
                </div>
              )}
            </li>
            <li className="py-3 px-3 text-l font-bold">
              <NavLink
                to="profil"
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
                to={"/dashboard/notifikasi"}
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
              <NavLink
                to={"#"}
                className="text-black relative w-fit block after:block after:content-[''] after:absolute after:h-[1px] after:bg-primary-darkBlue after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-left"
                aria-label="Menu keluar"
              >
                Keluar
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

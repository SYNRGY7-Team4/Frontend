import React from "react";

export default function TransaksiTerbaru() {
  const transaksiTerbaru = [
    {
      id: 1,
      accountName: "Kijang Inova",
      rekening: 7541223687564,
      date: "19 Juli 2024 23:58 WIB",
      accountImage: "/src/assets/Avatars.png",
    },
    {
      id: 2,
      accountName: "Zuma Grod",
      rekening: 484521365478,
      date: "19 Juli 2024 23:58 WIB",
      accountImage: "/src/assets/Avatars.png",
    },
  ];

  return (
    <>
      <div className="w-[317px] h-[230px] rounded-md shadow-lg p-6 overflow-hidden space-y-2 m-4">
        <div className="text-[18px] font-bold">Transaksi Terbaru</div>

        <div className="flex flex-col gap-3">
          {transaksiTerbaru
            ? transaksiTerbaru.map((item, id) => (
                <div
                  key={id}
                  className="w-[266px] h-[67px] rounded-lg border border-1 border-[#0A3967] flex gap-5 p-5 items-center"
                >
                  <div>
                    <img src={item.accountImage} alt="img" />
                  </div>

                  <div className="flex flex-col justify-center items-start">
                    <h3 className="text-[16px]">{item.accountName}</h3>
                    <p className="text-[#8B8B8B] text-[12px]">
                      {item.rekening}
                    </p>
                  </div>
                </div>
              ))
            : "Tidak ada Transaksi"}
        </div>
      </div>
    </>
  );
}

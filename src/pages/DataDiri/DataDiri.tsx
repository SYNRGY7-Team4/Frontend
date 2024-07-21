import { useState } from "react";
import bgAuth from "@/assets/bg-auth.jpg";
import Button from "@/components/Button/Button";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import Input from "@/components/Input/Input";
import Label from "@/components/Label/Label";
import { IFormInput } from "./types";

const DataDiri = () => {
  const [data, setData] = useState<IFormInput>({
    noKtp: 0,
    nama: "",
    tanggalLahir: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({ data });
  };

  return (
    <>
      <Header />
      <main
        className="w-full min-h-[828px] h-[calc(100vh-73px-75px)] md:h-[calc(100vh-94px-75px)] bg-cover bg-center"
        style={{ backgroundImage: `url(${bgAuth})` }}
      >
        <div className="container mx-auto px-6 flex items-center justify-center md:justify-end h-full">
          <div className="bg-neutral-01 px-8 py-14 md:px-14 rounded-lg w-[450px]">
            <h1 className="mb-10 text-3xl text-primary-blue font-bold">
              Data Diri
            </h1>
            <form className="flex flex-col gap-y-8" onSubmit={handleSubmit}>
              <div className="flex flex-col gap-y-3">
                <div className="flex flex-col gap-y-1">
                  <Label htmlFor="email">No KTP</Label>
                  <Input
                    type="number"
                    name="noKtp"
                    placeholder="1234567891011"
                    aria-label="Masukkan no KTP Anda"
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-col gap-y-1">
                  <Label htmlFor="password">Nama</Label>
                  <Input
                    name="nama"
                    placeholder="John Doe"
                    aria-label="Masukkan nama Anda"
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-col gap-y-1">
                  <Label htmlFor="password">Tanggal Lahir</Label>
                  <Input
                    type="date"
                    name="tanggalLahir"
                    aria-label="Masukkan tanggal lahir Anda"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-y-2 items-center">
                <Button id="btnLanjut" aria-label="Tombol masuk">
                  Lanjut
                </Button>
              </div>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default DataDiri;

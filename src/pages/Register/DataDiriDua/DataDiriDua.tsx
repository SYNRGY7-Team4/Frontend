import bgAuth from "@/assets/bg-auth.jpg";
import Button from "@/components/Button/Button";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import Input from "@/components/Input/Input";
import Label from "@/components/Label/Label";
import { IFormInput } from "./types"; // Ensure IFormInput includes `kota` and `jenisKelamin`
import { MdOutlineErrorOutline } from "react-icons/md";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const DataDiriDua = () => {
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    defaultValues: {
      kota: "",
      jenisKelamin: "",
    },
  });

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log({ data });
    navigate("/register/ktp");
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
              Data Diri Dua
            </h1>
            <form
              className="flex flex-col gap-y-8"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="flex flex-col gap-y-3">
                <div className="flex flex-col gap-y-1">
                  <div className="flex items-center gap-1">
                    <Label htmlFor="kota">Kota Kelahiran</Label>
                    {errors.kota && (
                      <span className="text-secondary-red">
                        <MdOutlineErrorOutline />
                      </span>
                    )}
                  </div>
                  <div>
                    <Controller
                      name="kota"
                      control={control}
                      render={({ field }) => (
                        <Input
                          id="kota"
                          type="text"
                          placeholder="Masukkan Kota Kelahiran Anda"
                          aria-label="Masukkan Kota Kelahiran Anda"
                          className={
                            errors.kota
                              ? "border-2 border-secondary-red focus:outline-secondary-red"
                              : ""
                          }
                          {...field}
                        />
                      )}
                      rules={{
                        required: "Input kota tidak boleh kosong",
                      }}
                    />
                    {errors.kota && (
                      <p className="text-secondary-red">
                        {errors.kota.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex flex-col gap-y-1">
                  <div className="flex items-center gap-1">
                    <Label htmlFor="jenisKelamin">Jenis Kelamin</Label>
                    {errors.jenisKelamin && (
                      <span className="text-secondary-red">
                        <MdOutlineErrorOutline />
                      </span>
                    )}
                  </div>
                  <div className="flex gap-x-4">
                    <label className="flex items-center">
                      <Controller
                        name="jenisKelamin"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                          <input
                            type="radio"
                            value="lakilaki"
                            checked={field.value === "lakilaki"}
                            onChange={field.onChange}
                            className="mr-2"
                          />
                        )}
                        rules={{
                          required: "Input jenis kelamin tidak boleh kosong",
                        }}
                      />
                      Laki-Laki
                    </label>
                    <label className="flex items-center">
                      <Controller
                        name="jenisKelamin"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                          <input
                            type="radio"
                            value="perempuan"
                            checked={field.value === "perempuan"}
                            onChange={field.onChange}
                            className="mr-2"
                          />
                        )}
                        rules={{
                          required: "Input jenis kelamin tidak boleh kosong",
                        }}
                      />
                      Perempuan
                    </label>
                  </div>
                  {errors.jenisKelamin && (
                    <p className="text-secondary-red">
                      {errors.jenisKelamin.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-y-2 items-center">
                <Button id="btnLanjut" aria-label="Tombol lanjut">
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

export default DataDiriDua;

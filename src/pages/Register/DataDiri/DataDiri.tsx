import bgAuth from "@/assets/bg-auth.jpg";
import Button from "@/components/Button/Button";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import Input from "@/components/Input/Input";
import Label from "@/components/Label/Label";
import { IFormInput } from "./types";
import { MaterialSymbol } from "react-material-symbols";
import "react-material-symbols/rounded";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useRegistrationStore } from "@/store/RegisterStore";
import { useLoading } from "@/hooks/useLoading";
import SpinnerWrapper from "@/components/Spinner/SpinnerWrapper";
import { checkRegisterDataAPI } from "@/services/authServices";
import { useState } from "react";
import Alert from "@/components/Alert/Alert";
import { MdArrowBack } from "react-icons/md";
import { DatePickerField } from "@/components/DatePickerField/DatePickerField";

const DataDiri = () => {
  const { no_ktp, name, date_of_birth } = useRegistrationStore(
    (state) => state
  );
  const setField = useRegistrationStore((state) => state.setField);
  const navigate = useNavigate();
  const { isLoading, withLoading } = useLoading();

  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [alertVariant, setAlertVariant] = useState<
    "success" | "danger" | "primary" | undefined
  >(undefined);
  const [alertMessage, setAlertMessage] = useState("");

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    defaultValues: {
      noKtp: no_ktp || "",
      nama: name || "",
      tanggalLahir: date_of_birth.split("-").reverse().join("-") || "",
    },
  });

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    setField("no_ktp", data.noKtp);
    setField("name", data.nama);
    setField("date_of_birth", data.tanggalLahir.split("-").reverse().join("-"));

    withLoading(async () => {
      const response = await checkRegisterDataAPI("no_ktp", data.noKtp);

      if (response?.success === false) {
        setAlertVariant("danger");
        setAlertMessage(response?.message);
        setIsAlertOpen(true);
      } else if (response?.success === true) {
        navigate("/register/ktp");
      } else {
        setAlertVariant("danger");
        setAlertMessage(response?.message);
        setIsAlertOpen(true);
      }
    });
  };

  return (
    <>
      <SpinnerWrapper isLoading={isLoading}>
        <Header />
        <main
          className="w-full min-h-[828px] h-[calc(100vh-73px-75px)] md:h-[calc(100vh-94px-75px)] bg-cover bg-center"
          style={{ backgroundImage: `url(${bgAuth})` }}
        >
          <div className="container mx-auto px-6 flex items-center justify-center md:justify-end h-full">
            <div className="bg-neutral-01 px-8 py-8 md:px-14 rounded-lg w-[450px] min-h-[480px]">
              <Button
                className="w-fit h-fit my-4 text-primary-darkBlue bg-transparent"
                aria-label="Tombol kembali"
                onClick={() => {
                  navigate("/register/password");
                }}
              >
                <MdArrowBack size={22} />
              </Button>
              <h1 className="mb-10 text-3xl text-primary-blue font-bold">
                Data Diri
              </h1>
              <form
                className="flex flex-col gap-y-8"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="flex flex-col gap-y-3">
                  <div className="flex flex-col gap-y-1">
                    <div className="flex items-center gap-1">
                      <Label htmlFor="noKtp">No KTP</Label>
                      {errors.noKtp && (
                        <span className="text-secondary-red flex items-center">
                          <MaterialSymbol icon="error" title="error" />
                        </span>
                      )}
                    </div>
                    <div>
                      <Controller
                        name="noKtp"
                        control={control}
                        render={({ field }) => (
                          <Input
                            id="noKtp"
                            type="text"
                            placeholder="1234567891011"
                            aria-label="Masukkan no KTP Anda"
                            aria-invalid={errors.noKtp ? "true" : "false"}
                            aria-describedby={
                              errors.noKtp ? "noKtp-error" : undefined
                            }
                            className={`${
                              errors.noKtp
                                ? "border-2 border-secondary-red focus:outline-secondary-red"
                                : ""
                            }`}
                            {...field}
                            onChange={(e) =>
                              field.onChange(
                                e.target.value.replace(/[^0-9]/g, "")
                              )
                            }
                          />
                        )}
                        rules={{
                          required: "Input no KTP tidak boleh kosong",
                          pattern: {
                            value: /^\d{16}$/,
                            message: "No KTP harus terdiri dari 16 angka",
                          },
                        }}
                      />
                      {errors.noKtp && (
                        <p id="noKtp-error" className="text-secondary-red">
                          {errors.noKtp.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col gap-y-1">
                    <div className="flex items-center gap-1">
                      <Label htmlFor="nama">Nama</Label>
                      {errors.nama && (
                        <span className="text-secondary-red flex items-center">
                          <MaterialSymbol icon="error" title="error" />
                        </span>
                      )}
                    </div>
                    <div>
                      <Controller
                        name="nama"
                        control={control}
                        render={({ field }) => (
                          <Input
                            id="nama"
                            type="text"
                            placeholder="John Doe"
                            aria-label="Masukkan nama Anda"
                            aria-invalid={errors.nama ? "true" : "false"}
                            aria-describedby={
                              errors.nama ? "nama-error" : undefined
                            }
                            className={
                              errors.nama
                                ? "border-2 border-secondary-red focus:outline-secondary-red"
                                : ""
                            }
                            {...field}
                          />
                        )}
                        rules={{
                          required: "Input nama tidak boleh kosong",
                        }}
                      />
                      {errors.nama && (
                        <p id="nama-error" className="text-secondary-red">
                          {errors.nama.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col gap-y-1">
                    <div className="flex items-center gap-1">
                      <Label htmlFor="tanggalLahir">Tanggal Lahir</Label>
                      {errors.tanggalLahir && (
                        <span className="text-secondary-red flex items-center">
                          <MaterialSymbol icon="error" title="error" />
                        </span>
                      )}
                    </div>
                    <div>
                      <Controller
                        name="tanggalLahir"
                        control={control}
                        render={({ field }) => (
                          <DatePickerField
                            className={`${
                              errors.tanggalLahir
                                ? "border-2 !border-secondary-red focus:outline-secondary-red"
                                : ""
                            } !bg-neutral-02 !h-auto !border-inherit`}
                            ariaLabel="Masukkan tanggal lahir Anda"
                            idName="tanggalLahir"
                            aria-invalid={
                              errors.tanggalLahir ? "true" : "false"
                            }
                            aria-describedby={
                              errors.tanggalLahir
                                ? "tanggalLahir-error"
                                : undefined
                            }
                            {...field}
                          />
                        )}
                        rules={{
                          required: "Input tanggal lahir tidak boleh kosong",
                        }}
                      />
                      {errors.tanggalLahir && (
                        <p
                          id="tanggalLahir-error"
                          className="text-secondary-red"
                        >
                          {errors.tanggalLahir.message}
                        </p>
                      )}
                    </div>
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
        <Alert
          variant={alertVariant}
          isOpen={isAlertOpen}
          autoDismiss={false}
          onClose={() => {
            setIsAlertOpen(false);
          }}
          showCloseButton={true}
        >
          {alertMessage}
        </Alert>
      </SpinnerWrapper>
    </>
  );
};

export default DataDiri;

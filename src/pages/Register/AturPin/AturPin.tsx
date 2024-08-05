import bgAuth from "@/assets/bg-auth.jpg";
import Button from "@/components/Button/Button";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import Input from "@/components/Input/Input";
import Label from "@/components/Label/Label";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { MaterialSymbol } from "react-material-symbols";
import "react-material-symbols/rounded";
import { registerAPI } from "@/services/authServices";
import { useRegistrationStore } from "@/store/RegisterStore";
import { useLoading } from "@/hooks/useLoading";
import SpinnerWrapper from "@/components/Spinner/SpinnerWrapper";
import { useState } from "react";
import Alert from "@/components/Alert/Alert";
import { PinSchema, TPinSchema } from "./PinSchema";

export default function AturPin() {
  const navigate = useNavigate();

  const { pin } = useRegistrationStore((state) => state);
  const setField = useRegistrationStore((state) => state.setField);
  const { reset, ...formData } = useRegistrationStore();
  const { isLoading, withLoading } = useLoading();
  const [isPinVisibility, setPinVisibility] = useState(false);
  const [isConfirmPinVisibility, setConfirmPinVisibility] = useState(false);

  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [alertVariant, setAlertVariant] = useState<
    "success" | "danger" | "primary" | undefined
  >(undefined);
  const [alertMessage, setAlertMessage] = useState("");

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TPinSchema>({
    resolver: zodResolver(PinSchema),
    defaultValues: {
      pin: pin || "",
      konfirmasiPin: pin || "",
    },
  });

  const handleCloseAlert = () => {
    setIsAlertOpen(false);
    if (alertVariant === "success") {
      navigate("/login");
    } else {
      navigate("/register");
    }
  };

  const extractMessage = (fullMessage: string): string => {
    const match = fullMessage.match(/"([^"]+)"/);
    return match ? match[1] : "";
  };

  const onSubmit = async (data: TPinSchema) => {
    setField("pin", data.pin);
    await withLoading(async () => {
      const response = await registerAPI({
        ...formData,
        pin: data.pin,
      });

      if (response?.success === false) {
        setAlertVariant("danger");
        setAlertMessage(extractMessage(response.message));
        // setAlertMessage(
        //   "Registrasi gagal. Terjadi kesalahan yang tidak terduga. Silakan coba lagi"
        // );
        setIsAlertOpen(true);
        reset();
      } else {
        setAlertVariant("success");
        setAlertMessage("Anda berhasil membuka rekening");
        setIsAlertOpen(true);
        reset();
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
            <div className="bg-neutral-01 px-8 py-14 md:px-14 rounded-lg w-[450px] min-h-[480px]">
              <h1 className="mb-10 text-3xl text-primary-blue font-bold">
                Atur Pin
              </h1>
              <form
                className="flex flex-col gap-y-8"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="flex flex-col gap-y-3">
                  <div className="flex flex-col gap-y-1">
                    <div className="flex items-center gap-1">
                      <Label htmlFor="pin">Pin</Label>
                      {errors.pin && (
                        <span className="text-secondary-red flex items-center">
                          <MaterialSymbol icon="error" title="error" />
                        </span>
                      )}
                    </div>
                    <div className="flex items-center relative">
                      <Controller
                        name="pin"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                          <Input
                            type="text"
                            id="pin"
                            placeholder="Pin"
                            aria-label="Pin"
                            {...field}
                            className={`${
                              errors.pin
                                ? "focus:outline-secondary-red border-secondary-red"
                                : ""
                            } ${isPinVisibility ? "" : "text-security-disc"}`}
                            onChange={(e) =>
                              field.onChange(
                                e.target.value.replace(/[^0-9]/g, "")
                              )
                            }
                          />
                        )}
                      />
                      <div
                        className="absolute right-[15px] cursor-pointer"
                        onClick={() => setPinVisibility(!isPinVisibility)}
                        aria-label={
                          isPinVisibility ? "Sembunyikan pin" : "Tampilkan pin"
                        }
                      >
                        {isPinVisibility ? (
                          <MaterialSymbol
                            icon="visibility_off"
                            size={20}
                            title="Sembunyikan pin"
                            className="py-3 text-neutral-03"
                          />
                        ) : (
                          <MaterialSymbol
                            icon="visibility"
                            size={20}
                            title="Tampilkan pin"
                            className="py-3 text-neutral-03"
                          />
                        )}
                      </div>
                    </div>
                    {errors.pin && (
                      <span
                        className="text-red-500 text-sm"
                        aria-label={errors.pin.message}
                      >
                        {errors.pin.message}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col gap-y-1">
                    <div className="flex items-center gap-1">
                      <Label htmlFor="konfirmasiPin">Konfirmasi Pin</Label>
                      {errors.pin && (
                        <span className="text-secondary-red flex items-center">
                          <MaterialSymbol icon="error" title="error" />
                        </span>
                      )}
                    </div>

                    <div className="flex items-center relative">
                      <Controller
                        name="konfirmasiPin"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                          <Input
                            type="text"
                            id="konfirmasiPin"
                            placeholder="Konfirmasi Ulang Pin"
                            aria-label="Konfirmasi Ulang Pin"
                            {...field}
                            className={`[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${
                              errors.konfirmasiPin
                                ? "focus:outline-secondary-red border-secondary-red"
                                : ""
                            } ${
                              isConfirmPinVisibility ? "" : "text-security-disc"
                            }`}
                            onChange={(e) =>
                              field.onChange(
                                e.target.value.replace(/[^0-9]/g, "")
                              )
                            }
                            autoComplete="off"
                          />
                        )}
                      />
                      <div
                        className="absolute right-[15px] cursor-pointer"
                        onClick={() =>
                          setConfirmPinVisibility(!isConfirmPinVisibility)
                        }
                        aria-label={
                          isConfirmPinVisibility
                            ? "Sembunyikan konfirmasi pin"
                            : "Tampilkan konfirmasi pin"
                        }
                      >
                        {isConfirmPinVisibility ? (
                          <MaterialSymbol
                            icon="visibility_off"
                            size={20}
                            title="Sembunyikan konfirmasi pin"
                            className="py-3 text-neutral-03"
                          />
                        ) : (
                          <MaterialSymbol
                            icon="visibility"
                            size={20}
                            title="Tampilkan konfirmasi pin"
                            className="py-3 text-neutral-03"
                          />
                        )}
                      </div>
                    </div>
                    {errors.konfirmasiPin && (
                      <span
                        className="text-red-500 text-sm"
                        aria-label={errors.konfirmasiPin.message}
                      >
                        {errors.konfirmasiPin.message}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex flex-col gap-y-2 items-center">
                  <Button id="btnPinLanjut" aria-label="Tombol Lanjut">
                    Lanjut
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </main>
        <Alert
          variant={alertVariant}
          isOpen={isAlertOpen}
          autoDismiss={true}
          onClose={handleCloseAlert}
          showCloseButton={false}
        >
          {alertMessage}
        </Alert>
        <Footer />
      </SpinnerWrapper>
    </>
  );
}

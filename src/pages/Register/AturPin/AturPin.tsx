import bgAuth from "@/assets/bg-auth.jpg";
import Button from "@/components/Button/Button";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import Input from "@/components/Input/Input";
import Label from "@/components/Label/Label";
import { z } from "zod";
import { useForm } from "react-hook-form";
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

const PinSchema = z
  .object({
    pin: z.coerce
      .string()
      .min(1, { message: "Input pin tidak boleh kosong" })
      .refine((val) => /^\d{6}$/.test(val), {
        message: "Pin harus terdiri dari 6 angka",
      }),
    konfirmasiPin: z.coerce
      .string()
      .min(1, { message: "Input konfirmasi pin tidak boleh kosong" }),
  })
  .superRefine(({ konfirmasiPin, pin }, ctx) => {
    if (konfirmasiPin.length < 6) {
      if (konfirmasiPin === pin) {
        ctx.addIssue({
          code: "custom",
          message: "Konfirmasi pin harus terdiri dari 6 angka",
          path: ["konfirmasiPin"],
        });
      } else {
        ctx.addIssue({
          code: "custom",
          message: "Konfirmasi pin dan pin tidak sama",
          path: ["konfirmasiPin"],
        });
      }
    } else if (konfirmasiPin !== pin) {
      ctx.addIssue({
        code: "custom",
        message: "Konfirmasi pin dan pin tidak sama",
        path: ["konfirmasiPin"],
      });
    }
  });

type TPinSchema = z.infer<typeof PinSchema>;

export default function AturPin() {
  const navigate = useNavigate();
  const { setField, reset, ...formData } = useRegistrationStore();
  const { isLoading, withLoading } = useLoading();

  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [alertVariant, setAlertVariant] = useState<
    "success" | "danger" | "primary" | undefined
  >(undefined);
  const [alertMessage, setAlertMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TPinSchema>({
    resolver: zodResolver(PinSchema),
  });

  const handleCloseAlert = () => {
    setIsAlertOpen(false);
    if (alertVariant === "success") {
      navigate("/login");
    }
  };

  const onSubmit = async (data: TPinSchema) => {
    console.log(data);
    setField("pin", data.pin);
    setField("confirm_pin", data.konfirmasiPin);

    try {
      await withLoading(async () => {
        const response = await registerAPI({
          ...formData,
          pin: data.pin,
          confirm_pin: data.konfirmasiPin,
        });
        console.log("Registrasi berhasil", response);

        // setAlertVariant("success");
        // setAlertMessage("Anda berhasil membuka rekening");
        // setIsAlertOpen(true);
        reset();

        navigate("/login");
      });
    } catch (error) {
      console.error("Registrasi gagal", error);
    }
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
                    <Input
                      type="number"
                      id="pin"
                      placeholder="Pin"
                      aria-label="Pin"
                      {...register("pin")}
                      className={`[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${
                        errors.pin
                          ? "focus:outline-secondary-red border-secondary-red"
                          : ""
                      }`}
                    />
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
                    <Input
                      type="number"
                      id="konfirmasiPin"
                      placeholder="Konfirmasi Ulang Pin"
                      aria-label="Konfirmasi Ulang Pin"
                      {...register("konfirmasiPin")}
                      className={`[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${
                        errors.konfirmasiPin
                          ? "focus:outline-secondary-red border-secondary-red"
                          : ""
                      }`}
                    />
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

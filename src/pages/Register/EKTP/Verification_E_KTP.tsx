import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import bgAuth from "@/assets/bg-auth.jpg";
import imgPreviewPlaceholder from "@/assets/empty_image_preview.svg";
import Button from "@/components/Button/Button";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import Input from "@/components/Input/Input";
import Label from "@/components/Label/Label";
import Alert from "@/components/Alert/Alert";
import { eKTPSchema, eKTPInput } from "@/pages/Register/EKTP/eKTPSchema";
import { useRegistrationStore } from "@/store/RegisterStore";
import { useLoading } from "@/hooks/useLoading";
import SpinnerWrapper from "@/components/Spinner/SpinnerWrapper";
import { MdArrowBack } from "react-icons/md";

export default function Verification_E_KTP() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>(imgPreviewPlaceholder);

  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [alertVariant, setAlertVariant] = useState<
    "success" | "danger" | "primary" | undefined
  >(undefined);
  const [alertMessage, setAlertMessage] = useState("");

  // const { ektp_photo } = useRegistrationStore((state) => state);
  const setField = useRegistrationStore((state) => state.setField);
  const navigate = useNavigate();
  const { isLoading, withLoading } = useLoading();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<eKTPInput>({
    resolver: zodResolver(eKTPSchema),
    defaultValues: {
      fileEKTP: "",
    },
  });

  // useEffect(() => {
  //   const base64Data = ektp_photo;

  //   if (base64Data) {
  //     const [mimeType, base64String] = base64Data.split(",");
  //     const blob = base64ToBlob(base64String, mimeType);
  //     const objectUrl = URL.createObjectURL(blob);
  //     console.log(blob);
  //     setPreview(objectUrl);

  //     return () => URL.revokeObjectURL(objectUrl);
  //   } else {
  //     setPreview(imgPreviewPlaceholder);
  //   }
  // }, [ektp_photo]);

  useEffect(() => {
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [file]);

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      setAlertVariant("danger");
      setAlertMessage((errors.fileEKTP?.message as string) || "Terjadi error");
      setIsAlertOpen(true);
    } else {
      setIsAlertOpen(false);
      setAlertMessage("");
    }
  }, [errors]);

  const handleCloseAlert = () => {
    setIsAlertOpen(false);
    if (alertVariant === "primary") {
      navigate("/register/atur-pin");
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    if (fileList && fileList.length > 0) {
      const selectedFile = fileList[0];
      setFile(selectedFile);
      setIsAlertOpen(false);
      setAlertMessage("");
    } else {
      setFile(null);
      setPreview(imgPreviewPlaceholder);
    }
  };

  // function base64ToBlob(base64: string, mimeType: string): Blob {
  //   const byteString = atob(base64);
  //   const arrayBuffer = new ArrayBuffer(byteString.length);
  //   const uint8Array = new Uint8Array(arrayBuffer);

  //   for (let i = 0; i < byteString.length; i++) {
  //     uint8Array[i] = byteString.charCodeAt(i);
  //   }

  //   return new Blob([uint8Array], { type: mimeType });
  // }

  async function getBase64(file: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (typeof reader.result === "string") {
          resolve(reader.result);
        } else {
          reject(new Error("Gagal membaca file sebagai string"));
        }
      };
      reader.onerror = reject;
    });
  }

  const onSubmit = async (data: eKTPInput) => {
    if (data) {
      try {
        const base64Data = await getBase64(data.fileEKTP[0]);
        setField("ektp_photo", base64Data);

        withLoading(async () => {
          await new Promise((resolve) => setTimeout(resolve, 1000));

          setAlertVariant("primary");
          setAlertMessage("Harap menunggu, e-KTP anda sedang diverifikasi");
          setIsAlertOpen(true);
        });
      } catch (err) {
        console.error("Error:", err);
        setAlertVariant("danger");
        setAlertMessage("Terjadi kesalahan saat memproses foto e-KTP");
        setIsAlertOpen(true);
      }
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
            <div className="bg-neutral-01 px-8 py-8 md:px-14 rounded-lg w-[450px] min-h-[480px]">
              <Button
                className="w-fit h-fit my-4 text-primary-darkBlue bg-transparent"
                aria-label="Tombol kembali"
                onClick={() => {
                  navigate("/register/data-diri");
                }}
              >
                <MdArrowBack size={22} />
              </Button>
              <h1 className="mb-10 text-3xl text-primary-blue font-bold">
                Verifikasi e-KTP
              </h1>
              <form
                className="flex flex-col gap-y-8"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="flex flex-col gap-y-3">
                  <div className="flex flex-col gap-y-1">
                    <Label htmlFor="fileEKTP">Upload e-KTP</Label>
                    <Input
                      className="!py-0 !px-0 text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-l-lg file:border-0 file:bg-neutral-03 file:text-black hover:file:bg-neutral-400 cursor-pointer"
                      {...register("fileEKTP")}
                      type="file"
                      id="fileEKTP"
                      accept="image/png, image/jpeg, image/jpg"
                      aria-required="true"
                      aria-label="Masukkan foto e-KTP Anda"
                      onChange={handleFileChange}
                    />
                    <span className="text-sm">
                      Max berukuran 1MB dengan format .jpg, .png
                    </span>
                    <div className="py-5">
                      <img
                        className="w-48 h-28 object-cover rounded-lg"
                        src={preview}
                        alt="Tampilan preview foto e-KTP anda"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-y-2 items-center">
                  <Button
                    id="btnKTPLanjut"
                    typeof="submit"
                    aria-label="Tombol lanjut"
                  >
                    Lanjut
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </main>
        <Footer />
        {alertVariant === "danger" ? (
          <Alert
            variant={alertVariant}
            isOpen={isAlertOpen}
            autoDismiss={false}
            onClose={handleCloseAlert}
            showCloseButton={true}
          >
            {alertMessage}
          </Alert>
        ) : (
          <Alert
            variant={alertVariant}
            isOpen={isAlertOpen}
            autoDismiss={true}
            onClose={handleCloseAlert}
            showCloseButton={false}
          >
            {alertMessage}
          </Alert>
        )}
      </SpinnerWrapper>
    </>
  );
}

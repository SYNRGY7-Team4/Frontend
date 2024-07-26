import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import bgAuth from "@/assets/bg-auth.jpg";
import imgPreviewPlaceholder from "@/assets/empty_image_preview.svg";
import Button from "@/components/Button/Button";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import Input from "@/components/Input/Input";
import Label from "@/components/Label/Label";
import Alert from "@/components/Alert/Alert";
import { eKTPSchema, eKTPInput } from "@/validation/eKTPSchema";

export default function Verification_E_KTP() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>(imgPreviewPlaceholder);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [alertStatus, setAlertStatus] = useState<
    "success" | "danger" | undefined
  >(undefined);
  const [alertMessage, setAlertMessage] = useState("");

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<eKTPInput>({
    resolver: zodResolver(eKTPSchema),
  });

  useEffect(() => {
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [file]);

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      setAlertStatus("danger");
      setAlertMessage((errors.file_eKTP?.message as string) || "Terjadi error");
      setIsAlertOpen(true);
    }
  }, [errors]);

  const handleCloseAlert = () => {
    setIsAlertOpen(false);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    if (fileList && fileList.length > 0) {
      const selectedFile = fileList[0];
      setFile(selectedFile);
    } else {
      setFile(null);
      setPreview(imgPreviewPlaceholder);
    }
  };

  const onSubmit: SubmitHandler<eKTPInput> = (formData) => {
    if (Object.keys(errors).length === 0) {
      const formDataToSend = new FormData();
      formDataToSend.append("file_eKTP", formData.file_eKTP[0]);
      console.log("Form data:", formDataToSend);
      setAlertStatus("success");
      setAlertMessage("Harap Menunggu, e-KTP anda sedang diverifikasi");
      setIsAlertOpen(true);
      navigate("/register/atur-pin");
    }
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
              Verifikasi e-KTP
            </h1>
            <form
              className="flex flex-col gap-y-8"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="flex flex-col gap-y-3">
                <div className="flex flex-col gap-y-1">
                  <Label htmlFor="file_eKTP">Upload e-KTP</Label>
                  <Input
                    className="!py-0 !px-0 text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-l-lg file:border-0 file:bg-neutral-03 file:text-black hover:file:bg-neutral-400 cursor-pointer"
                    {...register("file_eKTP")}
                    type="file"
                    id="file_eKTP"
                    accept="image/png, image/jpeg, image/jpg"
                    aria-required="true"
                    aria-label="Masukkan foto e-KTP Anda"
                    onChange={handleFileChange}
                  />
                  <span className="text-sm">
                    Max berukuran 1MB dengan format .jpg, .png
                  </span>
                  <div
                    role="img"
                    aria-label="Tampilan foto e-KTP Anda"
                    className="py-5"
                  >
                    <img
                      className="w-48 h-28 object-cover rounded-lg"
                      src={preview}
                      alt="Preview foto e-KTP"
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
      <Alert
        className=""
        variant={alertStatus}
        isOpen={isAlertOpen}
        onClose={handleCloseAlert}
      >
        {alertMessage}
      </Alert>
    </>
  );
}

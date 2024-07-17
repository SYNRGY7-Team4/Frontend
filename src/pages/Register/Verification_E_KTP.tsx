import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import bgAuth from "@/assets/bg-auth.jpg"
import imgPreviewPlaceholder from "@/assets/empty_image_preview.svg";
import Button from "@/components/Button/Button"
import Header from "@/components/Header/Header"
import Footer from "@/components/Footer/Footer"
import Input from "@/components/Input/Input"
import Label from "@/components/Label/Label"

export default function Verification_E_KTP() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>(imgPreviewPlaceholder);

  const navigate = useNavigate();
  const next = () => {
      navigate('/register/atur-pin');
  }

  useEffect(() => {
    let objectUrl: string | null = null;

    if (file) {
      objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
    }

    return () => {
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [file]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    if (fileList && fileList.length > 0) {
      setFile(fileList[0]);
    } else {
      setFile(null);
      setPreview(imgPreviewPlaceholder);
    }
  };

  return (
    <>
      <Header />
      <main
        className='w-full min-h-[828px] h-[calc(100vh-73px-75px)] md:h-[calc(100vh-94px-75px)] bg-cover bg-center'
        style={{ backgroundImage: `url(${bgAuth})` }}
      >
        <div className='container mx-auto px-6 flex items-center justify-center md:justify-end h-full'>
          <div className='bg-neutral-01 px-8 py-14 md:px-14 rounded-lg w-[450px]'>
            <h1 className='mb-10 text-3xl text-primary-blue font-bold'>
              Verifikasi e-KTP
            </h1>
            <form className='flex flex-col gap-y-8'>
              <div className='flex flex-col gap-y-3'>
                <div className='flex flex-col gap-y-1'>
                  <Label htmlFor='file_eKTP'>Upload e-KTP</Label>
                  <Input
                    className='w-full block bg-neutral-02 rounded-lg pe-5 text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-l-lg file:border-0 file:bg-neutral-03 file:text-black hover:file:bg-neutral-400 cursor-pointer'
                    type='file'
                    id='file_eKTP'
                    accept='image/*'
                    onChange={handleFileChange}
                    aria-required='true'
                    aria-label='Masukkan foto e-KTP Anda'
                  />
                    <div role='img' aria-label='Tampilan foto e-KTP Anda' className='py-5'>
                      <img
                        className='w-48 h-28 object-cover rounded-lg'
                        src={preview}
                        alt='Preview'
                      />
                    </div>
                </div>
              </div>
              <div className='flex flex-col gap-y-2 items-center'>
                <Button typeof="button" aria-label='Tombol lanjut' onClick={next}>Lanjut</Button>
              </div>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

import { z } from "zod";

const today = new Date().toISOString().split("T")[0];

export const mutasiSchema = z
  .object({
    jenisTransaksi: z.string().min(1, "Jenis Transaksi tidak boleh kosong"),
    dariTanggal: z.string().min(1, "Input Dari Tanggal tidak boleh kosong"),
    sampaiTanggal: z.string().min(1, "Input Sampai Tanggal tidak boleh kosong")
  })
  .refine(
    (data) => {
      return new Date(data.dariTanggal) <= new Date(today);
    },
    {
      message: "Tanggal awal lebih besar dari tanggal hari ini",
      path: ["dariTanggal"],
    }
  )
  .refine(
    (data) => {
      return new Date(data.sampaiTanggal) >= new Date(data.dariTanggal);
    },
    {
      message: "Tanggal Awal lebih besar dari tanggal akhir",
      path: ["sampaiTanggal"], // path of error
    }
  )
  .refine(
    (data) => {
      return new Date(data.sampaiTanggal) <= new Date(today);
    },
    {
      message: "Tanggal akhir lebih besar dari tanggal hari ini",
      path: ["sampaiTanggal"],
    }
  )
  
export type TMutasi = z.infer<typeof mutasiSchema>
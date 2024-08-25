import { z } from 'zod';

const today = new Date().toISOString().split('T')[0];

export const mutasiSchema = z
  .object({
    jenisTransaksi: z.string().min(1, 'Jenis Transaksi tidak boleh kosong'),
    dariTanggal: z.string().optional(),
    sampaiTanggal: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.dariTanggal) {
        return data.sampaiTanggal !== undefined && data.sampaiTanggal !== '';
      }
      return true;
    },
    {
      message:
        'Input Sampai Tanggal tidak boleh kosong jika mengisi Dari Tanggal',
      path: ['sampaiTanggal'],
    }
  )
  .refine(
    (data) => {
      if (data.dariTanggal && data.sampaiTanggal) {
        return new Date(data.dariTanggal) <= new Date(today);
      }
      return true;
    },
    {
      message: 'Tanggal awal lebih besar dari tanggal hari ini',
      path: ['dariTanggal'],
    }
  )
  .refine(
    (data) => {
      if (data.dariTanggal && data.sampaiTanggal) {
        return new Date(data.sampaiTanggal) >= new Date(data.dariTanggal);
      }
      return true;
    },
    {
      message: 'Tanggal Awal lebih besar dari tanggal akhir',
      path: ['sampaiTanggal'],
    }
  )
  .refine(
    (data) => {
      if (data.jenisTransaksi !== 'pending') {
        return (
          !data.sampaiTanggal || new Date(data.sampaiTanggal) <= new Date(today)
        );
      }
      return true;
    },
    {
      message: 'Tanggal akhir lebih besar dari tanggal hari ini',
      path: ['sampaiTanggal'],
    }
  );

export type TMutasi = z.infer<typeof mutasiSchema>;

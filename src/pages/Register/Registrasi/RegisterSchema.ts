import { z } from "zod";

export const RegisterSchema = z.object({
  emailRegister: z
    .string()
    .min(1, { message: "Input email tidak boleh kosong" })
    .email("Harap isi dengan emai yang valid"),
  phoneNumber: z.coerce
    .string()
    .min(1, { message: "Input nomor handphone tidak boleh kosong" })
    .startsWith("8", {
      message:
        "Nomor handphone harus dimulai dengan angka 8 dan terdiri dari 11-13 angka",
    })
    .refine((val) => /^\d{11,13}$/.test(val), {
      message:
        "Nomor handphone harus dimulai dengan angka 8 dan terdiri dari 11-13 angka",
    }),
});

export type TRegisterSchema = z.infer<typeof RegisterSchema>;

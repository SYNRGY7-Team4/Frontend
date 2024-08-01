import { z } from "zod";

export const PinSchema = z
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

export type TPinSchema = z.infer<typeof PinSchema>;

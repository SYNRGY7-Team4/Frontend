import { z } from "zod";

const passwordFormatCheck = (val: string) =>
  /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,15}$/.test(val);

export const PasswordSchema = z
  .object({
    password: z
      .string()
      .min(1, { message: "Input password tidak boleh kosong" }),
    confirmPassword: z
      .string()
      .min(1, { message: "Input konfirmasi password tidak boleh kosong" }),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: "custom",
        message: "Konfirmasi password dan password tidak sama",
        path: ["confirmPassword"],
      });
    }

    if (!passwordFormatCheck(data.password)) {
      ctx.addIssue({
        code: "custom",
        message:
          "Password harus terdiri dari 8-15 karakter dan harus mengandung kombinasi huruf dan angka",
        path: ["password"],
      });
    }

    if (!passwordFormatCheck(data.confirmPassword)) {
      ctx.addIssue({
        code: "custom",
        message:
          "Konfirmasi password harus terdiri dari 8-15 karakter dan harus mengandung kombinasi huruf dan angka",
        path: ["confirmPassword"],
      });
    }
  });

export type TPasswordSchema = z.infer<typeof PasswordSchema>;

import { z } from "zod";

export const otpSchema = z.object({
  otp: z
    .array(z.string().length(1))
    .length(6)
    .refine((data) => data.every((digit) => /^\d$/.test(digit)), {
      message: "Kode OTP harus berisi 6 angka",
    }),
});

export type OTPInput = z.infer<typeof otpSchema>;

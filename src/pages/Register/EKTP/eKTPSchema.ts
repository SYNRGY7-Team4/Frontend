import { z } from "zod";

export const MAX_FILE_SIZE = 1048576;
export const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

export const eKTPSchema = z.object({
  fileEKTP: z
    .any()
    .refine((files) => files?.length == 1, "File foto eKTP wajib diupload")
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE,
      `File foto melebihi 1MB`
    )
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      "Hanya menerima file foto dengan format .jpg, .jpeg, .png"
    ),
});

export type eKTPInput = z.infer<typeof eKTPSchema>;

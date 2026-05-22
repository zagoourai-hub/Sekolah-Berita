import { z } from "zod";

export const kategoriSchema = z.object({
  name: z
    .string()
    .min(3, "Nama kategori minimal 3 karakter.")
    .max(50, "Nama kategori maksimal 50 karakter."),

  slug: z
    .string()
    .max(80, "Slug maksimal 80 karakter.")
    .optional(),

  color: z
    .string()
    .max(30, "Warna maksimal 30 karakter.")
    .optional(),

  description: z
    .string()
    .max(200, "Deskripsi maksimal 200 karakter.")
    .optional(),
});

export type KategoriFormValues = z.infer<typeof kategoriSchema>;

export const kategoriDefaultValues: KategoriFormValues = {
  name: "",
  slug: "",
  color: "",
  description: "",
};
import { z } from "zod";

export const galeriSchema = z.object({
  title: z.string().min(3, "Judul galeri minimal 3 karakter."),
  slug: z.string().optional(),
  imageUrl: z.string().min(3, "URL gambar wajib diisi."),
  description: z.string().optional(),
});

export type GaleriFormValues = z.infer<typeof galeriSchema>;

export const galeriDefaultValues: GaleriFormValues = {
  title: "",
  slug: "",
  imageUrl: "",
  description: "",
};
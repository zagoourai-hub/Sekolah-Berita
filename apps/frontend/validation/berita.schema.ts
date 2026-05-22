import { z } from "zod";

export const beritaSchema = z.object({
  title: z
    .string()
    .min(5, "Judul berita minimal 5 karakter.")
    .max(150, "Judul berita maksimal 150 karakter."),

  slug: z
    .string()
    .max(180, "Slug maksimal 180 karakter.")
    .optional(),

  summary: z
    .string()
    .max(300, "Ringkasan maksimal 300 karakter.")
    .optional(),

  content: z
    .string()
    .min(10, "Konten berita minimal 10 karakter."),

  thumbnailUrl: z
    .string()
    .optional(),

  category: z
    .string()
    .optional(),

  status: z.enum(["DRAFT", "PUBLISHED"], {
    message: "Status harus Draft atau Published.",
  }),

  isFeatured: z.boolean().optional(),

  isBreakingNews: z.boolean().optional(),
});

export type BeritaFormValues = z.infer<typeof beritaSchema>;

export const beritaDefaultValues: BeritaFormValues = {
  title: "",
  slug: "",
  summary: "",
  content: "",
  thumbnailUrl: "",
  category: "",
  status: "DRAFT",
  isFeatured: false,
  isBreakingNews: false,
};
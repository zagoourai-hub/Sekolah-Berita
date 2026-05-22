import { z } from "zod";

export const ppdbSchema = z.object({
  title: z.string().min(5, "Judul PPDB minimal 5 karakter."),
  slug: z.string().optional(),
  content: z.string().min(10, "Konten PPDB minimal 10 karakter."),
  bannerUrl: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  status: z.enum(["DRAFT", "PUBLISHED"]),
});

export type PpdbFormValues = z.infer<typeof ppdbSchema>;

export const ppdbDefaultValues: PpdbFormValues = {
  title: "",
  slug: "",
  content: "",
  bannerUrl: "",
  startDate: "",
  endDate: "",
  status: "DRAFT",
};
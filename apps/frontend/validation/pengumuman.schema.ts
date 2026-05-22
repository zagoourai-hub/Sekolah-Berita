import { z } from "zod";

export const pengumumanSchema = z.object({
  title: z.string().min(5, "Judul pengumuman minimal 5 karakter."),
  slug: z.string().optional(),
  content: z.string().min(10, "Isi pengumuman minimal 10 karakter."),
  attachmentUrl: z.string().optional(),
  status: z.enum(["DRAFT", "PUBLISHED"]),
  isImportant: z.boolean().optional(),
});

export type PengumumanFormValues = z.infer<typeof pengumumanSchema>;

export const pengumumanDefaultValues: PengumumanFormValues = {
  title: "",
  slug: "",
  content: "",
  attachmentUrl: "",
  status: "DRAFT",
  isImportant: false,
};
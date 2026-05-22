import { z } from "zod";

export const prestasiSchema = z.object({
  title: z.string().min(5, "Judul prestasi minimal 5 karakter."),
  slug: z.string().optional(),
  description: z.string().optional(),
  winner: z.string().optional(),
  level: z.string().optional(),
  imageUrl: z.string().optional(),
  achievementDate: z.string().optional(),
  status: z.enum(["DRAFT", "PUBLISHED"]),
});

export type PrestasiFormValues = z.infer<typeof prestasiSchema>;

export const prestasiDefaultValues: PrestasiFormValues = {
  title: "",
  slug: "",
  description: "",
  winner: "",
  level: "",
  imageUrl: "",
  achievementDate: "",
  status: "PUBLISHED",
};
import { z } from "zod";

export const agendaSchema = z.object({
  title: z.string().min(5, "Judul agenda minimal 5 karakter."),
  slug: z.string().optional(),
  description: z.string().optional(),
  location: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  status: z.enum(["DRAFT", "PUBLISHED"]),
});

export type AgendaFormValues = z.infer<typeof agendaSchema>;

export const agendaDefaultValues: AgendaFormValues = {
  title: "",
  slug: "",
  description: "",
  location: "",
  startDate: "",
  endDate: "",
  status: "PUBLISHED",
};
import { z } from "zod";

export const settingsSchema = z.object({
  school_name: z.string().min(1, "Nama sekolah wajib diisi"),
  school_tagline: z.string().min(1, "Tagline sekolah wajib diisi"),
  phone: z.string().min(1, "Nomor telepon wajib diisi"),
  email: z.string().email("Format email tidak valid"),
  address: z.string().min(1, "Alamat sekolah wajib diisi"),
});

export type SettingsFormValues = z.input<typeof settingsSchema>;

export const settingsDefaultValues: SettingsFormValues = {
  school_name: "",
  school_tagline: "",
  phone: "",
  email: "",
  address: "",
};
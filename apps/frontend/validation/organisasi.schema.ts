import { z } from "zod";

const MAX_FILE_SIZE = 2 * 1024 * 1024;

const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

export const organisasiSchema = z.object({
  name: z.string().min(3, "Nama minimal 3 karakter"),
  kelas: z.string().optional(),
  position: z.string().min(3, "Jabatan minimal 3 karakter"),

  sortOrder: z.coerce
    .number()
    .int("Urutan harus angka bulat")
    .min(0, "Urutan minimal 0")
    .default(0),

  isActive: z.boolean().default(true),

  photoUrl: z
    .string()
    .trim()
    .optional()
    .or(z.literal(""))
    .refine(
      (value) => {
        if (!value) return true;
        return value.startsWith("http://") || value.startsWith("https://");
      },
      {
        message: "Link foto harus diawali http:// atau https://",
      },
    ),

  photo: z
    .custom<FileList | undefined>()
    .optional()
    .refine((files) => {
      if (!files || files.length === 0) return true;

      return files[0].size <= MAX_FILE_SIZE;
    }, "Ukuran foto maksimal 2MB")
    .refine((files) => {
      if (!files || files.length === 0) return true;

      return ACCEPTED_IMAGE_TYPES.includes(files[0].type);
    }, "Format foto harus JPG, PNG, atau WEBP"),
});

export type OrganisasiFormValues = z.input<typeof organisasiSchema>;

export const organisasiDefaultValues: OrganisasiFormValues = {
  name: "",
  position: "",
  sortOrder: 0,
  kelas: "",
  isActive: true,
  photoUrl: "",
  photo: undefined,
};
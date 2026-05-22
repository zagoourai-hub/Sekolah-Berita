"use client";

import type { UseFormReturn } from "react-hook-form";

import {
  AdminTextareaField,
  AdminTextField,
} from "@/components/admin/admin-field";
import type { Galeri } from "@/types/school";
import type { GaleriFormValues } from "@/validation/galeri.schema";
import { adminUi } from "@/components/ui/class.-wrapper";

type GaleriFormProps = {
  form: UseFormReturn<GaleriFormValues>;
  editingGaleri: Galeri | null;
  isSubmitting: boolean;
  message: string;
  onSubmit: (values: GaleriFormValues) => void;
  onCancelEdit: () => void;
};

export function GaleriForm({
  form,
  editingGaleri,
  isSubmitting,
  message,
  onSubmit,
  onCancelEdit,
}: GaleriFormProps) {
  const { register, formState } = form;

  return (
    <div className={`${adminUi.card} ${adminUi.cardPadding}`}>
      <div className={adminUi.cardHeader}>
        <div>
          <h2 className={adminUi.title}>
            {editingGaleri ? "Edit Galeri" : "Tambah Galeri"}
          </h2>
          <p className={adminUi.description}>Akses: ADMIN / EDITOR</p>
        </div>

        <span className={adminUi.plusIcon}>+</span>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <div className="grid gap-4 md:grid-cols-2">
          <AdminTextField
            name="title"
            label="Judul Foto"
            register={register}
            errors={formState.errors}
          />

          <AdminTextField
            name="imageUrl"
            label="URL Gambar"
            placeholder="/uploads/galeri.jpg"
            register={register}
            errors={formState.errors}
          />
        </div>

        <AdminTextareaField
          name="description"
          label="Deskripsi"
          rows={5}
          register={register}
          errors={formState.errors}
        />

        {message ? <div className={adminUi.message}>{message}</div> : null}

        <div className="flex flex-wrap gap-3">
          <button
            type="submit"
            disabled={isSubmitting}
            className={adminUi.primaryButton}
          >
            {isSubmitting
              ? "Menyimpan..."
              : editingGaleri
                ? "Update Galeri"
                : "Simpan Galeri"}
          </button>

          {editingGaleri ? (
            <button
              type="button"
              onClick={onCancelEdit}
              className={adminUi.secondaryButton}
            >
              Batal Edit
            </button>
          ) : null}
        </div>
      </form>
    </div>
  );
}

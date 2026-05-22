"use client";

import type { UseFormReturn } from "react-hook-form";

import { AdminTextField } from "@/components/admin/admin-field";
import type { Kategori } from "@/types/school";
import { adminUi } from "@/components/ui/class.-wrapper";
import { KategoriFormValues } from "@/validation/kategori.schema";

type KategoriFormProps = {
  form: UseFormReturn<KategoriFormValues>;
  editingKategori: Kategori | null;
  isSubmitting: boolean;
  message: string;
  onSubmit: (values: KategoriFormValues) => void;
  onCancelEdit: () => void;
};

export function KategoriForm({
  form,
  editingKategori,
  isSubmitting,
  message,
  onSubmit,
  onCancelEdit,
}: KategoriFormProps) {
  const { register, formState } = form;

  return (
    <div className={`${adminUi.card} ${adminUi.cardPadding}`}>
      <div className={adminUi.cardHeader}>
        <div>
          <h2 className={adminUi.title}>
            {editingKategori ? "Edit Kategori" : "Tambah Kategori"}
          </h2>
          <p className={adminUi.description}>Akses: ADMIN / EDITOR</p>
        </div>

        <span className={adminUi.plusIcon}>+</span>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <AdminTextField
          name="name"
          label="Nama Kategori"
          placeholder="Prestasi"
          register={register}
          errors={formState.errors}
        />

        <AdminTextField
          name="slug"
          label="Slug"
          placeholder="prestasi"
          register={register}
          errors={formState.errors}
        />

        <AdminTextField
          name="color"
          label="Warna"
          placeholder="#f5b936"
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
              : editingKategori
                ? "Update Kategori"
                : "Simpan Kategori"}
          </button>

          {editingKategori ? (
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

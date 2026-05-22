"use client";

import type { UseFormReturn } from "react-hook-form";



import type { Berita } from "@/types/school";
import type { BeritaFormValues } from "@/validation/berita.schema";
import { adminUi } from "@/components/ui/class.-wrapper";
import { AdminCheckboxField, AdminSelectField, AdminTextareaField, AdminTextField } from "../admin-field";

type BeritaFormProps = {
  form: UseFormReturn<BeritaFormValues>;
  editingBerita: Berita | null;
  isSubmitting: boolean;
  message: string;
  onSubmit: (values: BeritaFormValues) => void;
  onCancelEdit: () => void;
};

export function BeritaForm({
  form,
  editingBerita,
  isSubmitting,
  message,
  onSubmit,
  onCancelEdit,
}: BeritaFormProps) {
  const { register, formState } = form;

  return (
    <div className={`${adminUi.card} ${adminUi.cardPadding}`}>
      <div className={adminUi.cardHeader}>
        <div>
          <h2 className={adminUi.title}>
            {editingBerita ? "Edit Berita" : "Tambah Berita"}
          </h2>
          <p className={adminUi.description}>Akses: ADMIN / EDITOR</p>
        </div>

        <span className={adminUi.plusIcon}>+</span>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <AdminTextField
          name="title"
          label="Judul Berita"
          placeholder="Siswa raih juara"
          register={register}
          errors={formState.errors}
        />

        <AdminTextField
          name="slug"
          label="Slug"
          placeholder="siswa-raih-juara"
          register={register}
          errors={formState.errors}
        />

        <AdminTextareaField
          name="summary"
          label="Ringkasan"
          placeholder="Ringkasan singkat berita"
          rows={3}
          register={register}
          errors={formState.errors}
        />

        <AdminTextareaField
          name="content"
          label="Konten"
          placeholder="Isi lengkap berita"
          rows={5}
          register={register}
          errors={formState.errors}
        />

        <div className="grid gap-4 md:grid-cols-2">
          <AdminTextField
            name="thumbnailUrl"
            label="URL Thumbnail"
            placeholder="/uploads/berita.jpg"
            register={register}
            errors={formState.errors}
          />

          <AdminSelectField
            name="category"
            label="Kategori"
            register={register}
            errors={formState.errors}
            options={[
              { label: "Pilih kategori", value: "" },
              { label: "Akademik", value: "Akademik" },
              { label: "Kegiatan", value: "Kegiatan" },
              { label: "Prestasi", value: "Prestasi" },
            ]}
          />
        </div>

        <AdminSelectField
          name="status"
          label="Status"
          register={register}
          errors={formState.errors}
          options={[
            { label: "Draft", value: "DRAFT" },
            { label: "Published", value: "PUBLISHED" },
          ]}
        />

        <AdminCheckboxField
          name="isFeatured"
          label="Jadikan featured"
          register={register}
        />

        <AdminCheckboxField
          name="isBreakingNews"
          label="Masuk breaking news"
          register={register}
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
              : editingBerita
                ? "Update Berita"
                : "Simpan Berita"}
          </button>

          {editingBerita ? (
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
